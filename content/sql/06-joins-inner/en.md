# JOIN: combining tables

In relational databases, data is **split across many tables** to avoid repetition. The `orders` table only stores `customer_id`, while the customer's name lives in `customers`. To see both, we **JOIN**.

## Primary keys and foreign keys

- **Primary key**: a column uniquely identifying each row (`customers.id`).
- **Foreign key**: a column pointing to another table's primary key (`orders.customer_id` → `customers.id`).

```text
customers          orders
┌────┬─────────┐   ┌────┬─────────────┬────────────┐
│ id │ name    │   │ id │ customer_id │ order_date │
├────┼─────────┤   ├────┼─────────────┼────────────┤
│  1 │ An      │◄──│  1 │      1      │ 2024-08-01 │
│  2 │ Binh    │◄──│  3 │      2      │ 2024-08-03 │
└────┴─────────┘   └────┴─────────────┴────────────┘
```

## INNER JOIN

```sql
SELECT o.id AS order_id, c.name AS customer, o.order_date
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id;
```

- `JOIN` (= `INNER JOIN`): keeps the row pairs that **satisfy the `ON` condition**.
- **Table aliases** (`o`, `c`) shorten typing and disambiguate same-named columns (`o.id` vs `c.id`).
- Rows with **no match** in either table are **dropped**.

Each `orders` row matches **exactly one** customer, so the result has 14 rows, equal to the number of orders.

## Joining more than two tables

Just chain more `JOIN`s:

```sql
SELECT o.id, c.name AS customer, p.name AS product, oi.quantity
FROM order_items AS oi
JOIN orders    AS o ON o.id = oi.order_id
JOIN customers AS c ON c.id = o.customer_id
JOIN products  AS p ON p.id = oi.product_id;
```

## Combining with WHERE and GROUP BY

```sql
-- Revenue per customer
SELECT c.name, SUM(oi.quantity * p.price) AS revenue
FROM customers c
JOIN orders o       ON o.customer_id = c.id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p     ON p.id = oi.product_id
GROUP BY c.name
ORDER BY revenue DESC;
```

## Common mistakes

| Mistake | Consequence |
|---|---|
| Forgetting the `ON` condition | You get a **Cartesian product** (every pair of rows): thousands of meaningless rows |
| Same-named column without a table prefix | `ambiguous column name` |
| `ON` condition on the wrong column | Fewer results than expected |

> **Tip:** if the result's row count differs from what you expected, run `COUNT(*)` on each table and check the **relationship** (one-to-many: the row count equals the "many" table).
