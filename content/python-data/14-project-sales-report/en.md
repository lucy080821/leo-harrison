# Project: a sales report

The final project of the **Python for Data Analysts** course. You'll do exactly an analyst's job: receive a sales data file, **clean → aggregate → visualize → draw conclusions**.

> The data: `sales.csv` (60 orders, 01/2024 to 06/2024). This lesson truly is the "capstone" combining every skill you've learned.

## The complete analysis workflow

```text
1. Understand the question   "How does revenue move? Which products contribute most?"
2. Load the data             pd.read_csv(..., parse_dates=["date"])
3. Explore                   shape, info, describe, isna, value_counts
4. Clean                     duplicates, missing, data types, normalizing text
5. Transform                 revenue = units * unit_price, month = date.dt...
6. Aggregate                 groupby / pivot_table
7. Visualize                 the right chart, with title + labels
8. Conclude                  put it into words: what do the numbers say? what to recommend?
```

## Steps 1-3: load and transform

```python
df = pd.read_csv("sales.csv", parse_dates=["date"])
df["revenue"] = df["units"] * df["unit_price"]
df["month"] = df["date"].dt.to_period("M").astype(str)       # '2024-01'
```

Define each order's revenue as $\text{revenue} = \text{units} \times \text{unit price}$.

## Step 6: the key numbers (KPIs)

```python
total_revenue = df["revenue"].sum()
avg_order     = df["revenue"].mean()
n_orders      = len(df)

monthly = df.groupby("month")["revenue"].sum()
by_region = df.groupby("region")["revenue"].sum().sort_values(ascending=False)
top_products = (df.groupby("product")["revenue"].sum()
                  .sort_values(ascending=False).head(3))
```

**Month-over-month growth** (% versus the previous month):

```python
growth = monthly.pct_change() * 100          # (R_t - R_{t-1}) / R_{t-1}
```

$$
\text{growth}_t = \frac{R_t - R_{t-1}}{R_{t-1}} \times 100\%
$$

**Share of contribution (Pareto):** a few products often create most of the revenue.

```python
share = df.groupby("product")["revenue"].sum().sort_values(ascending=False)
share_pct = (share / share.sum() * 100).round(1)
cumulative = share_pct.cumsum()              # cumulative: how many products make 80% of revenue?
```

## Step 7: visualization

```python
fig, axes = plt.subplots(1, 2, figsize=(12, 4))
monthly.plot(kind="bar", ax=axes[0], title="Revenue by month")
top_products.plot(kind="barh", ax=axes[1], title="Top 3 products")
plt.tight_layout()
plt.show()
```

Pick the right chart: **line/bar** for time, a **sorted horizontal bar** for rankings.

## Step 8: telling the story with data

A good report isn't just charts but **messages**. For example:

> "Six-month revenue reached X. The **South** region contributed the most (Y%). **Laptop** and **Phone** generate over Z% of revenue, so prioritize stock for these two items."

The structure to follow: **Finding → Evidence (numbers/charts) → Recommendation**.

## Ideas to extend (try them yourself)

- Build a `pivot_table` of revenue by **region × category** and draw a **heatmap** with `plt.imshow`.
- Compute the **average order value by region** and compare.
- Find the best-selling **weekday** (`dt.day_name()`).
- Detect **outlier orders** with the IQR rule.
- Write the steps as **functions** `load_data()`, `clean()`, `summarize()` for reuse and testing.
- Save results to CSV: `monthly.to_csv("monthly.csv")` or Excel `to_excel`.

## Congratulations!

You've completed the data-analysis path with Python: NumPy, pandas (load, clean, transform, group, merge, pivot), matplotlib and descriptive statistics. Together with **SQL** you now have the core toolkit of a Data Analyst. The next steps on the path are **Math for Machine Learning** and **Machine Learning**.
