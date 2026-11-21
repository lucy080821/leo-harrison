# Functions

A **function** is a named block of code that takes **input** (parameters) and can **return** a result. Functions let you avoid repeating code and split a program into small understandable pieces.

## Defining and calling

```python
def greet(name):
    return f"Hello, {name}!"

message = greet("Lexi")        # call the function
print(message)
```

- `def` + name + parameters in parentheses + a **`:`**, then an **indented** block.
- `return` ends the function and sends a value to the caller. A function without `return` returns `None`.
- A **parameter** is the name in the definition; an **argument** is the value passed when calling.

> Don't confuse: `print` **displays** on screen, `return` **hands back a value** for further use. Functions should usually `return` rather than `print`.

## Default parameters and keyword arguments

```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

greet("Lexi")                        # uses the default
greet("Lexi", "Hi")                  # by position
greet(greeting="Hey", name="Lexi")   # by NAME, in any order
```

Parameters with defaults must come **after** required ones.

> **Trap:** don't use mutable defaults like `def f(x, items=[])`: that list is **shared** across every call. Write `items=None` and create a new one inside.

## Any number of arguments: *args and **kwargs

```python
def average(*numbers):             # collects positional arguments into a tuple
    return sum(numbers) / len(numbers)
average(1, 2, 3, 4)                # 2.5

def show(**info):                  # collects keyword arguments into a dict
    for key, value in info.items():
        print(key, value)
show(name="An", age=20)
```

Conversely, a `*` when **calling** "spreads" a list into arguments: `average(*[1, 2, 3])`.

## Returning several values

```python
def min_max(items):
    return min(items), max(items)   # really returns a tuple

lo, hi = min_max([3, 1, 4])         # unpacked
```

## Variable scope

A variable created **inside** a function is **local** and disappears when it ends.

```python
def f():
    secret = 1          # exists only in f
f()
# print(secret)         # NameError
```

A function can **read** globals, but to **reassign** one it needs `global x` (best avoided). Better: pass in via parameters and return via `return`.

## Docstrings and type hints

```python
def area(w: float, h: float) -> float:
    '''Return the area of a rectangle.'''
    return w * h

help(area)              # view the function's documentation
```

Type hints (`: float`, `-> float`) are optional but help readability and error-checking tools.

## Functions are values

```python
def apply(fn, x):
    return fn(x)

print(apply(abs, -5))         # 5
operations = {"double": lambda x: x * 2, "negate": lambda x: -x}
print(operations["double"](21))   # 42
```

## Principles of good functions

- Each function does **one thing** and its name is a **verb** (`calculate_total`, `is_valid`).
- Keep it short (about a screen).
- Prefer "pure" functions: same input gives the same result, no changes to outside data.
