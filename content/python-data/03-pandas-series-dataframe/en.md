# pandas (1): Series and DataFrame

**pandas** is the number-one library for **analysing tabular data** in Python, like Excel or an SQL table but programmable. It's built on NumPy.

> You'll use pandas daily as a Data Analyst. This course goes from the basics to a complete report.

## Two core structures

| | What it is | Like |
|---|---|---|
| **Series** | One labelled **column** of data (with an index) | An Excel column |
| **DataFrame** | A **table** of several Series sharing an index | An Excel sheet / SQL table |

## Series

```python
import pandas as pd

s = pd.Series([10, 20, 30], index=["a", "b", "c"])
s["b"]            # 20
s * 2             # multiplies the whole column (vectorized like NumPy)
s.mean()
```

## DataFrame

The most common way to create one: from a **dictionary** (key = column name, value = that column's list).

```python
df = pd.DataFrame({
    "name": ["An", "Binh", "Chi"],
    "age": [20, 30, 40],
    "city": ["Hanoi", "Hue", "Hanoi"],
})
```

```text
   name  age   city
0    An   20  Hanoi
1  Binh   30    Hue
2   Chi   40  Hanoi
```

The left column (0, 1, 2) is the row **index**.

## A quick look at a table

```python
df.shape           # (3, 3)         (rows, columns)
df.columns         # the column names
df.dtypes          # each column's data type
df.head(2)         # the first 2 rows (default 5)
df.tail(2)         # the last 2 rows
df.info()          # structure summary and non-null counts
df.describe()      # descriptive statistics for numeric columns
```

## Selecting by column

```python
df["age"]               # ONE column -> Series
df[["name", "age"]]     # SEVERAL columns -> DataFrame (double brackets)
df["age"].mean()        # 30.0
df["city"].unique()     # distinct values
```

## Adding and changing columns

Operations between columns apply **row by row** (vectorized):

```python
df["age_next_year"] = df["age"] + 1
df["total"] = df["price"] * df["qty"]
df["is_adult"] = df["age"] >= 18
df = df.rename(columns={"age": "years"})
df = df.drop(columns=["city"])
```

## Quick column statistics

```python
df["age"].sum(), df["age"].mean(), df["age"].median()
df["age"].min(), df["age"].max(), df["age"].std()
df["city"].value_counts()      # count rows per value
```

## From a list of dicts

```python
rows = [{"name": "An", "age": 20}, {"name": "Binh", "age": 30}]
pd.DataFrame(rows)
```

## Notes

- Most operations **return a new DataFrame** instead of editing in place. To keep the result, **reassign**: `df = df.drop(...)`.
- The default index is 0, 1, 2...; you can make another column the index: `df.set_index("name")`.
- A DataFrame has `.to_dict()`, `.to_csv()`, `.to_numpy()` to export it.
