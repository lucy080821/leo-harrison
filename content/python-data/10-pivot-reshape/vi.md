# Pivot, melt và crosstab

Hình dạng của bảng quyết định việc phân tích dễ hay khó. Bài này dạy cách **xoay** bảng giữa hai dạng:

| Dạng | Mô tả | Ví dụ |
|---|---|---|
| **Dài (long / tidy)** | Mỗi dòng là **một quan sát** | `name, subject, score` (mỗi điểm một dòng) |
| **Rộng (wide)** | Mỗi giá trị của biến nằm **một cột** | `name, math, physics` |

Dạng **dài** thuận tiện để `groupby` và vẽ biểu đồ; dạng **rộng** thuận tiện để **đọc** như bảng báo cáo.

## pivot_table: từ dài sang rộng (có tổng hợp)

Giống **PivotTable của Excel**:

```python
pivot = df.pivot_table(
    index="region",          # các DÒNG
    columns="category",      # các CỘT
    values="revenue",        # giá trị để tính
    aggfunc="sum",           # tính gì: sum, mean, count, max, "median"...
    fill_value=0,            # ô không có dữ liệu -> 0 thay vì NaN
)
```

```text
category   Accessories  Electronics  Furniture  Stationery
region
East               ...          ...        ...         ...
North              ...          ...        ...         ...
```

Thêm tổng hàng và cột: `margins=True`.

```python
df.pivot_table(index="region", columns="category", values="revenue",
               aggfunc="sum", margins=True, margins_name="Tổng")
```

Nhiều hàm cùng lúc: `aggfunc=["sum", "mean"]`. Nhiều cấp dòng: `index=["region", "product"]`.

## groupby + unstack: cách thứ hai

```python
df.groupby(["region", "category"])["revenue"].sum().unstack(fill_value=0)
```

Hai cách cho cùng kết quả; `pivot_table` ngắn gọn hơn khi cần tổng hợp.

## crosstab: bảng tần suất chéo

Đếm số dòng theo **hai cột phân loại**:

```python
pd.crosstab(df["region"], df["category"])
pd.crosstab(df["region"], df["category"], normalize="index")   # tỉ lệ theo từng dòng
```

## melt: từ rộng sang dài ("bỏ pivot")

```python
wide = pd.DataFrame({"name": ["An", "Binh"], "math": [8, 6], "physics": [9, 7]})

long = wide.melt(id_vars="name", var_name="subject", value_name="score")
```

```text
   name  subject  score
0    An     math      8
1  Binh     math      6
2    An  physics      9
3  Binh  physics      7
```

- `id_vars`: cột **giữ nguyên** làm định danh.
- Các cột còn lại bị "nấu chảy" thành hai cột: **tên cột cũ** (`var_name`) và **giá trị** (`value_name`).

Sau khi ở dạng dài, bạn dễ dàng nhóm và vẽ:

```python
long.groupby("subject")["score"].mean()
```

## Chuyển lại dạng rộng không tổng hợp: pivot

```python
long.pivot(index="name", columns="subject", values="score")
```

`pivot` **không tổng hợp**: mỗi cặp (dòng, cột) phải **duy nhất**, nếu không sẽ lỗi (khi đó dùng `pivot_table`).

## Khi nào dùng cái nào?

| Việc | Công cụ |
|---|---|
| Bảng báo cáo "vùng × nhóm" có tổng | `pivot_table` |
| Đếm kết hợp hai biến phân loại | `crosstab` |
| Chuẩn bị để vẽ hoặc groupby | `melt` |
| Đổi lại dạng rộng, không cộng dồn | `pivot` |
