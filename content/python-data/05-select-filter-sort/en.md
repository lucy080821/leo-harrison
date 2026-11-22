# Selecting, filtering and sorting data

This is the group of operations you'll use most: **getting exactly the data you need** from a big table.

> The data: `sales.csv` with an extra column `revenue = units * unit_price` (each order's revenue).

## Selecting columns

```python
df["product"]                      # one column -> Series
df[["product", "units"]]           # several columns -> DataFrame
```

![Filtering rows with a boolean mask](/lessons/python-data/05-select-filter-sort-fig-en.svg)
*Filtering rows with a boolean mask*

## Selecting rows: loc and iloc

| | Based on | Example |
|---|---|---|
| `df.loc[...]` | **Labels** (index, column names) | `df.loc[0, "product"]` |
| `df.iloc[...]` | **Positions** (ordinal numbers) | `df.iloc[0, 3]` |

```python
df.loc[0, "product"]               # the row labelled 0, column "product"
df.loc[0:2, ["product", "units"]]  # loc: slices INCLUDING both ends (0, 1, 2)
df.iloc[0:3, 0:3]                  # iloc: slices like a list, NOT including 3
df.iloc[-1]                        # the last row
```

## Boolean filtering

A condition produces a true/false Series; pass it into `df[...]` to keep the `True` rows:

```python
big = df[df["units"] > 5]
north = df[df["region"] == "North"]
```

### Combining conditions: & | ~ and PARENTHESES

```python
df[(df["region"] == "North") & (df["units"] > 3)]          # AND
df[(df["region"] == "North") | (df["region"] == "South")]  # OR
df[~(df["region"] == "North")]                             # NOT
```

> Use `&`, `|`, `~` (**not** `and`, `or`, `not`) and **wrap each condition in parentheses**, otherwise you'll get an error.

### Handy: isin, between, str.contains

```python
df[df["region"].isin(["North", "East"])]
df[df["units"].between(3, 6)]                    # both ends included
df[df["product"].str.contains("top")]            # substring
```

### query: write the condition like a sentence

```python
df.query("region == 'North' and units > 3")
min_units = 5
df.query("units > @min_units")                   # @ uses an outside Python variable
```

## Sorting

```python
df.sort_values("revenue", ascending=False)           # descending
df.sort_values(["region", "revenue"], ascending=[True, False])   # several columns
df.nlargest(3, "revenue")                            # the 3 largest rows (fast, tidy)
df.nsmallest(3, "revenue")
```

## Counting and checking

```python
len(df[df["units"] > 5])         # number of matching rows
(df["units"] > 5).sum()          # another way: sum of the Trues
(df["units"] > 5).mean()         # the PROPORTION of matching rows
```

## Getting values out

```python
df["order_id"].tolist()          # Series -> list
df["order_id"].iloc[0]           # a single value
df.loc[df["revenue"].idxmax()]   # the whole row with the highest revenue
```

## Warning: SettingWithCopy

Filtering then editing the filtered result can trigger a warning; use `.copy()` or `df.loc[condition, "column"] = value`:

```python
df.loc[df["units"] > 5, "bulk"] = True
```
