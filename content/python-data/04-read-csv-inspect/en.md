# Reading CSV and exploring data

In practice you rarely type data by hand: it comes from **CSV** files, Excel, databases or APIs. The first job is always to **read it in and see what's there**.

> In this course the file `sales.csv` is preloaded into the practice panel (60 orders, 7 columns). You read it with the path `"sales.csv"`.

## Reading a CSV

```python
import pandas as pd

df = pd.read_csv("sales.csv")
```

Handy `read_csv` options:

| Parameter | Effect |
|---|---|
| `sep=";"` | A separator other than a comma |
| `parse_dates=["date"]` | Convert a column to datetime |
| `usecols=["a", "b"]` | Read only a few columns |
| `dtype={"id": str}` | Force a column's type while reading |
| `na_values=["N/A", "-"]` | Treat these strings as missing |
| `nrows=100` | Read only the first 100 rows (to try a big file) |
| `encoding="utf-8"` | Character encoding (accented text needs `utf-8`) |

There are also `pd.read_excel`, `pd.read_json`, `pd.read_sql`.

![The inspection workflow after reading a CSV](/lessons/python-data/04-read-csv-inspect-fig-en.svg)
*The inspection workflow after reading a CSV*

## The standard "exploration" routine: always do all 5 steps

```python
df.shape            # 1. how many rows, columns?       (60, 7)
df.head()           # 2. look at the first few rows
df.info()           # 3. data types + non-null counts per column
df.describe()       # 4. numeric statistics: min, max, mean...
df.isna().sum()     # 5. how many missing per column?
```

`df.info()` immediately shows which columns have the **wrong type** (e.g. dates stored as text `object`) or **missing values**.

## Exploring categorical columns

```python
df["region"].unique()            # the distinct values
df["region"].nunique()           # how many distinct values
df["region"].value_counts()      # how often each value appears (sorted descending)
df["region"].value_counts(normalize=True)   # proportions instead of counts
df["region"].value_counts().idxmax()        # the most common value
```

## Exploring numeric columns

```python
df["units"].describe()           # count, mean, std, min, 25%, 50%, 75%, max
df["units"].min(), df["units"].max()
df["unit_price"].sum()
```

## The lesson's dataset

| Column | Meaning |
|---|---|
| `order_id` | Order number |
| `date` | Order date (01/2024 to 06/2024) |
| `region` | Region: North, South, East, West |
| `product`, `category` | Product and category |
| `units` | Quantity |
| `unit_price` | Unit price |

## Good analyst habits

1. **Don't trust data**: always check `shape`, types, missing values, odd values.
2. **Write down assumptions**: "revenue = units × unit price".
3. For big files, try a small slice first (`nrows=1000`).

Next lesson: selecting, filtering and sorting data.
