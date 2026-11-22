# Combining tables: merge and concat

Real data is often **scattered across several tables** (customers, orders, products). To analyse it you must **combine** them. In SQL that's `JOIN`; in pandas it's `merge`.

## merge: joining on keys

```python
customers = pd.DataFrame({"id": [1, 2, 3, 4], "name": ["An", "Binh", "Chi", "Dung"]})
orders = pd.DataFrame({
    "order_id": [101, 102, 103, 104, 105],
    "customer_id": [1, 1, 2, 3, 9],
    "amount": [50, 70, 20, 90, 10],
})

customers.merge(orders, left_on="id", right_on="customer_id", how="inner")
```

- `left_on` / `right_on`: the key column of the **left** / **right** table.
- If both tables **share the key column name**, just use `on="id"`.
- `how=`: the kind of join (see below).

![merge: join two tables on a shared key](/lessons/python-data/09-merge-concat-fig-en.svg)
*merge: join two tables on a shared key*

## The join kinds (how)

With left table `customers` (ids 1-4) and right table `orders` (customers 1, 1, 2, 3, 9):

| `how` | Keeps | Example result |
|---|---|---|
| `"inner"` | Only pairs that **match on both sides** | 4 rows (An×2, Binh, Chi) |
| `"left"` | **Every left row** + matching parts | 5 rows (adds Dung with NaN) |
| `"right"` | Every right row | 5 rows (customer 9's order has a NaN name) |
| `"outer"` | Every row from both sides | 6 rows |

Customer 1 has **2 orders** so appears **twice**: a **one-to-many** relationship. Check the row count after merging to make sure it didn't unexpectedly "blow up".

```python
merged = customers.merge(orders, left_on="id", right_on="customer_id", how="inner")
left = customers.merge(orders, left_on="id", right_on="customer_id", how="left")
left["amount"].isna().sum()        # customers with no orders
```

## Finding rows that DON'T match: indicator

```python
chk = customers.merge(orders, left_on="id", right_on="customer_id", how="outer", indicator=True)
chk["_merge"].value_counts()           # both / left_only / right_only
chk[chk["_merge"] == "right_only"]     # orders with no matching customer: bad data!
```

`indicator=True` adds a `_merge` column telling which side each row came from. Very useful for **spotting dirty data**.

## Different key names and clashing column names

```python
a.merge(b, on="id", suffixes=("_left", "_right"))     # suffixes when both tables share other column names
```

## Joining on the index: join

```python
customers.set_index("id").join(orders.set_index("customer_id"), how="left")
```

## concat: stacking tables

```python
pd.concat([df1, df2])                       # stack vertically (add rows), same columns
pd.concat([df1, df2], ignore_index=True)    # renumber the index
pd.concat([df1, df2], axis=1)               # side by side (add columns) by index
```

Common when combining several same-structured CSV files (e.g. one per month):

```python
frames = [pd.read_csv(f) for f in ["jan.csv", "feb.csv", "mar.csv"]]
all_data = pd.concat(frames, ignore_index=True)
```

## Comparison with SQL

| SQL | pandas |
|---|---|
| `INNER JOIN` | `merge(how="inner")` |
| `LEFT JOIN` | `merge(how="left")` |
| `UNION ALL` | `pd.concat([a, b])` |
| Anti-join (`LEFT JOIN ... IS NULL`) | `merge(indicator=True)` then filter `left_only` |

## Common mistakes

- **Mismatched key types** (a number in one table, text in the other) so nothing matches: check `dtypes`.
- **Duplicate keys in both tables** cause row "explosion" (a Cartesian product per group).
- Forgetting to check the row count and NaN count after merging.
