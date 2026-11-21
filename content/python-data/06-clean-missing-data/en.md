# Cleaning data

Real data is **always dirty**: blank cells, duplicate rows, inconsistent text, wrong types. Analysts commonly spend **60-80% of their time** cleaning. Analysing dirty data gives **wrong** conclusions very convincingly.

> This lesson uses `sales_dirty.csv`: a deliberately damaged `sales.csv` (missing `units`, missing `category`, messy `region`, 3 duplicate rows).

## Step 1: detect the problems

```python
df = pd.read_csv("sales_dirty.csv")
df.shape                       # (63, 7)
df.isna().sum()                # MISSING cells per column
df.duplicated().sum()          # rows that EXACTLY repeat an earlier one
df["region"].unique()          # instantly shows messy 'south', ' East '...
df.describe()                  # odd values, outliers?
```

## Missing data (NaN)

pandas uses `NaN` for blank cells.

```python
df.isna()                      # a True/False table
df["units"].isna().sum()       # 5
df[df["units"].isna()]         # view the rows with missing values
```

Three ways to handle it, depending on the case:

| Approach | When | Example |
|---|---|---|
| **Drop the rows** | Few missing, or the column is essential | `df.dropna(subset=["category"])` |
| **Fill in a value** | A sensible replacement exists | `df["units"].fillna(df["units"].median())` |
| **Leave NaN** | Missingness is itself information | pandas skips it when averaging |

Choosing the fill value: the **median** is more robust to outliers than the **mean**; for categorical columns use the **most common value** (`mode()[0]`) or `"Unknown"`.

```python
df["units"] = df["units"].fillna(df["units"].median())
df["category"] = df["category"].fillna("Unknown")
```

> There's no absolutely "right" way: **document** how you handled it and why.

## Duplicate rows

```python
df.duplicated().sum()                         # count
df = df.drop_duplicates()                     # drop, keeping the first occurrence
df = df.drop_duplicates(subset=["order_id"])  # duplicates by a key column
```

## Normalizing strings

```python
df["region"] = df["region"].str.strip()       # strip surrounding whitespace
df["region"] = df["region"].str.title()       # 'south' -> 'South'
df["region"] = df["region"].str.lower()
df["region"] = df["region"].replace({"N": "North", "S": "South"})
```

`str.` opens string methods applied to a **whole column**: `str.contains`, `str.replace`, `str.split`, `str.len`...

## Fixing data types

```python
df["units"] = df["units"].astype(int)                 # error if NaN remain!
df["date"] = pd.to_datetime(df["date"])               # string -> date
df["price"] = pd.to_numeric(df["price"], errors="coerce")   # unconvertible text -> NaN
```

## Outliers

```python
q1, q3 = df["units"].quantile([0.25, 0.75])
iqr = q3 - q1
mask = df["units"].between(q1 - 1.5 * iqr, q3 + 1.5 * iqr)
df = df[mask]
```

(The Statistics lesson covers this in more depth.)

## A cleaning pipeline

```python
clean = (
    df.drop_duplicates()
      .assign(region=lambda d: d["region"].str.strip().str.title())
      .dropna(subset=["category"])
)
```

Chain steps with dots, one per line: **readable and easy to check**.

## Verifying after cleaning

```python
clean.isna().sum().sum()           # 0 ?
clean.duplicated().sum()           # 0 ?
clean["region"].unique()           # only the 4 standard regions ?
```
