# Vectorisation and performance: avoiding loops and apply

When a table has millions of rows, how you write code decides **seconds** versus **hours**. Rule number one of pandas/NumPy: **work on whole columns, don't loop over rows.**

## Why vectorisation is fast

A Python loop handles each element in the interpreter (slow). **Vectorisation** pushes the loop into NumPy's compiled C code working on contiguous memory, typically **10 to 100 times** faster.

| Slow | Fast |
|---|---|
| `for` over rows | `df["a"] * df["b"]` |
| `df.apply(f, axis=1)` | column operations, `np.where`, `np.select` |
| per-row `if/else` | `np.where(cond, x, y)`, `np.select([c1, c2], [v1, v2], default)` |
| `iterrows()` | `.str`, `.dt`, column operations |

![Vectorisation is tens of times faster than loops](/lessons/python-data/18-vectorization-performance-fig-en.svg)
*Vectorisation is tens of times faster than loops*

## When you still need `apply`

Logic too complex for column operations: use `apply`/your own function, but remember it is **slow**. Consider `numba` or rewriting with column operations.

## Dtypes and memory

- `astype("int16")`, `astype("float32")` cut memory by half/four when values are small enough.
- `category` for columns with few repeated values.
- Read big CSVs in **chunks** (`chunksize`) or only the needed columns (`usecols`).

## `query` and `eval`

`df.query("region == 'North' and units >= 10")` reads better than nested masks; on very large tables it can be faster through expression optimisation.

## Measure before optimising

Use `%timeit` (notebooks) or `time.perf_counter()`; optimise where it is **really** slow. Often reading data or grouping is the bottleneck, not the arithmetic.

## References

- McKinney, W. *Python for Data Analysis*, the performance chapter.
- NumPy documentation, "Broadcasting" and "Universal functions".
- VanderPlas, J. *Python Data Science Handbook*, chapter "High-Performance Pandas: eval() and query()".
