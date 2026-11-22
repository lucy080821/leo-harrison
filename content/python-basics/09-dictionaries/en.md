# Dictionaries

A **dictionary** stores **key → value** pairs, giving very fast lookup by key. It's the natural way to represent "one thing with many attributes".

```python
student = {
    "name": "An",
    "age": 20,
    "scores": [8, 9, 7],
}
```

- **Keys** must be immutable and hashable (strings, numbers, tuples), and **unique**.
- **Values** can be anything, including lists or other dictionaries.
- Since Python 3.7, dictionaries **keep insertion order**.

## Reading, adding, changing, deleting

```python
student["name"]                 # 'An'
student["email"]                # KeyError! the key doesn't exist
student.get("email")            # None, no error
student.get("email", "none yet")# a default value

student["city"] = "Hanoi"       # add a new key
student["age"] = 21             # change an existing key
del student["city"]             # delete
student.pop("age")              # take out and remove
"name" in student               # does the key exist? → True
```

![A dict: key → value, fast lookup](/lessons/python-basics/09-dictionaries-fig-en.svg)
*A dict: key → value, fast lookup*

## Iterating a dictionary

```python
for key in student:                      # iterates KEYS by default
    print(key)
for value in student.values():           # iterate VALUES
    print(value)
for key, value in student.items():       # iterate pairs: used the most
    print(key, "->", value)
```

## Counting frequencies: the classic pattern

```python
counts = {}
for w in "the cat and the hat".split():
    counts[w] = counts.get(w, 0) + 1
# {'the': 2, 'cat': 1, 'and': 1, 'hat': 1}
```

`counts.get(w, 0)` fetches the current count (or 0 if absent) then adds 1. There are neater tools: `collections.Counter` and `collections.defaultdict` (Modules lesson).

## Handy operations

```python
len(d)                           # number of pairs
list(d.keys()), list(d.values())
d.update({"a": 1, "b": 2})       # merge another dict in
merged = d1 | d2                 # merge into a new dict (Python 3.9+)
max(scores, key=scores.get)      # the KEY with the largest value
sorted(scores.items(), key=lambda kv: kv[1], reverse=True)   # sort by value
```

## Nested dictionaries

```python
users = {
    "an":   {"age": 20, "city": "Hanoi"},
    "binh": {"age": 22, "city": "Hue"},
}
print(users["an"]["city"])       # Hanoi
```

This is also exactly the structure of **JSON**, the web's data format: Python dictionaries and JSON are nearly identical (the `json` module converts both ways).

## Dict comprehensions

```python
squares = {n: n ** 2 for n in range(1, 5)}     # {1: 1, 2: 4, 3: 9, 4: 16}
```

## When to use a dict?

Whenever you want to **look things up by name/id** instead of position: price lists, configuration, frequency counts, grouping data by key, caches.
