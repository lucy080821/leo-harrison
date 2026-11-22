# K láng giềng gần nhất và Naive Bayes

Hai thuật toán **trực quan** nhất, đại diện cho hai triết lý khác nhau: dựa vào **khoảng cách** (KNN) và dựa vào **xác suất** (Naive Bayes).

## K-Nearest Neighbors (KNN)

> "Cho tôi biết bạn bè của bạn là ai, tôi sẽ nói bạn là ai."

Để phân loại một điểm mới: tìm **$k$ điểm train gần nhất** và **bỏ phiếu theo đa số** (phân loại) hoặc **lấy trung bình** (hồi quy).

```python
from sklearn.neighbors import KNeighborsClassifier
knn = KNeighborsClassifier(n_neighbors=5).fit(X_train, y_train)
```

KNN là **mô hình "lười" (lazy)**: không học tham số nào, chỉ **ghi nhớ** dữ liệu; mọi việc tính toán diễn ra lúc dự đoán.

### Khoảng cách

$$
d_2(\mathbf{a},\mathbf{b}) = \sqrt{\sum_j (a_j-b_j)^2}\ \text{(Euclid)},\qquad
d_1(\mathbf{a},\mathbf{b}) = \sum_j \lvert a_j-b_j\rvert\ \text{(Manhattan)}
$$

### Chọn $k$

| $k$ | Hiệu ứng |
|---|---|
| Nhỏ ($k=1$) | Ranh giới **ngoằn ngoèo**, nhạy nhiễu → **overfitting** |
| Lớn | Ranh giới **mượt**, có thể bỏ qua cấu trúc nhỏ → **underfitting** |

Chọn $k$ bằng cross-validation (thường lẻ để tránh hoà phiếu).

### BẮT BUỘC chuẩn hoá đặc trưng

KNN dựa trên khoảng cách nên đặc trưng có **thang đo lớn lấn át** các đặc trưng khác. Ví dụ rượu vang: `proline` ở mức hàng trăm, `hue` dưới 2. Không chuẩn hoá, KNN gần như chỉ nhìn `proline`. Với `StandardScaler` accuracy có thể nhảy từ ~70% lên ~95%.

### Nhược điểm

- **Chậm khi dự đoán** với dữ liệu lớn (phải so với mọi điểm train).
- **Lời nguyền số chiều**: ở nhiều chiều, mọi điểm đều "xa nhau như nhau", khoảng cách mất ý nghĩa.
- Tốn bộ nhớ.

![K-NN: điểm mới lấy nhãn theo k láng giềng gần nhất](/lessons/machine-learning/06-knn-naive-bayes-fig-vi.svg)
*K-NN: điểm mới lấy nhãn theo k láng giềng gần nhất*

## Naive Bayes

Dựa trên **định lý Bayes** (bài Toán): với đặc trưng $\mathbf{x}=(x_1,\dots,x_d)$,

$$
P(c\mid\mathbf{x}) \propto P(c)\prod_{j=1}^{d}P(x_j\mid c)
$$

"**Naive**" (ngây thơ) vì giả định **các đặc trưng độc lập có điều kiện** theo lớp. Giả định thường sai, nhưng thuật toán vẫn **hoạt động bất ngờ tốt**.

Dự đoán lớp có xác suất hậu nghiệm lớn nhất:

$$
\hat c = \arg\max_c\Big[\log P(c) + \sum_j\log P(x_j\mid c)\Big]
$$

(Dùng log để tránh tràn số khi nhân nhiều xác suất nhỏ.)

### Phân loại văn bản (spam)

Mỗi email là **túi từ** (bag of words): đếm số lần xuất hiện từng từ. **Multinomial Naive Bayes**:

```python
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

vec = CountVectorizer()
nb = MultinomialNB().fit(vec.fit_transform(texts), labels)
nb.predict(vec.transform(["free money prize"]))     # ['spam']
```

Từ "free", "prize" xuất hiện nhiều trong spam nên đẩy $P(\text{spam}\mid\mathbf{x})$ lên.

### Làm trơn Laplace

Một từ chưa từng thấy trong lớp nào đó sẽ cho $P=0$ và **xoá sạch** cả tích. Cộng thêm hằng số $\alpha$ (mặc định 1) vào mọi đếm:

$$
P(x_j\mid c)=\frac{\text{count}(x_j,c)+\alpha}{\text{count}(c)+\alpha\,\lvert V\rvert}
$$

### Các biến thể

| Biến thể | Đặc trưng |
|---|---|
| `MultinomialNB` | Đếm từ, tần suất |
| `BernoulliNB` | Có/không (nhị phân) |
| `GaussianNB` | Số thực (giả định chuẩn theo lớp) |

## So sánh

| | KNN | Naive Bayes |
|---|---|---|
| Huấn luyện | Gần như không | **Rất nhanh** (chỉ đếm) |
| Dự đoán | Chậm | **Rất nhanh** |
| Cần chuẩn hoá | **Có** | Không (với đếm) |
| Hợp với | Dữ liệu vừa, ít chiều | **Văn bản**, nhiều chiều, baseline nhanh |
