# Gradient descent

**Gradient descent** (GD, hạ gradient) là thuật toán tối ưu trung tâm của ML và deep learning: **lặp đi lặp lại đi một bước nhỏ theo hướng làm hàm mất mát giảm nhanh nhất**.

## Ý tưởng

Hãy tưởng tượng bạn đứng trên sườn đồi trong sương mù và muốn xuống thung lũng. Bạn **cảm nhận độ dốc dưới chân** và bước **theo hướng dốc xuống**. Lặp lại cho đến khi không còn dốc.

Toán học: với hàm mất mát $L(\theta)$ theo tham số $\theta$,

$$
\theta \leftarrow \theta - \eta\,\nabla L(\theta)
$$

- $\nabla L$: gradient (hướng tăng nhanh nhất) nên **trừ** đi để giảm.
- $\eta$ (eta): **tốc độ học** (learning rate), độ lớn bước.

```python
x = 0.0
for _ in range(50):
    x = x - 0.1 * 2 * (x - 3)     # cực tiểu hoá (x-3)^2, đạo hàm 2(x-3)
```

## Tốc độ học: tham số quan trọng nhất

| Learning rate | Hiện tượng |
|---|---|
| **Quá nhỏ** | Hội tụ rất chậm |
| **Vừa phải** | Giảm đều, hội tụ nhanh |
| **Quá lớn** | **Nhảy qua** cực tiểu, dao động hoặc **phân kỳ** (loss tăng vọt) |

Với $f(x) = (x-3)^2$, mỗi bước: $x_{t+1} - 3 = (1 - 2\eta)(x_t - 3)$. Hội tụ khi $|1-2\eta| < 1$, tức $0 < \eta < 1$. Với $\eta = 0.1$ sai số co lại 0.8 lần mỗi bước, sau 50 bước chỉ còn $0.8^{50}\approx 10^{-5}$.

> Khi huấn luyện, hãy **vẽ loss theo số lần lặp**: nếu loss không giảm hoặc tăng, hãy giảm learning rate.

## Hồi quy tuyến tính bằng GD

Mô hình $\hat y = wx + b$ với hàm mất mát **MSE** (sai số bình phương trung bình):

$$
L(w,b) = \frac{1}{N}\sum_{i=1}^{N}(wx_i+b-y_i)^2
$$

Đạo hàm riêng:

$$
\frac{\partial L}{\partial w} = \frac{2}{N}\sum (\hat y_i - y_i)\,x_i,\qquad
\frac{\partial L}{\partial b} = \frac{2}{N}\sum (\hat y_i - y_i)
$$

```python
for _ in range(5000):
    pred = w * X + b
    dw = 2 * np.mean((pred - y) * X)
    db = 2 * np.mean(pred - y)
    w -= lr * dw
    b -= lr * db
```

Hàm MSE của hồi quy tuyến tính là **hàm lồi** (một cực tiểu duy nhất), nên GD luôn tìm được đáp án đúng.

## Ba biến thể

| Biến thể | Mỗi bước dùng | Đặc điểm |
|---|---|---|
| **Batch GD** | Toàn bộ dữ liệu | Chính xác nhưng chậm với dữ liệu lớn |
| **Stochastic GD (SGD)** | **Một** mẫu | Rất nhanh, nhưng nhiễu |
| **Mini-batch GD** | Một **lô** (ví dụ 32-256 mẫu) | **Cân bằng**, là chuẩn trong deep learning |

## Những khó khăn thực tế

- **Cực tiểu cục bộ** và **điểm yên ngựa** (hàm không lồi, như mạng nơ-ron).
- **Thang đo đặc trưng khác nhau** làm đường đồng mức dẹt, GD zig-zag chậm. Giải pháp: **chuẩn hoá đặc trưng** (StandardScaler).
- **Gradient biến mất/bùng nổ** ở mạng sâu (khoá Deep Learning).

## Các bộ tối ưu nâng cao (giới thiệu)

| Bộ tối ưu | Ý tưởng |
|---|---|
| **Momentum** | Giữ "quán tính" của các bước trước, vượt qua dao động |
| **RMSprop / Adagrad** | Tốc độ học riêng cho từng tham số |
| **Adam** | Kết hợp momentum và tốc độ học thích nghi; **mặc định phổ biến nhất** |

Tất cả đều xây trên cùng ý tưởng đi ngược gradient.
