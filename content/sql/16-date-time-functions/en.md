# Dates and times: grouping by month, week and measuring gaps

Business analysis is always tied to **time**: revenue by month, time from signup to purchase, last active day. SQLite stores dates as ISO text `YYYY-MM-DD` (or numbers), so the functions below are the main tools.

## Key functions

- `date('2024-05-03', '+7 days')` → `2024-05-10`; `date('now')` is today. Modifiers: `'-1 month'`, `'start of month'`, `'weekday 1'`.
- `strftime(format, date)`: `'%Y'` year, `'%Y-%m'` month, `'%W'` week of year, `'%w'` weekday (0 = Sunday).
- `julianday(date)`: a continuous day count; **the difference of two values is the number of days between the dates**.

## Grouping by period

```sql
SELECT strftime('%Y-%m', purchase_date) AS month, SUM(amount) AS revenue
FROM purchases GROUP BY month ORDER BY month;
```

![Grouping revenue by month with strftime](/lessons/sql/16-date-time-functions-fig-en.svg)
*Grouping revenue by month with strftime*

## Time gaps

```sql
julianday(later_date) - julianday(earlier_date)   -- days
```

Professional example: **time to first purchase** shows which channel gets users to a buying decision faster.

## Pitfalls

- **Time zones**: data is often stored in UTC; convert before cutting by day.
- **Months with no data**: `GROUP BY` only returns months that *have rows*; to get every month you need a calendar table or a recursive CTE (a later lesson).
- **Non-standard text dates** (`3/5/2024`) break sorting. Normalise to `YYYY-MM-DD` early.
- Dialects differ: PostgreSQL uses `DATE_TRUNC('month', d)`, `d + INTERVAL '7 days'`; MySQL uses `DATE_FORMAT`, `DATEDIFF`.

## References

- SQLite documentation, "Date And Time Functions", sqlite.org.
- ISO 8601: representation of dates and times.
- Beaulieu, A. *Learning SQL* (O'Reilly), chapter on temporal data.

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
