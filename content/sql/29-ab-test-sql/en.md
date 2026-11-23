# Analysing A/B tests with SQL

Experiment data usually lives in the warehouse, so many A/B analysis steps are done directly in SQL. This lesson joins **statistics (the two-proportion test)** to **SQL skills**.

## Step 1: aggregate by group

```sql
SELECT grp, COUNT(*) AS n, SUM(converted) AS conv,
       1.0 * SUM(converted) / COUNT(*) AS rate
FROM assignments GROUP BY grp;
```

(Write `1.0 *` so the division is floating point.)

## Step 2: the difference and standard error

Let pA, pB be the rates and nA, nB the group sizes.

- Difference: `d = pB − pA`.
- Standard error (unpooled, for the interval): `SE = sqrt(pA(1 − pA)/nA + pB(1 − pB)/nB)`.
- 95% confidence interval: `d ± 1.96·SE`.
- Test z-score (using the pooled rate p): `z = d / sqrt(p(1 − p)(1/nA + 1/nB))`; |z| > 1.96 ⇒ p < 0.05.

![A/B test analysis directly in SQL](/lessons/sql/29-ab-test-sql-fig-en.svg)
*A/B test analysis directly in SQL*

## What to do in SQL, what outside

- **SQL**: assigning groups, removing abnormal records, counting users/units per group, checking **SRM** (does the group split match the design?).
- **Python/R**: exact p-values, bootstrap intervals, multiple-comparison corrections, charts.

## Checks before trusting results

1. **Was assignment random?** Compare group traits (country, channel) before the test.
2. **SRM**: group sizes match the designed ratio (χ² test).
3. **Unit of analysis**: users, not page views.
4. **Run time**: whole weeks, enough sample (the power lesson).
5. **One primary metric**, declared in advance.

## References

- Kohavi, R., Tang, D., Xu, Y. *Trustworthy Online Controlled Experiments* (2020).
- Diez et al. *OpenIntro Statistics*, chapter 6.
- Learn With Leo's "Math and Statistics" course: the lessons on testing, power and A/B experiments.

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
