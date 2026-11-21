# Exception handling

When an error occurs at runtime, Python **raises an exception** and stops the program. You can **catch** the exception to handle it gracefully instead of crashing.

## try / except

```python
try:
    n = int(input_text)           # code that may fail
except ValueError:                # runs IF a ValueError occurs
    print("Not a valid number")
```

If there's no error, the `except` block is skipped.

## Common exceptions

| Exception | When |
|---|---|
| `ValueError` | Wrong value: `int("abc")` |
| `TypeError` | Wrong type: `"a" + 1` |
| `KeyError` | Key missing from a dictionary: `d["x"]` |
| `IndexError` | Index out of range: `[1, 2][5]` |
| `ZeroDivisionError` | Division by zero |
| `FileNotFoundError` | Opening a non-existent file |
| `AttributeError` | The object has no such attribute |
| `NameError` | Using an undeclared variable |

## Catching several kinds, getting the message

```python
try:
    result = 10 / int(text)
except ValueError:
    print("not a number")
except ZeroDivisionError:
    print("can't divide by zero")
except Exception as e:                # catches every other exception, with the error object
    print("other error:", e)
```

> Catch only the kinds you **know how to handle**. A bare `except:` or a catch-all `except Exception` **hides real bugs** and is hard to debug. Don't "swallow errors" silently.

## else and finally

```python
try:
    f = open("data.txt", encoding="utf-8")
except FileNotFoundError:
    print("no such file")
else:
    print("opened fine")          # runs only when there was NO error
    f.close()
finally:
    print("always runs")          # cleanup, error or not
```

(For files, best to use `with open(...)`, which cleans up by itself.)

## Raising exceptions with raise

```python
def withdraw(balance, amount):
    if amount > balance:
        raise ValueError("Insufficient funds")
    return balance - amount

try:
    withdraw(100, 500)
except ValueError as e:
    print(e)                     # Insufficient funds
```

`raise` lets a function **report errors clearly** instead of silently returning a wrong result.

## Custom exceptions

```python
class InsufficientFunds(Exception):
    pass

raise InsufficientFunds("Need 400 more")
```

## EAFP: easier to ask forgiveness than permission

Python culture prefers "**just try, then catch the error**" over checking first:

```python
# LBYL (look before you leap)
if "age" in data:
    age = data["age"]

# EAFP (easier to ask forgiveness than permission): the Python style
try:
    age = data["age"]
except KeyError:
    age = None
```

(For dictionaries, the shortest is `data.get("age")`.)

## Reading a traceback

```text
Traceback (most recent call last):
  File "<exec>", line 5, in <module>
  File "<exec>", line 2, in withdraw
ValueError: Insufficient funds
```

Read it **bottom-up**: the last line is the error kind and message; the lines above are the chain of calls leading to it.
