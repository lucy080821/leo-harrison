# Project: a KPI query set for a dashboard

The final lesson pulls every skill into a real product: a **KPI query set** feeding a dashboard (Cerno, Power BI, Looker…). The data analyst's job.

## The workflow

1. **Agree the metrics and definitions** with the dashboard's users: by which signup date are "new users" counted? Does "revenue" include refunds?
2. **Settle the grain and sources**: which tables, by month/week/channel.
3. **Write each block as a CTE**, checking it against known figures.
4. **Combine** into a final query friendly to BI tools (clear column names, consistent types).
5. **Check quality** (lesson 24) and performance (lesson 31).

![KPI queries for a sales-and-product dashboard](/lessons/sql/39-project-kpi-dashboard-fig-en.svg)
*KPI queries for a sales-and-product dashboard*

## A typical metric set for a digital product

| Group | Metric | Suggested calculation |
|---|---|---|
| Acquisition | new users | `COUNT` by signup month |
| Activation | share with a first action | funnel (lesson 26) |
| Revenue | revenue, **ARPPU** (revenue / paying users) | `SUM(amount) / COUNT(DISTINCT user_id)` |
| Conversion | buyers / users | `100.0 * buyers / users` |
| Retention | month-2 retention | cohort (lesson 25) |
| Segments | RFM | NTILE (lesson 27) |

## Things to watch

- **Ratio metrics** are recomputed from numerator and denominator when aggregated across dimensions.
- **Consistent time boundaries** (time zones; for an unfinished month note "incomplete month").
- Show the **data refresh date** next to the dashboard.

## References

- Croll, A. & Yoskovitz, B. *Lean Analytics*.
- Few, S. *Information Dashboard Design*.
- Kimball, R. *The Data Warehouse Toolkit*.

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
