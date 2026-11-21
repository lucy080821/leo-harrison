# Project: sales analysis

This is a **capstone** lesson: you play the shop's data analyst and answer business questions in SQL. Every skill from the course gets used.

## The analyst's workflow

1. **Understand the question** precisely: "revenue" counts which orders? (completed or all?) over what time?
2. **Explore the data:** `SELECT * ... LIMIT 5`, count rows, view distinct values (`DISTINCT`).
3. **Build the query step by step:** add a JOIN and check the row count, add WHERE, only then GROUP BY.
4. **Sanity-check the result:** do the group totals add up to the overall total? Does the number look plausible?
5. **Present:** give columns readable names and a sensible order.

## The revenue formula

Each `order_items` row contributes $\text{quantity} \times \text{price}$ to revenue, so

$$
\text{Revenue} = \sum \text{quantity}_i \times \text{price}_i
$$

```sql
SUM(oi.quantity * p.price) AS revenue
```

You need three tables: `orders` (date, status) → `order_items` (quantity) → `products` (price).

## Query pattern: revenue by group

```sql
SELECT p.category, SUM(oi.quantity * p.price) AS revenue
FROM order_items oi
JOIN products p ON p.id = oi.product_id
GROUP BY p.category
ORDER BY revenue DESC;
```

## Practice questions to try yourself

Try answering these, each with a different technique:

| Question | Suggested technique |
|---|---|
| Which customer spends the most? | JOIN + GROUP BY + CTE |
| What % of orders were cancelled? | `CASE` + `SUM` / `COUNT` |
| How much did each month grow vs the previous? | `LAG()` window function |
| Which products never sold? | `LEFT JOIN ... IS NULL` |
| For each city, who is the biggest buyer? | `ROW_NUMBER() OVER (PARTITION BY ...)` |
| What's the average order value? | A CTE of each order's total, then `AVG` |
| Which products are often bought together? | Self-join `order_items` on `order_id` |

Month-over-month growth example:

```sql
WITH monthly AS (
  SELECT strftime('%Y-%m', o.order_date) AS month,
         SUM(oi.quantity * p.price) AS revenue
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  JOIN products p ON p.id = oi.product_id
  WHERE o.status = 'completed'
  GROUP BY month
)
SELECT month, revenue,
       ROUND((revenue - LAG(revenue) OVER (ORDER BY month)) * 100.0
             / LAG(revenue) OVER (ORDER BY month), 1) AS growth_pct
FROM monthly;
```

Growth is computed as

$$
\text{growth} = \frac{R_t - R_{t-1}}{R_{t-1}} \times 100\%
$$

## Congratulations!

You've gone from your first `SELECT` to window functions, CTEs and database design. With this foundation you can build real reports on any database system (PostgreSQL, MySQL, BigQuery, SQL Server): the syntax differs a little, the thinking is identical. The next step on the Data path is **Python for Data Analysts**, where you combine SQL with pandas.
