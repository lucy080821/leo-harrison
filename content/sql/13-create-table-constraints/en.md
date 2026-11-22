# Creating tables, constraints, indexes and views

The commands that define data structure are called **DDL** (Data Definition Language): `CREATE`, `ALTER`, `DROP`.

## CREATE TABLE

```sql
CREATE TABLE reviews (
  id         INTEGER PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id),
  rating     INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment    TEXT DEFAULT ''
);
```

Each column has a **name**, a **data type** and **constraints**.

![A table with constraints and an index](/lessons/sql/13-create-table-constraints-fig-en.svg)
*A table with constraints and an index*

## Data types

SQLite typing is **flexible**; the main families:

| Type | Used for |
|---|---|
| `INTEGER` | Whole numbers |
| `REAL` | Floating-point numbers |
| `TEXT` | Strings (including dates `'YYYY-MM-DD'`) |
| `BLOB` | Binary data |

Other databases (PostgreSQL, MySQL) have many stricter types: `VARCHAR(100)`, `DECIMAL(10,2)`, `DATE`, `BOOLEAN`, `TIMESTAMP`... Money **should** use `DECIMAL` or integers in the smallest unit, **never** floats.

## Constraints

Constraints are **rules protecting data**: the database rejects violating rows.

| Constraint | Meaning |
|---|---|
| `PRIMARY KEY` | Unique identifier, not NULL |
| `NOT NULL` | A value is required |
| `UNIQUE` | No duplicates (e.g. `email`) |
| `DEFAULT x` | Default when omitted |
| `CHECK (condition)` | Must satisfy the condition |
| `FOREIGN KEY` / `REFERENCES` | Must point to a real row in another table |

```sql
INSERT INTO reviews (product_id, rating) VALUES (1, 9);
-- Error: CHECK constraint failed: rating BETWEEN 1 AND 5
```

> Constraints are the **last line of defence** for your data even when the application has bugs. Put them in the database, not only in code.

In SQLite, foreign keys are enforced only when `PRAGMA foreign_keys = ON;` (MySQL/PostgreSQL always enforce them).

## ALTER and DROP

```sql
ALTER TABLE customers ADD COLUMN phone TEXT;
ALTER TABLE customers RENAME COLUMN phone TO mobile;
DROP TABLE reviews;                 -- DELETES the table and its data
DROP TABLE IF EXISTS reviews;
```

## INDEX: faster lookups

Without an index, finding `WHERE customer_id = 3` must **scan the whole table**. An index is like a **book's index**: jump straight to where you need.

```sql
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE UNIQUE INDEX idx_customers_email ON customers(email);
```

- Index columns often used in `WHERE`, `JOIN`, `ORDER BY`.
- In return, indexes cost **space** and make writes **slightly slower**: don't index carelessly.
- See how it runs: `EXPLAIN QUERY PLAN SELECT ...`.

## VIEW: a saved query

```sql
CREATE VIEW completed_orders AS
SELECT * FROM orders WHERE status = 'completed';

SELECT COUNT(*) FROM completed_orders;     -- use it like a table
```

A view **stores no data**; each use re-runs the underlying query. Use it to **simplify** complex queries and **restrict what can be seen** (hide sensitive columns).
