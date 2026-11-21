# LEFT JOIN and self-joins

`INNER JOIN` **drops** unmatched rows. Sometimes you want to **keep** them.

## LEFT JOIN

Keeps **every row of the left table**; where the right table has no match, the right-hand columns are `NULL`.

```sql
SELECT c.name, o.id AS order_id
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id;
```

| name | order_id |
|---|---|
| An Nguyen | 1 |
| An Nguyen | 2 |
| ... | ... |
| Em Hoang | **NULL** |
| Hoa Bui | **NULL** |

Em Hoang and Hoa Bui haven't ordered, so they still appear with `order_id = NULL`.

## The "anti-join" pattern: finding rows with NO relation

`LEFT JOIN` then filtering `IS NULL` on the right table gives the **left rows with no counterpart**:

```sql
SELECT c.name
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.id IS NULL;                 -- customers who bought nothing
```

Handy for finding: customers who never bought, products never sold, employees without a department...

## The kinds of JOIN

| JOIN | Keeps |
|---|---|
| `INNER JOIN` | Only pairs that **match in both** tables |
| `LEFT JOIN` | **Every left-table row** + matching right-table parts |
| `RIGHT JOIN` | Every right-table row (newer SQLite supports it; or swap the tables and use LEFT) |
| `FULL OUTER JOIN` | Every row of both tables (newer SQLite supports it) |
| `CROSS JOIN` | Every possible pair (Cartesian product) |

## Careful: condition in `ON` or `WHERE`?

With `LEFT JOIN`, filtering on the **right table** in `WHERE` **accidentally turns it into an INNER JOIN** (the NULL rows get dropped). To filter while keeping the left rows, put the condition in **`ON`**:

```sql
-- Every customer; only match completed orders
SELECT c.name, o.id
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id AND o.status = 'completed';
```

## Self-join: joining a table to itself

When a table has a column pointing **back to itself** (e.g. `employees.manager_id` points to `employees.id`), use **two aliases** for the same table:

```sql
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON m.id = e.manager_id;
```

`LEFT JOIN` here lets the head of the company (no manager) still appear.

## UNION: stacking results vertically

```sql
SELECT name FROM customers
UNION                         -- removes duplicates; UNION ALL keeps them
SELECT name FROM employees;
```

Both queries must have the **same number of columns** with compatible types.
