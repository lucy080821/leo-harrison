# Quá khớp, đa thức và regularization

Đây là bài học quan trọng bậc nhất của ML: **mô hình tốt không phải mô hình khớp dữ liệu huấn luyện nhất, mà là mô hình tổng quát hoá tốt nhất.**

## Quá khớp (overfitting) và chưa khớp (underfitting)

Thử khớp dữ liệu $y = \sin x + \text{nhiễu}$ bằng đa thức bậc khác nhau:

| Bậc | Hình dạng | Train | Test |
|---|---|---|---|
| 1 (đường thẳng) | Quá đơn giản | Sai | Sai: **underfitting** |
| 3 | Vừa phải | Tốt | Tốt: **cân bằng** |
| 15 | Uốn lượn theo từng điểm nhiễu | **Rất tốt** | **Tệ**: **overfitting** |

Mô hình quá phức tạp **học thuộc nhiễu** của tập train thay vì quy luật thật.

## Đặc trưng đa thức

Biến hồi quy tuyến tính thành **phi tuyến** bằng cách thêm các luỹ thừa của đặc trưng:

$$
\hat y = w_0 + w_1x + w_2x^2 + \dots + w_dx^d
$$

Vẫn **tuyến tính theo tham số $w$**, nên dùng được mọi công cụ hồi quy tuyến tính.

```python
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline

model = make_pipeline(PolynomialFeatures(degree=3), StandardScaler(), LinearRegression())
```

Luôn **chuẩn hoá** sau khi tạo đa thức (luỹ thừa cao có thang đo khổng lồ).

## Đánh đổi bias-variance

Sai số kỳ vọng trên dữ liệu mới phân rã thành:

$$
\text{Sai số} = \underbrace{\text{Bias}^2}_{\text{mô hình quá đơn giản}} + \underbrace{\text{Variance}}_{\text{quá nhạy với dữ liệu train}} + \underbrace{\text{Nhiễu}}_{\text{không thể giảm}}
$$

- **Bias cao**: mô hình sai một cách hệ thống (underfitting).
- **Variance cao**: mô hình thay đổi mạnh nếu dữ liệu train đổi chút ít (overfitting).
- Tăng độ phức tạp: **bias giảm, variance tăng**. Mục tiêu là điểm **cân bằng** (test error thấp nhất).

## Cách phát hiện: đường cong học tập

| Quan sát | Chẩn đoán | Cách xử lý |
|---|---|---|
| Train **và** test đều sai | Underfitting | Mô hình mạnh hơn, thêm đặc trưng |
| Train tốt, test tệ (**khoảng cách lớn**) | Overfitting | **Thêm dữ liệu**, regularization, đơn giản hoá |

## Regularization: kiềm chế độ phức tạp

Thêm một **hình phạt cho trọng số lớn** vào hàm mất mát, buộc mô hình dùng trọng số nhỏ và mượt hơn.

### Ridge (L2)

$$
L = \text{MSE} + \alpha\sum_j w_j^2
$$

Co các trọng số về gần 0 (nhưng hiếm khi đúng bằng 0). Phù hợp khi nhiều đặc trưng đều có ích một chút.

### Lasso (L1)

$$
L = \text{MSE} + \alpha\sum_j \lvert w_j\rvert
$$

Có thể đưa nhiều trọng số **về đúng 0**: **chọn đặc trưng tự động**, mô hình thưa.

### Elastic Net

Kết hợp cả L1 và L2.

```python
from sklearn.linear_model import Ridge, Lasso
Ridge(alpha=10)
Lasso(alpha=0.1)
```

**$\alpha$** là siêu tham số điều khiển độ mạnh: $\alpha=0$ là hồi quy thường; $\alpha$ lớn cho mô hình rất đơn giản (có thể underfitting). Chọn bằng **cross-validation**.

> Đây là chuẩn L1/L2 bạn đã gặp ở khoá Toán. Cùng ý tưởng là **weight decay** trong deep learning.

## Các cách chống overfitting khác

1. **Thêm dữ liệu** (cách hiệu quả nhất).
2. **Giảm độ phức tạp** (bậc thấp hơn, cây nông hơn).
3. **Chọn đặc trưng**, bỏ đặc trưng nhiễu.
4. **Dừng sớm** (early stopping), **dropout** (deep learning).
5. **Cross-validation** để chọn siêu tham số.

## Tập validation

Khi chọn siêu tham số (bậc đa thức, $\alpha$...) dựa trên điểm số, bạn **vô tình khớp quá** vào tập đó. Vì vậy dùng **ba phần**:

| Tập | Dùng để |
|---|---|
| **Train** | Học tham số |
| **Validation** | Chọn siêu tham số / mô hình |
| **Test** | Báo cáo cuối cùng (chạm **một lần**) |
