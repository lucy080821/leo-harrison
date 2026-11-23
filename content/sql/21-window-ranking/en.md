# Window functions (2): ranking, top-N per group, de-duplication and quantiles

Lesson 11 introduced window functions. These are the analyst's **daily patterns**.

## The ranking family

| Function | Behaviour on ties (salaries 2300, 2300, 2100) |
|---|---|
| `ROW_NUMBER()` | always distinct: 1, 2, 3 (ties are broken arbitrarily) |
| `RANK()` | ties share a rank, **with gaps**: 1, 1, 3 |
| `DENSE_RANK()` | ties share a rank, **no gaps**: 1, 1, 2 |
| `NTILE(n)` | split into n near-equal groups (quantiles, e.g. quartiles) |
| `PERCENT_RANK()` | relative position from 0 to 1 |

## The top-N per group pattern

`LIMIT` cannot work per group. The standard way: number rows in a subquery, then filter.

```sql
SELECT * FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rn
  FROM employees
) WHERE rn <= 2;
```

(The filter must be in the outer query because `WHERE` runs **before** window functions.)

![ROW_NUMBER takes the top N per group; NTILE splits into quantile groups](/lessons/sql/21-window-ranking-fig-en.svg)
*ROW_NUMBER takes the top N per group; NTILE splits into quantile groups*

## De-duplication

Keep the **latest single** record per customer: `ROW_NUMBER() OVER (PARTITION BY email ORDER BY updated_at DESC)` then keep `rn = 1`. A very common data-cleaning technique.

## Quantiles and segments

`NTILE(4)` splits customers by revenue into 4 groups for segmentation (the RFM lesson). If the row count does not divide evenly, the first groups get one extra row.

## References

- SQLite documentation, "Window Functions", sqlite.org.
- Beaulieu, A. *Learning SQL* (3rd ed.), chapter 16 (Analytic Functions).
- Winand, M. *SQL Performance Explained*: window-function sections.

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
