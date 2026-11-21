# SELECT basics

**SQL** (Structured Query Language) is the language for **querying and managing data** in relational databases (MySQL, PostgreSQL, SQLite, SQL Server...). Data lives in **tables** made of **columns** (attributes) and **rows** (records).

The code panel on the right runs **real SQLite** right in your browser. Type a query and the result appears as a table below.


## The dataset used in this course

Every lesson uses the same sample database (reloaded fresh on every run, so feel free to experiment, you can't break it):

| Table | Main columns |
|---|---|
| `customers` | `id`, `name`, `email`, `city`, `joined_date` |
| `products` | `id`, `name`, `category`, `price`, `stock` |
| `orders` | `id`, `customer_id`, `order_date`, `status` |
| `order_items` | `id`, `order_id`, `product_id`, `quantity` |
| `departments` | `id`, `name` |
| `employees` | `id`, `name`, `department_id`, `salary`, `manager_id`, `hire_date` |


## The SELECT statement

```sql
SELECT column1, column2
FROM table_name;
```

- `SELECT`: **which columns** to display.
- `FROM`: **which table** to read from.
- End with a `;`.

```sql
SELECT * FROM customers;               -- the * means every column
SELECT name, city FROM customers;      -- just two columns
```

> **Avoid `SELECT *`** in real applications: fetch only the columns you need so it's faster and safe when the table changes.

## Aliases with AS

Rename a column (or a table) **in the result**:

```sql
SELECT name AS customer_name, city AS location FROM customers;
```

## Expressions

You can compute right in `SELECT`:

```sql
SELECT name, price, price * 0.9 AS discounted_price FROM products;
SELECT name, price / 1000 AS price_k FROM products;
SELECT 'Hello' AS greeting, 1 + 2 AS total;      -- no FROM needed
```

String concatenation in SQLite uses `||`:

```sql
SELECT name || ' (' || city || ')' AS label FROM customers;
```

## Comments

```sql
-- a one-line comment
/* a comment
   over several lines */
```

## Style conventions

- Keywords (SELECT, FROM...) are **case-insensitive**, but write them in **UPPERCASE** for readability.
- Put each clause (`SELECT`, `FROM`, `WHERE`...) on its own line so long queries stay clear.
- Table and column names usually use `snake_case` (`order_items`).

> **Row order isn't guaranteed.** Without an `ORDER BY` (next lessons), the database may return rows in any order.
