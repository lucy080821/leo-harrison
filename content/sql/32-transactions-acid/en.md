# Transactions and the ACID properties

Transferring money between two accounts takes two steps: debit the sender, credit the receiver. If the system crashes **between the steps**, money "vanishes". A **transaction** bundles several statements into **one indivisible unit of work**.

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;      -- or ROLLBACK; to undo everything since BEGIN
```

## ACID

Coined by Härder and Reuter (1983):

| Letter | Meaning |
|---|---|
| **A**tomicity | all or nothing |
| **C**onsistency | a transaction moves the database from one valid state to another (constraints always hold) |
| **I**solation | concurrent transactions **do not see each other midway** |
| **D**urability | once `COMMIT`ted, it survives a power failure |

![Transactions: all or nothing](/lessons/sql/32-transactions-acid-fig-en.svg)
*Transactions: all or nothing*

## Isolation and concurrency anomalies

Insufficient isolation can cause **dirty reads** (reading uncommitted data), **non-repeatable reads**, **phantom reads**. SQL defines levels: `READ UNCOMMITTED`, `READ COMMITTED`, `REPEATABLE READ`, `SERIALIZABLE`. Higher is safer and slower; most systems default to `READ COMMITTED` or `REPEATABLE READ`.

## SAVEPOINT

A checkpoint inside a transaction: `SAVEPOINT a; … ROLLBACK TO a;` to undo part of the work.

## Professional practice

- Wrap **all related writes** in one transaction; keep transactions **short** (never wait for a user midway).
- **Locks and deadlocks**: two transactions waiting on each other; design access in a consistent order.
- Many analytic databases are optimised for reads and limit write transactions: know your system.

## References

- Härder, T. & Reuter, A. (1983). Principles of transaction-oriented database recovery. *ACM Computing Surveys* 15(4).
- Gray, J. & Reuter, A. *Transaction Processing: Concepts and Techniques*.
- SQLite documentation, "Transaction", "Isolation in SQLite", sqlite.org.

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
