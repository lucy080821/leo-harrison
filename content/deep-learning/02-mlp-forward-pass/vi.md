# Mạng nhiều tầng (MLP) và lan truyền xuôi

**MLP** (Multi-Layer Perceptron, mạng nơ-ron truyền thẳng) xếp các nơ-ron thành **tầng**: tầng vào → một hoặc nhiều **tầng ẩn** → tầng ra. Mỗi tầng nối **đầy đủ** với tầng kế (fully connected / dense).

```text
 tầng vào      tầng ẩn        tầng ra
   x1 ──┬──▶  ( h1 ) ──┬──▶
        │  ╲╱          │
   x2 ──┼──▶  ( h2 ) ──┼──▶  ( ŷ )
        │  ╱╲          │
   x3 ──┴──▶  ( h3 ) ──┴──▶
```

## Lan truyền xuôi (forward pass)

Xử lý một **lô** $N$ mẫu bằng **phép nhân ma trận**. Với $X\in\mathbb{R}^{N\times d}$ và mạng một tầng ẩn $h$ đơn vị:

$$
Z_1 = XW_1 + \mathbf{b}_1,\qquad A_1 = \varphi(Z_1)
$$

$$
Z_2 = A_1W_2 + \mathbf{b}_2,\qquad \hat Y = \sigma(Z_2)
$$

- $W_1\in\mathbb{R}^{d\times h}$, $\mathbf{b}_1\in\mathbb{R}^{h}$ (cộng cho từng hàng nhờ **broadcasting**).
- $W_2\in\mathbb{R}^{h\times k}$ với $k$ đầu ra.

```python
def forward(X, W1, b1, W2, b2):
    h = sigmoid(X @ W1 + b1)
    return sigmoid(h @ W2 + b2)
```

Kiểm tra **hình dạng** luôn hữu ích: $(N,d)\cdot(d,h)\to(N,h)$, rồi $(N,h)\cdot(h,k)\to(N,k)$.

![Mạng nhiều tầng: dữ liệu đi từ vào qua tầng ẩn tới ra](/lessons/deep-learning/02-mlp-forward-pass-fig-vi.svg)
*Mạng nhiều tầng: dữ liệu đi từ vào qua tầng ẩn tới ra*

## Giải bài toán XOR

Mạng hai tầng ẩn **với đúng 2 nơ-ron ẩn** là đủ cho XOR, điều perceptron đơn không làm được. Trực giác: $\text{XOR}(a,b)=\text{AND}\big(\text{OR}(a,b),\ \text{NAND}(a,b)\big)$:

| Nơ-ron | Làm gì | Trọng số, bias |
|---|---|---|
| $h_1$ | OR | $(20,20)$, $-10$ |
| $h_2$ | NAND | $(-20,-20)$, $+30$ |
| ra | AND($h_1,h_2$) | $(20,20)$, $-30$ |

Tầng ẩn **biến đổi không gian** sao cho bài toán trở nên tách tuyến tính. Đó là bản chất của deep learning: **học biểu diễn**.

## Định lý xấp xỉ phổ quát

> Một MLP chỉ với **một tầng ẩn đủ rộng** và kích hoạt phi tuyến có thể xấp xỉ **bất kỳ hàm liên tục** nào với độ chính xác tuỳ ý.

Nhưng "đủ rộng" có thể là **cực kỳ rộng**. Thực tế **mạng sâu** (nhiều tầng hẹp) hiệu quả hơn nhiều: mỗi tầng học đặc trưng ở mức trừu tượng cao dần (cạnh → hình dạng → vật thể).

## Đếm tham số

Tầng nối $n_{in}\to n_{out}$ có $n_{in}\cdot n_{out}$ trọng số và $n_{out}$ bias:

$$
\#\text{params} = \sum_{\ell}\big(n_{\ell-1}\,n_\ell + n_\ell\big)
$$

Mạng $4\to8\to3$: $(4\cdot8+8)+(8\cdot3+3)=40+27=67$. Mạng nhận ảnh MNIST $784\to128\to10$: $100{,}480+1{,}290=101{,}770$ tham số.

Số tham số quyết định **dung lượng** mô hình, bộ nhớ và nguy cơ quá khớp.

## Khởi tạo trọng số

Không được khởi tạo **toàn 0**: mọi nơ-ron trong tầng giống hệt nhau và nhận cùng gradient, **không bao giờ khác nhau** (đối xứng không bị phá vỡ). Dùng số **ngẫu nhiên nhỏ**, chuẩn hoá theo cỡ tầng:

| Cách | Công thức (độ lệch chuẩn) | Hợp với |
|---|---|---|
| **Xavier/Glorot** | $\sqrt{\dfrac{2}{n_{in}+n_{out}}}$ | sigmoid, tanh |
| **He** | $\sqrt{\dfrac{2}{n_{in}}}$ | ReLU |

```python
rng = np.random.default_rng(0)
W1 = rng.normal(0, np.sqrt(2 / n_in), size=(n_in, n_hidden))
b1 = np.zeros(n_hidden)            # bias khởi tạo 0 là ổn
```

Khởi tạo tốt giữ **độ lớn tín hiệu** ổn định qua các tầng (không phình ra hoặc tắt dần).

## Hình dung tầng ẩn

Mỗi nơ-ron ẩn là một **bộ phát hiện** một mẫu hình trong đầu vào. Tầng sau kết hợp các bộ phát hiện đó thành mẫu hình phức tạp hơn. Chiều sâu = **phân cấp đặc trưng**.
