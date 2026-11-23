# Cohort analysis and retention

The total number of "active users" can rise only because we keep attracting new people while older ones leave. **Cohort analysis** separates the two: group users by **when they started** and follow each group through time.

## Concepts

- **Cohort**: a group of users sharing a starting point (signup month, acquisition channel).
- **Months since signup** (age): 0, 1, 2…
- **Retention** at month k = cohort members still active in month k / cohort size.

## The SQL recipe

1. Give each user a `cohort_month` from the signup date.
2. Take the **distinct** (user, active month) pairs (`DISTINCT`).
3. Compute `age = months between the active month and cohort_month`.
4. `COUNT(DISTINCT user_id)` by (cohort, age), divided by the cohort size.

```sql
(CAST(strftime('%Y', a) AS INT) - CAST(strftime('%Y', c) AS INT)) * 12
 + CAST(strftime('%m', a) AS INT) - CAST(strftime('%m', c) AS INT)
```

![Retention table by signup-month cohort](/lessons/sql/25-cohort-retention-fig-en.svg)
*Retention table by signup-month cohort*

## Reading a retention table

Each **row** is a cohort, each **column** a month since signup; often drawn as a heat map. Look for: (1) whether the **curve drops** fast or slowly (does the product have "long-term value"?); (2) whether newer cohorts are **better or worse** than older ones (did improvements work?); (3) which **channel's** cohorts retain best.

## Pitfalls

- **Tiny cohorts** give wildly varying rates; group by quarter.
- **Recent cohorts** lack observation time: don't compare them with older cohorts at ages they haven't reached.
- Define "active" clearly (viewed a page? purchased?).

## References

- Ries, E. *The Lean Startup* (on cohort analysis and actionable metrics).
- Croll, A. & Yoskovitz, B. *Lean Analytics* (O'Reilly).
- Fader, P. & Hardie, B. (2010). Customer-base valuation in a contractual setting. *Marketing Science* 29(1).

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
