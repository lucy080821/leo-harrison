# PCA và giảm chiều dữ liệu

Dữ liệu thực thường có **hàng chục đến hàng nghìn đặc trưng**, nhiều cái **thừa hoặc tương quan** nhau. **Giảm chiều** (dimensionality reduction) nén chúng về ít chiều hơn mà **giữ phần lớn thông tin**.

Lợi ích: **trực quan hoá** (nén xuống 2D/3D), **tăng tốc** huấn luyện, **giảm nhiễu**, **chống lời nguyền số chiều** và quá khớp.

## PCA (Principal Component Analysis)

PCA tìm các **hướng mới** (thành phần chính) trong không gian dữ liệu sao cho:

1. Hướng thứ nhất $\mathbf{v}_1$ có **phương sai lớn nhất** (dữ liệu trải rộng nhất).
2. Hướng thứ hai $\mathbf{v}_2$ **vuông góc** với $\mathbf{v}_1$ và có phương sai lớn nhất còn lại. Và cứ thế.

Rồi **chiếu dữ liệu lên $k$ hướng đầu** để được biểu diễn $k$ chiều.

```text
  y ▲        · ·  ·
    │      · · ·· ·  ╱ ← PC1: hướng trải rộng nhất
    │    · ·· ··   ╱
    │   ·  · ··  ╱
    └─────────────────▶ x
```

### Cách tính (liên hệ khoá Toán)

1. **Trừ trung bình** từng cột (tâm hoá dữ liệu): $X_c$.
2. Tính **ma trận hiệp phương sai** $\Sigma = \dfrac{1}{n-1}X_c^TX_c$.
3. Tìm **vector riêng** của $\Sigma$: đó là các thành phần chính; **trị riêng** $\lambda_k$ là phương sai theo hướng đó.
4. Giữ $k$ vector riêng có trị riêng **lớn nhất**: ma trận $W_k$. Dữ liệu giảm chiều: $Z = X_cW_k$.

(Thực tế sklearn dùng **SVD** cho ổn định số.)

```python
from sklearn.decomposition import PCA
pca = PCA(n_components=2).fit(X)
Z = pca.transform(X)                 # n x 2
pca.components_                      # các hướng (hàng)
pca.explained_variance_ratio_        # tỉ lệ phương sai mỗi thành phần
```

![PCA chiếu dữ liệu lên hướng có phương sai lớn nhất](/lessons/machine-learning/11-pca-dimensionality-fig-vi.svg)
*PCA chiếu dữ liệu lên hướng có phương sai lớn nhất*

## Tỉ lệ phương sai giải thích

$$
\text{ratio}_k = \frac{\lambda_k}{\sum_j\lambda_j}
$$

Với iris, 2 thành phần đầu giữ ~**98%** phương sai: 4 chiều nén thành 2 gần như không mất gì.

### Chọn số thành phần

Vẽ **phương sai tích luỹ** và chọn $k$ nhỏ nhất đạt ngưỡng (ví dụ **95%**):

```python
ratio = PCA().fit(Xs).explained_variance_ratio_
k = np.argmax(np.cumsum(ratio) >= 0.95) + 1
# hoặc: PCA(n_components=0.95)
```

## Điều kiện bắt buộc: chuẩn hoá

PCA chạy theo **phương sai**, nên đặc trưng có thang đo lớn **lấn át**. Luôn dùng `StandardScaler` trước (đặc biệt khi các đặc trưng khác đơn vị). Trong bài breast cancer (30 đặc trưng đã chuẩn hoá), cần **10 thành phần** để giữ 95%.

## Ứng dụng

| Mục đích | Cách làm |
|---|---|
| Trực quan hoá | PCA xuống 2 chiều rồi `scatter`, tô màu theo nhãn |
| Tăng tốc | Giảm chiều trước khi huấn luyện |
| Khử nhiễu | Giữ thành phần đầu, bỏ phần cuối rồi `inverse_transform` |
| Loại tương quan | Các thành phần chính **không tương quan** nhau |
| Nén ảnh | Giữ ít thành phần, tái dựng gần giống |

```python
X_back = pca.inverse_transform(Z)        # tái dựng gần đúng chiều ban đầu
error = ((Xs - X_back) ** 2).mean()      # lỗi tái dựng
```

## Hạn chế

- Chỉ nắm bắt cấu trúc **tuyến tính**.
- Các thành phần chính **khó diễn giải** (tổ hợp của mọi đặc trưng).
- Phương sai lớn **không chắc** là thông tin hữu ích cho nhãn.
- **Nhạy với ngoại lệ**.

## Các phương pháp khác

| Phương pháp | Đặc điểm |
|---|---|
| **t-SNE**, **UMAP** | Phi tuyến, rất tốt để **trực quan hoá** cụm 2D (không dùng để huấn luyện mô hình) |
| **Autoencoder** | Mạng nơ-ron học biểu diễn nén phi tuyến (khoá Deep Learning) |
| **LDA** | Giảm chiều **có giám sát**, tối đa hoá phân tách giữa các lớp |
| **Chọn đặc trưng** | Giữ một tập con đặc trưng gốc (dễ diễn giải hơn) |
