# Transforming columns: dates, apply, cut

After cleaning, the next step is to **create new information** from existing columns (basic feature engineering).

## Dates with `to_datetime` and `.dt`

Dates read from CSV are usually **text**. Convert to datetime to compute with them:

```python
df["date"] = pd.to_datetime(df["date"])
```

When a column is datetime, the `.dt` accessor exposes every component:

```python
df["date"].dt.year
df["date"].dt.month             # 1..12
df["date"].dt.day
df["date"].dt.day_name()        # 'Monday'
df["date"].dt.dayofweek         # 0 = Monday
df["date"].dt.to_period("M")    # by month: 2024-03
```

Computing differences:

```python
df["date"].max() - df["date"].min()          # a Timedelta
(df["date"] - pd.Timestamp("2024-01-01")).dt.days
```

You can also parse while loading: `pd.read_csv("sales.csv", parse_dates=["date"])`.

## Vectorized arithmetic between columns

```python
df["revenue"] = df["units"] * df["unit_price"]
df["revenue_k"] = (df["revenue"] / 1000).round(1)
```

This is the **fastest** way: always prefer it over loops or `apply`.

## map: replace values via a lookup table

```python
codes = {"North": "N", "South": "S", "East": "E", "West": "W"}
df["region_code"] = df["region"].map(codes)       # values absent from the table -> NaN
```

## apply: apply a function to each value / row

```python
df["product_len"] = df["product"].apply(len)
df["label"] = df["units"].apply(lambda u: "many" if u > 5 else "few")

# per ROW (axis=1): use when you need several columns at once
df["desc"] = df.apply(lambda r: f"{r['product']} x{r['units']}", axis=1)
```

> `apply` is many times slower than vectorized operations. Use it only when there's **no** vectorized way.

## Binning: pd.cut and pd.qcut

```python
df["size"] = pd.cut(
    df["revenue"],
    bins=[0, 200, 1000, np.inf],
    labels=["small", "medium", "large"],
    right=False,            # intervals like [0, 200) rather than (0, 200]
)

pd.qcut(df["revenue"], q=4, labels=["Q1", "Q2", "Q3", "Q4"])   # by QUANTILES: equal rows per group
```

- `cut`: edges **you choose**.
- `qcut`: edges **decided by the data** (groups of roughly equal size).

## np.select: many conditions

```python
conditions = [df["revenue"] < 200, df["revenue"] < 1000]
choices = ["small", "medium"]
df["size"] = np.select(conditions, choices, default="large")
```

Conditions are tested **top to bottom**, the first match wins (like `CASE WHEN` in SQL).

## One-hot encoding (preparing for Machine Learning)

```python
pd.get_dummies(df["region"], prefix="region")     # each region becomes a 0/1 column
```

## Summary

| Job | Tool |
|---|---|
| Compute from columns | Vectorized arithmetic |
| Replace values via a table | `map`, `replace` |
| Complex logic | `np.select`, `apply` |
| Bin numbers into intervals | `pd.cut`, `pd.qcut` |
| Dates and times | `to_datetime`, `.dt` |
