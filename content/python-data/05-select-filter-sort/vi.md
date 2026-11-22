# Chọn, lọc và sắp xếp dữ liệu

Đây là nhóm thao tác bạn dùng nhiều nhất: **lấy đúng phần dữ liệu cần** từ một bảng lớn.

> Dữ liệu: `sales.csv` với cột phụ `revenue = units * unit_price` (doanh thu mỗi đơn).

## Chọn cột

```python
df["product"]                      # một cột -> Series
df[["product", "units"]]           # nhiều cột -> DataFrame
```

![Lọc hàng bằng mặt nạ boolean](/lessons/python-data/05-select-filter-sort-fig-vi.svg)
*Lọc hàng bằng mặt nạ boolean*

## Chọn dòng: loc và iloc

| | Dựa trên | Ví dụ |
|---|---|---|
| `df.loc[...]` | **Nhãn** (index, tên cột) | `df.loc[0, "product"]` |
| `df.iloc[...]` | **Vị trí** (số thứ tự) | `df.iloc[0, 3]` |

```python
df.loc[0, "product"]               # dòng có nhãn 0, cột "product"
df.loc[0:2, ["product", "units"]]  # loc: cắt lát GỒM cả đầu cuối (0, 1, 2)
df.iloc[0:3, 0:3]                  # iloc: cắt lát như list, KHÔNG gồm 3
df.iloc[-1]                        # dòng cuối
```

## Lọc theo điều kiện (boolean filtering)

Điều kiện trả về một Series đúng/sai; đưa nó vào `df[...]` để giữ lại dòng `True`:

```python
big = df[df["units"] > 5]
north = df[df["region"] == "North"]
```

### Kết hợp điều kiện: & | ~ và NGOẶC

```python
df[(df["region"] == "North") & (df["units"] > 3)]          # VÀ
df[(df["region"] == "North") | (df["region"] == "South")]  # HOẶC
df[~(df["region"] == "North")]                             # PHỦ ĐỊNH
```

> Dùng `&`, `|`, `~` (**không** dùng `and`, `or`, `not`) và **bao từng điều kiện bằng ngoặc**, nếu không sẽ lỗi.

### Tiện lợi: isin, between, str.contains

```python
df[df["region"].isin(["North", "East"])]
df[df["units"].between(3, 6)]                    # gồm cả hai đầu
df[df["product"].str.contains("top")]            # chuỗi con
```

### query: viết điều kiện như một câu

```python
df.query("region == 'North' and units > 3")
min_units = 5
df.query("units > @min_units")                   # @ dùng biến Python bên ngoài
```

## Sắp xếp

```python
df.sort_values("revenue", ascending=False)           # giảm dần
df.sort_values(["region", "revenue"], ascending=[True, False])   # nhiều cột
df.nlargest(3, "revenue")                            # 3 dòng lớn nhất (nhanh, gọn)
df.nsmallest(3, "revenue")
```

## Đếm và kiểm tra

```python
len(df[df["units"] > 5])         # số dòng thoả điều kiện
(df["units"] > 5).sum()          # cách khác: tổng các True
(df["units"] > 5).mean()         # TỈ LỆ dòng thoả điều kiện
```

## Lấy giá trị ra ngoài

```python
df["order_id"].tolist()          # Series -> list
df["order_id"].iloc[0]           # một giá trị
df.loc[df["revenue"].idxmax()]   # cả dòng có doanh thu lớn nhất
```

## Cảnh báo: SettingWithCopy

Lọc rồi sửa trên kết quả lọc có thể gây cảnh báo; hãy dùng `.copy()` hoặc `df.loc[điều_kiện, "cột"] = giá_trị`:

```python
df.loc[df["units"] > 5, "bulk"] = True
```
