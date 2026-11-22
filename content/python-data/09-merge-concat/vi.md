# Ghép bảng: merge và concat

Dữ liệu thật thường nằm **rải rác trong nhiều bảng** (khách hàng, đơn hàng, sản phẩm). Để phân tích, bạn phải **ghép** chúng lại. Trong SQL đó là `JOIN`; trong pandas là `merge`.

## merge: nối theo khoá

```python
customers = pd.DataFrame({"id": [1, 2, 3, 4], "name": ["An", "Binh", "Chi", "Dung"]})
orders = pd.DataFrame({
    "order_id": [101, 102, 103, 104, 105],
    "customer_id": [1, 1, 2, 3, 9],
    "amount": [50, 70, 20, 90, 10],
})

customers.merge(orders, left_on="id", right_on="customer_id", how="inner")
```

- `left_on` / `right_on`: cột khoá của bảng **trái** / **phải**.
- Nếu hai bảng **cùng tên cột khoá**, chỉ cần `on="id"`.
- `how=`: kiểu ghép (xem bên dưới).

![merge: ghép hai bảng theo khoá chung](/lessons/python-data/09-merge-concat-fig-vi.svg)
*merge: ghép hai bảng theo khoá chung*

## Các kiểu ghép (how)

Với bảng trái `customers` (id 1-4) và bảng phải `orders` (khách 1, 1, 2, 3, 9):

| `how` | Giữ lại | Kết quả ví dụ |
|---|---|---|
| `"inner"` | Chỉ cặp **khớp cả hai bên** | 4 dòng (An×2, Binh, Chi) |
| `"left"` | **Mọi dòng bảng trái** + phần khớp | 5 dòng (thêm Dung với NaN) |
| `"right"` | Mọi dòng bảng phải | 5 dòng (đơn của khách 9 có tên NaN) |
| `"outer"` | Mọi dòng cả hai bên | 6 dòng |

Khách 1 có **2 đơn** nên xuất hiện **2 lần**: quan hệ **một-nhiều**. Kiểm tra số dòng sau khi ghép để chắc không bị "nở" bất ngờ.

```python
merged = customers.merge(orders, left_on="id", right_on="customer_id", how="inner")
left = customers.merge(orders, left_on="id", right_on="customer_id", how="left")
left["amount"].isna().sum()        # số khách chưa có đơn
```

## Tìm dòng KHÔNG khớp: indicator

```python
chk = customers.merge(orders, left_on="id", right_on="customer_id", how="outer", indicator=True)
chk["_merge"].value_counts()           # both / left_only / right_only
chk[chk["_merge"] == "right_only"]     # đơn không có khách tương ứng: dữ liệu lỗi!
```

`indicator=True` thêm cột `_merge` cho biết dòng đến từ bên nào. Rất hữu ích để **phát hiện dữ liệu bẩn**.

## Khoá có tên khác nhau và cột trùng tên

```python
a.merge(b, on="id", suffixes=("_trai", "_phai"))     # đặt hậu tố khi hai bảng cùng tên cột khác
```

## Ghép theo chỉ mục: join

```python
customers.set_index("id").join(orders.set_index("customer_id"), how="left")
```

## concat: xếp chồng bảng

```python
pd.concat([df1, df2])                       # nối dọc (thêm dòng), cùng cột
pd.concat([df1, df2], ignore_index=True)    # đánh số lại chỉ mục
pd.concat([df1, df2], axis=1)               # nối ngang (thêm cột) theo chỉ mục
```

Hay dùng khi gộp nhiều file CSV cùng cấu trúc (ví dụ mỗi tháng một file):

```python
frames = [pd.read_csv(f) for f in ["jan.csv", "feb.csv", "mar.csv"]]
all_data = pd.concat(frames, ignore_index=True)
```

## So sánh với SQL

| SQL | pandas |
|---|---|
| `INNER JOIN` | `merge(how="inner")` |
| `LEFT JOIN` | `merge(how="left")` |
| `UNION ALL` | `pd.concat([a, b])` |
| Anti-join (`LEFT JOIN ... IS NULL`) | `merge(indicator=True)` rồi lọc `left_only` |

## Lỗi thường gặp

- **Kiểu khoá khác nhau** (số ở bảng này, chữ ở bảng kia) nên không khớp dòng nào: kiểm tra `dtypes`.
- **Khoá trùng ở cả hai bảng** gây "nổ" số dòng (tích Descartes từng nhóm).
- Quên kiểm tra số dòng và số NaN sau khi ghép.
