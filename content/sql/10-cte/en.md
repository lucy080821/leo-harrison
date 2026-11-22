# CTEs: writing queries step by step

A **CTE** (Common Table Expression) lets you **name a subquery** and use it like a temporary table in the rest of the statement. It turns a tangled query into **steps read top to bottom**.

## Syntax

```sql
WITH order_totals AS (
  SELECT oi.order_id, SUM(oi.quantity * p.price) AS total
  FROM order_items oi
  JOIN products p ON p.id = oi.product_id
  GROUP BY oi.order_id
)
SELECT order_id, total
FROM order_totals
WHERE total > 5000000;
```

- `WITH name AS ( query )` defines the CTE.
- The main `SELECT` after it uses `name` as a table.
- A CTE **exists only within that statement**, nothing is saved.

![CTEs split a query into named steps](/lessons/sql/10-cte-fig-en.svg)
*CTEs split a query into named steps*

## Several CTEs in sequence

Separated by commas; a later CTE **may use** an earlier one:

```sql
WITH order_totals AS (
  SELECT oi.order_id, SUM(oi.quantity * p.price) AS total
  FROM order_items oi JOIN products p ON p.id = oi.product_id
  GROUP BY oi.order_id
),
customer_spend AS (
  SELECT o.customer_id, SUM(t.total) AS spent
  FROM orders o JOIN order_totals t ON t.order_id = o.id
  GROUP BY o.customer_id
)
SELECT c.name, cs.spent
FROM customer_spend cs
JOIN customers c ON c.id = cs.customer_id
ORDER BY cs.spent DESC;
```

Each CTE is **a named step**: "each order's total" → "each customer's spend" → "attach names". Easy to read and to check step by step (run just `SELECT * FROM order_totals`).

## Why CTEs over subqueries?

| Nested subqueries | CTEs |
|---|---|
| Read inside-out, hard to follow | Read top-down like prose |
| Must be repeated if used twice | Named once, used many times |
| Hard to debug | Test step by step |

## Recursive CTEs

For **tree-shaped** data (org charts, nested categories) or generating sequences:

```sql
WITH RECURSIVE counter(n) AS (
  SELECT 1                         -- the anchor
  UNION ALL
  SELECT n + 1 FROM counter        -- the recursive part calls itself
  WHERE n < 5                      -- stop condition!
)
SELECT n FROM counter;             -- 1, 2, 3, 4, 5
```

The management hierarchy in `employees`:

```sql
WITH RECURSIVE chain AS (
  SELECT id, name, manager_id, 0 AS level FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, e.manager_id, c.level + 1
  FROM employees e JOIN chain c ON e.manager_id = c.id
)
SELECT name, level FROM chain ORDER BY level, name;
```

> Always give recursion a **stop condition**, otherwise the query runs forever. If the result panel "hangs", press **Stop**.
