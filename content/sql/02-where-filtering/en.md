# Filtering with WHERE

`WHERE` keeps **only the rows that satisfy a condition**.

```sql
SELECT name, city
FROM customers
WHERE city = 'Hanoi';
```

> In SQL, strings go in **single quotes** `'...'` (double quotes are for column/table names). Equality uses a **single** `=`.

## Comparison operators

| Operator | Meaning |
|---|---|
| `=` , `<>` (or `!=`) | Equal, not equal |
| `<`, `<=`, `>`, `>=` | Less than, greater than |
| `BETWEEN a AND b` | In a range, **inclusive of both ends** |
| `IN (a, b, c)` | One of the listed values |
| `LIKE 'pattern'` | String pattern match |
| `IS NULL`, `IS NOT NULL` | Has / has no value |

```sql
SELECT * FROM products WHERE price BETWEEN 1000000 AND 5000000;
SELECT * FROM products WHERE category IN ('Furniture', 'Stationery');
```

## Combining conditions: AND, OR, NOT

```sql
SELECT name, price FROM products
WHERE category = 'Electronics' AND price < 5000000;

SELECT name FROM customers
WHERE city = 'Hanoi' OR city = 'Hue';

SELECT name FROM customers WHERE NOT city = 'Hanoi';
```

`AND` is evaluated **before** `OR`. When mixing them, always use **parentheses** for clarity:

```sql
WHERE category = 'Furniture' AND (price < 500000 OR stock = 0)
```

## LIKE: string pattern search

| Character | Meaning |
|---|---|
| `%` | Any string (even empty) |
| `_` | Exactly **one** character |

```sql
SELECT name FROM customers WHERE name LIKE 'P%';      -- starts with P
SELECT name FROM customers WHERE name LIKE '%Nguyen'; -- ends with Nguyen
SELECT name FROM products  WHERE name LIKE '_en';     -- Pen
```

In SQLite, `LIKE` is **case-insensitive** for ASCII letters by default.

## NULL: the "unknown" value

`NULL` means **no data**, **not** the number 0 or an empty string. Comparing with `NULL` using `=` always gives an unknown result, so you must use `IS NULL`:

```sql
SELECT name FROM customers WHERE email IS NULL;       -- RIGHT
SELECT name FROM customers WHERE email = NULL;        -- WRONG: returns no rows
```

That's also why `NOT IN` with a list containing `NULL` can produce surprising results: be careful.

## Tips

- Test conditions step by step: write `SELECT *` first then add `WHERE` gradually.
- Comparing dates stored as `'YYYY-MM-DD'` text works correctly thanks to alphabetical order: `WHERE order_date >= '2024-09-01'`.
