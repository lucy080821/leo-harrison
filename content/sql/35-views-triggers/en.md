# Views, triggers and database-level rules

Business rules belong **close to the data**, where every application must obey them, rather than being repeated in each program.

## Views: named queries

```sql
CREATE VIEW v_customer_revenue AS SELECT … ;
SELECT * FROM v_customer_revenue;    -- used like a table
```

A view **stores no data** (it re-runs the query each time). Benefits: **simplify** complex queries, **one single definition** of "revenue" or "active customer", and **hide sensitive columns** (grant access on the view, not the table). A **materialized view** (PostgreSQL, BigQuery) *stores* the result for fast reads, at the price of refreshing.

## Triggers: run automatically on change

```sql
CREATE TRIGGER trg AFTER UPDATE OF price ON products
BEGIN INSERT INTO price_log VALUES (OLD.id, OLD.price, NEW.price); END;
```

`BEFORE/AFTER` × `INSERT/UPDATE/DELETE`; the body uses `OLD.col` and `NEW.col`. Uses: **audit logs** (who changed what, when), maintaining summary columns, rejecting invalid changes.

![A view stores a query; a trigger runs automatically when data changes](/lessons/sql/35-views-triggers-fig-en.svg)
*A view stores a query; a trigger runs automatically when data changes*

> **Use sparingly:** triggers are "hidden" logic, hard to debug, and can slow writes. Prefer declarative constraints when they suffice.

## Declarative constraints

`NOT NULL`, `UNIQUE`, `PRIMARY KEY`, `FOREIGN KEY`, `CHECK (price >= 0)`: the database **rejects** bad data up front, stronger than checking afterwards.

## References

- SQLite documentation, "CREATE VIEW", "CREATE TRIGGER", sqlite.org.
- PostgreSQL documentation, "Materialized Views".
- Date, C. J. *An Introduction to Database Systems* (integrity constraints).

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
