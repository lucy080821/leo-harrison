# EXISTS and correlated subqueries

An ordinary subquery (lesson 8) runs **once**. A **correlated subquery** references a column of the outer query, so logically it **re-runs for every outer row**.

## EXISTS: is there one?

```sql
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id AND o.status = 'completed')
```

`EXISTS` returns `TRUE` as soon as it finds **one** matching row, so it **does not duplicate rows** the way a `JOIN` does with several matches, and it often stops early. `SELECT 1` is just a convention (the returned column does not matter). `NOT EXISTS` is a safe anti-join.

> **Why `NOT EXISTS` beats `NOT IN`:** if the list in `NOT IN (...)` contains `NULL`, the result is always empty (comparing with NULL is unknown). `NOT EXISTS` avoids this trap.

## Correlated subqueries

For each employee, compare salary with the average of **their department**:

```sql
WHERE e.salary > (SELECT AVG(salary) FROM employees x WHERE x.department_id = e.department_id)
```

![EXISTS tests existence; a correlated subquery runs per outer row](/lessons/sql/19-exists-correlated-fig-en.svg)
*EXISTS tests existence; a correlated subquery runs per outer row*

Inside, it uses the outer row's `e.department_id`. It can be replaced by a `JOIN` to an aggregate query or by a **window function** (`AVG(salary) OVER (PARTITION BY department_id)`), often easier to read and faster on large data.

## Professional uses

Filtering "customers with a recent order", "products selling above their category average", removing orphan records. When performance matters, read the execution plan (performance lesson).

## References

- Beaulieu, A. *Learning SQL*, chapter 9 (Subqueries).
- Celko, J. *SQL for Smarties*, sections on `EXISTS` and `NULL`.
- SQLite documentation, "Subqueries", sqlite.org.

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
