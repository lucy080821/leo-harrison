# Professional SQL best practices

Your queries will be **read by others** (and by you three months later). These habits separate beginners from working professionals.

## 1. Clear structure

- Use **CTEs** named by meaning (`completed_orders`, `order_revenue`), each doing **one thing**; read top to bottom like explanatory steps.
- Upper-case keywords, **meaningful aliases** (`o`, `oi` are acceptable, `t1` is not), one column per line.
- **Comment** *why*, not *what*.

## 2. Correct first, fast second

- **Check row counts and totals at each step**: after each `JOIN`, did the row count grow unexpectedly?
- **Reconcile** against a known figure (total revenue of the source table).
- Try **one specific customer/order** and verify by hand.

## 3. Four common traps

| Trap | Symptom | Avoid by |
|---|---|---|
| **Fan-out** | totals inflate after a one-to-many `JOIN` | aggregate before joining; `COUNT(DISTINCT …)` |
| **NULL** | `NOT IN`, `= NULL` go wrong | `IS NULL`, `COALESCE`, `NOT EXISTS` |
| **Integer division** | `7/2 = 3` | multiply by `1.0` |
| **Filtering in the wrong place** | a `WHERE` on the right table of a `LEFT JOIN` turns it into `INNER` | put the condition in `ON` |

![Writing readable, correct and maintainable queries](/lessons/sql/38-query-best-practices-fig-en.svg)
*Writing readable, correct and maintainable queries*

## 4. Maintenance

- **Reuse** with views or dbt models; avoid copy-pasting "revenue" logic in many places.
- Keep important queries in **version control** (Git).
- Record **metric definitions** (does revenue net out refunds?).

## References

- Holywell, S. "SQL Style Guide" (sqlstyle.guide).
- Winand, M. *SQL Performance Explained*.
- Beaulieu, A. *Learning SQL*.

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
