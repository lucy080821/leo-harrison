# Phân cụm: K-Means và hơn nữa

Đến giờ bạn học **có giám sát** (có nhãn). **Học không giám sát** làm việc với dữ liệu **không nhãn**, nhiệm vụ là **tìm cấu trúc ẩn**. **Phân cụm** (clustering) nhóm các mẫu giống nhau lại với nhau.

Ứng dụng: **phân khúc khách hàng**, gom nhóm bài báo, nén ảnh (giảm số màu), phát hiện bất thường, tạo nhãn ban đầu.

## K-Means

Chia dữ liệu thành $K$ cụm, mỗi cụm có một **tâm** (centroid). Thuật toán lặp hai bước:

1. **Gán**: mỗi điểm vào cụm có **tâm gần nhất**.
2. **Cập nhật**: dời mỗi tâm về **trung bình** các điểm trong cụm.

Lặp cho đến khi các nhóm không đổi.

```python
from sklearn.cluster import KMeans
km = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X)
km.labels_            # nhãn cụm của từng điểm
km.cluster_centers_   # toạ độ các tâm
km.predict(X_new)
```

K-Means cực tiểu **inertia** (tổng bình phương khoảng cách tới tâm cụm):

$$
\text{Inertia} = \sum_{k=1}^{K}\sum_{\mathbf{x}\in C_k}\|\mathbf{x}-\boldsymbol\mu_k\|^2
$$

### Điểm cần lưu ý

- Phải **chọn $K$ trước**.
- **Nhạy với khởi tạo** (có thể kẹt ở cực tiểu cục bộ): dùng `n_init=10` (chạy nhiều lần, lấy tốt nhất) và khởi tạo thông minh `k-means++` (mặc định).
- **Cần chuẩn hoá** đặc trưng (dựa trên khoảng cách).
- Giả định cụm **hình cầu, cỡ gần bằng nhau**; kém với cụm dài, lệch tâm hoặc có hình dạng lạ.
- Nhạy với ngoại lệ.

## Chọn số cụm $K$

### Phương pháp khuỷu tay (elbow)

Vẽ inertia theo $K$: luôn giảm khi $K$ tăng; tìm "**khuỷu tay**" nơi mức giảm chậm hẳn lại.

```python
inertias = [KMeans(k, n_init=10, random_state=0).fit(X).inertia_ for k in range(1, 9)]
```

### Hệ số silhouette

Với mỗi điểm: $a$ = khoảng cách trung bình tới các điểm **cùng cụm**, $b$ = khoảng cách trung bình tới cụm **gần nhất khác**:

$$
s = \frac{b-a}{\max(a,b)}\in[-1,1]
$$

$s$ gần **1**: điểm nằm đúng cụm, tách biệt rõ; gần **0**: sát ranh giới; **âm**: có thể gán nhầm. Lấy **trung bình** để chấm $K$:

```python
from sklearn.metrics import silhouette_score
silhouette_score(X, labels)
```

Chọn $K$ có silhouette **cao nhất**. Không cần nhãn thật, nên dùng được trong bài toán thực.

## DBSCAN: phân cụm theo mật độ

Cụm là **vùng điểm dày đặc** ngăn cách bởi vùng thưa. Hai tham số: `eps` (bán kính láng giềng) và `min_samples`.

```python
from sklearn.cluster import DBSCAN
labels = DBSCAN(eps=0.3, min_samples=5).fit_predict(X)     # nhãn -1 = nhiễu
```

| Ưu điểm | Nhược điểm |
|---|---|
| **Không cần chọn $K$** | Chọn `eps` khó |
| Cụm **hình dạng bất kỳ** (vầng trăng) | Kém khi mật độ các cụm khác nhau nhiều |
| Tự phát hiện **ngoại lệ** (nhãn -1) | Kém ở nhiều chiều |

## Phân cụm phân cấp

Bắt đầu mỗi điểm một cụm rồi **gộp dần** hai cụm gần nhất, tạo ra **dendrogram** (cây phân cấp). Cho phép **cắt ở mức bất kỳ** để chọn số cụm.

```python
from sklearn.cluster import AgglomerativeClustering
AgglomerativeClustering(n_clusters=3).fit_predict(X)
```

## So sánh nhanh

| | K-Means | DBSCAN | Phân cấp |
|---|---|---|---|
| Cần $K$ | **Có** | Không | Có (hoặc cắt dendrogram) |
| Hình dạng cụm | Cầu | **Bất kỳ** | Phụ thuộc liên kết |
| Ngoại lệ | Nhạy | **Phát hiện được** | Nhạy |
| Tốc độ | **Rất nhanh** | Vừa | Chậm ($O(n^2)$) |

## Đánh giá khi không có nhãn

Phân cụm khó đánh giá khách quan. Kết hợp: **silhouette**, **trực quan hoá** (PCA/t-SNE xuống 2D), và quan trọng nhất là **diễn giải được** về mặt nghiệp vụ ("nhóm A là khách mua nhiều, ít thường xuyên").
