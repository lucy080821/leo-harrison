# Strings, numbers, Math and dates

## Strings

Strings are **immutable**: every method **returns a new string**.

| Method | Example → result |
|---|---|
| `length` | `"abc".length` → `3` |
| `trim()` | `"  hi  ".trim()` → `"hi"` |
| `toUpperCase()`, `toLowerCase()` | `"Hi".toUpperCase()` → `"HI"` |
| `includes(s)`, `startsWith(s)`, `endsWith(s)` | `"hello".includes("ell")` → `true` |
| `indexOf(s)` | `"hello".indexOf("l")` → `2` (`-1` if absent) |
| `slice(a, b)` | `"abcdef".slice(1, 4)` → `"bcd"` |
| `split(sep)` | `"a,b,c".split(",")` → `["a","b","c"]` |
| `replace(a, b)`, `replaceAll(a, b)` | `"a-b-c".replaceAll("-", "+")` → `"a+b+c"` |
| `padStart(n, c)` | `"5".padStart(3, "0")` → `"005"` |
| `repeat(n)` | `"ab".repeat(3)` → `"ababab"` |

Access a character: `"hello"[1]` → `"e"`. Join an array into a string: `["a","b"].join("-")` → `"a-b"`.

**Template strings** use backticks and allow embedded expressions and line breaks:

```javascript
const name = "Lexi";
const msg = `Hello ${name.toUpperCase()}, 2 + 3 = ${2 + 3}`;
```

![String operations: slice cuts by index](/lessons/javascript/07-strings-numbers-dates-fig-en.svg)
*String operations: slice cuts by index*

## Numbers

JavaScript has **one number type**, `number` (a 64-bit float).

```javascript
Number("42");        // 42
parseInt("12px");    // 12
parseFloat("3.5kg"); // 3.5
Number("abc");       // NaN  (Not a Number)
Number.isNaN(x);     // the right way to test for NaN
(3.14159).toFixed(2);   // "3.14"  ← returns a STRING
```

### Floating-point error

```javascript
0.1 + 0.2;   // 0.30000000000000004
```

This isn't a JavaScript bug but how computers store binary numbers. When comparing decimals or computing money: round (`toFixed`) or compute in the smallest unit (cents) as integers.

## Math

```javascript
Math.round(2.5);   // 3      round
Math.floor(2.9);   // 2      round down
Math.ceil(2.1);    // 3      round up
Math.abs(-5);      // 5
Math.max(3, 9, 4); // 9
Math.min(...[3, 9, 4]); // 3
Math.sqrt(16);     // 4
Math.pow(2, 10);   // 1024   (or 2 ** 10)
Math.random();     // a random number in [0, 1)
```

A random integer from `a` to `b`:

$$
\text{randInt}(a, b) = \lfloor \text{random}() \times (b - a + 1) \rfloor + a
$$

```javascript
const randInt = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
```

## Dates

```javascript
const now = new Date();                  // the current moment
const d = new Date("2026-11-21");        // from an ISO string
d.getFullYear();                          // 2026
d.getMonth();                             // 10  ← MONTHS START AT 0 (0 = January)
d.getDate();                              // 21 (day of month)
d.getDay();                               // 6  (0 = Sunday)
d.toISOString();                          // "2026-11-21T00:00:00.000Z"
d.toLocaleDateString("en-US");            // "11/21/2026"
Date.now();                               // milliseconds since 1/1/1970 (for timing)
```

> To get the difference in days: subtract two `Date`s to get milliseconds then divide by `1000 * 60 * 60 * 24`. For tricky time zones, use a library such as `date-fns` or `Intl.DateTimeFormat`.
