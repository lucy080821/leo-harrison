# Hồi quy logistic

Dù tên là "hồi quy", **hồi quy logistic** là thuật toán **phân loại** nền tảng: dự đoán **xác suất** một mẫu thuộc lớp 1.

## Từ đường thẳng đến xác suất

Hồi quy tuyến tính cho ra số bất kỳ ($-\infty$ đến $+\infty$), không phải xác suất ($0$ đến $1$). Hồi quy logistic nhét điểm tuyến tính $z = \mathbf{w}\cdot\mathbf{x}+b$ qua hàm **sigmoid**:

$$
\sigma(z) = \frac{1}{1+e^{-z}},\qquad \hat p = P(y=1\mid\mathbf{x}) = \sigma(\mathbf{w}\cdot\mathbf{x}+b)
$$

```text
 σ(z)
  1 ┤            ╭──────
    │          ╭╯
0.5 ┤        ╭─╯            σ(0) = 0.5
    │      ╭╯
  0 ┤──────╯
    └──────┴──────┴── z
```

- $z\to+\infty$: $\hat p\to 1$; $z\to-\infty$: $\hat p\to 0$; $z=0$: $\hat p = 0.5$.
- Dự đoán lớp: **1 nếu $\hat p\ge 0.5$**, ngược lại 0. Ngưỡng $0.5$ tương ứng $z = 0$: **ranh giới quyết định tuyến tính** $\mathbf{w}\cdot\mathbf{x}+b=0$.

![Hàm sigmoid biến điểm số thành xác suất](/lessons/machine-learning/04-logistic-regression-fig-vi.svg)
*Hàm sigmoid biến điểm số thành xác suất*

## Diễn giải hệ số: tỉ lệ cược (odds)

$$
\log\frac{\hat p}{1-\hat p} = \mathbf{w}\cdot\mathbf{x}+b
$$

Vế trái là **log-odds**. Tăng $x_j$ một đơn vị làm log-odds tăng $w_j$, tức odds nhân với $e^{w_j}$. Dấu của $w_j$ cho biết đặc trưng đẩy xác suất lên hay xuống.

## Huấn luyện: cực tiểu log loss

Cực đại hoá khả năng quan sát được nhãn ⇔ cực tiểu **binary cross-entropy** (bài Toán):

$$
L = -\frac1N\sum_i\Big[y_i\log\hat p_i + (1-y_i)\log(1-\hat p_i)\Big]
$$

Không có lời giải đóng như OLS, nên dùng **gradient descent**/quasi-Newton. Gradient rất gọn:

$$
\frac{\partial L}{\partial \mathbf{w}} = \frac1N X^T(\hat{\mathbf{p}} - \mathbf{y})
$$

Hàm này **lồi**, nên luôn hội tụ về cực tiểu toàn cục.

## scikit-learn

```python
from sklearn.linear_model import LogisticRegression
clf = LogisticRegression(max_iter=1000).fit(X_train, y_train)
clf.predict(X_test)              # nhãn 0/1
clf.predict_proba(X_test)        # [[P(0), P(1)], ...]
clf.coef_, clf.intercept_
```

- Mặc định có **regularization L2**: tham số `C` là **nghịch đảo** độ mạnh (`C` nhỏ = regularize mạnh).
- Cần `max_iter` đủ lớn nếu cảnh báo không hội tụ.

## Phải chuẩn hoá đặc trưng

GD và regularization nhạy với thang đo. Luôn dùng `StandardScaler`: **học thang đo chỉ từ tập train**, rồi áp cho cả test, nếu không sẽ **rò rỉ dữ liệu** (data leakage).

```python
scaler = StandardScaler().fit(X_train)
Xs_train = scaler.transform(X_train)
Xs_test = scaler.transform(X_test)
```

Tiện nhất là dùng **Pipeline** (bài sau) để làm việc này tự động và an toàn.

## Ngưỡng quyết định

Ngưỡng $0.5$ không thiêng liêng. Với bài toán **y tế** (bỏ sót bệnh rất nguy hiểm) có thể hạ ngưỡng xuống $0.3$ để **bắt nhiều ca bệnh hơn** (recall cao hơn) và chấp nhận nhiều báo động giả hơn:

```python
pred = (clf.predict_proba(X_test)[:, 1] >= 0.3).astype(int)
```

## Nhiều lớp

- **One-vs-Rest**: một bộ phân loại nhị phân cho mỗi lớp.
- **Softmax (multinomial)**: dự đoán đồng thời xác suất mọi lớp: $P(c)=\dfrac{e^{z_c}}{\sum_k e^{z_k}}$. scikit-learn tự xử lý.

## Điểm mạnh và yếu

| Mạnh | Yếu |
|---|---|
| Nhanh, ít tham số, **dễ diễn giải** | Chỉ ranh giới **tuyến tính** |
| Cho **xác suất** hiệu chỉnh khá tốt | Nhạy với đặc trưng tương quan mạnh |
| Baseline tuyệt vời cho phân loại | Cần chuẩn hoá |
