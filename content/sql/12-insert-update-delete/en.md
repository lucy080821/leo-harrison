# INSERT, UPDATE, DELETE

So far you've only **read** data. This lesson teaches **writing**: add, change, delete. These commands are called **DML** (Data Manipulation Language).

> In the practice panel each run **reloads the sample database from scratch**, so experiment freely without fear of breaking anything. On a real database every change is **permanent**.

## INSERT: adding rows

```sql
INSERT INTO customers (id, name, email, city, joined_date)
VALUES (9, 'Khanh Ly', 'khanh@example.com', 'Hue', '2024-08-01');
```

- List the **column names** then the matching **values** in order.
- Omitted columns get their **default value** or `NULL`.
- Add **several rows in one statement**:

```sql
INSERT INTO customers (id, name, city) VALUES
  (10, 'Lan Anh', 'Hanoi'),
  (11, 'Minh Quan', 'Da Nang');
```

- An `INTEGER PRIMARY KEY` column can **auto-increment**: omit `id` and let the database fill it.
- Insert from a query result: `INSERT INTO archive SELECT * FROM orders WHERE status = 'completed';`

![The three data-changing statements](/lessons/sql/12-insert-update-delete-fig-en.svg)
*The three data-changing statements*

## UPDATE: changing rows

```sql
UPDATE products
SET price = price * 1.1, stock = stock - 5
WHERE category = 'Furniture';
```

## DELETE: removing rows

```sql
DELETE FROM products WHERE stock = 0;
```

## ⚠️ THE LIFE-SAVING RULE: always have a WHERE

```sql
UPDATE products SET price = 0;      -- EVERY PRODUCT'S PRICE = 0 !!!
DELETE FROM customers;              -- WIPES THE WHOLE TABLE !!!
```

Forgetting `WHERE` is one of the most common data disasters. Safe habits:

1. Write a **`SELECT` first** with the exact `WHERE` to see which rows would be affected.
2. Once right, change `SELECT ...` into `UPDATE`/`DELETE` keeping the `WHERE`.
3. On real systems, wrap it in a **transaction** so you can undo a mistake.

## Transactions

Group several statements into **an all-or-nothing block**:

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;        -- save both; or ROLLBACK; to cancel both
```

If something fails midway, `ROLLBACK` restores everything. This is part of the **ACID** properties, the foundation of reliable databases (a money transfer can't subtract on one side and forget to add on the other).

## Constraints protect your data

`NOT NULL`, `UNIQUE`, `PRIMARY KEY`, `FOREIGN KEY`, `CHECK` **block** bad writes (next lesson). For example inserting two customers with the same `id` raises `UNIQUE constraint failed`.

## Replace or skip on conflict

```sql
INSERT OR IGNORE INTO customers (id, name) VALUES (1, 'X');   -- skip if the key exists
INSERT OR REPLACE INTO customers (id, name) VALUES (1, 'X');  -- overwrite the old row
```
