# Grouping and aggregating with groupby

`groupby` is pandas's **number-one analysis tool**: it answers every question of the form "**for each ..., what is ...?**". If you've learned SQL, this is exactly `GROUP BY`.

## The "split-apply-combine" mindset

```text
     df                   split by region            apply sum              combine
┌────────┬─────┐       ┌────────┬─────┐
│ North  │ 100 │       │ North  │ 100 │ ┐
│ South  │  50 │  ───▶ │ North  │ 200 │ ┴─▶ North: 300     ┌────────┬─────┐
│ North  │ 200 │       ├────────┼─────┤                    │ North  │ 300 │
│ South  │  30 │       │ South  │  50 │ ┐                  │ South  │  80 │
└────────┴─────┘       │ South  │  30 │ ┴─▶ South:  80     └────────┴─────┘
                       └────────┴─────┘
```

## Basic syntax

```python
df.groupby("region")["revenue"].sum()
```

Three parts: **group by which column** → **which column to compute** → **what to compute**.

```python
df.groupby("region")["revenue"].sum()         # total
df.groupby("region")["revenue"].mean()        # average
df.groupby("region")["revenue"].count()       # non-null row count
df.groupby("region").size()                   # rows per group
df.groupby("region")["units"].max()
```

The result is a **Series** indexed by group name. Turn it into a plain table with `.reset_index()` or `as_index=False`.

## Several statistics: agg

```python
df.groupby("region")["revenue"].agg(["sum", "mean", "count"])
```

### Naming result columns yourself (named aggregation): recommended

```python
summary = df.groupby("category").agg(
    orders=("order_id", "count"),
    total_units=("units", "sum"),
    avg_price=("unit_price", "mean"),
)
```

The syntax `new_name=("source_column", "function")` gives a clean, readable result.

## Grouping by several columns

```python
df.groupby(["region", "category"])["revenue"].sum()
df.groupby(["region", "category"], as_index=False)["revenue"].sum()
```

The result has a **multi-level index** (MultiIndex); `unstack()` moves the inner level into columns (see the Pivot lesson).

## Sorting and taking the top

```python
(df.groupby("product")["revenue"].sum()
   .sort_values(ascending=False)
   .head(3))
```

## Share of the total

```python
rev = df.groupby("region")["revenue"].sum()
share = (rev / rev.sum() * 100).round(1)       # each region's % contribution
```

## transform: keep the row count

`agg` collapses each group into **one row**. `transform` computes per group but returns the **same number of rows** as the original table, the equivalent of a window function in SQL:

```python
df["region_total"] = df.groupby("region")["revenue"].transform("sum")
df["pct_of_region"] = df["revenue"] / df["region_total"] * 100
```

## Comparison with SQL

| SQL | pandas |
|---|---|
| `SELECT region, SUM(revenue) FROM t GROUP BY region` | `df.groupby("region")["revenue"].sum()` |
| `HAVING SUM(revenue) > 1000` | Filter the result: `s[s > 1000]` |
| `ORDER BY ... DESC LIMIT 3` | `.sort_values(ascending=False).head(3)` |
| `SUM(x) OVER (PARTITION BY r)` | `groupby("r")["x"].transform("sum")` |

## Common mistakes

- Forgetting `["column"]` so it computes on **every column** (including text) giving a messy table.
- Forgetting `.reset_index()` then wondering why the group column "disappeared" from the regular columns.
- Averaging **averages** (wrong when groups differ in size): compute on the raw data.
