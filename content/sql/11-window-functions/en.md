# Window functions

`GROUP BY` **collapses** many rows into one. A **window function** is different: it computes **over a group of related rows** but **keeps every row**. It's one of the most important tools for a data analyst.

## Syntax

```sql
function(...) OVER (
  PARTITION BY group_column      -- split into "windows" (optional)
  ORDER BY sort_column           -- order inside the window (optional)
)
```

![Window functions keep every row and add a computed column](/lessons/sql/11-window-functions-fig-en.svg)
*Window functions keep every row and add a computed column*

## Ranking

```sql
SELECT name, salary,
  RANK() OVER (ORDER BY salary DESC) AS salary_rank
FROM employees;
```

| Function | Behaviour on ties (salaries 2300, 2300) |
|---|---|
| `ROW_NUMBER()` | A **unique** sequence: 6, 7 |
| `RANK()` | **Tied, skips numbers**: 6, 6, then 8 |
| `DENSE_RANK()` | **Tied, no gaps**: 6, 6, then 7 |

## PARTITION BY: splitting windows

Like `GROUP BY` but **without collapsing rows**:

```sql
SELECT name, department_id, salary,
  RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_rank
FROM employees;
```

The rank **restarts at 1 in each department**.

**Top N per group** (a very common pattern): wrap in a CTE then filter:

```sql
WITH ranked AS (
  SELECT name, department_id, salary,
    ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rn
  FROM employees
)
SELECT * FROM ranked WHERE rn <= 2;         -- the 2 top earners per department
```

(You can't filter `WHERE rn <= 2` in the same `SELECT` because window functions are computed after `WHERE`.)

## Aggregates as window functions

```sql
SELECT name, salary,
  SUM(salary) OVER ()                               AS total_payroll,
  salary * 100.0 / SUM(salary) OVER ()              AS pct_of_total,
  AVG(salary) OVER (PARTITION BY department_id)     AS dept_avg
FROM employees;
```

An empty `OVER ()` means the window is the **whole table**.

**Running total**:

```sql
SELECT id, salary,
  SUM(salary) OVER (ORDER BY id) AS running_total
FROM employees;
```

## Looking at the previous/next row: LAG and LEAD

```sql
SELECT id, name, hire_date,
  LAG(name)  OVER (ORDER BY hire_date) AS hired_before_me,
  LEAD(name) OVER (ORDER BY hire_date) AS hired_after_me
FROM employees;
```

Very useful for comparing with the **previous period** (month-over-month growth): `revenue - LAG(revenue) OVER (ORDER BY month)`.

## Summary

| | `GROUP BY` | Window function |
|---|---|---|
| Result rows | One row per group | **Row count unchanged** |
| Use for | Summary reports | Ranking, ratios, running totals, vs previous period |
