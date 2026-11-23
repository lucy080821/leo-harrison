# Business analysis patterns: Pareto, share of total, YoY

Once you know the syntax, an analyst's value lies in **good questions** and **familiar calculation patterns**. Here are the ones that appear in nearly every report.

## 1. Share of total

```sql
revenue * 100.0 / SUM(revenue) OVER ()
```

`SUM() OVER ()` (an empty window) gives the **whole-table total on every row** with no subquery. Use it for revenue mix by channel, internal market share.

## 2. Pareto (the 80/20 rule)

Vilfredo Pareto (1896) observed that 80% of land belonged to 20% of the population. In business a few products/customers often produce most of the revenue. Method: sort by revenue descending, compute the **cumulative share**, find where it reaches 80%.

![Pareto, share of total and period growth](/lessons/sql/37-analytical-patterns-fig-en.svg)
*Pareto, share of total and period growth*

Use it to **prioritise**: the customers generating 80% of revenue deserve dedicated service; should the "long tail" of products be cut?

## 3. Period growth

This month vs last month (MoM), vs the same period last year (YoY) with `LAG` (window functions lesson 3). Always show the **absolute value** too: +200% from 1 to 3 is not like +20% from 1,000 to 1,200.

## 4. Top-N and "the rest"

Top 5 products plus the remainder grouped as "Other" for a tidy chart: use `ROW_NUMBER`, `CASE WHEN rn <= 5 THEN name ELSE 'Other' END`, then regroup.

## 5. Versus target / average

Actual revenue / target; each store versus the **company average** (`AVG(x) OVER ()`).

## Warnings

- Shares of a **wrong total** (filtered or not?): fix the denominator first.
- **Ratio** metrics don't add: recompute from numerator and denominator when combining.
- Every KPI table should carry its **definition** and **time window**.

## References

- Pareto, V. (1896). *Cours d'économie politique*.
- Koch, R. *The 80/20 Principle*.
- Beaulieu, A. *Learning SQL* (3rd ed.), chapter 16.

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
