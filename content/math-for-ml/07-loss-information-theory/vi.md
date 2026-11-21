# Hàm mất mát và lý thuyết thông tin

**Hàm mất mát** (loss) cho một con số duy nhất nói "mô hình đang sai tới đâu". Huấn luyện là **cực tiểu hoá** nó (bằng gradient descent). Chọn đúng hàm mất mát quan trọng ngang chọn đúng mô hình.

## Mất mát cho hồi quy

$N$ mẫu, giá trị thật $y_i$ và dự đoán $\hat y_i$.

| Hàm | Công thức | Đặc điểm |
|---|---|---|
| **MSE** | $\dfrac1N\sum(y_i-\hat y_i)^2$ | Phạt **nặng** sai số lớn (bình phương); **nhạy với ngoại lệ**; trơn, dễ tối ưu |
| **RMSE** | $\sqrt{\text{MSE}}$ | Cùng đơn vị với $y$ |
| **MAE** | $\dfrac1N\sum\lvert y_i-\hat y_i\rvert$ | **Bền** với ngoại lệ, nhưng không trơn tại 0 |
| **Huber** | MSE khi sai số nhỏ, MAE khi lớn | Thoả hiệp giữa hai loại |

```python
mse = np.mean((y_true - y_pred) ** 2)
mae = np.mean(np.abs(y_true - y_pred))
```

## Entropy: đo độ "bất ngờ" trung bình

Với phân phối $p$ trên các kết quả:

$$
H(p) = -\sum_i p_i\log_2 p_i\quad\text{(đơn vị bit)}
$$

| Phân phối | $H$ | Ý nghĩa |
|---|---|---|
| $(0.5, 0.5)$ | **1 bit** | Đồng xu công bằng: bất định tối đa |
| $(0.9, 0.1)$ | 0.469 bit | Dễ đoán hơn |
| $(1, 0)$ | 0 bit | Chắc chắn, không bất định |

Entropy **lớn** khi phân phối **dàn đều**, **nhỏ** khi **tập trung**. Cây quyết định dùng entropy (hoặc Gini) để chọn chỗ chia tốt nhất.

## Cross-entropy: mất mát cho phân loại

**Cross-entropy** giữa phân phối thật $p$ và dự đoán $q$:

$$
H(p,q) = -\sum_i p_i\log q_i
$$

Với phân loại nhị phân ($y\in\{0,1\}$, mô hình dự đoán xác suất $\hat p$):

$$
L = -\frac1N\sum_{i}\Big[y_i\log\hat p_i + (1-y_i)\log(1-\hat p_i)\Big]
$$

Trực giác: nếu nhãn thật là 1 mà mô hình dự đoán $\hat p = 0.01$ (tự tin sai), $-\log 0.01 \approx 4.6$ là **phạt rất nặng**; dự đoán đúng tự tin ($\hat p=0.99$) chỉ phạt $0.01$. Mô hình bị khuyến khích **vừa đúng vừa có xác suất được hiệu chỉnh tốt**.

Với nhiều lớp (softmax):

$$
L = -\sum_{c}y_c\log\hat p_c
$$

Đây là hàm mất mát tiêu chuẩn của **hồi quy logistic** và hầu hết **mạng nơ-ron phân loại**, kể cả các LLM (dự đoán token tiếp theo).

> Cross-entropy chính là **âm log-likelihood** của Bernoulli/Categorical: cực tiểu hoá nó = ước lượng hợp lý cực đại (bài trước).

## KL divergence: khoảng cách giữa hai phân phối

$$
D_{KL}(p\,\|\,q) = \sum_i p_i\log\frac{p_i}{q_i} = H(p,q) - H(p)
$$

- Luôn $\ge 0$, bằng 0 khi $p=q$.
- **Không đối xứng**: $D_{KL}(p\|q)\neq D_{KL}(q\|p)$.
- Vì $H(p)$ cố định (nhãn thật), **cực tiểu cross-entropy ⇔ cực tiểu KL** giữa phân phối thật và mô hình.

KL xuất hiện ở VAE, chưng cất tri thức (knowledge distillation) và RLHF.

## Chọn hàm mất mát

| Bài toán | Mất mát thông dụng |
|---|---|
| Hồi quy | MSE, MAE, Huber |
| Phân loại nhị phân | Binary cross-entropy |
| Phân loại nhiều lớp | Categorical cross-entropy (softmax) |
| Phân cụm | Tổng khoảng cách tới tâm cụm (inertia) |
| Mô hình sinh | Log-likelihood, KL |

## Mất mát ≠ chỉ số đánh giá

**Loss** là thứ **tối ưu** (cần khả vi, trơn). **Metric** (accuracy, F1...) là thứ **bạn quan tâm** để đánh giá (có thể không khả vi). Hai cái nên liên quan nhưng không nhất thiết trùng nhau.

## Tổng kết khoá Toán cho ML

Bạn đã có đủ nền tảng: **vector/ma trận** (biểu diễn), **đạo hàm** và **gradient descent** (học), **xác suất** và **phân phối** (bất định), **loss/entropy** (đo sai số). Từ đây trở đi các thuật toán ML sẽ chỉ là sự kết hợp những mảnh ghép này.
