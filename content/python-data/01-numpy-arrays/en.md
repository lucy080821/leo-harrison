# NumPy (1): ndarray arrays

> The panel on the right runs **real Python** with NumPy. The first time you `import numpy`, the library is downloaded (a few seconds).

**NumPy** is the foundation of the entire Python data-science ecosystem (pandas, matplotlib, scikit-learn... are all built on it). It provides the **multi-dimensional array** `ndarray` and whole-array operations that are **tens to hundreds of times faster** than plain Python loops.

## Why not lists?

| | `list` | `ndarray` |
|---|---|---|
| Element type | Mixed | **A single type** (fast, compact) |
| Whole-array maths | Needs a loop | `a * 2`, `a + b` directly |
| Many dimensions | Nested lists | Standard support (matrices, tensors) |

![NumPy 1-D and 2-D arrays and the shape attribute](/lessons/python-data/01-numpy-arrays-fig-en.svg)
*NumPy 1-D and 2-D arrays and the shape attribute*

## Creating arrays

```python
import numpy as np

a = np.array([1, 2, 3, 4, 5])          # from a list
np.arange(1, 11)                       # 1..10 (like range)
np.arange(0, 1, 0.25)                  # 0, 0.25, 0.5, 0.75
np.linspace(0, 1, 5)                   # 5 EVENLY spaced points from 0 to 1 (both ends included)
np.zeros((2, 3))                       # a 2x3 matrix of zeros
np.ones(4)
np.full((2, 2), 7)
np.eye(3)                              # identity matrix
np.random.default_rng(0).random(3)     # random numbers (seeded)
```

## Key attributes

```python
a = np.arange(1, 13).reshape(3, 4)
a.shape       # (3, 4)   rows, columns
a.ndim        # 2        number of dimensions
a.size        # 12       total elements
a.dtype       # int64    data type
```

`reshape` changes the **shape** without changing the data (the element count must match); use `-1` to let NumPy infer: `a.reshape(-1, 2)`.

## Indexing and slicing

Like lists but **multi-dimensional**, separated by commas `[row, column]`:

```python
m = np.arange(1, 13).reshape(3, 4)
# [[ 1  2  3  4]
#  [ 5  6  7  8]
#  [ 9 10 11 12]]
m[1, 2]        # 7           row 1, column 2
m[0]           # [1 2 3 4]   all of row 0
m[:, 0]        # [1 5 9]     all of column 0
m[0:2, 1:3]    # [[2 3] [6 7]]   a sub-block
m[-1, -1]      # 12
```

## Boolean indexing (masks): very powerful filtering

```python
arr = np.arange(1, 11)
arr > 5                    # [False ... True True True True True]
arr[arr > 5]               # [ 6  7  8  9 10]
arr[arr % 2 == 0]          # [ 2  4  6  8 10]
arr[(arr > 3) & (arr < 8)] # combine conditions with & | ~ (with parentheses!)
```

> Use `&`, `|`, `~` (**not** `and`, `or`, `not`) and wrap each condition in **parentheses**.

## Aggregating along an axis

```python
m.sum()            # 78        sum of everything
m.sum(axis=0)      # [15 18 21 24]   sum per COLUMN (adding down the rows)
m.sum(axis=1)      # [10 26 42]      sum per ROW
m.mean(), m.min(), m.max()
```

`axis=0` means "**collapse along the row dimension**, leaving the columns"; `axis=1` is the opposite.

## Type conversion and `tolist()`

```python
a.astype(float)            # change the type
a.tolist()                 # back to a plain Python list (handy for printing and comparing)
```

## Note: slices are "views", not copies

```python
b = a[0:2]
b[0, 0] = 99               # a changes too!
c = a[0:2].copy()          # for independence use .copy()
```
