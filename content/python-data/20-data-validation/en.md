# Validating data with pandas

*Garbage in, garbage out.* A beautiful analysis on dirty data is still wrong. Professionals spend **most of their time on data**, and start with systematic **checks**.

## The checklist

| Check | pandas code |
|---|---|
| Size, time span | `df.shape`, `df["d"].min()/.max()` |
| Dtypes | `df.dtypes`, `pd.to_datetime(..., errors="coerce")` |
| Missing | `df.isna().sum()` |
| Duplicates | `df.duplicated(subset=[...]).sum()` |
| Out of range | `(df["amount"] <= 0).sum()`, `df["age"].between(0, 120)` |
| Foreign keys / orphans | `~df["user_id"].isin(users["id"])` |
| Business rules | purchase must be after signup |
| Valid value set | `set(df["status"]) <= {"new","paid","cancelled"}` |

![A data-quality checklist before analysis](/lessons/python-data/20-data-validation-fig-en.svg)
*A data-quality checklist before analysis*

## Turn checks into "contracts" with `assert`

```python
assert df["id"].is_unique, "duplicate ids"
assert df["amount"].gt(0).all(), "non-positive amounts"
```

Run at the start of each data load: the pipeline **stops immediately** when data violates the rules, instead of silently producing a wrong report. Libraries such as **pandera** and **Great Expectations** do this in a structured way.

## When you find problems

1. **Investigate the cause** (entry error? system bug?).
2. Decide: fix, drop, or keep with a note.
3. **Record** how many rows were affected and why; tell the data owner.
4. Never **silently delete** data.

## References

- pandas documentation, "Duplicate labels", "Working with missing data".
- Wickham, H. (2014). Tidy Data. *Journal of Statistical Software* 59(10).
- Great Expectations, pandera: official documentation.
