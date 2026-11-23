# Đặc trưng: mã hoá biến phân loại, chuẩn hoá và ColumnTransformer

*"Dữ liệu và đặc trưng quyết định giới hạn của học máy; mô hình chỉ cố tiến gần giới hạn đó."* Trên dữ liệu bảng, **feature engineering** thường đem lại nhiều hơn việc đổi thuật toán.

## Mã hoá biến phân loại

| Kiểu | Cách | Khi nào |
|---|---|---|
| **One-hot** | mỗi giá trị một cột 0/1 | danh mục **không có thứ tự** (vùng, màu) |
| **Ordinal** | số theo thứ tự (S<M<L) | danh mục **có thứ tự** |
| **Target/frequency encoding** | thay bằng thống kê | rất nhiều giá trị (mã bưu điện), cần cẩn thận rò rỉ |

Không đánh số 0,1,2 cho danh mục không thứ tự: mô hình tuyến tính sẽ hiểu "Bắc < Trung < Nam".

![ColumnTransformer xử lý từng nhóm cột một cách riêng](/lessons/machine-learning/14-feature-engineering-encoding-fig-vi.svg)
*ColumnTransformer xử lý từng nhóm cột một cách riêng*

## Chuẩn hoá số

`StandardScaler` (trừ trung bình, chia độ lệch chuẩn) cần cho **KNN, SVM, hồi quy có regularization, mạng nơ-ron, PCA**. Cây quyết định và rừng **không cần**.

## Đặc trưng rút từ ngày giờ

Tháng, thứ trong tuần, cuối tuần, quý, số ngày từ sự kiện trước. Chu kỳ (giờ 23 gần giờ 0) có thể mã hoá bằng `sin/cos`.

## `ColumnTransformer` + `Pipeline`

Mỗi nhóm cột một cách xử lý, gói chung với mô hình. Lợi ích lớn nhất: **fit chỉ trên tập huấn luyện** nên không rò rỉ, và khi triển khai chỉ cần một đối tượng. `handle_unknown="ignore"` để không lỗi khi gặp danh mục mới.

## Cạm bẫy

- **Rò rỉ**: fit scaler/encoder trên toàn bộ dữ liệu trước khi chia.
- Bẫy biến giả: one-hot đủ k cột gây đa cộng tuyến với hồi quy có hằng (`drop="first"` nếu cần).
- Quá nhiều cột one-hot với mẫu nhỏ gây quá khớp.

## Nguồn tham khảo

- scikit-learn User Guide, "Preprocessing data" và "ColumnTransformer".
- Kuhn & Johnson. *Feature Engineering and Selection* (CRC Press, 2019), miễn phí online.
