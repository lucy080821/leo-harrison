# GroupBy nâng cao: transform, filter, xếp hạng và nhiều thống kê

`groupby(...).sum()` thu gọn mỗi nhóm thành một dòng. Công việc thực tế cần **nhiều hơn**: giữ nguyên dòng nhưng thêm tổng nhóm, lọc theo nhóm, xếp hạng trong nhóm.

## Bốn thao tác theo nhóm

| Thao tác | Kết quả | Ví dụ |
|---|---|---|
| `agg` | **một dòng mỗi nhóm** | `g.agg(orders=("id","count"), revenue=("rev","sum"))` |
| `transform` | **cùng số dòng** như gốc | `g["rev"].transform("sum")` (tổng nhóm gắn vào từng dòng) |
| `filter` | giữ **cả nhóm** thoả điều kiện | `g.filter(lambda x: len(x) >= 15)` |
| `apply` | linh hoạt nhất (chậm nhất) | hàm tuỳ ý trên từng nhóm |

![transform thêm cột tổng hợp mà giữ nguyên số dòng](/lessons/python-data/19-advanced-groupby-fig-vi.svg)
*transform thêm cột tổng hợp mà giữ nguyên số dòng*

## `transform`: tỷ trọng trong nhóm

```python
df["share"] = df["rev"] / df.groupby("region")["rev"].transform("sum")
```

Đây là cách pandas tương đương `SUM() OVER (PARTITION BY region)` của SQL.

## Xếp hạng và top-N mỗi nhóm

`g["rev"].rank(ascending=False, method="first")` rồi lọc `rank <= 2`. Cách khác: `df.sort_values("rev", ascending=False).groupby("region").head(2)`.

## Nhiều thống kê cùng lúc

`named aggregation`: `agg(avg=("rev","mean"), p90=("rev", lambda s: s.quantile(.9)))`. Có thể nhóm theo **nhiều khoá** (`["region","category"]`), kết quả có chỉ mục nhiều cấp; `reset_index()` để về bảng phẳng.

## Lưu ý

- `observed=True` khi nhóm theo cột `category` để không ra tổ hợp rỗng.
- `dropna=False` nếu muốn giữ nhóm `NaN`.
- Hãy kiểm tra **tổng các nhóm bằng tổng toàn bảng** để chắc không mất dòng.

## Nguồn tham khảo

- pandas documentation, "Group by: split-apply-combine".
- Wickham, H. (2011). The split-apply-combine strategy for data analysis. *Journal of Statistical Software* 40(1).
- McKinney, W. *Python for Data Analysis*, chương 10.
