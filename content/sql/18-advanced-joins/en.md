# Advanced joins: anti-join, semi-join, cross join and self-join

`INNER JOIN` and `LEFT JOIN` (lessons 6–7) solve most problems. Professionals need a few more **join patterns**.

## Anti-join: "in A but not in B"

```sql
SELECT p.name FROM products p
LEFT JOIN order_items oi ON oi.product_id = p.id
WHERE oi.id IS NULL;
```

`LEFT JOIN` keeps every product; unmatched ones have `NULL` on the right, and we filter exactly those. A very common question: customers who never bought, items never sold, users never activated.

## Semi-join: "at least one match exists"

You only need to know a matching row *exists*, not its columns. Use `EXISTS` (next lesson) instead of `JOIN` to avoid duplicating rows when there are several matches.

## Self-join: joining a table to itself

Use two aliases for the same table: pairs of customers in the same city, employees with their **manager** (the `manager_id` column).

```sql
JOIN customers b ON a.city = b.city AND a.id < b.id
```

`a.id < b.id` removes (A, A) pairs and avoids both (A, B) and (B, A).

![Anti-join, semi-join and self-join](/lessons/sql/18-advanced-joins-fig-en.svg)
*Anti-join, semi-join and self-join*

## Cross join: the Cartesian product

Every combination of two sets (m × n rows). Useful for building a **complete grid** (every month × every product) and then `LEFT JOIN`ing real data so empty cells appear instead of vanishing. Watch the size: a 10,000-row table cross-joined with itself gives 100 million rows.

## Non-equality joins

`ON` can use `<` and `BETWEEN`: join events to **promotion windows** (`order_date BETWEEN start AND end`), or look up tax brackets by threshold.

## References

- Beaulieu, A. *Learning SQL*, chapters 5 and 10 (Joins).
- Celko, J. *SQL for Smarties* (Morgan Kaufmann).
- SQLite documentation, "SELECT: join clauses", sqlite.org.

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
