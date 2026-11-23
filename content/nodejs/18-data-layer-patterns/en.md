# The data layer: repositories, parameterised queries and transactions

> **Note:** a browser has no real Node, so Learn With Leo runs a **simulation** (in-memory fs, a mini `http`/`express`, testing with `app.inject`). The code you write is identical to real Node; each lesson ends with how to run it locally.

Real APIs almost always have a database. How you **organise data-access code** determines maintainability, security and performance.

## Layering

```
route/controller  →  service (business)  →  repository (data)  →  database
```

- **Route**: read the request, validate input, return the response. **No** SQL here.
- **Service**: business rules ("a shipped order can't be cancelled").
- **Repository**: **only knows** how to store/fetch data: `findById`, `listActive`. Switching DB or ORM affects only this layer, and tests use a **fake repository** easily (lesson 15).



![Routes contain no SQL; the repository hides the storage](/lessons/nodejs/18-data-layer-patterns-fig-en.svg)
*Routes contain no SQL; the repository hides the storage*

## Safe queries

Always **parameterise** (lesson 17): `{ text: 'SELECT … WHERE id = $1', values: [id] }`. Table/column names **can't** be parameterised: accept them only from an **allow-list** in code.

| Tool | Notes |
|---|---|
| **pg** / **mysql2** | raw drivers: maximum control |
| **Drizzle**, **Kysely** | typed queries, close to SQL |
| **Prisma** | schema-based ORM, convenient but a thicker abstraction |

Even with an ORM, **understand SQL** (Learn With Leo's SQL course) to read generated queries and tune indexes.

## Transactions

A money transfer is subtract from A then add to B: if it breaks in the middle, money **vanishes**. A transaction guarantees **all or nothing** (ACID atomicity):

```js
await db.transaction(async (tx) => {
  await tx.query('UPDATE accounts SET bal = bal - $1 WHERE id = $2', [amt, from])
  await tx.query('UPDATE accounts SET bal = bal + $1 WHERE id = $2', [amt, to])
})   // an error ⇒ automatic ROLLBACK
```

Keep transactions **short**; don't call external APIs inside. Beware **contention** (two requests editing the same row): row locks (`SELECT … FOR UPDATE`) or version checks (optimistic locking).

## N+1 and performance

Fetching 100 posts then looping to fetch each author = **101 queries**. Fix: `JOIN`, or a single `WHERE id IN (...)` then stitch in memory. Use a **connection pool** (don't open a new connection per request) and add **indexes** on filter/sort columns.

## Pagination

- **offset** (`LIMIT 20 OFFSET 40`): simple, **slower** on deep pages, drifts when data changes.
- **keyset/cursor** (`WHERE id > $1 ORDER BY id LIMIT 20`): fast and stable, returns a `nextCursor`. The choice for feeds and large lists.

## Schema migrations

Change table structure with **versioned migration files** (Drizzle Kit, Prisma Migrate, node-pg-migrate) run in CI/CD; never hand-edit production. Changes must be **backward compatible** with the code currently running (add a column first, remove later).

## References

- PostgreSQL docs: Transactions, Indexes, Parameters (`$1`).
- Martin Fowler, *Patterns of Enterprise Application Architecture*: Repository.
- Use The Index, Luke: "Paging Through Results".
