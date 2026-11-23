# Recursive CTEs: hierarchies and generated series

Some problems have an **unknown number of steps**: multi-level org charts, nested product categories, referral chains. A **recursive CTE** solves them in plain SQL.

## Structure

```sql
WITH RECURSIVE name(columns...) AS (
  SELECT ...            -- the ANCHOR: starting rows
  UNION ALL
  SELECT ... FROM name JOIN ...   -- the RECURSIVE part: uses the previous round's output
)
SELECT ... FROM name;
```

Process: run the anchor; then repeat the recursive part **on the newest rows** until it **produces no new rows**. You need a **stopping condition** (`WHERE i < 5` or running out of data) or it loops forever.

![A recursive CTE walks the management tree and generates sequences](/lessons/sql/20-recursive-cte-fig-en.svg)
*A recursive CTE walks the management tree and generates sequences*

## Two main uses

1. **Walking trees/graphs**: with `employees(id, manager_id)`: the anchor takes the top person (`manager_id IS NULL`), the recursive part takes the direct reports of each person just found and increments `level`. Likewise: rolling revenue up category levels.
2. **Generating series**: numbers, and **date series** to build a calendar table that fills months/days lacking data (`LEFT JOIN` real data onto it).

## Professional warnings

- Data with **cycles** (A manages B, B manages A) makes recursion never stop: add a depth limit (`WHERE level < 20`) or track the path.
- PostgreSQL, MySQL 8+ and SQL Server all support recursive CTEs (SQL Server omits the word `RECURSIVE`); standard since SQL:1999.

## References

- SQLite documentation, "WITH clause: Recursive Common Table Expressions", sqlite.org.
- Celko, J. *Trees and Hierarchies in SQL for Smarties*.
- ISO/IEC 9075:1999 (SQL:1999).

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
