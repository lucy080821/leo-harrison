# Strings

A string is a **sequence of characters**, used in every program.

## Creating strings

```python
a = "double quotes"
b = 'single quotes'
c = "He said: 'hello'"            # one kind of quote inside the other
d = '''A string
over many lines'''                # triple quotes for multiple lines
```

Special characters use `\`: `\n` newline, `\t` tab, `\"` a double quote, `\\` a backslash.

![Positive and negative string indexes, and slicing](/lessons/python-basics/04-strings-fig-en.svg)
*Positive and negative string indexes, and slicing*

## Indexing and slicing

Indexes start at **0**, and **negative** numbers count from the end.

```text
 p   y   t   h   o   n
 0   1   2   3   4   5     (positive indexes)
-6  -5  -4  -3  -2  -1     (negative indexes)
```

```python
word = "python"
word[0]        # 'p'
word[-1]       # 'n'
word[1:4]      # 'yth'      from index 1 up to BEFORE 4
word[:3]       # 'pyt'      the first 3 characters
word[3:]       # 'hon'      from index 3 to the end
word[::2]      # 'pto'      every second character
word[::-1]     # 'nohtyp'   reversed
```

The syntax is `[start : stop : step]`, and `stop` is **not** included.

> Strings are **immutable**: `word[0] = "P"` raises an error. To "edit", build a new string: `"P" + word[1:]`.

## Common methods

| Method | Example → result |
|---|---|
| `s.upper()`, `s.lower()`, `s.title()` | `"hi".upper()` → `'HI'` |
| `s.strip()` | Strip whitespace from both ends |
| `s.split(sep)` | `"a,b".split(",")` → `['a','b']` (without `sep`, splits on whitespace) |
| `sep.join(list)` | `"-".join(["a","b"])` → `'a-b'` |
| `s.replace(a, b)` | `"hello".replace("l","L")` → `'heLLo'` |
| `s.find(sub)` | First position, or `-1` |
| `s.startswith(x)`, `s.endswith(x)` | `True`/`False` |
| `s.count(sub)` | Count occurrences |
| `s.isdigit()`, `s.isalpha()` | Character-type checks |

```python
len("python")            # 6
"th" in "python"         # True
"ab" * 3                 # 'ababab'
"Hello " + "world"       # 'Hello world'
```

Methods **return a new string** and don't change the old one: `s.upper()` leaves `s` unchanged.

## Formatting

```python
name, score = "An", 8.456
print(f"{name} scored {score:.1f}")        # An scored 8.5
print(f"{name:>10}|{score:<8.2f}|")         # right / left aligned, with width
print("{} has {} points".format(name, 8))   # the older way, still seen in old code
```

## Iterating a string

```python
for ch in "abc":
    print(ch)
```

## Checking for palindromes

```python
def is_palindrome(s):
    s = s.lower().replace(" ", "")
    return s == s[::-1]
```

The "reverse then compare" pattern with `[::-1]` is a very Pythonic idiom.
