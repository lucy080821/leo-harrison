# Set operations: UNION, INTERSECT, EXCEPT

A `JOIN` combines tables **horizontally** (more columns). **Set operations** combine query results **vertically** (more rows), treating each result as a set.

## The four operators

| Operator | Meaning | Duplicates |
|---|---|---|
| `UNION` | union: rows in A or B | **removed** |
| `UNION ALL` | A followed by B | **kept** (faster) |
| `INTERSECT` | rows in both A and B | removed |
| `EXCEPT` | rows in A but not in B | removed |

**Requirements:** both queries need the **same number of columns** with compatible types; column names come from the first query. `ORDER BY` is written **once at the end**.

![UNION, INTERSECT and EXCEPT as set operations](/lessons/sql/17-set-operations-fig-en.svg)
*UNION, INTERSECT and EXCEPT as set operations*

## When to use which

- **`EXCEPT`** answers "in A but not in B": customers who never bought, products never sold. (Also doable with `LEFT JOIN … IS NULL` or `NOT EXISTS`, next lessons.)
- **`INTERSECT`**: users who both viewed and bought.
- **`UNION ALL`** to *stack many tables with the same structure* (monthly logs, multi-branch data). Prefer `UNION ALL` over `UNION` when you know there are no duplicates, because `UNION` must sort to remove them.

## Professional notes

- `NULL`s are treated as **equal** in set operations (unlike `=`).
- With `EXCEPT` make sure the compared columns have no unexpected `NULL`s.
- PostgreSQL calls it `EXCEPT`, Oracle `MINUS`; MySQL supports `INTERSECT`/`EXCEPT` only since 8.0.31.

## References

- SQLite documentation, "SELECT: compound select statements", sqlite.org.
- Beaulieu, A. *Learning SQL*, chapter 6 (Working with Sets).
- ISO/IEC 9075-2 (SQL/Foundation): set operators.

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
