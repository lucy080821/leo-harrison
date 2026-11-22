# pandas (1): Series và DataFrame

**pandas** là thư viện số một để **phân tích dữ liệu dạng bảng** bằng Python, giống Excel hoặc bảng SQL nhưng lập trình được. Nó xây trên NumPy.

> Bạn sẽ dùng pandas hằng ngày nếu làm Data Analyst. Khoá này đi từ gốc đến một báo cáo hoàn chỉnh.

## Hai cấu trúc cốt lõi

| | Là gì | Giống |
|---|---|---|
| **Series** | Một **cột** dữ liệu có nhãn (chỉ mục) | Một cột Excel |
| **DataFrame** | Một **bảng** gồm nhiều Series chung chỉ mục | Một sheet Excel / bảng SQL |

![DataFrame: chỉ mục, cột và giá trị](/lessons/python-data/03-pandas-series-dataframe-fig-vi.svg)
*DataFrame: chỉ mục, cột và giá trị*

## Series

```python
import pandas as pd

s = pd.Series([10, 20, 30], index=["a", "b", "c"])
s["b"]            # 20
s * 2             # nhân cả cột (vector hoá như NumPy)
s.mean()
```

## DataFrame

Cách phổ biến nhất để tạo: từ **từ điển** (khoá = tên cột, giá trị = danh sách cột đó).

```python
df = pd.DataFrame({
    "name": ["An", "Binh", "Chi"],
    "age": [20, 30, 40],
    "city": ["Hanoi", "Hue", "Hanoi"],
})
```

```text
   name  age   city
0    An   20  Hanoi
1  Binh   30    Hue
2   Chi   40  Hanoi
```

Cột bên trái (0, 1, 2) là **chỉ mục (index)** của dòng.

## Xem nhanh một bảng

```python
df.shape           # (3, 3)         (số dòng, số cột)
df.columns         # tên các cột
df.dtypes          # kiểu dữ liệu từng cột
df.head(2)         # 2 dòng đầu (mặc định 5)
df.tail(2)         # 2 dòng cuối
df.info()          # tóm tắt cấu trúc và số giá trị không rỗng
df.describe()      # thống kê mô tả các cột số
```

## Lấy dữ liệu theo cột

```python
df["age"]               # MỘT cột -> Series
df[["name", "age"]]     # NHIỀU cột -> DataFrame (ngoặc kép bên trong ngoặc vuông)
df["age"].mean()        # 30.0
df["city"].unique()     # giá trị khác nhau
```

## Thêm và sửa cột

Phép toán giữa các cột áp dụng **từng dòng** (vector hoá):

```python
df["age_next_year"] = df["age"] + 1
df["total"] = df["price"] * df["qty"]
df["is_adult"] = df["age"] >= 18
df = df.rename(columns={"age": "tuoi"})
df = df.drop(columns=["city"])
```

## Thống kê nhanh theo cột

```python
df["age"].sum(), df["age"].mean(), df["age"].median()
df["age"].min(), df["age"].max(), df["age"].std()
df["city"].value_counts()      # đếm số dòng theo từng giá trị
```

## Từ list-of-dict

```python
rows = [{"name": "An", "age": 20}, {"name": "Binh", "age": 30}]
pd.DataFrame(rows)
```

## Lưu ý

- Hầu hết thao tác **trả về DataFrame mới** thay vì sửa tại chỗ. Muốn giữ kết quả, **gán lại**: `df = df.drop(...)`.
- Chỉ mục mặc định là 0, 1, 2... có thể đặt cột khác làm chỉ mục: `df.set_index("name")`.
- DataFrame có `.to_dict()`, `.to_csv()`, `.to_numpy()` để chuyển ra ngoài.
