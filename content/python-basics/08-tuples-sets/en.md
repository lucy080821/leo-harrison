# Tuples and sets

## Tuple: an immutable list

```python
point = (3, 4)
rgb = (255, 128, 0)
single = (5,)          # a one-element tuple NEEDS the comma
```

- Like a list (indexing, slicing, `len`, `in`) but **can't be changed**: `point[0] = 1` raises an error.
- Used for **fixed** data: coordinates, colors, small records, and as dictionary **keys**.
- Slightly faster and lighter than a list.

### Unpacking

```python
x, y = (3, 4)               # x = 3, y = 4
a, b = b, a                 # swap: really a tuple!
first, *rest = [1, 2, 3, 4] # first = 1, rest = [2, 3, 4]
```

A function that "returns several values" really returns a tuple:

```python
def min_max(nums):
    return min(nums), max(nums)

lo, hi = min_max([3, 1, 4])
```

## Set: a collection with no duplicates

```python
tags = {"python", "sql", "python"}      # {'python', 'sql'}: duplicates vanish
empty = set()                            # {} is an empty dict, not a set!
```

- Each element appears **once**.
- **Unordered** and **no indexes**.
- The `x in s` check is **very fast** (far faster than on a big list).
- Elements must be **hashable** (numbers, strings, tuples; **not** lists).

```python
s = {1, 2}
s.add(3)
s.discard(1)         # remove, no error if absent
2 in s               # True
len(s)
```

### Set operations

```python
a = {1, 2, 3, 4}
b = {3, 4, 5}

a & b          # intersection: {3, 4}
a | b          # union: {1, 2, 3, 4, 5}
a - b          # difference: {1, 2}
a ^ b          # symmetric: only in one side {1, 2, 5}
a <= b         # is a a subset of b?
```

### Removing duplicates from a list

```python
nums = [1, 2, 2, 3, 3, 3]
list(set(nums))                 # [1, 2, 3] (order not guaranteed)
sorted(set(nums))               # [1, 2, 3]
```

To **keep order**: `list(dict.fromkeys(nums))`.

## Which one to choose?

| You need | Use |
|---|---|
| An ordered, changeable list | `list` |
| Fixed data, usable as a key | `tuple` |
| A set of unique items, fast "is it in?" | `set` |
| Lookup by key | `dict` (next lesson) |
