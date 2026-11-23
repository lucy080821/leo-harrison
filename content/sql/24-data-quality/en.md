# Checking data quality with SQL

The old saying in the trade: *garbage in, garbage out*. Every analysis must start by **checking the data**, and SQL is excellent at it.

## Six checks to run before any report

1. **Row count and time span**: `COUNT(*)`, `MIN/MAX(date)`: enough data? any future dates?
2. **NULLs**: `SUM(CASE WHEN col IS NULL THEN 1 ELSE 0 END)`: which columns are missing how much?
3. **Duplicates**: `GROUP BY key HAVING COUNT(*) > 1`: is the "unique" key really unique?
4. **Orphan records** (unmatched foreign keys): `LEFT JOIN … WHERE b.id IS NULL`.
5. **Out-of-range / absurd values**: negatives, age 300, a purchase before signup.
6. **Consistency across sources**: two tables that should agree: do the totals match (compare purchases with purchase events)?

![Data-quality checks: duplicates, gaps, out-of-range values](/lessons/sql/24-data-quality-fig-en.svg)
*Data-quality checks: duplicates, gaps, out-of-range values*

## NULL tools

- `COALESCE(a, b, 0)`: the first non-NULL value (fill a default).
- `NULLIF(a, b)`: returns `NULL` if a = b. Safe division trick: `x / NULLIF(y, 0)`.
- Remember: `NULL = NULL` is not TRUE; use `IS NULL`.

## Professional practice

- Write the checks as **error-counting queries** (expected result 0) and rerun them every time new data loads.
- **Never silently delete** bad data: record how many and why, and tell the data owner.
- Database constraints (`NOT NULL`, `UNIQUE`, `CHECK`, foreign keys) prevent errors at the source (the table-design lesson).

## References

- Redman, T. *Data Driven: Profiting from Your Most Important Business Asset*.
- DAMA International. *DAMA-DMBOK: Data Management Body of Knowledge* (data-quality dimensions).
- SQLite documentation, "Core Functions: coalesce, nullif", sqlite.org.

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
