# Window functions (3): running totals, moving averages, LAG/LEAD

A window function can consider **only part** of the window around the current row: the **frame**. That lets us compute running totals, moving averages and period comparisons in SQL.

## The window frame

```sql
SUM(revenue) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)
```

- `UNBOUNDED PRECEDING`: from the first row; `n PRECEDING`: n rows back; `CURRENT ROW`; `n FOLLOWING`; `UNBOUNDED FOLLOWING`.
- **Default** with `ORDER BY`: from the first row to the current row (and any rows **tied** with it, `RANGE` style). For exact per-row behaviour write `ROWS` explicitly.

## Three patterns to know

1. **Running total**: `SUM(x) OVER (ORDER BY day)`: revenue accumulated over the year.
2. **Moving average** (3 months): smooths random swings to reveal the trend.
3. **Versus the previous period**: `LAG(x)` fetches the previous row (`LEAD` the next). Growth `= (x − LAG(x)) / LAG(x)`. `LAG(x, 12)` compares with the same period last year (YoY).

![Window frames for running totals, moving averages and period-over-period](/lessons/sql/22-window-frames-fig-en.svg)
*Window frames for running totals, moving averages and period-over-period*

## Things to watch

- Division by a zero or `NULL` `LAG` (first row): filter or use `NULLIF`.
- Missing months make `LAG` compare the wrong period: build a calendar table (recursive CTE lesson) to cover every period.
- A moving average at the start of the series has fewer rows (fewer than 3): decide whether to drop or keep it.

## Professional uses

Cumulative revenue versus target, anomaly detection (against the moving average), MoM/YoY growth: the foundation of KPI dashboards.

## References

- SQLite documentation, "Window Functions: frame specifications", sqlite.org.
- ISO/IEC 9075-2: window frame clause (SQL:2003).
- Beaulieu, A. *Learning SQL* (3rd ed.), chapter 16.

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
