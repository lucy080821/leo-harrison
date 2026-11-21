# Sorting, limiting and DISTINCT

## ORDER BY: sorting results

```sql
SELECT name, price FROM products ORDER BY price;          -- ascending (default)
SELECT name, price FROM products ORDER BY price DESC;     -- descending
```

- `ASC` = ascending (default), `DESC` = descending.
- Sort by **several columns**: a later column is used only when earlier ones are **equal**.

```sql
SELECT name, category, price
FROM products
ORDER BY category ASC, price DESC;    -- by category A→Z, priciest first within each
```

`ORDER BY` always sits **near the end** of a statement. You can sort by an alias or by column position (`ORDER BY 2`), but names are clearer.

With `NULL`: in SQLite, `NULL` counts as the **smallest** value (first with `ASC`).

## LIMIT and OFFSET: taking a slice

```sql
SELECT name FROM products ORDER BY price DESC LIMIT 3;            -- the first 3 rows
SELECT name FROM products ORDER BY price DESC LIMIT 3 OFFSET 3;   -- skip 3, take the next 3
```

This is the basis of **pagination**: page $n$ (with $k$ rows per page) uses `LIMIT k OFFSET (n-1)*k`.

> **Always pair `LIMIT` with `ORDER BY`**, otherwise "the first 3 rows" are just 3 arbitrary rows.

## DISTINCT: removing duplicate rows

```sql
SELECT city FROM customers;                  -- Hanoi repeats 3 times
SELECT DISTINCT city FROM customers;         -- each city once
SELECT DISTINCT city, category ...           -- DISTINCT applies to the PAIR of columns
```

## Clause writing order

```sql
SELECT   ...
FROM     ...
WHERE    ...
ORDER BY ...
LIMIT    ...;
```

The database's **execution** order is different: `FROM` → `WHERE` → (grouping, next lessons) → `SELECT` → `ORDER BY` → `LIMIT`. That's why `ORDER BY` can use aliases declared in `SELECT`, while `WHERE` cannot.
