# Huấn luyện mạng nơ-ron và bộ tối ưu

Bạn đã có **lan truyền xuôi** (dự đoán), **hàm mất mát** (đo sai) và **backpropagation** (gradient). Bài này ghép lại thành **vòng lặp huấn luyện** và giới thiệu các bộ tối ưu hiện đại.

## Vòng lặp huấn luyện

```python
for epoch in range(num_epochs):
    a1, p = forward(X)                       # 1. dự đoán
    loss = bce(p, y)                         # 2. đo sai (để theo dõi)
    grads = backward(X, y, a1, p)            # 3. gradient
    for param, g in zip(params, grads):
        param -= lr * g                      # 4. cập nhật
```

Với bài toán "hai vầng trăng", mạng $2\to16\to1$ học được ranh giới **phi tuyến** và đạt ~97%.

### Mất mát cross-entropy với sigmoid: gradient gọn đáng ngạc nhiên

Với sigmoid ở đầu ra và **binary cross-entropy**, đạo hàm theo logit $z$ chỉ là:

$$
\frac{\partial L}{\partial z} = \hat p - y
$$

(Vì $\sigma'(z)$ triệt tiêu với đạo hàm của log.) Tương tự với softmax + categorical cross-entropy: $\hat{\mathbf p} - \mathbf y$. Đây là lý do cặp "kích hoạt + mất mát" này luôn đi cùng nhau.

![Quỹ đạo SGD và momentum trên cùng một địa hình](/lessons/deep-learning/04-training-optimizers-fig-vi.svg)
*Quỹ đạo SGD và momentum trên cùng một địa hình*

## Epoch, batch, iteration

| Thuật ngữ | Nghĩa |
|---|---|
| **Epoch** | Một lượt duyệt **toàn bộ** tập huấn luyện |
| **Batch size** | Số mẫu mỗi lần cập nhật |
| **Iteration** | Một lần cập nhật = một batch |

Với $N=1000$ mẫu, batch 100 ⇒ 10 iteration mỗi epoch.

| Cách | Mỗi cập nhật dùng | Đặc điểm |
|---|---|---|
| **Batch GD** | Toàn bộ | Chính xác, chậm, tốn bộ nhớ |
| **SGD** (batch=1) | 1 mẫu | Nhanh nhưng **nhiễu** |
| **Mini-batch** (32-256) | Một lô | **Cân bằng**, tận dụng GPU, chuẩn |

Mỗi epoch nên **xáo trộn** dữ liệu. Nhiễu của mini-batch còn **giúp thoát cực tiểu cục bộ** và tổng quát tốt hơn.

## Tốc độ học (learning rate)

Siêu tham số quan trọng nhất. Quá lớn: loss dao động/phân kỳ; quá nhỏ: chậm. Kỹ thuật phổ biến: **lịch giảm learning rate** (giảm dần theo epoch), **warm-up** (tăng dần lúc đầu), hoặc **cosine decay**.

## Bộ tối ưu nâng cao

GD thường có hai vấn đề: **dao động** theo hướng dốc đứng và **chậm** theo hướng thoải.

### Momentum

Tích luỹ "vận tốc" từ các bước trước:

$$
\mathbf v\leftarrow\beta\mathbf v+\mathbf g,\qquad \theta\leftarrow\theta-\eta\,\mathbf v
$$

($\beta\approx0.9$.) Giống quả bóng lăn xuống dốc: **dập tắt dao động**, **tăng tốc** theo hướng nhất quán.

### RMSprop / Adagrad: học tốc độ riêng cho từng tham số

Chia bước cho **căn bậc hai của trung bình bình phương gradient** gần đây: tham số có gradient lớn bị **giảm bước**, tham số gradient nhỏ được **tăng bước**.

### Adam: momentum + tốc độ thích nghi (mặc định phổ biến nhất)

$$
\begin{aligned}
m_t&=\beta_1 m_{t-1}+(1-\beta_1)g_t &&\text{(trung bình gradient)}\\
v_t&=\beta_2 v_{t-1}+(1-\beta_2)g_t^2 &&\text{(trung bình bình phương gradient)}\\
\hat m_t&=\frac{m_t}{1-\beta_1^t},\quad \hat v_t=\frac{v_t}{1-\beta_2^t} &&\text{(hiệu chỉnh thiên lệch lúc đầu)}\\
\theta_t&=\theta_{t-1}-\eta\,\frac{\hat m_t}{\sqrt{\hat v_t}+\epsilon}
\end{aligned}
$$

Mặc định: $\beta_1=0.9,\ \beta_2=0.999,\ \epsilon=10^{-8}$, $\eta\approx10^{-3}$. **Adam làm việc tốt ngay mà ít cần tinh chỉnh**, là lựa chọn đầu tiên của hầu hết dự án. Biến thể **AdamW** (tách riêng weight decay) là chuẩn cho Transformer.

```python
m = b1 * m + (1 - b1) * g
v = b2 * v + (1 - b2) * g ** 2
m_hat = m / (1 - b1 ** t); v_hat = v / (1 - b2 ** t)
theta -= lr * m_hat / (np.sqrt(v_hat) + eps)
```

## Theo dõi quá trình huấn luyện

| Quan sát (đường cong loss) | Ý nghĩa |
|---|---|
| Train loss **không giảm** | LR sai, lỗi code/gradient, mạng quá yếu |
| Train giảm, **validation tăng** | **Quá khớp**: cần regularization (bài sau) |
| Loss **nhảy vọt / NaN** | LR quá lớn, gradient bùng nổ |
| Cả hai cùng giảm rồi **phẳng** | Hội tụ; có thể dừng |

Luôn **đo trên tập validation**, vẽ đường cong loss, và thử **overfit một batch nhỏ** trước (mô hình phải đạt loss ~0 trên 10 mẫu, nếu không thì có lỗi).

## Chuẩn hoá dữ liệu đầu vào

Như ML cổ điển, hãy chuẩn hoá đầu vào (trung bình 0, độ lệch chuẩn 1) để huấn luyện ổn định và nhanh hơn.
