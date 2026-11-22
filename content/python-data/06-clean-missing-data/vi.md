# Làm sạch dữ liệu

Dữ liệu thật **luôn bẩn**: ô trống, dòng trùng, chữ viết không thống nhất, sai kiểu. Các nhà phân tích thường dành **60-80% thời gian** để làm sạch. Phân tích trên dữ liệu bẩn cho kết luận **sai** một cách rất thuyết phục.

> Bài này dùng `sales_dirty.csv`: bản `sales.csv` bị cố ý làm hỏng (thiếu `units`, thiếu `category`, `region` viết lộn xộn, 3 dòng trùng).

## Bước 1: phát hiện vấn đề

```python
df = pd.read_csv("sales_dirty.csv")
df.shape                       # (63, 7)
df.isna().sum()                # số ô THIẾU mỗi cột
df.duplicated().sum()          # số dòng TRÙNG hoàn toàn dòng trước
df["region"].unique()          # thấy ngay 'south', ' East '... lộn xộn
df.describe()                  # giá trị lạ, ngoại lệ?
```

![Dữ liệu thiếu (NaN): xoá dòng hay điền giá trị](/lessons/python-data/06-clean-missing-data-fig-vi.svg)
*Dữ liệu thiếu (NaN): xoá dòng hay điền giá trị*

## Dữ liệu thiếu (NaN)

pandas dùng `NaN` cho ô trống.

```python
df.isna()                      # bảng True/False
df["units"].isna().sum()       # 5
df[df["units"].isna()]         # xem các dòng bị thiếu
```

Ba cách xử lý, tuỳ trường hợp:

| Cách | Khi nào | Ví dụ |
|---|---|---|
| **Bỏ dòng** | Ít dòng thiếu, hoặc cột đó thiết yếu | `df.dropna(subset=["category"])` |
| **Điền giá trị** | Có giá trị thay thế hợp lý | `df["units"].fillna(df["units"].median())` |
| **Giữ nguyên NaN** | Thiếu cũng là thông tin | để pandas bỏ qua khi tính trung bình |

Chọn giá trị điền: **trung vị** (median) bền với ngoại lệ hơn **trung bình** (mean); với cột phân loại dùng **giá trị phổ biến nhất** (`mode()[0]`) hoặc `"Unknown"`.

```python
df["units"] = df["units"].fillna(df["units"].median())
df["category"] = df["category"].fillna("Unknown")
```

> Không có cách "đúng" tuyệt đối: hãy **ghi lại** bạn đã xử lý thế nào và vì sao.

## Dòng trùng

```python
df.duplicated().sum()                         # đếm
df = df.drop_duplicates()                     # bỏ, giữ lần xuất hiện đầu
df = df.drop_duplicates(subset=["order_id"])  # trùng theo một cột khoá
```

## Chuẩn hoá chuỗi

```python
df["region"] = df["region"].str.strip()       # bỏ khoảng trắng hai đầu
df["region"] = df["region"].str.title()       # 'south' -> 'South'
df["region"] = df["region"].str.lower()
df["region"] = df["region"].replace({"N": "North", "S": "South"})
```

`str.` mở ra các phương thức chuỗi áp lên **cả cột**: `str.contains`, `str.replace`, `str.split`, `str.len`...

## Sửa kiểu dữ liệu

```python
df["units"] = df["units"].astype(int)                 # lỗi nếu còn NaN!
df["date"] = pd.to_datetime(df["date"])               # chuỗi -> ngày
df["price"] = pd.to_numeric(df["price"], errors="coerce")   # chữ không đổi được -> NaN
```

## Ngoại lệ (outlier)

```python
q1, q3 = df["units"].quantile([0.25, 0.75])
iqr = q3 - q1
mask = df["units"].between(q1 - 1.5 * iqr, q3 + 1.5 * iqr)
df = df[mask]
```

(Bài Thống kê sẽ nói kỹ hơn.)

## Đường ống làm sạch (pipeline)

```python
clean = (
    df.drop_duplicates()
      .assign(region=lambda d: d["region"].str.strip().str.title())
      .dropna(subset=["category"])
)
```

Nối các bước bằng dấu chấm, mỗi bước một dòng: **dễ đọc và dễ kiểm tra**.

## Kiểm tra sau khi làm sạch

```python
clean.isna().sum().sum()           # 0 ?
clean.duplicated().sum()           # 0 ?
clean["region"].unique()           # chỉ 4 vùng chuẩn ?
```
