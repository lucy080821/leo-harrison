# Ensemble: Random Forest và Gradient Boosting

> "Sự khôn ngoan của đám đông": **nhiều mô hình yếu kết hợp** thường **mạnh hơn** một mô hình giỏi.

Một cây quyết định có phương sai cao (không ổn định). **Ensemble** kết hợp nhiều cây để khắc phục. Đây là nhóm thuật toán **mạnh nhất trên dữ liệu dạng bảng**, thường thắng cả deep learning ở loại dữ liệu này.

## Bagging và Random Forest

### Bagging (Bootstrap AGGregatING)

1. Tạo $B$ bộ dữ liệu bằng **bootstrap**: lấy mẫu **có hoàn lại** từ tập train (mỗi bộ cùng cỡ, chứa ~63% mẫu gốc, một số mẫu lặp).
2. Huấn luyện **một cây trên mỗi bộ** (độc lập, có thể song song).
3. **Tổng hợp**: bỏ phiếu đa số (phân loại) hoặc lấy trung bình (hồi quy).

Trung bình nhiều mô hình **giảm phương sai** mà hầu như không tăng bias. Nếu $B$ mô hình có phương sai $\sigma^2$ và tương quan $\rho$ với nhau thì trung bình có phương sai

$$
\rho\sigma^2 + \frac{1-\rho}{B}\sigma^2
$$

nên các cây càng **ít tương quan** thì càng giảm được nhiều.

### Random Forest: thêm tính ngẫu nhiên

Ngoài bootstrap, mỗi lần chia một nút chỉ xét **một tập con ngẫu nhiên các đặc trưng** (`max_features`, mặc định $\sqrt d$). Việc này làm các cây **ít giống nhau** ⇒ ensemble mạnh hơn.

```python
from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_estimators=100, random_state=0).fit(X_train, y_train)
```

| Tham số | Ý nghĩa |
|---|---|
| `n_estimators` | Số cây (nhiều hơn thường tốt hơn, tốn thời gian) |
| `max_depth`, `min_samples_leaf` | Kiểm soát độ phức tạp từng cây |
| `max_features` | Số đặc trưng xét mỗi lần chia |
| `oob_score=True` | Điểm **out-of-bag**: đánh giá miễn phí bằng các mẫu không rơi vào bootstrap |

**Ưu điểm**: hiệu quả "ngay từ đầu", ít cần tinh chỉnh, khó quá khớp, cho **độ quan trọng đặc trưng**, không cần chuẩn hoá.

## Boosting và Gradient Boosting

Bagging huấn luyện cây **song song, độc lập**. **Boosting** huấn luyện **tuần tự**: mỗi cây mới **sửa lỗi** của các cây trước.

### Gradient Boosting cho hồi quy (ý tưởng)

1. Bắt đầu với dự đoán đơn giản $F_0$ (ví dụ trung bình).
2. Tính **phần dư** (sai số): $r_i = y_i - F_{m-1}(x_i)$. Phần dư chính là **gradient âm** của MSE.
3. Huấn luyện một cây **nông** $h_m$ để dự đoán phần dư.
4. Cập nhật: $F_m = F_{m-1} + \eta\,h_m$ với $\eta$ là **tốc độ học**.

Đây đúng là **gradient descent trong không gian hàm**: mỗi cây là một bước đi ngược gradient.

```python
from sklearn.ensemble import GradientBoostingClassifier
gb = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=0)
```

| Tham số | Ý nghĩa |
|---|---|
| `n_estimators` | Số cây (số bước) |
| `learning_rate` | Mức đóng góp mỗi cây: nhỏ hơn = ổn định hơn, cần nhiều cây hơn |
| `max_depth` | Cây **nông** (3-5) là đủ |
| `subsample` | Dùng một phần mẫu mỗi vòng (**stochastic** boosting) |

Boosting **có thể quá khớp** nếu quá nhiều cây: dùng `early stopping` (`n_iter_no_change`).

### Các thư viện phổ biến

**XGBoost**, **LightGBM**, **CatBoost** là các cài đặt tối ưu cao của gradient boosting, thường vô địch các cuộc thi dữ liệu bảng (Kaggle). Scikit-learn có `HistGradientBoostingClassifier` nhanh tương tự LightGBM.

## So sánh

| | Random Forest | Gradient Boosting |
|---|---|---|
| Cách huấn luyện | Song song | **Tuần tự** |
| Giảm gì | **Phương sai** | **Bias** (và phương sai) |
| Cây | Sâu, mỗi cây mạnh | **Nông**, mỗi cây yếu |
| Tinh chỉnh | Ít | **Nhiều hơn** (learning rate, số cây...) |
| Độ chính xác tối đa | Rất tốt | **Thường cao nhất** |
| Nguy cơ quá khớp | Thấp | Cao hơn nếu không kiểm soát |

## Độ quan trọng đặc trưng

```python
import pandas as pd
pd.Series(rf.feature_importances_, index=feature_names).sort_values(ascending=False).head(5)
```

Hữu ích để **hiểu dữ liệu** và **chọn đặc trưng**; để diễn giải sâu hơn có **permutation importance** và **SHAP**.

> **Khi nào dùng?** Dữ liệu dạng bảng: thử **Random Forest** làm baseline mạnh, rồi **gradient boosting** để vắt thêm hiệu năng.
