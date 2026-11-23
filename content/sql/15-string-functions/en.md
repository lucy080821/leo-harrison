# String functions: cleaning and splitting text

Real data is rarely clean: messy capitalisation, stray spaces, emails whose domain you need. **Cleaning and normalising strings** is often most of an analyst's time.

## The core functions

| Function | What it does | Example |
|---|---|---|
| `UPPER(s)`, `LOWER(s)` | change case | `UPPER('an')` → `AN` |
| `LENGTH(s)` | number of characters | `LENGTH('Hanoi')` → 5 |
| `TRIM(s)` | strip surrounding spaces | `TRIM('  a ')` → `a` |
| `SUBSTR(s, start, length)` | slice (positions start at **1**) | `SUBSTR('Hanoi', 1, 3)` → `Han` |
| `INSTR(s, t)` | position of t in s (0 if absent) | `INSTR('a@b.com','@')` → 2 |
| `REPLACE(s, old, new)` | substitute | `REPLACE('a b',' ','_')` → `a_b` |
| `a \|\| b` | **concatenate** (SQLite, PostgreSQL) | `'An' \|\| ' Nguyen'` |

> Note: concatenating with `NULL` yields `NULL`. Use `COALESCE(column, 'n/a')` first.

## Extracting an email domain

```sql
SELECT SUBSTR(email, INSTR(email, '@') + 1) AS domain FROM customers;
```

`INSTR` finds the `@`, `SUBSTR` takes what follows.

![Splitting an email domain with INSTR and SUBSTR](/lessons/sql/15-string-functions-fig-en.svg)
*Splitting an email domain with INSTR and SUBSTR*

## Pattern matching with LIKE

`LIKE` has two wildcards: `%` (any run of characters) and `_` (exactly one). `name LIKE 'An%'` starts with An; `email LIKE '%@example.com'` ends with the domain. SQLite's `LIKE` is **case-insensitive** for ASCII; in PostgreSQL use `ILIKE` for that.

## Professional uses

- **Normalise join keys**: `LOWER(TRIM(email))` before a `JOIN` to avoid case and whitespace mismatches.
- **Extract information** from text columns (order codes, URLs, domains).
- Avoid functions on indexed columns in `WHERE` (see the performance lesson): `WHERE LOWER(email) = ...` cannot use an ordinary index.

## References

- SQLite documentation, "Core Functions" and "LIKE operator", sqlite.org.
- ISO/IEC 9075 (SQL), string functions.
- Forta, B. *SQL in 10 Minutes, Sams Teach Yourself*.

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
