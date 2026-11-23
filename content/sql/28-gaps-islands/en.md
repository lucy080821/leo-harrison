# Streaks: gaps and islands

Many questions are **"how many consecutive days"**: login streaks, days without orders, periods a machine ran without fault. These are **islands** and **gaps** problems.

## The row-number-difference trick

For one person's sorted **distinct** dates, two quantities each rise by 1 per row when the dates are **consecutive**:

- `ROW_NUMBER()` (1, 2, 3, …)
- `julianday(date)`

So `julianday(date) − ROW_NUMBER()` is **constant within a streak** and **jumps** at a gap. Use the difference as a grouping key:

```sql
SELECT user_id, MIN(d), MAX(d), COUNT(*)
FROM (SELECT user_id, d,
        julianday(d) - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY d) AS grp
      FROM days)
GROUP BY user_id, grp;
```

![Consecutive-day streaks with the row-number difference trick](/lessons/sql/28-gaps-islands-fig-en.svg)
*Consecutive-day streaks with the row-number difference trick*

Each `grp` is an **island**: start date, end date, length. The **longest** streak = `MAX` length per person.

## Gaps with LAG

`LAG(d)` gives the previous active date; `d − LAG(d)` > 1 means a gap. Use it to find **inactive periods** and the time between purchases (repurchase cycles).

## Notes

- **De-duplicate dates** first (`DISTINCT`), or `ROW_NUMBER` counts duplicates and breaks the difference.
- For "consecutive weeks" group to weeks first, then number them.
- Uses: language-app-style "streak" metrics, detecting service interruptions, device downtime.

## References

- Itzik Ben-Gan. *T-SQL Window Functions* (Gaps and Islands chapter).
- Celko, J. *SQL for Smarties*.
- SQLite documentation, "Window Functions", sqlite.org.

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
