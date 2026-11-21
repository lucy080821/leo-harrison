# Variables and data types

## What is a variable?

A **variable** is a name attached to a value in memory. You create one with the `=` sign (an **assignment**):

```python
name = "Lexi"
age = 20
```

- No type declaration needed: Python knows `20` is an integer and `"Lexi"` a string.
- You can reassign another value (even another type): `age = "twenty"`.
- Names: letters, digits, `_`, **not** starting with a digit, **case-sensitive**. Convention: `snake_case` like `user_name`.

## Basic data types

| Type | Name | Example |
|---|---|---|
| `int` | Integer | `42`, `-7`, `1_000_000` |
| `float` | Floating-point | `3.14`, `-0.5`, `2e3` |
| `str` | String | `"hello"`, `'hi'` |
| `bool` | True/false | `True`, `False` |
| `NoneType` | "Nothing" | `None` |

Use `type()` to inspect a type:

```python
print(type(20))        # <class 'int'>
print(type("20"))      # <class 'str'>
```

`20` (a number) and `"20"` (a string) are **completely different**: `20 + 1` is `21`, while `"20" + "1"` is `"201"`.

## f-strings: embedding variables in text

Put **`f`** before the quote, and variables inside `{ }`:

```python
name = "Lexi"
age = 20
print(f"{name} is {age} years old")        # Lexi is 20 years old
print(f"Next year: {age + 1}")              # you can compute inside { }
print(f"Price: {1234.5678:.2f}")            # 1234.57 (rounded to 2 decimals)
print(f"Number: {1234567:,}")               # 1,234,567 (thousands separator)
```

## Type conversion

```python
int("42")         # 42        string -> integer
int(3.9)          # 3         drops the decimals (does NOT round)
float("3.5")      # 3.5
str(100)          # "100"
bool(0), bool(""), bool([])    # False False False: "empty" values
bool(5), bool("a")             # True True
```

An invalid conversion raises an error: `int("abc")` → `ValueError`.

## Multiple assignment

```python
x, y = 1, 2          # simultaneous assignment
x, y = y, x          # swap two variables, very neat!
a = b = 0            # same value
PI = 3.14159         # convention: CONSTANTS in UPPERCASE
```

## Numbers and strings are never changed "in place"

Strings and numbers are **immutable**: operations create **new values** rather than editing the old one. This differs from lists (next lessons).

> **Tip:** when a result looks odd, `print(type(x))` to be sure you're holding the right type.
