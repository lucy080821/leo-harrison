# Hồi quy tuyến tính

**Hồi quy tuyến tính** là thuật toán ML đơn giản và nền tảng nhất: dự đoán một **số liên tục** bằng **tổ hợp tuyến tính** của các đặc trưng.

## Mô hình

Một đặc trưng:

$$
\hat y = w x + b
$$

Nhiều đặc trưng $x_1,\dots,x_d$:

$$
\hat y = w_1x_1 + w_2x_2 + \dots + w_dx_d + b = \mathbf{w}\cdot\mathbf{x} + b
$$

- $w_j$: **hệ số** của đặc trưng $j$ = $\hat y$ thay đổi bao nhiêu khi $x_j$ tăng 1 đơn vị (giữ các đặc trưng khác không đổi).
- $b$: **hệ số chặn** (intercept), giá trị dự đoán khi mọi đặc trưng bằng 0.

Ví dụ giá nhà: `price = 30·diện_tích + 150·số_phòng − 8·tuổi − 60·khoảng_cách + 500`. Mỗi hệ số có **ý nghĩa dễ diễn giải**, đây là điểm mạnh lớn.

## Học tham số: bình phương tối thiểu (OLS)

Chọn $\mathbf{w}, b$ cực tiểu **tổng bình phương sai số** (MSE):

$$
L(\mathbf{w},b)=\frac1N\sum_{i=1}^{N}\big(y_i-\hat y_i\big)^2
$$

### Lời giải đóng: phương trình chuẩn

Thêm cột toàn 1 vào $X$ (gọi là $X_b$) để gộp $b$ vào $\boldsymbol\theta$:

$$
\boldsymbol{\theta} = (X_b^TX_b)^{-1}X_b^T\mathbf{y}
$$

```python
Xb = np.column_stack([np.ones(len(X)), X])
theta = np.linalg.solve(Xb.T @ Xb, Xb.T @ y)       # [b, w1, w2, ...]
```

Đây là kết quả bạn đã thấy ở khoá Toán (đại số tuyến tính). Cũng có thể giải bằng **gradient descent** khi dữ liệu rất lớn.

### Với scikit-learn

```python
from sklearn.linear_model import LinearRegression
model = LinearRegression().fit(X, y)
model.coef_          # [w1, w2, ...]
model.intercept_     # b
model.predict(X_new)
```

## Đánh giá hồi quy

| Chỉ số | Công thức | Ý nghĩa |
|---|---|---|
| **MSE/RMSE** | $\frac1N\sum(y-\hat y)^2$ | Sai số bình phương trung bình |
| **MAE** | $\frac1N\sum\lvert y-\hat y\rvert$ | Sai số tuyệt đối trung bình |
| **R²** | $1-\dfrac{\sum(y-\hat y)^2}{\sum(y-\bar y)^2}$ | **Tỉ lệ phương sai được giải thích** |

$R^2 = 1$: dự đoán hoàn hảo; $R^2 = 0$: không hơn việc luôn dự đoán trung bình $\bar y$; $R^2<0$: **tệ hơn** dự đoán trung bình.

```python
from sklearn.metrics import r2_score, mean_squared_error
r2_score(y_test, pred)
mean_squared_error(y_test, pred) ** 0.5     # RMSE
```

> Luôn tính chỉ số trên **tập test**; R² trên tập train luôn lạc quan.

## Các giả định (nên kiểm tra)

1. **Tuyến tính**: quan hệ $X$-$y$ xấp xỉ đường thẳng/mặt phẳng.
2. **Sai số độc lập, phương sai không đổi** (vẽ **phần dư** $y-\hat y$ theo $\hat y$: không nên có hình phễu hay đường cong).
3. **Không đa cộng tuyến**: các đặc trưng không phụ thuộc tuyến tính nhau (làm $X^TX$ gần suy biến, hệ số bất ổn). Kiểm tra bằng ma trận tương quan.
4. Ít **ngoại lệ** (MSE rất nhạy cảm).

## Diễn giải và chuẩn hoá

Hệ số chỉ **so sánh được** giữa các đặc trưng khi chúng **cùng thang đo**. Muốn biết đặc trưng nào "quan trọng hơn", hãy **chuẩn hoá** (StandardScaler) trước khi huấn luyện, rồi so sánh $|w_j|$.

## Giới hạn

- Chỉ nắm bắt quan hệ **tuyến tính**. Quan hệ cong cần đặc trưng đa thức (bài sau) hoặc mô hình phi tuyến.
- Nhạy với ngoại lệ.
- **Ngoại suy** ra ngoài miền dữ liệu thường sai.

Dù đơn giản, hồi quy tuyến tính là **mốc so sánh (baseline)** tuyệt vời: luôn thử nó trước khi dùng mô hình phức tạp.
