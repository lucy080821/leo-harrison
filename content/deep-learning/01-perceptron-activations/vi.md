# Nơ-ron, perceptron và hàm kích hoạt

**Deep learning** (học sâu) dùng **mạng nơ-ron nhiều tầng** để học biểu diễn trực tiếp từ dữ liệu thô (ảnh, âm thanh, văn bản). Nó đứng sau nhận dạng ảnh, dịch máy và các mô hình ngôn ngữ lớn. Trong khoá này bạn sẽ **tự cài đặt mọi thứ bằng NumPy** để thật sự hiểu.

## Nơ-ron nhân tạo

Lấy cảm hứng (rất đơn giản hoá) từ nơ-ron sinh học. Một nơ-ron:

1. Nhận các đầu vào $x_1,\dots,x_d$.
2. Tính **tổng có trọng số**: $z = \sum_j w_jx_j + b = \mathbf{w}\cdot\mathbf{x}+b$.
3. Đưa qua **hàm kích hoạt** $\varphi$: $a = \varphi(z)$.

```text
 x1 ──w1──╲
 x2 ──w2───▶ ( Σ w·x + b ) ──▶ φ(z) ──▶ a
 x3 ──w3──╱
```

Đây chính là **hồi quy logistic** khi $\varphi=\sigma$ (sigmoid). Sức mạnh đến từ việc **xếp chồng hàng nghìn nơ-ron thành nhiều tầng**.

![Một nơ-ron và các hàm kích hoạt thường gặp](/lessons/deep-learning/01-perceptron-activations-fig-vi.svg)
*Một nơ-ron và các hàm kích hoạt thường gặp*

## Perceptron (1958)

Nơ-ron với hàm kích hoạt **bậc thang**: $a=1$ nếu $z>0$, ngược lại $0$. **Luật học perceptron**: với mỗi mẫu $(\mathbf{x},t)$ và dự đoán $\hat y$,

$$
\mathbf{w}\leftarrow\mathbf{w}+\eta\,(t-\hat y)\,\mathbf{x},\qquad b\leftarrow b+\eta\,(t-\hat y)
$$

Nếu đoán đúng ($t=\hat y$): không đổi. Nếu sai: **kéo ranh giới** về phía đúng. Với dữ liệu **tách tuyến tính** (như cổng AND, OR), perceptron được **bảo đảm hội tụ**.

### Giới hạn: bài toán XOR

Perceptron đơn **không thể** học XOR vì $\{(0,1),(1,0)\}$ và $\{(0,0),(1,1)\}$ không tách được bằng một đường thẳng. Năm 1969 phát hiện này làm "mùa đông AI" đầu tiên. Lời giải: **mạng nhiều tầng** với hàm kích hoạt **phi tuyến** (bài sau).

## Vì sao cần hàm kích hoạt phi tuyến?

Nếu bỏ hàm kích hoạt, mạng nhiều tầng chỉ là **tích các ma trận**, vẫn là **một phép biến đổi tuyến tính**:

$$
W_2(W_1\mathbf{x}) = (W_2W_1)\mathbf{x}
$$

Chồng bao nhiêu tầng cũng không mạnh hơn một tầng. **Phi tuyến** là thứ cho mạng khả năng xấp xỉ hàm phức tạp.

## Các hàm kích hoạt phổ biến

| Hàm | Công thức | Đầu ra | Ghi chú |
|---|---|---|---|
| **Sigmoid** | $\dfrac{1}{1+e^{-z}}$ | $(0,1)$ | Xác suất; **bão hoà** (gradient ~0 ở hai đầu) |
| **Tanh** | $\dfrac{e^z-e^{-z}}{e^z+e^{-z}}$ | $(-1,1)$ | Căn giữa 0; vẫn bão hoà |
| **ReLU** | $\max(0,z)$ | $[0,\infty)$ | **Mặc định hiện nay**: rẻ, gradient không biến mất khi $z>0$ |
| **Leaky ReLU** | $\max(\alpha z, z)$ | $\mathbb{R}$ | Tránh "ReLU chết" |
| **GELU / SiLU** | mượt hơn ReLU | | Dùng trong Transformer |
| **Softmax** | $\dfrac{e^{z_i}}{\sum_j e^{z_j}}$ | tổng $=1$ | **Tầng cuối** phân loại nhiều lớp |

```python
def relu(z): return np.maximum(0, z)
def sigmoid(z): return 1 / (1 + np.exp(-z))
def tanh(z): return np.tanh(z)
```

### Softmax

Biến vector điểm số ("logit") thành **phân phối xác suất**:

$$
\text{softmax}(\mathbf{z})_i = \frac{e^{z_i}}{\sum_j e^{z_j}}
$$

**Ổn định số:** $e^{1000}$ tràn số. Vì softmax **không đổi khi cộng hằng số** vào mọi $z_i$, ta trừ $\max(\mathbf z)$ trước:

```python
e = np.exp(z - np.max(z))
return e / e.sum()
```

Với $\mathbf z=(1,2,3)$: kết quả $(0.090, 0.245, 0.665)$.

## Chọn hàm kích hoạt ở tầng cuối

| Bài toán | Tầng cuối | Mất mát |
|---|---|---|
| Hồi quy | Tuyến tính (không kích hoạt) | MSE |
| Nhị phân | Sigmoid (1 đầu ra) | Binary cross-entropy |
| Nhiều lớp | Softmax | Categorical cross-entropy |

Các tầng **ẩn** thường dùng ReLU (hoặc GELU).

## Vì sao ReLU thắng sigmoid ở tầng ẩn?

Đạo hàm sigmoid $\sigma'(z)=\sigma(1-\sigma)\le 0.25$. Khi lan truyền ngược qua nhiều tầng, gradient bị **nhân nhiều lần với số nhỏ** và **biến mất** (vanishing gradient). ReLU có đạo hàm bằng **1** khi $z>0$, giúp gradient truyền tốt hơn trong mạng sâu.
