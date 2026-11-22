# NumPy (2): operations, broadcasting and statistics

## Vectorization: no more loops

An operation on a NumPy array applies **to every element at once**, called **vectorization**. It's much shorter and faster than a loop.

```python
import numpy as np
x = np.array([1, 2, 3, 4])

x + 10         # [11 12 13 14]
x * 2          # [ 2  4  6  8]
x ** 2         # [ 1  4  9 16]
x * x          # multiplies EACH pair: [1 4 9 16]
np.sqrt(x)     # a function applied to every element
x > 2          # [False False  True  True]
```

Two arrays of the **same shape** compute pair by pair: `a + b`, `a * b`, `a / b`.

> `x * y` multiplies **element by element**, not matrix multiplication. For matrix multiplication use `x @ y` or `np.dot`.

![Broadcasting: a (3,) array is stretched to add to (3,3)](/lessons/python-data/02-numpy-operations-fig-en.svg)
*Broadcasting: a (3,) array is stretched to add to (3,3)*

## Broadcasting: arrays of different shapes

NumPy automatically "**stretches**" the smaller array to match the larger one, provided the dimensions are **compatible** (equal, or one of them is 1):

```python
prices = np.array([[10, 20, 30],
                   [40, 50, 60]])        # shape (2, 3)
weights = np.array([1, 2, 3])            # shape (3,)

prices * weights
# [[ 10  40  90]
#  [ 40 100 180]]       each COLUMN multiplied by its own factor
prices + 5               # add 5 to every element (a scalar is broadcasting too)
```

Computing each **column's deviation from its mean**:

```python
prices - prices.mean(axis=0)
```

## Descriptive statistics

```python
x = np.array([2, 4, 4, 4, 5, 5, 7, 9])
x.mean()           # 5.0     mean
np.median(x)       # 4.5     median
x.std()            # 2.0     standard deviation (divides by n by default)
x.var()            # 4.0     variance
x.min(), x.max(), x.sum()
np.percentile(x, 25)   # the 25th percentile
```

Mean and standard deviation (population):

$$
\mu = \frac{1}{n}\sum_{i=1}^{n} x_i,\qquad \sigma = \sqrt{\frac{1}{n}\sum_{i=1}^{n}(x_i-\mu)^2}
$$

> `x.std()` uses $n$ by default (population). pandas `Series.std()` uses $n-1$ (sample) by default. To be consistent: `np.std(x, ddof=1)`.

## The z-score standardization

Rescale data to mean 0 and standard deviation 1, a very common preparation step in Machine Learning:

$$
z_i = \frac{x_i - \mu}{\sigma}
$$

```python
z = (x - x.mean()) / x.std()
```

## np.where: array-wise conditions

```python
temps = np.array([28, 31, 35, 29])
np.where(temps > 32, "hot", "ok")     # ['ok' 'ok' 'hot' 'ok']
np.where(x > 4, x, 0)                 # keep values > 4, others become 0
```

## Sorting and searching

```python
np.sort(x)              # a sorted copy
np.argsort(x)           # the sorting INDEXES
x.argmax(), x.argmin()  # position of the largest / smallest
np.unique(x)            # distinct values, sorted
np.unique(x, return_counts=True)
```

## Joining arrays

```python
np.concatenate([a, b])
np.vstack([a, b])       # stack by rows
np.hstack([a, b])       # join by columns
```

## Controlled random numbers

```python
rng = np.random.default_rng(42)       # set a seed so results repeat
rng.integers(1, 7, size=5)            # 5 dice rolls
rng.normal(0, 1, size=100)            # 100 numbers from a normal distribution
```
