# Descriptive statistics in SQL: median, percentiles, standard deviation

Standard SQL has `AVG`, `MIN`, `MAX`, `SUM`, `COUNT`, but the **median** and **percentiles** often have no built-in function (PostgreSQL has `PERCENTILE_CONT`; BigQuery has `APPROX_QUANTILES`; SQLite does not). We build them with window functions.

## The median

The **median** resists outliers better than the mean (see lesson 1 of the statistics course). For n sorted rows:

- n odd: row `(n + 1)/2`.
- n even: the mean of rows `n/2` and `n/2 + 1`.

Combine both: take the `AVG` of rows with `rn IN ((cnt+1)/2, (cnt+2)/2)` (SQLite's integer division).

## Any percentile

Use `ROW_NUMBER` and `COUNT() OVER ()`: the 90th percentile is about row `CEIL(0.9 × n)`. `NTILE(100)` or `PERCENT_RANK()` also give relative position.

![Median, percentiles and descriptive statistics in SQL](/lessons/sql/30-sql-statistics-fig-en.svg)
*Median, percentiles and descriptive statistics in SQL*

## Variance, standard deviation, correlation

```sql
-- sample variance = (Σx² − (Σx)²/n) / (n − 1)
(SUM(x*x) - SUM(x)*SUM(x)/COUNT(*)) / (COUNT(*) - 1)
```

Beware **integers**: multiply by `1.0 *` to compute in floating point and avoid overflow/truncation. Pearson correlation can also be computed from `SUM(x)`, `SUM(y)`, `SUM(x*y)`, `SUM(x*x)`, `SUM(y*y)` (PostgreSQL has `CORR`).

## SQL or pull into Python?

- **SQL**: aggregation over millions of rows where the data lives (don't pull the whole table).
- **Python/R**: deeper analysis, charts, tests. Pull the **aggregated table**.
- Comparing **mean vs median** is a quick test of how skewed a revenue distribution is.

## References

- PostgreSQL documentation, "Aggregate Functions" (ordered-set: percentile_cont).
- Google BigQuery documentation, "Approximate aggregate functions".
- The "Math and Statistics" course: the lesson on describing data.

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
