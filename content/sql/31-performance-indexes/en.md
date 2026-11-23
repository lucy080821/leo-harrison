# Query performance: indexes and execution plans

A correct but slow query is still a broken query when the table has tens of millions of rows. Performance is a core skill for **doing this professionally**.

## Indexes

Without an index, `WHERE user_id = 42` must **scan the whole table** (full scan, O(n)). A **B-tree index** is a separate sorted structure on a column, allowing **O(log n) lookup** like a book's index.

```sql
CREATE INDEX idx_events_user ON events(user_id);
```

![A B-tree index lets a query avoid scanning the whole table](/lessons/sql/31-performance-indexes-fig-en.svg)
*A B-tree index lets a query avoid scanning the whole table*

**The cost:** disk space, and slower `INSERT/UPDATE/DELETE` (the index must be updated). So index only columns **often used to filter, join or sort**.

## Composite indexes

`(event_type, event_date)` helps filtering by `event_type` then `event_date`. **Column order matters**: it serves conditions on the **leading column** (or both), not effectively filters on the second column alone.

## Reading the execution plan

`EXPLAIN QUERY PLAN SELECT …` shows what SQLite does: `SCAN` (whole table) or `SEARCH … USING INDEX`. PostgreSQL uses `EXPLAIN ANALYZE` (real timings), MySQL `EXPLAIN`.

## "Sargable" queries (index-friendly)

- Good: `WHERE user_id = 42`, `WHERE event_date >= '2024-01-01'`.
- **Index-breakers**: wrapping the column in a function (`WHERE strftime('%Y', event_date) = '2024'`, `WHERE LOWER(email) = …`), `LIKE '%abc'` (leading wildcard), mismatched types.
- Rewrite: `event_date >= '2024-01-01' AND event_date < '2025-01-01'`.

## Professional habits

- Select only the columns you need (`SELECT *` drags lots of data).
- Filter **early** (before joining/aggregating); `LIMIT` when exploring.
- Measure before optimising: bottlenecks are usually a few queries.

## References

- Winand, M. *SQL Performance Explained* (use-the-index-luke.com).
- SQLite documentation, "Query Planning" and "EXPLAIN QUERY PLAN", sqlite.org.
- Knuth, D. *The Art of Computer Programming*, Vol. 3 (search trees).

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
