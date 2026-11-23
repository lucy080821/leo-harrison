# Dự án: Dự đoán ung thư vú

Dự án cuối của khoá Machine Learning: chạy trọn **một quy trình ML đầu-cuối** trên bộ dữ liệu y tế thật. Mọi kỹ năng của khoá đều được dùng.

> **Bộ dữ liệu:** Wisconsin Breast Cancer, 569 ca, 30 đặc trưng số tính từ ảnh khối u (bán kính, kết cấu, độ lồi...). Nhãn: **lành tính (1)** hay **ác tính (0)**.

## Bước 1: Hiểu bài toán và chọn chỉ số

Đây là bài toán **phân loại nhị phân y tế**. Hai loại lỗi có **hậu quả rất khác nhau**:

- **Bỏ sót ca ác tính** (dự đoán lành tính khi thật ra ác tính): **nguy hiểm** (bệnh nhân không được điều trị).
- **Báo động giả** (dự đoán ác tính khi lành tính): gây lo lắng, làm thêm xét nghiệm, nhưng ít nghiêm trọng hơn.

Vì vậy **recall** của ca ác tính quan trọng hơn accuracy. (Trong dữ liệu sklearn lớp "ác tính" mã là 0, nên khi báo cáo cần chú ý lớp nào là lớp dương. Ở bài này ta xem lớp 1 làm dương để đơn giản.)

![Quy trình dự đoán ung thư vú: khám phá → mô hình → đánh giá](/lessons/machine-learning/24-project-breast-cancer-fig-vi.svg)
*Quy trình dự đoán ung thư vú: khám phá → mô hình → đánh giá*

## Bước 2: Chia dữ liệu và khám phá

```python
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=0, stratify=y)
```

- `stratify=y` giữ **tỉ lệ lớp** giống nhau ở train và test.
- **Khoá tập test**, không đụng tới cho đến cuối.
- Trên tập train: kiểm tra thiếu dữ liệu, thang đo, tương quan, phân bố nhãn.

## Bước 3: Baseline

Mô hình ngây thơ "luôn đoán lớp phổ biến nhất" cho accuracy ~63%. Mô hình của bạn phải **vượt xa** mốc này.

## Bước 4: So sánh nhiều mô hình bằng cross-validation

```python
models = {
    "logistic": make_pipeline(StandardScaler(), LogisticRegression(max_iter=2000)),
    "forest":   RandomForestClassifier(n_estimators=200, random_state=0),
    "svm":      make_pipeline(StandardScaler(), SVC()),
}
for name, m in models.items():
    cv = cross_val_score(m, X_train, y_train, cv=5, scoring="recall")
    print(name, cv.mean().round(3), "±", cv.std().round(3))
```

Chú ý: dùng **Pipeline** để chuẩn hoá nằm trong mỗi fold (không rò rỉ), và báo cáo **trung bình ± độ lệch**. Cây/rừng không cần chuẩn hoá.

## Bước 5: Tinh chỉnh mô hình đã chọn

```python
grid = GridSearchCV(pipe, {"logisticregression__C": [0.01, 0.1, 1, 10]}, cv=5, scoring="recall")
```

Đừng tinh chỉnh quá đà để "săn" từng 0.1%: chênh lệch nhỏ hơn độ lệch chuẩn giữa các fold thường là **nhiễu**.

## Bước 6: Đánh giá cuối cùng trên tập test (một lần)

```python
best.fit(X_train, y_train)
pred = best.predict(X_test)
print(classification_report(y_test, pred))
print(confusion_matrix(y_test, pred))
```

Báo cáo **ma trận nhầm lẫn**, **precision**, **recall**, **F1**, **ROC-AUC**. Nếu muốn ưu tiên bắt ca ác tính, **hạ ngưỡng quyết định** (`predict_proba`) rồi cân nhắc đánh đổi.

## Bước 7: Diễn giải

- **Hệ số** của hồi quy logistic (sau chuẩn hoá) hoặc **feature_importances_** của rừng: đặc trưng nào quan trọng nhất? (Thường là các đặc trưng "worst radius", "worst concave points"...)
- Mô hình sai ở những ca nào? Xem các mẫu bị phân loại sai.

## Bước 8: Đưa vào thực tế (tóm lược)

| Việc | Ghi chú |
|---|---|
| **Lưu mô hình** | `joblib.dump(best, "model.joblib")` (Pipeline đã gồm cả tiền xử lý) |
| **Phục vụ** | Bọc trong API (FastAPI/Flask), hoặc chạy theo lô |
| **Giám sát** | Theo dõi **trôi dữ liệu** (phân bố đầu vào đổi) và chất lượng theo thời gian |
| **Đạo đức/y tế** | Mô hình là **công cụ hỗ trợ**, quyết định cuối cùng thuộc về bác sĩ; cần kiểm tra thiên lệch giữa các nhóm bệnh nhân |

## Gợi ý mở rộng (tự thử)

- Thử `GradientBoostingClassifier`, `KNN` trong cùng khung so sánh.
- Vẽ **đường cong ROC** và **Precision-Recall**.
- Dùng **PCA** giảm xuống 2D để trực quan hoá hai lớp.
- Thử **hạ ngưỡng** và đo recall/precision mới.
- Chuyển sang bài hồi quy: dự đoán giá nhà `housing.csv` với `Ridge`, `RandomForestRegressor`.

## Chúc mừng!

Bạn đã đi hết khoá Machine Learning cổ điển: hồi quy, phân loại, cây, ensemble, SVM, phân cụm, PCA, pipeline và đánh giá đúng cách. Bước tiếp theo là **Deep Learning**, nơi bạn sẽ **tự cài đặt mạng nơ-ron từ đầu bằng NumPy** để hiểu tường tận thứ đang chạy bên trong.
