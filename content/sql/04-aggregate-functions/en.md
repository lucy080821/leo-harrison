# Aggregate functions

An **aggregate function** collapses **many rows into one value**: count, sum, average, max, min.

| Function | Meaning |
|---|---|
| `COUNT(*)` | Counts **rows** |
| `COUNT(column)` | Counts rows where `column` is **not NULL** |
| `COUNT(DISTINCT column)` | Counts **distinct** values |
| `SUM(column)` | Total |
| `AVG(column)` | Average |
| `MIN(column)`, `MAX(column)` | Smallest, largest |

```sql
SELECT
  COUNT(*)   AS num_products,
  MIN(price) AS cheapest,
  MAX(price) AS priciest,
  AVG(price) AS avg_price,
  SUM(stock) AS total_stock
FROM products;
```

The result has just **one row**, because all rows were collapsed.

## Combining with WHERE

`WHERE` filters **first**, then aggregation runs on the remaining rows:

```sql
SELECT COUNT(*) FROM orders WHERE status = 'completed';
SELECT AVG(price) FROM products WHERE category = 'Electronics';
```

![Aggregate functions collapse many rows into one value](/lessons/sql/04-aggregate-functions-fig-en.svg)
*Aggregate functions collapse many rows into one value*

## Computing inside the function

```sql
SELECT SUM(price * stock) AS inventory_value FROM products;   -- total stock value
```

The average has the familiar formula: $\text{AVG} = \dfrac{\text{SUM}}{\text{COUNT}}$ (over non-NULL values).

## NULL is ignored

Every aggregate (except `COUNT(*)`) **ignores NULL**:

```sql
SELECT COUNT(*) AS all_rows, COUNT(email) AS has_email FROM customers;
-- all_rows = 8, has_email = 7  (Em Hoang has no email)
```

## COUNT(DISTINCT)

```sql
SELECT COUNT(DISTINCT city) AS num_cities FROM customers;   -- 5
```

## A common mistake

Don't mix **plain columns** with **aggregates** in one `SELECT` without a `GROUP BY` (next lesson):

```sql
SELECT name, MAX(price) FROM products;   -- ambiguous meaning, don't do it
```

Use `GROUP BY`, or `ORDER BY price DESC LIMIT 1` if you want "the priciest product".

## Rounding

```sql
SELECT ROUND(AVG(price), 2) FROM products;     -- round to 2 decimals
```
