# GROUP BY and HAVING

An aggregate function gives **one** result for the whole table. To get results **per group** (each city, each product category...), use `GROUP BY`.

## GROUP BY

```sql
SELECT city, COUNT(*) AS num_customers
FROM customers
GROUP BY city;
```

| city | num_customers |
|---|---|
| Hanoi | 3 |
| Ho Chi Minh | 2 |
| Da Nang | 1 |
| ... | ... |

The database **splits the rows into groups** by the value of `city`, then runs the aggregate **within each group**.

**Golden rule:** every column in `SELECT` must **either** appear in `GROUP BY` **or** be inside an aggregate function.

```sql
SELECT category, COUNT(*) AS n, AVG(price) AS avg_price, MAX(price) AS top_price
FROM products
GROUP BY category;
```

Group by **several columns**: `GROUP BY category, city` (each pair of values is a group).

![GROUP BY: one result row per group](/lessons/sql/05-group-by-having-fig-en.svg)
*GROUP BY: one result row per group*

## HAVING: filtering groups

- `WHERE` filters **rows**, running **before** grouping.
- `HAVING` filters **groups**, running **after** grouping, so it can use aggregates.

```sql
SELECT category, COUNT(*) AS n
FROM products
GROUP BY category
HAVING COUNT(*) > 2;          -- keep only groups with more than 2 products
```

Combining both:

```sql
SELECT category, AVG(price) AS avg_price
FROM products
WHERE stock > 0                -- 1) drop out-of-stock products (filter ROWS)
GROUP BY category              -- 2) group
HAVING AVG(price) > 1000000    -- 3) filter GROUPS
ORDER BY avg_price DESC;       -- 4) sort
```

## Execution order (important!)

```text
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
```

Since `WHERE` runs before groups exist, you **can't** write `WHERE COUNT(*) > 2`. Conditions on aggregated results belong in `HAVING`.

## Common patterns

**Top N by group:**

```sql
SELECT city, COUNT(*) AS n
FROM customers
GROUP BY city
ORDER BY n DESC
LIMIT 3;
```

**Finding duplicates** (data errors):

```sql
SELECT email, COUNT(*) FROM customers GROUP BY email HAVING COUNT(*) > 1;
```
