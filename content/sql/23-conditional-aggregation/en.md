# Conditional aggregation and pivot tables

`GROUP BY` yields **one row per group**. Reports often need **several columns**: revenue per quarter, users per channel side by side. The standard technique: **conditional aggregation** with `CASE`.

## The template

```sql
SUM(CASE WHEN condition THEN value ELSE 0 END)
COUNT(CASE WHEN condition THEN 1 END)      -- COUNT ignores NULL
```

Each `CASE` decides whether a row "contributes" to that column; `SUM` adds the contributions.

## Turning rows into columns (pivot)

```sql
SELECT country,
  SUM(CASE WHEN channel='organic' THEN 1 ELSE 0 END) AS organic,
  SUM(CASE WHEN channel='ads'     THEN 1 ELSE 0 END) AS ads
FROM users GROUP BY country;
```

![SUM(CASE …) turns rows into columns](/lessons/sql/23-conditional-aggregation-fig-en.svg)
*SUM(CASE …) turns rows into columns*

From "long" form (one row per country–channel pair) to "wide" form (one column per channel), easier for reports. Limitation: **column names must be known in advance** (standard SQL has no dynamic pivot).

## Ratios and shares

`100.0 * SUM(CASE …) / COUNT(*)`: write `100.0` so the division is **floating point** (dividing two integers in SQL gives an integer!). Examples: conversion rate, cancellation rate, one channel's share of the total.

## Professional uses

- KPI tables by period/region/channel in one query.
- Counting by status (new, in progress, done) for each group.
- Easy to check: the columns must sum to `COUNT(*)`.
- PostgreSQL has `FILTER (WHERE …)`: `COUNT(*) FILTER (WHERE channel = 'ads')`; SQLite supports this syntax too.

## References

- Beaulieu, A. *Learning SQL*, chapter 11 (Conditional Logic).
- SQLite documentation, "Aggregate Functions: FILTER clause", sqlite.org.
- Celko, J. *SQL for Smarties*, cross-tab sections.

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
