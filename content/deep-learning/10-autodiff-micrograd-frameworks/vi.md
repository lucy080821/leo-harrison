# Tự viết autograd nhỏ và dùng PyTorch/TensorFlow

Ở bài Backpropagation bạn tính gradient **bằng tay** cho một mạng cụ thể. Với mạng có hàng trăm tầng, bất khả thi. Các **khung deep learning** (PyTorch, TensorFlow, JAX) làm điều đó **tự động** nhờ **đạo hàm tự động** (automatic differentiation, autograd). Trong bài này bạn tự viết một engine autograd nhỏ (theo tinh thần dự án `micrograd` của Andrej Karpathy) để hiểu chính xác điều xảy ra bên trong.

## Ý tưởng: ghi lại đồ thị tính toán

Mỗi phép toán tạo một **nút mới** ghi nhớ:

1. **Giá trị** của nó (`data`).
2. **Các nút cha** (đầu vào đã tạo ra nó).
3. **Cách đẩy gradient ngược** về cha (`_backward`): đạo hàm **cục bộ**.

```text
 a ─┐
    ├─ (×) ─ ab ─┐
 b ─┘            ├─ (+) ─ d
 c ──────────────┘
```

Sau đó `backward()`:

1. **Sắp xếp topo** các nút (cha luôn đứng trước con).
2. Đặt `d.grad = 1`.
3. Duyệt **ngược**, gọi `_backward` của từng nút: nó **cộng dồn** gradient vào các nút cha.

```python
def __mul__(self, other):
    out = Value(self.data * other.data, (self, other))
    def _backward():
        self.grad  += other.data * out.grad     # d(ab)/da = b
        other.grad += self.data  * out.grad     # d(ab)/db = a
    out._backward = _backward
    return out
```

### Vì sao dùng `+=` (cộng dồn)?

Một nút có thể được **dùng nhiều lần** (ví dụ $a$ xuất hiện ở hai nhánh). Gradient tổng là **tổng các đóng góp** (quy tắc chuỗi nhiều đường). Ghi đè `=` sẽ sai.

![Đồ thị tính toán của L = (a·b + c) và gradient của từng nút](/lessons/deep-learning/10-autodiff-micrograd-frameworks-fig-vi.svg)
*Đồ thị tính toán của L = (a·b + c) và gradient của từng nút*

## Các đạo hàm cục bộ cần nhớ

| Phép toán | Đạo hàm cục bộ |
|---|---|
| $a+b$ | $\partial/\partial a=1$, $\partial/\partial b=1$ |
| $a\cdot b$ | $\partial/\partial a=b$, $\partial/\partial b=a$ |
| $\max(0,a)$ (ReLU) | $1$ nếu $a>0$, ngược lại $0$ |
| $\tanh(a)$ | $1-\tanh^2(a)$ |
| $a^n$ | $n\,a^{n-1}$ |
| $e^a$ | $e^a$ |

Với các phép này bạn có thể dựng **bất kỳ mạng nơ-ron nào** và tự động có gradient.

## Một nơ-ron hoàn chỉnh

```python
w, x, b = Value(-1.0), Value(2.0), Value(4.0)
y = (w * x + b).relu()          # nơ-ron với ReLU: relu(-2 + 4) = 2
y.backward()
# w.grad = x = 2,  x.grad = w = -1,  b.grad = 1
```

Gradient tính tay: $y=\text{ReLU}(wx+b)$, vì $wx+b=2>0$ nên $\partial y/\partial w=x=2$, $\partial y/\partial x=w=-1$, $\partial y/\partial b=1$. Khớp chính xác.

## PyTorch: cùng ý tưởng, quy mô công nghiệp

PyTorch xây đồ thị **động** (mỗi lần chạy xuôi) và `loss.backward()` tính mọi gradient. Mọi thứ bạn cài đặt trong khoá này đều có sẵn:

```python
import torch
import torch.nn as nn

# Dữ liệu và mô hình
X = torch.randn(300, 2)
y = (X[:, 0] * X[:, 1] > 0).float().unsqueeze(1)

model = nn.Sequential(
    nn.Linear(2, 16), nn.Tanh(),
    nn.Linear(16, 1),            # trả về logit
)
loss_fn = nn.BCEWithLogitsLoss()                       # sigmoid + BCE, ổn định số
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

for epoch in range(500):
    optimizer.zero_grad()              # xoá gradient cũ (autograd CỘNG DỒN!)
    loss = loss_fn(model(X), y)        # lan truyền xuôi
    loss.backward()                    # backpropagation tự động
    optimizer.step()                   # Adam cập nhật tham số
```

Đối chiếu với những gì bạn đã tự viết:

| Bạn tự viết | PyTorch |
|---|---|
| `forward()` | `model(X)` |
| `bce(p, y)` | `nn.BCEWithLogitsLoss` |
| `backward()` bằng tay | `loss.backward()` |
| `W -= lr * dW` / Adam | `optimizer.step()` |
| Class `Value` | `torch.Tensor` với `requires_grad=True` |

Nhớ `optimizer.zero_grad()` mỗi vòng (vì gradient **cộng dồn**, đúng như `+=` bạn vừa cài), và `model.eval()` / `torch.no_grad()` khi suy luận (tắt dropout).

## Keras / TensorFlow: API cấp cao

```python
from tensorflow import keras

model = keras.Sequential([
    keras.layers.Dense(16, activation="tanh", input_shape=(2,)),
    keras.layers.Dense(1, activation="sigmoid"),
])
model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])
model.fit(X, y, epochs=50, batch_size=32, validation_split=0.2)
```

`fit` gói sẵn vòng lặp huấn luyện, chia lô và theo dõi validation.

## Chọn khung nào?

| | PyTorch | TensorFlow/Keras | JAX |
|---|---|---|---|
| Phong cách | Python tự nhiên, dễ gỡ lỗi | API cấp cao, hệ sinh thái triển khai mạnh | Hàm thuần, biến đổi hàm (`grad`, `jit`) |
| Hợp với | **Nghiên cứu**, hầu hết LLM mới | Sản phẩm, di động/web (TF Lite, TF.js) | Nghiên cứu tính toán hiệu năng cao |

Để chạy các ví dụ PyTorch/Keras, hãy dùng máy bạn hoặc **Google Colab** (miễn phí, có GPU).

## GPU và tính toán

Phép nhân ma trận chạy cực nhanh trên **GPU**. Chuyển mô hình và dữ liệu sang GPU: `model.to("cuda")`, `X = X.to("cuda")`. Ở quy mô lớn, người ta dùng **độ chính xác hỗn hợp** (float16/bfloat16) và **huấn luyện phân tán**.

## Lộ trình học tiếp

- Làm các bài tập với **PyTorch** trên Colab: MNIST, CIFAR-10.
- **Transfer learning**: tinh chỉnh mô hình tiền huấn luyện (ResNet, BERT) trên dữ liệu của bạn.
- Hugging Face `transformers`: dùng và tinh chỉnh mô hình ngôn ngữ.
- Khoá kế tiếp trong lộ trình này: **AI hiện đại** (NLP, embedding, LLM, RAG, agent, học tăng cường).

## Chúc mừng!

Bạn đã **tự tay xây** neuron, MLP, backpropagation, bộ tối ưu, dropout, convolution, RNN, attention và autograd. Khi dùng PyTorch, bạn biết **chính xác** từng dòng đang làm gì: đó là lợi thế lớn so với việc chỉ gọi API.
