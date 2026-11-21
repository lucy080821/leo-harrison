# Subqueries

A **subquery** is a `SELECT` statement **nested inside** another statement, wrapped in parentheses `( )`. It solves "answer this question first, then use the result to answer another".

## A subquery returning a single value

Usable anywhere **one value** is needed:

```sql
-- Products pricier than the average
SELECT name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);
```

The database computes `AVG(price)` first (a single number), then uses it in `WHERE`. You **can't** write `WHERE price > AVG(price)` directly because `WHERE` runs before aggregates exist.

## A subquery returning a list: IN

```sql
SELECT name
FROM customers
WHERE id IN (SELECT customer_id FROM orders);       -- customers who bought

SELECT name
FROM customers
WHERE id NOT IN (SELECT customer_id FROM orders);   -- customers who didn't
```

> **Beware `NOT IN`:** if the returned list contains `NULL`, `NOT IN` matches no rows. `NOT EXISTS` or `LEFT JOIN ... IS NULL` are safer.

## EXISTS: is there any row?

```sql
SELECT c.name
FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.id
);
```

This is a **correlated subquery**: the inner query references `c` from the outer one, so it re-runs **for each customer**. `EXISTS` only cares about "is there one?", so it's often fast.

## A subquery in SELECT

Returns **one value per row**:

```sql
SELECT c.name,
       (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.id) AS num_orders
FROM customers c;
```

## A subquery in FROM (derived table)

Treat the subquery's result as a **temporary table** (an alias is required):

```sql
SELECT AVG(n) AS avg_orders_per_customer
FROM (
  SELECT customer_id, COUNT(*) AS n
  FROM orders
  GROUP BY customer_id
) AS per_customer;
```

## Subquery or JOIN?

Many problems can be solved both ways. Prefer whichever is **more readable**. When subqueries nest so deep they become confusing, switch to a **CTE** (next lesson) to write it step by step.
