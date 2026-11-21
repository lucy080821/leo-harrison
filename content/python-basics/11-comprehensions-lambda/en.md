# Comprehensions and lambda

## List comprehension: build a list in one line

A **concise, very "Pythonic"** way to make a new list from a sequence:

```python
squares = [n ** 2 for n in range(1, 6)]
# [1, 4, 9, 16, 25]
```

Syntax: `[expression for item in sequence]`. Equivalent to the loop:

```python
squares = []
for n in range(1, 6):
    squares.append(n ** 2)
```

### Adding a filter

```python
evens = [n for n in range(1, 11) if n % 2 == 0]
# [2, 4, 6, 8, 10]

squares_of_evens = [n ** 2 for n in range(1, 11) if n % 2 == 0]
# [4, 16, 36, 64, 100]
```

### Adding a transformation (if/else goes BEFORE the for)

```python
labels = ["even" if n % 2 == 0 else "odd" for n in range(1, 5)]
# ['odd', 'even', 'odd', 'even']
```

### Realistic examples

```python
names = ["  an ", "BINH", "chi  "]
clean = [n.strip().title() for n in names]        # ['An', 'Binh', 'Chi']
lengths = [len(w) for w in ["a", "bb", "ccc"]]    # [1, 2, 3]
pairs = [(x, y) for x in range(2) for y in range(2)]   # nested loops
```

## Dict and set comprehensions

```python
words = ["pear", "fig", "banana"]
lengths = {w: len(w) for w in words}      # {'pear': 4, 'fig': 3, 'banana': 6}
unique_lens = {len(w) for w in words}      # {3, 4, 6}
```

## When not to use them?

Comprehensions shine when **short and readable**. If you'd need several nested levels or complicated conditions, write a regular `for` loop for clarity. **Readable beats short.**

## Lambda functions

A **lambda** is an **anonymous single-expression function**, often passed as an argument to other functions:

```python
square = lambda x: x ** 2
print(square(5))           # 25

add = lambda a, b: a + b
```

Most used with the `key` of `sorted`, `min`, `max`:

```python
words = ["pear", "fig", "banana"]
sorted(words, key=lambda w: len(w))           # ['fig', 'pear', 'banana']
max(words, key=lambda w: len(w))              # 'banana'

students = [("An", 8), ("Binh", 6), ("Chi", 10)]
sorted(students, key=lambda s: s[1], reverse=True)   # by score descending
```

> Assigning a lambda to a variable (`square = lambda ...`) is just for illustration. When you'll reuse it, use `def` for a name and docstring.

## map and filter

```python
list(map(lambda x: x * 2, [1, 2, 3]))            # [2, 4, 6]
list(filter(lambda x: x > 1, [1, 2, 3]))         # [2, 3]
```

They give the same results as comprehensions; the Python community usually **prefers comprehensions** as more readable.

## Handy aggregate helpers

```python
sum(n for n in range(10))        # pass a "generator" to sum: no intermediate list
any(n > 5 for n in [1, 9])        # does any element satisfy it? True
all(n > 0 for n in [1, 9])        # do all elements satisfy it? True
```
