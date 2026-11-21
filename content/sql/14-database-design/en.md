# Database design

Good design keeps data **consistent, non-repeating and extensible**. Poor design causes bugs and painful queries forever after.

## The steps

1. **List the "entities"** (nouns): customers, products, orders...
2. Each entity becomes **a table**; each attribute **a column**.
3. Every table gets a **primary key**.
4. Identify the **relationships** between tables and express them with **foreign keys**.
5. **Normalize** to remove repeated data.

## The three kinds of relationship

### One-to-many (1-n): the most common

One author has **many** books; each book belongs to **one** author. Put the **foreign key on the "many" side**:

```sql
CREATE TABLE authors (id INTEGER PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  author_id INTEGER NOT NULL REFERENCES authors(id)
);
```

```text
authors 1 ───────< n books
```

### Many-to-many (n-n): needs a junction table

A student takes **many** courses; a course has **many** students. A foreign key can't live in either table alone, so we create a **junction (bridge) table**:

```sql
CREATE TABLE enrollments (
  student_id INTEGER NOT NULL REFERENCES students(id),
  course_id  INTEGER NOT NULL REFERENCES courses(id),
  PRIMARY KEY (student_id, course_id)       -- COMPOSITE primary key: blocks duplicate enrollments
);
```

```text
students 1 ──< enrollments >── 1 courses
```

In this course, `order_items` is also a junction table between `orders` and `products` (with an extra `quantity` column).

### One-to-one (1-1)

Rare: split rarely-used or sensitive information into its own table with a `UNIQUE` foreign key.

## Normalization

Look at this **denormalized** table:

| order_id | customer_name | customer_city | product | price |
|---|---|---|---|---|
| 1 | An | Hanoi | Laptop | 15000000 |
| 2 | An | Hanoi | Pen | 8000 |

An's name and city are **repeated**. Consequences:

- **Update**: changing An's city means editing many rows, easy to miss, leaving data **inconsistent**.
- **Insert**: you can't store a customer who has no order yet.
- **Delete**: deleting An's last order also loses all information about An.

**The fix:** split into `customers`, `orders`, `products`, `order_items` (exactly like the sample database you're using), storing each fact **once**.

| Normal form | Rule |
|---|---|
| **1NF** | One value per cell (no "a, b, c" lists in a cell) |
| **2NF** | Every column depends on the **whole** primary key (not part of a composite key) |
| **3NF** | Non-key columns don't depend on other non-key columns (e.g. don't store `city` with `zip` if `zip` determines `city`) |

In practice 3NF is the common goal.

## When to deliberately "denormalize"?

Analytics data warehouses often **merge tables** for fast reporting queries, trading off repeated data. Rule of thumb: **normalize for write systems** (applications), **denormalize on purpose for read/analytics systems**.

## Practical tips

- A primary key should be an **auto-increment integer** or a UUID, **not** data that can change (email, name).
- Name consistently: plural tables `customers`, foreign keys `customer_id`.
- Always add `created_at`, and consider a `deleted_at` column (soft delete).
- **Draw an ERD diagram** before coding: on paper or with a tool like dbdiagram.io.
