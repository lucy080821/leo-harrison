# Pivot, melt and crosstab

A table's shape decides whether analysis is easy or hard. This lesson teaches how to **rotate** a table between two forms:

| Form | Description | Example |
|---|---|---|
| **Long / tidy** | Each row is **one observation** | `name, subject, score` (one row per score) |
| **Wide** | Each value of a variable gets **its own column** | `name, math, physics` |

The **long** form is convenient for `groupby` and plotting; the **wide** form is convenient for **reading** as a report table.

## pivot_table: long to wide (with aggregation)

Like an **Excel PivotTable**:

```python
pivot = df.pivot_table(
    index="region",          # the ROWS
    columns="category",      # the COLUMNS
    values="revenue",        # the values to compute
    aggfunc="sum",           # what to compute: sum, mean, count, max, "median"...
    fill_value=0,            # cells with no data -> 0 instead of NaN
)
```

```text
category   Accessories  Electronics  Furniture  Stationery
region
East               ...          ...        ...         ...
North              ...          ...        ...         ...
```

Add row and column totals: `margins=True`.

```python
df.pivot_table(index="region", columns="category", values="revenue",
               aggfunc="sum", margins=True, margins_name="Total")
```

Several functions at once: `aggfunc=["sum", "mean"]`. Several row levels: `index=["region", "product"]`.

![pivot: from long format to wide format](/lessons/python-data/10-pivot-reshape-fig-en.svg)
*pivot: from long format to wide format*

## groupby + unstack: the second way

```python
df.groupby(["region", "category"])["revenue"].sum().unstack(fill_value=0)
```

Both give the same result; `pivot_table` is shorter when you need aggregation.

## crosstab: a cross frequency table

Counts rows by **two categorical columns**:

```python
pd.crosstab(df["region"], df["category"])
pd.crosstab(df["region"], df["category"], normalize="index")   # proportions per row
```

## melt: wide to long ("unpivot")

```python
wide = pd.DataFrame({"name": ["An", "Binh"], "math": [8, 6], "physics": [9, 7]})

long = wide.melt(id_vars="name", var_name="subject", value_name="score")
```

```text
   name  subject  score
0    An     math      8
1  Binh     math      6
2    An  physics      9
3  Binh  physics      7
```

- `id_vars`: columns **kept as-is** as identifiers.
- The other columns are "melted" into two columns: the **old column name** (`var_name`) and the **value** (`value_name`).

Once long, you can easily group and plot:

```python
long.groupby("subject")["score"].mean()
```

## Back to wide without aggregation: pivot

```python
long.pivot(index="name", columns="subject", values="score")
```

`pivot` does **no aggregation**: every (row, column) pair must be **unique** or it errors (then use `pivot_table`).

## Which to use when?

| Job | Tool |
|---|---|
| A "region × category" report table with totals | `pivot_table` |
| Counting combinations of two categorical variables | `crosstab` |
| Preparing to plot or groupby | `melt` |
| Back to wide, no summing | `pivot` |
