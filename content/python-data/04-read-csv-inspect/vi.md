# Đọc CSV và khám phá dữ liệu

Trong thực tế bạn hiếm khi gõ dữ liệu bằng tay: dữ liệu đến từ file **CSV**, Excel, cơ sở dữ liệu hoặc API. Việc đầu tiên luôn là **đọc vào và nhìn xem có gì**.

> Trong khoá này, file `sales.csv` đã được nạp sẵn vào khung thực hành (60 đơn hàng, 7 cột). Bạn đọc nó bằng đường dẫn `"sales.csv"`.

## Đọc CSV

```python
import pandas as pd

df = pd.read_csv("sales.csv")
```

Các tuỳ chọn hay dùng của `read_csv`:

| Tham số | Tác dụng |
|---|---|
| `sep=";"` | Dấu phân cách khác dấu phẩy |
| `parse_dates=["date"]` | Chuyển cột sang kiểu ngày giờ |
| `usecols=["a", "b"]` | Chỉ đọc vài cột |
| `dtype={"id": str}` | Ép kiểu cột khi đọc |
| `na_values=["N/A", "-"]` | Coi các chuỗi này là thiếu dữ liệu |
| `nrows=100` | Chỉ đọc 100 dòng đầu (thử file lớn) |
| `encoding="utf-8"` | Bảng mã (tiếng Việt cần `utf-8`) |

Tương tự có `pd.read_excel`, `pd.read_json`, `pd.read_sql`.

## Quy trình "khám phá" chuẩn: luôn làm đủ 5 bước

```python
df.shape            # 1. bao nhiêu dòng, cột?       (60, 7)
df.head()           # 2. nhìn vài dòng đầu
df.info()           # 3. kiểu dữ liệu + số giá trị không rỗng mỗi cột
df.describe()       # 4. thống kê các cột số: min, max, trung bình...
df.isna().sum()     # 5. mỗi cột thiếu bao nhiêu?
```

`df.info()` cho biết ngay cột nào **sai kiểu** (ví dụ ngày đang là chữ `object`) hoặc **có giá trị thiếu**.

## Khám phá cột phân loại

```python
df["region"].unique()            # các giá trị khác nhau
df["region"].nunique()           # có bao nhiêu giá trị khác nhau
df["region"].value_counts()      # mỗi giá trị xuất hiện bao nhiêu lần (sắp giảm dần)
df["region"].value_counts(normalize=True)   # tỉ lệ thay vì số lượng
df["region"].value_counts().idxmax()        # giá trị phổ biến nhất
```

## Khám phá cột số

```python
df["units"].describe()           # count, mean, std, min, 25%, 50%, 75%, max
df["units"].min(), df["units"].max()
df["unit_price"].sum()
```

## Mô tả bộ dữ liệu của bài

| Cột | Ý nghĩa |
|---|---|
| `order_id` | Mã đơn |
| `date` | Ngày đặt (từ 01/2024 đến 06/2024) |
| `region` | Vùng: North, South, East, West |
| `product`, `category` | Sản phẩm và nhóm |
| `units` | Số lượng |
| `unit_price` | Đơn giá |

## Thói quen tốt của người phân tích

1. **Đừng tin dữ liệu**: luôn kiểm tra `shape`, kiểu, giá trị thiếu, giá trị lạ.
2. **Ghi lại giả định**: "doanh thu = số lượng × đơn giá".
3. Với file lớn, thử trên một phần nhỏ trước (`nrows=1000`).

Bài sau: chọn, lọc và sắp xếp dữ liệu.
