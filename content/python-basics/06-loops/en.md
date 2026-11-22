# Loops

A loop runs a block of code **many times**.

## for and range

```python
for i in range(5):
    print(i)             # 0, 1, 2, 3, 4
```

`range` makes a sequence of numbers:

| Written | Sequence |
|---|---|
| `range(5)` | 0, 1, 2, 3, 4 |
| `range(1, 6)` | 1, 2, 3, 4, 5 (**not** including 6) |
| `range(0, 10, 2)` | 0, 2, 4, 6, 8 (step 2) |
| `range(5, 0, -1)` | 5, 4, 3, 2, 1 (counting down) |

A `for` loop actually walks through **anything iterable**: strings, lists, dictionaries...

```python
for ch in "abc":
    print(ch)

for fruit in ["apple", "orange", "mango"]:
    print(fruit)
```

![for visits each item, while repeats on a condition](/lessons/python-basics/06-loops-fig-en.svg)
*for visits each item, while repeats on a condition*

## The accumulator pattern

```python
total = 0
for n in range(1, 101):
    total += n
print(total)             # 5050
```

Gauss's formula: $\sum_{i=1}^{n} i = \dfrac{n(n+1)}{2}$. With $n = 100$ that's $5050$. (Python also has the built-in `sum(range(1, 101))`.)

## while: loop while a condition holds

```python
count = 3
while count > 0:
    print(count)
    count -= 1
print("Done!")
```

> Beware **infinite loops**: if you forget `count -= 1`, the condition is always true. In the practice panel, press **Stop** if the program runs forever.

## break, continue, else

```python
for n in range(1, 10):
    if n == 3:
        continue         # skip this round
    if n == 6:
        break            # leave the loop entirely
    print(n)             # 1, 2, 4, 5
```

A loop can have an `else` that runs when it **wasn't ended by `break`**, handy for searching:

```python
for n in [3, 5, 7]:
    if n % 2 == 0:
        print("found an even number")
        break
else:
    print("all odd")
```

## enumerate and zip

```python
names = ["An", "Binh", "Chi"]
scores = [8, 6, 10]

for i, name in enumerate(names, start=1):     # with a counter
    print(i, name)

for name, score in zip(names, scores):        # walk two lists in parallel
    print(name, score)
```

## Nested loops

```python
for a in range(1, 4):
    for b in range(1, 4):
        print(a * b, end=" ")
    print()              # newline after each row
```

## Tips

- Use `for` when you know the count/collection; use `while` when you **don't know when to stop** (waiting for a condition).
- Don't modify a list while iterating it: iterate over a copy `for x in items[:]:`.
