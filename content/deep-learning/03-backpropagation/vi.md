# Lan truyền ngược (Backpropagation)

**Backpropagation** là thuật toán tính **gradient của hàm mất mát theo mọi tham số** trong mạng nơ-ron một cách hiệu quả. Nó làm cho việc huấn luyện mạng sâu trở nên khả thi. Về bản chất, nó chỉ là **quy tắc chuỗi** (bạn đã học ở khoá Toán) áp dụng có hệ thống.

## Đồ thị tính toán

Lan truyền xuôi là chuỗi các phép tính đơn giản:

```text
 X ──▶ z1 = X·W1 + b1 ──▶ a1 = tanh(z1) ──▶ out = a1·W2 + b2 ──▶ L
```

Để cập nhật bằng gradient descent ta cần $\dfrac{\partial L}{\partial W_1}$, $\dfrac{\partial L}{\partial b_1}$, $\dfrac{\partial L}{\partial W_2}$, $\dfrac{\partial L}{\partial b_2}$.

![Lan truyền ngược: đạo hàm chảy ngược theo đồ thị tính toán](/lessons/deep-learning/03-backpropagation-fig-vi.svg)
*Lan truyền ngược: đạo hàm chảy ngược theo đồ thị tính toán*

## Ý tưởng: đi ngược từ cuối về đầu

Quy tắc chuỗi: gradient tại một nút = (gradient truyền về từ nút sau) × (đạo hàm **cục bộ** của nút đó). Đi ngược từ $L$ về, **tái sử dụng** các đạo hàm đã tính, nên chi phí chỉ **cỡ một lần lan truyền xuôi**, thay vì tính riêng cho từng tham số.

## Ví dụ một nơ-ron sigmoid

$L = (a - y)^2$ với $a=\sigma(z)$, $z = wx+b$:

$$
\frac{\partial L}{\partial w}
=\underbrace{\frac{\partial L}{\partial a}}_{2(a-y)}\cdot
\underbrace{\frac{\partial a}{\partial z}}_{a(1-a)}\cdot
\underbrace{\frac{\partial z}{\partial w}}_{x}
$$

Ba nhân tử đều **đơn giản**; nhân chúng lại cho gradient.

## Mạng hai tầng (dạng ma trận)

Với $L = \dfrac{1}{2N}\sum(\text{out}-y)^2$, tầng ẩn $\tanh$, tầng ra tuyến tính. Đi ngược từng bước:

| Bước | Công thức |
|---|---|
| Gradient tại đầu ra | $\delta_{out} = \dfrac{\partial L}{\partial\text{out}}=\dfrac{\text{out}-y}{N}$ |
| Tầng ra | $\dfrac{\partial L}{\partial W_2}=A_1^T\delta_{out},\quad \dfrac{\partial L}{\partial \mathbf{b}_2}=\sum_{\text{hàng}}\delta_{out}$ |
| Truyền về tầng ẩn | $\delta_{A_1}=\delta_{out}W_2^T$ |
| Qua tanh | $\delta_{Z_1}=\delta_{A_1}\odot(1-A_1^2)$ |
| Tầng ẩn | $\dfrac{\partial L}{\partial W_1}=X^T\delta_{Z_1},\quad \dfrac{\partial L}{\partial \mathbf{b}_1}=\sum_{\text{hàng}}\delta_{Z_1}$ |

($\odot$ là nhân từng phần tử.)

```python
dout = (out - y) / N
dW2 = a1.T @ dout
db2 = dout.sum(axis=0, keepdims=True)
da1 = dout @ W2.T
dz1 = da1 * (1 - a1 ** 2)          # tanh'(z) = 1 - tanh(z)^2
dW1 = X.T @ dz1
db1 = dz1.sum(axis=0, keepdims=True)
```

### Mẹo nhớ hình dạng

Gradient của một tham số luôn có **cùng hình dạng** với tham số đó: $dW_2$ cùng hình với $W_2$. Nếu hình dạng không khớp, chắc chắn có lỗi.

## Sơ đồ chung cho mạng sâu

Với tầng $\ell$: $Z_\ell = A_{\ell-1}W_\ell+\mathbf b_\ell$, $A_\ell=\varphi(Z_\ell)$.

$$
\delta_\ell = \big(\delta_{\ell+1}W_{\ell+1}^T\big)\odot\varphi'(Z_\ell),\qquad
\frac{\partial L}{\partial W_\ell}=A_{\ell-1}^T\delta_\ell
$$

Lặp từ tầng cuối về tầng đầu. **PyTorch/TensorFlow tự làm việc này** (autograd), nhưng hiểu cách nó chạy giúp bạn gỡ lỗi và thiết kế tốt hơn (bài cuối khoá bạn sẽ tự viết một engine autograd nhỏ).

## Kiểm tra gradient (gradient checking)

Cài tay backprop rất dễ sai. **Luôn so sánh với đạo hàm số**:

$$
\frac{\partial L}{\partial\theta_i}\approx\frac{L(\theta_i+h)-L(\theta_i-h)}{2h}
$$

```python
max_err = max(np.abs(analytic[k] - numeric[k]).max() for k in params)   # nên < 1e-6
```

Đạo hàm số **chậm** (mỗi tham số cần hai lần lan truyền xuôi), nên chỉ dùng để **kiểm tra**, không dùng để huấn luyện.

## Vấn đề gradient biến mất / bùng nổ

Gradient đi qua nhiều tầng bị **nhân liên tiếp**:

- Nhân số $<1$ nhiều lần (đạo hàm sigmoid $\le 0.25$) → **biến mất**, tầng đầu không học.
- Nhân số $>1$ nhiều lần → **bùng nổ**, huấn luyện bất ổn.

Cách khắc phục: **ReLU**, **khởi tạo He/Xavier**, **batch normalization**, **kết nối tắt (residual)**, **cắt gradient** (clipping). Các bài sau sẽ gặp lại.
