# Nhóm và tổng hợp với groupby

`groupby` là **công cụ phân tích số 1** của pandas: nó trả lời mọi câu hỏi dạng "**theo từng ... thì ... là bao nhiêu?**". Nếu bạn đã học SQL, đây chính là `GROUP BY`.

## Tư duy "Tách - Áp dụng - Gộp" (split-apply-combine)

```text
     df                   tách theo region           áp dụng sum              gộp lại
┌────────┬─────┐       ┌────────┬─────┐
│ North  │ 100 │       │ North  │ 100 │ ┐
│ South  │  50 │  ───▶ │ North  │ 200 │ ┴─▶ North: 300     ┌────────┬─────┐
│ North  │ 200 │       ├────────┼─────┤                    │ North  │ 300 │
│ South  │  30 │       │ South  │  50 │ ┐                  │ South  │  80 │
└────────┴─────┘       │ South  │  30 │ ┴─▶ South:  80     └────────┴─────┘
                       └────────┴─────┘
```

![groupby: tách – áp dụng – gộp](/lessons/python-data/08-groupby-aggregate-fig-vi.svg)
*groupby: tách – áp dụng – gộp*

## Cú pháp cơ bản

```python
df.groupby("region")["revenue"].sum()
```

Ba phần: **nhóm theo cột nào** → **cột nào để tính** → **tính gì**.

```python
df.groupby("region")["revenue"].sum()         # tổng
df.groupby("region")["revenue"].mean()        # trung bình
df.groupby("region")["revenue"].count()       # số dòng không rỗng
df.groupby("region").size()                   # số dòng mỗi nhóm
df.groupby("region")["units"].max()
```

Kết quả là một **Series** với chỉ mục là tên nhóm. Chuyển thành bảng thường bằng `.reset_index()` hoặc `as_index=False`.

## Nhiều thống kê: agg

```python
df.groupby("region")["revenue"].agg(["sum", "mean", "count"])
```

### Tên cột kết quả tự đặt (named aggregation): nên dùng

```python
summary = df.groupby("category").agg(
    orders=("order_id", "count"),
    total_units=("units", "sum"),
    avg_price=("unit_price", "mean"),
)
```

Cú pháp `tên_mới=("cột_gốc", "hàm")`: kết quả sạch, dễ đọc.

## Nhóm theo nhiều cột

```python
df.groupby(["region", "category"])["revenue"].sum()
df.groupby(["region", "category"], as_index=False)["revenue"].sum()
```

Kết quả có **chỉ mục nhiều cấp** (MultiIndex); `unstack()` đưa cấp trong thành cột (xem bài Pivot).

## Sắp xếp và lấy top

```python
(df.groupby("product")["revenue"].sum()
   .sort_values(ascending=False)
   .head(3))
```

## Phân bổ tỉ lệ

```python
rev = df.groupby("region")["revenue"].sum()
share = (rev / rev.sum() * 100).round(1)       # % đóng góp của từng vùng
```

## transform: giữ nguyên số dòng

`agg` thu gọn mỗi nhóm thành **một dòng**. `transform` tính theo nhóm nhưng trả về **cùng số dòng** như bảng gốc, tương đương window function trong SQL:

```python
df["region_total"] = df.groupby("region")["revenue"].transform("sum")
df["pct_of_region"] = df["revenue"] / df["region_total"] * 100
```

## So sánh với SQL

| SQL | pandas |
|---|---|
| `SELECT region, SUM(revenue) FROM t GROUP BY region` | `df.groupby("region")["revenue"].sum()` |
| `HAVING SUM(revenue) > 1000` | Lọc kết quả: `s[s > 1000]` |
| `ORDER BY ... DESC LIMIT 3` | `.sort_values(ascending=False).head(3)` |
| `SUM(x) OVER (PARTITION BY r)` | `groupby("r")["x"].transform("sum")` |

## Lỗi thường gặp

- Quên `["cột"]` nên tính trên **mọi cột** (kể cả cột chữ) và ra bảng rối.
- Quên `.reset_index()` rồi thắc mắc cột nhóm "biến mất" khỏi cột thường.
- Tính trung bình **của trung bình** (sai khi các nhóm có kích thước khác nhau): hãy tính trên dữ liệu gốc.
