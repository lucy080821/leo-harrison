# Biến đổi cột: ngày tháng, apply, cut

Sau khi làm sạch, bước tiếp theo là **tạo ra thông tin mới** từ các cột có sẵn (feature engineering ở mức cơ bản).

## Ngày giờ với `to_datetime` và `.dt`

Ngày đọc từ CSV thường là **chữ**. Chuyển sang kiểu ngày giờ để tính toán:

```python
df["date"] = pd.to_datetime(df["date"])
```

Khi cột là kiểu ngày giờ, phần mở rộng `.dt` cho mọi thành phần:

```python
df["date"].dt.year
df["date"].dt.month             # 1..12
df["date"].dt.day
df["date"].dt.day_name()        # 'Monday'
df["date"].dt.dayofweek         # 0 = Thứ Hai
df["date"].dt.to_period("M")    # theo tháng: 2024-03
```

Tính chênh lệch:

```python
df["date"].max() - df["date"].min()          # Timedelta
(df["date"] - pd.Timestamp("2024-01-01")).dt.days
```

Có thể đọc thẳng khi nạp: `pd.read_csv("sales.csv", parse_dates=["date"])`.

![pd.cut chia tuổi thành các nhóm](/lessons/python-data/07-transform-columns-fig-vi.svg)
*pd.cut chia tuổi thành các nhóm*

## Phép tính vector hoá giữa các cột

```python
df["revenue"] = df["units"] * df["unit_price"]
df["revenue_k"] = (df["revenue"] / 1000).round(1)
```

Đây là cách **nhanh nhất**: luôn ưu tiên hơn vòng lặp hay `apply`.

## map: đổi giá trị theo bảng tra

```python
codes = {"North": "N", "South": "S", "East": "E", "West": "W"}
df["region_code"] = df["region"].map(codes)       # giá trị không có trong bảng -> NaN
```

## apply: áp một hàm lên từng giá trị / dòng

```python
df["product_len"] = df["product"].apply(len)
df["label"] = df["units"].apply(lambda u: "nhiều" if u > 5 else "ít")

# theo từng DÒNG (axis=1): dùng khi cần nhiều cột cùng lúc
df["desc"] = df.apply(lambda r: f"{r['product']} x{r['units']}", axis=1)
```

> `apply` chậm hơn phép toán vector hoá nhiều lần. Dùng khi **không** có cách vector hoá.

## Chia khoảng: pd.cut và pd.qcut

```python
df["size"] = pd.cut(
    df["revenue"],
    bins=[0, 200, 1000, np.inf],
    labels=["small", "medium", "large"],
    right=False,            # khoảng dạng [0, 200) chứ không phải (0, 200]
)

pd.qcut(df["revenue"], q=4, labels=["Q1", "Q2", "Q3", "Q4"])   # chia theo PHÂN VỊ: mỗi nhóm cùng số dòng
```

- `cut`: biên do **bạn chọn**.
- `qcut`: biên do **dữ liệu quyết định** (mỗi nhóm số lượng gần bằng nhau).

## np.select: nhiều điều kiện

```python
conditions = [df["revenue"] < 200, df["revenue"] < 1000]
choices = ["small", "medium"]
df["size"] = np.select(conditions, choices, default="large")
```

Điều kiện được xét **từ trên xuống**, khớp đầu tiên thắng (giống `CASE WHEN` trong SQL).

## One-hot encoding (chuẩn bị cho Machine Learning)

```python
pd.get_dummies(df["region"], prefix="region")     # mỗi vùng thành một cột 0/1
```

## Tổng kết

| Việc | Công cụ |
|---|---|
| Tính từ các cột | Phép toán vector hoá |
| Đổi giá trị theo bảng | `map`, `replace` |
| Logic phức tạp | `np.select`, `apply` |
| Nhóm số thành khoảng | `pd.cut`, `pd.qcut` |
| Ngày giờ | `to_datetime`, `.dt` |
