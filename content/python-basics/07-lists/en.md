# Lists

A **list** is an **ordered**, **changeable** collection of items, which can be of mixed types. It's the data structure you'll use most.

```python
nums = [5, 3, 8, 1]
mixed = [1, "two", 3.0, True]
empty = []
```

## Indexing and slicing

Like strings: indexes from **0**, negatives count from the end, slicing `[a:b:step]`.

```python
nums = [5, 3, 8, 1]
nums[0]        # 5
nums[-1]       # 1
nums[1:3]      # [3, 8]
nums[::-1]     # [1, 8, 3, 5]
len(nums)      # 4
```

Unlike strings, lists are **mutable**: `nums[0] = 99`.

## Adding and removing

| Method | Effect |
|---|---|
| `append(x)` | Add `x` at the **end** |
| `insert(i, x)` | Insert `x` at position `i` |
| `extend(list2)` | Append another whole list |
| `remove(x)` | Remove the **first** element equal to `x` |
| `pop()` / `pop(i)` | Take out and remove the last / the one at `i` |
| `del nums[i]` | Delete by index |
| `clear()` | Remove everything |

```python
nums.append(10)
nums.extend([7, 7])
nums.remove(7)
last = nums.pop()
```

## Searching and counting

```python
3 in nums           # True/False
nums.index(8)       # position of 8 (error if absent)
nums.count(7)       # count occurrences
min(nums), max(nums), sum(nums)
```

## Sorting

```python
nums.sort()                      # sorts IN PLACE, returns None (!)
nums.sort(reverse=True)          # descending
sorted(nums)                     # returns a sorted COPY, nums unchanged
sorted(words, key=len)           # sort by length
```

> A classic trap: `nums = nums.sort()` makes `nums` `None`, because `sort()` edits in place and returns nothing.

## Lists are "reference" objects

```python
a = [1, 2]
b = a             # b and a are the SAME list
b.append(3)
print(a)          # [1, 2, 3] ← a changed too!

c = a.copy()      # or a[:] or list(a): an independent copy
c.append(4)
print(a)          # [1, 2, 3] unchanged
```

Nested lists need a deep copy: `import copy; copy.deepcopy(x)`.

## Nested lists (matrices)

```python
grid = [[1, 2, 3],
        [4, 5, 6]]
print(grid[1][2])        # 6
for row in grid:
    print(row)
```

## Handy patterns

```python
total = sum(nums)
average = sum(nums) / len(nums)
top3 = sorted(nums, reverse=True)[:3]
" ".join(["a", "b", "c"])        # 'a b c'
list("abc")                      # ['a', 'b', 'c']
"a,b,c".split(",")               # ['a', 'b', 'c']
```
