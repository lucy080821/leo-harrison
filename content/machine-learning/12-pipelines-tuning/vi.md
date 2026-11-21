# Pipeline, tinh chỉnh siêu tham số và rò rỉ dữ liệu

Bài này gom mọi thứ thành một quy trình **chuyên nghiệp, an toàn và lặp lại được**.

## Rò rỉ dữ liệu (data leakage): lỗi nguy hiểm nhất

**Rò rỉ** xảy ra khi thông tin từ **tập kiểm tra (hoặc tương lai)** lọt vào quá trình huấn luyện, làm điểm số **đẹp giả tạo**; ra thực tế mô hình tệ hơn nhiều.

### Ví dụ kinh điển

```python
# SAI: chuẩn hoá TOÀN BỘ dữ liệu trước khi chia
Xs = StandardScaler().fit_transform(X)          # trung bình/độ lệch tính cả từ tập TEST!
Xtr, Xte, ytr, yte = train_test_split(Xs, y)
```

Tập test đã "đóng góp" vào trung bình và độ lệch chuẩn dùng để biến đổi tập train: mô hình **nhìn thấy** thông tin về test.

```python
# ĐÚNG: chia trước, rồi học phép biến đổi CHỈ từ train
Xtr, Xte, ytr, yte = train_test_split(X, y)
scaler = StandardScaler().fit(Xtr)
Xtr_s, Xte_s = scaler.transform(Xtr), scaler.transform(Xte)
```

### Các dạng rò rỉ khác

- Chọn đặc trưng/giảm chiều bằng **cả bộ dữ liệu** trước khi chia.
- **Cross-validation** mà tiền xử lý đã fit trên toàn bộ dữ liệu.
- Đặc trưng chứa **thông tin của nhãn** (ví dụ cột "đã huỷ hợp đồng" khi dự đoán rời bỏ).
- Chia dữ liệu **chuỗi thời gian** ngẫu nhiên (phải chia theo thời gian: quá khứ → tương lai).
- **Trùng lặp** giữa train và test.

> Dấu hiệu nghi ngờ: điểm **cao đến khó tin** (99%+) trên bài toán khó.

## Pipeline: đóng gói các bước

`Pipeline` nối tiếp các bước tiền xử lý và mô hình thành **một đối tượng** có `fit`/`predict`:

```python
from sklearn.pipeline import Pipeline, make_pipeline
pipe = Pipeline([
    ("scale", StandardScaler()),
    ("clf", LogisticRegression(max_iter=1000)),
])
# hoặc ngắn gọn:
pipe = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))

pipe.fit(X_train, y_train)       # bộ chuẩn hoá chỉ học từ X_train
pipe.predict(X_test)             # tự áp phép chuẩn hoá đã học
cross_val_score(pipe, X, y, cv=5)   # chuẩn hoá được fit lại BÊN TRONG mỗi fold: không rò rỉ
```

Lợi ích: **an toàn** (không rò rỉ), **gọn**, dễ **lưu và triển khai** (`joblib.dump(pipe, ...)`), và **tinh chỉnh được cả bước tiền xử lý**.

## Dữ liệu hỗn hợp: ColumnTransformer

Cột số cần chuẩn hoá, cột phân loại cần mã hoá one-hot:

```python
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
pre = ColumnTransformer([
    ("num", StandardScaler(), ["age", "income"]),
    ("cat", OneHotEncoder(handle_unknown="ignore"), ["city", "gender"]),
])
model = make_pipeline(pre, RandomForestClassifier(random_state=0))
```

Bộ tiền xử lý hữu ích khác: `SimpleImputer` (điền thiếu), `MinMaxScaler`, `PolynomialFeatures`, `PCA`.

## Tinh chỉnh siêu tham số: GridSearchCV

**Siêu tham số** (ví dụ `n_neighbors`, `C`, `max_depth`) do bạn chọn, không học từ dữ liệu. **GridSearchCV** thử **mọi tổ hợp** trong lưới, đánh giá mỗi tổ hợp bằng **cross-validation** rồi chọn tốt nhất:

```python
from sklearn.model_selection import GridSearchCV
grid = GridSearchCV(
    pipe,
    param_grid={"knn__n_neighbors": [1, 3, 5, 7, 9, 11]},   # tên bước __ tham số
    cv=5,
    scoring="f1",
)
grid.fit(X_train, y_train)
grid.best_params_       # {'knn__n_neighbors': 5}
grid.best_score_        # điểm CV tốt nhất
grid.best_estimator_    # mô hình đã refit với tham số tốt nhất trên toàn bộ train
grid.score(X_test, y_test)   # đánh giá CUỐI trên test, chỉ một lần
```

Quy ước đặt tên tham số trong Pipeline: **`tên_bước__tên_tham_số`**.

| Cách tìm | Ưu/nhược |
|---|---|
| `GridSearchCV` | Thử hết lưới; chính xác nhưng **bùng nổ tổ hợp** |
| `RandomizedSearchCV` | Thử ngẫu nhiên $n$ tổ hợp; **hiệu quả hơn** khi nhiều tham số |
| Halving, Optuna... | Cắt tỉa sớm các tổ hợp tệ |

## Quy trình đánh giá đúng

```text
 Toàn bộ dữ liệu
   ├── Test (25%)  ← KHOÁ, chỉ dùng 1 lần cuối
   └── Train (75%)
         └── GridSearchCV với cross-validation (chia nhỏ train thành fold)
                → chọn siêu tham số → refit trên toàn bộ train
 → đánh giá một lần trên Test → báo cáo
```

Nếu bạn nhìn điểm test rồi quay lại chỉnh mô hình, tập test **đã bị "dùng"** và điểm báo cáo trở nên lạc quan.

## Danh sách kiểm tra trước khi tin kết quả

- [ ] Chia train/test **trước** mọi bước học từ dữ liệu?
- [ ] Mọi tiền xử lý nằm **trong Pipeline**?
- [ ] Chỉ số phù hợp với bài toán (không chỉ accuracy)?
- [ ] So với **baseline ngây thơ**?
- [ ] Kết quả ổn định khi đổi `random_state` (báo cáo ± độ lệch)?
