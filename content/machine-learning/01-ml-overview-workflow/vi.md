# Tổng quan Machine Learning và quy trình

**Machine Learning** (học máy) là cách để máy tính **học quy luật từ dữ liệu** thay vì được lập trình từng quy tắc. Thay vì viết "nếu có từ 'trúng thưởng' thì là spam", bạn đưa cho máy hàng nghìn email đã gắn nhãn và để nó **tự rút ra** quy luật.

## Ba loại học chính

| Loại | Dữ liệu | Mục tiêu | Ví dụ |
|---|---|---|---|
| **Có giám sát** (supervised) | Có **nhãn** (đầu vào + đáp án) | Dự đoán nhãn cho dữ liệu mới | Lọc spam, dự đoán giá nhà |
| **Không giám sát** (unsupervised) | **Không có** nhãn | Tìm cấu trúc ẩn | Phân khúc khách hàng, giảm chiều |
| **Tăng cường** (reinforcement) | Phản hồi **thưởng/phạt** | Học chiến lược hành động | Chơi cờ, robot |

Có giám sát chia làm hai:

- **Phân loại** (classification): dự đoán **nhãn rời rạc** (spam/không, loài hoa).
- **Hồi quy** (regression): dự đoán **một số liên tục** (giá nhà, nhiệt độ).

## Khái niệm cốt lõi

- **Mẫu** (sample): một dòng dữ liệu. **Đặc trưng** (feature) $X$: các cột đầu vào. **Nhãn/mục tiêu** (target) $y$: thứ cần dự đoán.
- **Mô hình**: hàm $\hat y = f_\theta(X)$ có tham số $\theta$ cần học.
- **Huấn luyện** (training/fit): chọn $\theta$ cực tiểu hoá hàm mất mát trên dữ liệu huấn luyện.
- **Suy luận** (inference/predict): dùng mô hình đã học để dự đoán dữ liệu mới.

## Quy trình một dự án ML

```text
1. Hiểu bài toán  →  2. Thu thập & làm sạch dữ liệu  →  3. Khám phá (EDA)
        →  4. Chuẩn bị đặc trưng  →  5. Chọn mô hình & huấn luyện
        →  6. Đánh giá  →  7. Cải thiện (tinh chỉnh)  →  8. Triển khai & giám sát
```

Trong thực tế bước **2-4 chiếm phần lớn thời gian**; "dữ liệu tốt quan trọng hơn thuật toán xịn".

## Tập huấn luyện và tập kiểm tra

Nếu bạn đánh giá mô hình **trên chính dữ liệu đã học**, con số **vô nghĩa** (như học thuộc đề rồi tự chấm điểm). Mục tiêu là **tổng quát hoá** với dữ liệu **chưa từng thấy**. Vì vậy phải **tách trước một phần dữ liệu để kiểm tra**:

```python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)
```

- `test_size=0.2`: 20% để kiểm tra.
- `random_state=42`: cố định cách xáo trộn để **kết quả lặp lại được**.
- Với phân loại mất cân bằng, thêm `stratify=y` để giữ tỉ lệ các lớp.

> **Quy tắc vàng:** tập test chỉ được dùng **một lần cuối** để báo cáo. Đừng "nhìn lén" để chỉnh mô hình (xem bài Pipeline: rò rỉ dữ liệu).

## API thống nhất của scikit-learn

Mọi mô hình trong scikit-learn dùng cùng một giao diện, nên đổi thuật toán chỉ cần đổi một dòng:

```python
from sklearn.neighbors import KNeighborsClassifier

model = KNeighborsClassifier(n_neighbors=3)   # 1. tạo (đặt siêu tham số)
model.fit(X_train, y_train)                   # 2. học
pred = model.predict(X_test)                  # 3. dự đoán
model.score(X_test, y_test)                   # 4. đánh giá (mặc định: accuracy)
```

| Phương thức | Việc |
|---|---|
| `fit(X, y)` | Học tham số từ dữ liệu |
| `predict(X)` | Dự đoán nhãn / giá trị |
| `predict_proba(X)` | Xác suất từng lớp (phân loại) |
| `score(X, y)` | Điểm mặc định (accuracy hoặc R²) |
| `transform(X)` | Biến đổi dữ liệu (bộ tiền xử lý) |

**Tham số** (học từ dữ liệu, ví dụ trọng số) khác **siêu tham số** (bạn đặt trước, ví dụ `n_neighbors`).

## Hai bệnh của mô hình

| | Biểu hiện | Nguyên nhân |
|---|---|---|
| **Underfitting** (chưa khớp) | Sai ở **cả train lẫn test** | Mô hình quá đơn giản |
| **Overfitting** (khớp quá) | Tốt ở train, **tệ ở test** | Mô hình quá phức tạp, "học thuộc" nhiễu |

Cả khoá học sau này xoay quanh việc **cân bằng** hai bệnh này.

## Bộ dữ liệu iris

150 bông hoa, 4 đặc trưng (chiều dài/rộng đài và cánh hoa) và 3 loài. Đây là "Hello World" của ML, có sẵn trong scikit-learn.

```python
from sklearn.datasets import load_iris
X, y = load_iris(return_X_y=True)
```
