# CASE, NULL and handy functions

## CASE: conditions in SQL

`CASE` is "if/else" inside a query, producing a **new value based on conditions**.

```sql
SELECT name, price,
  CASE
    WHEN price >= 5000000 THEN 'premium'
    WHEN price >= 1000000 THEN 'standard'
    ELSE 'budget'
  END AS tier
FROM products;
```

- `WHEN`s are tested **top to bottom**; the first true branch wins.
- With no `ELSE` and no matching branch, the result is `NULL`.
- Great for **bucketing** and **conditional counting**:

```sql
SELECT
  SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed,
  SUM(CASE WHEN status = 'pending'   THEN 1 ELSE 0 END) AS pending
FROM orders;
```

![CASE classifies values; NULL equals nothing](/lessons/sql/09-case-null-functions-fig-en.svg)
*CASE classifies values; NULL equals nothing*

## Handling NULL

```sql
COALESCE(email, 'no email')     -- the first NON-NULL value in the list
NULLIF(a, b)                    -- returns NULL if a = b (handy to avoid dividing by 0)
IFNULL(x, 0)                    -- two-argument shorthand of COALESCE (SQLite/MySQL)
```

Example to avoid division by zero: `total / NULLIF(count, 0)`.

## String functions

| Function | Example → result |
|---|---|
| `UPPER(s)`, `LOWER(s)` | `UPPER('abc')` → `ABC` |
| `LENGTH(s)` | `LENGTH('hello')` → `5` |
| `SUBSTR(s, start, length)` | `SUBSTR('abcdef', 2, 3)` → `bcd` |
| `TRIM(s)` | Strip whitespace from both ends |
| `REPLACE(s, a, b)` | Replace `a` with `b` |
| `s1 \|\| s2` | Concatenate |
| `INSTR(s, sub)` | Position of `sub` in `s` (0 if absent) |

## Number functions

```sql
ROUND(3.14159, 2)    -- 3.14
ABS(-5)              -- 5
price * 1.1          -- ordinary arithmetic
CAST(price AS REAL) / 1000
```

Dividing two integers in SQLite is **integer division**: `7 / 2 = 3`. For a decimal result multiply by `1.0`: `7 * 1.0 / 2 = 3.5`.

## Dates and times (SQLite)

Dates are stored as `'YYYY-MM-DD'` text.

```sql
DATE('now')                              -- today
strftime('%Y-%m', order_date)            -- '2024-08' (group by month)
strftime('%Y', order_date)               -- year
strftime('%w', order_date)               -- weekday (0 = Sunday)
DATE(order_date, '+7 days')              -- add 7 days
julianday('2024-09-01') - julianday('2024-08-01')   -- difference in days: 31
```

```sql
-- Orders per month
SELECT strftime('%Y-%m', order_date) AS month, COUNT(*) AS orders
FROM orders
GROUP BY month
ORDER BY month;
```

> Each database system (MySQL, PostgreSQL, SQL Server) has **different** date function names (`DATE_FORMAT`, `DATE_TRUNC`, `FORMAT`...), but the ideas are identical.
