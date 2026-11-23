# Advanced groupby: transform, filter, ranking and many statistics

`groupby(...).sum()` collapses each group to one row. Real work needs **more**: keep the rows but add the group total, filter by group, rank within a group.

## Four group operations

| Operation | Result | Example |
|---|---|---|
| `agg` | **one row per group** | `g.agg(orders=("id","count"), revenue=("rev","sum"))` |
| `transform` | **same number of rows** as the original | `g["rev"].transform("sum")` (the group total attached to each row) |
| `filter` | keep **whole groups** meeting a condition | `g.filter(lambda x: len(x) >= 15)` |
| `apply` | most flexible (slowest) | any function per group |

![transform adds an aggregate column while keeping every row](/lessons/python-data/19-advanced-groupby-fig-en.svg)
*transform adds an aggregate column while keeping every row*

## `transform`: share within a group

```python
df["share"] = df["rev"] / df.groupby("region")["rev"].transform("sum")
```

This is pandas' equivalent of SQL's `SUM() OVER (PARTITION BY region)`.

## Ranking and top-N per group

`g["rev"].rank(ascending=False, method="first")` then filter `rank <= 2`. Another way: `df.sort_values("rev", ascending=False).groupby("region").head(2)`.

## Many statistics at once

`named aggregation`: `agg(avg=("rev","mean"), p90=("rev", lambda s: s.quantile(.9)))`. You can group by **several keys** (`["region","category"]`); the result has a multi-level index; `reset_index()` flattens it.

## Notes

- `observed=True` when grouping by a `category` column to avoid empty combinations.
- `dropna=False` to keep `NaN` groups.
- Check that **group totals equal the table total** to be sure no rows are lost.

## References

- pandas documentation, "Group by: split-apply-combine".
- Wickham, H. (2011). The split-apply-combine strategy for data analysis. *Journal of Statistical Software* 40(1).
- McKinney, W. *Python for Data Analysis*, chapter 10.
