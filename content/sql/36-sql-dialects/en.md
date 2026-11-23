# SQL dialects: carrying your skills between systems

SQL has the ISO/IEC 9075 standard, but each system adds its own **dialect**. The core (SELECT, JOIN, GROUP BY, window functions, CTEs) works everywhere; the differences lie in the **details**.

## A table of common differences

| Task | SQLite | PostgreSQL | MySQL | BigQuery |
|---|---|---|---|---|
| String concat | `a \|\| b` | `a \|\| b` | `CONCAT(a, b)` | `a \|\| b` |
| Limit rows | `LIMIT n OFFSET m` | same | same | same |
| Truncate to month | `strftime('%Y-%m', d)` | `DATE_TRUNC('month', d)` | `DATE_FORMAT(d,'%Y-%m')` | `DATE_TRUNC(d, MONTH)` |
| Add days | `date(d,'+7 days')` | `d + INTERVAL '7 days'` | `DATE_ADD(d, INTERVAL 7 DAY)` | `DATE_ADD(d, INTERVAL 7 DAY)` |
| Percentiles | build your own | `PERCENTILE_CONT` | build your own (window ≥ 8.0) | `APPROX_QUANTILES` |
| Case-insensitive match | `LIKE` | `ILIKE` | `LIKE` (collation-dependent) | `LOWER(...)` |
| Integer division | `7/2 = 3` | `7/2 = 3` | `7/2 = 3.5` | `7/2 = 3.5` |

(Check the documentation of your version; this table changes over time.)

![Comparing SQLite, PostgreSQL, MySQL and BigQuery syntax](/lessons/sql/36-sql-dialects-fig-en.svg)
*Comparing SQLite, PostgreSQL, MySQL and BigQuery syntax*

## Career strategy

1. Master **standard SQL** and set thinking: it works everywhere.
2. When switching systems, consult the **dialect cheat sheet** for: dates, strings, data types, `NULL`s, temp tables.
3. Write **readable** queries (CTEs, clear aliases): easier to port.
4. Use tools like **dbt** or **SQLGlot** to translate between dialects.

## SQL by purpose

- **OLTP** (transactions): PostgreSQL, MySQL, SQL Server, Oracle.
- **OLAP/warehouses** (analytics): BigQuery, Snowflake, Redshift, ClickHouse; tuned for large columnar scans, not indexed like OLTP.

## References

- ISO/IEC 9075 (SQL). Official docs of SQLite, PostgreSQL, MySQL, BigQuery.
- Winand, M. "Modern SQL" (modern-sql.com): feature-support tables by system.
- SQLGlot, github.com/tobymao/sqlglot.

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
