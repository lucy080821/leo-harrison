# Text and categorical data in pandas

Real data holds a lot of **text**: names, addresses, comments, product codes. pandas handles **a whole column at once** (vectorised) with the `.str` accessor, no loops needed.

## Handy `.str` methods

| Task | Example |
|---|---|
| normalise | `s.str.strip().str.lower()` |
| search | `s.str.contains("battery", case=False)` |
| replace | `s.str.replace(r"\s+", " ", regex=True)` |
| split | `s.str.split("-", expand=True)` (into several columns) |
| extract a pattern | `s.str.extract(r"(\d+)")` (regex with a group) |
| length, starts/ends | `s.str.len()`, `s.str.startswith("A")` |

`NaN` is skipped naturally; add `na=False` to `contains` so a filter mask has no `NaN`.

![The .str accessor transforms a whole text column](/lessons/python-data/15-strings-categories-fig-en.svg)
*The .str accessor transforms a whole text column*

## The `category` dtype

Columns with few repeated values (channel, country, status) should become `category`: it stores **integer codes** plus the list of values, **saving memory** and speeding up grouping. You can set an **order** (`pd.Categorical(..., ordered=True)`) for ordinal data like "low < medium < high" so sorting and comparison work properly.

## Professional habits

- **Normalise before joining**: `str.strip().str.lower()` on join keys to avoid case and whitespace mismatches.
- Use **regex** to extract codes from messy strings, then check with `value_counts()`.
- Don't use `apply` with a Python function when a `.str` method exists (much slower).

## References

- pandas documentation, "Working with text data" and "Categorical data", pandas.pydata.org.
- McKinney, W. *Python for Data Analysis* (3rd ed., O'Reilly), chapter 7.
- Python documentation, the `re` module.
