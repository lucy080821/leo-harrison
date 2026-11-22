# Numbers and operators

## Arithmetic operators

| Operator | Meaning | Example | Result |
|---|---|---|---|
| `+`, `-`, `*` | Add, subtract, multiply | `7 * 2` | `14` |
| `/` | **True** division | `7 / 2` | `3.5` |
| `//` | **Floor** division | `7 // 2` | `3` |
| `%` | **Remainder** (modulo) | `7 % 2` | `1` |
| `**` | Power | `2 ** 10` | `1024` |

Note: `/` **always** returns a float (`6 / 2` is `3.0`) while `//` keeps integers.

![Operator precedence](/lessons/python-basics/03-numbers-operators-fig-en.svg)
*Operator precedence*

## Floor division and remainder: a very useful pair

The two always go together: $a = (a // b) \times b + (a \% b)$.

```python
total = 3725
hours   = total // 3600            # 1
rest    = total % 3600             # 125
minutes = rest // 60               # 2
seconds = rest % 60                # 5
```

Familiar patterns:

```python
n % 2 == 0           # n is even
n % 10               # the last digit
n // 10              # drop the last digit
```

## Precedence

Like in maths: `**` → `*` `/` `//` `%` → `+` `-`. Use **parentheses** to be clear:

```python
print(2 + 3 * 4)       # 14
print((2 + 3) * 4)     # 20
print(-2 ** 2)         # -4  (power before the minus sign)
```

## Augmented assignment

```python
x = 10
x += 5      # x = x + 5   -> 15
x -= 3      # 12
x *= 2      # 24
x //= 5     # 4
```

## Built-in numeric functions

```python
abs(-5)             # 5
round(3.14159, 2)   # 3.14
round(2.5)          # 2   ← "round half to even" (banker's rounding)
max(3, 9, 4)        # 9
min(3, 9, 4)        # 3
sum([1, 2, 3])      # 6
divmod(17, 5)       # (3, 2): quotient and remainder at once
pow(2, 10)          # 1024
```

## Floats and rounding error

```python
print(0.1 + 0.2)              # 0.30000000000000004
print(round(0.1 + 0.2, 2))    # 0.3
```

Computers store floats in binary so there's a **tiny error**. When comparing floats use `abs(a - b) < 1e-9` or `math.isclose(a, b)`. For money use `decimal.Decimal` or compute in integers (cents).

## Big numbers don't overflow

```python
print(2 ** 200)     # Python handles arbitrarily large integers
```

Unlike many languages, Python integers **don't overflow** (limited only by memory).
