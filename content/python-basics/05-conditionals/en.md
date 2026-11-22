# Conditionals

## if / elif / else

```python
score = 85

if score >= 90:
    print("Excellent")
elif score >= 80:
    print("Great")
else:
    print("Keep going")
```

Three things to remember:

1. A **colon** `:` follows the condition.
2. The block beneath must be **indented** (4 spaces). That's how Python knows which lines belong to which branch.
3. Python checks **top to bottom**; the first true branch runs and the rest are skipped.

You can have many `elif`s (else if); `else` is optional.

![Flowchart of if / elif / else](/lessons/python-basics/05-conditionals-fig-en.svg)
*Flowchart of if / elif / else*

## Comparisons

| Operator | Meaning |
|---|---|
| `==`, `!=` | Equal, not equal |
| `<`, `<=`, `>`, `>=` | Ordering |
| `in`, `not in` | Is it inside a string/list? |
| `is`, `is not` | The same object (often used with `None`) |

Note: **`==` compares**, `=` assigns.

```python
5 == 5.0              # True
"a" < "b"             # True (alphabetical order)
"th" in "python"      # True
x is None             # the right way to check for None
1 < x < 10            # chained comparison, very Pythonic
```

## Logical operators: and, or, not

```python
age = 20
has_id = True

if age >= 18 and has_id:
    print("allowed in")
if not has_id:
    print("ID needed")
if age < 13 or age > 65:
    print("discount")
```

`and`/`or` **short-circuit**: they stop as soon as the result is known.

## Truthy and falsy

In conditions, "empty" values count as **false** (falsy): `0`, `0.0`, `""`, `[]`, `{}`, `set()`, `None`, `False`. Everything else is **true**.

```python
name = ""
if name:                  # an empty string is falsy
    print("has a name")
else:
    print("no name yet")

items = []
if not items:             # the concise way to test for an empty list
    print("empty")
```

## Conditional expressions (ternary)

```python
status = "adult" if age >= 18 else "child"
```

## Nesting and "early return"

Avoid deep nesting by **returning early** inside a function:

```python
def ticket_price(age):
    if age < 5:
        return 0
    if age < 18:
        return 50
    return 100              # all other cases
```

## match (Python 3.10+)

```python
command = "stop"
match command:
    case "go":
        print("go")
    case "stop" | "halt":
        print("stop")
    case _:
        print("don't understand")
```

> **Common mistakes:** forgetting the `:`, wrong indentation, or writing `if x = 5` (use `==`).
