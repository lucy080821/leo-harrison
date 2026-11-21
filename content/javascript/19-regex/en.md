# Regular expressions (Regex)

A **regex** is a small language for **describing string patterns**: finding phone numbers, validating emails, bulk replacement, extracting data...

## Writing a regex

```javascript
const re = /abc/;            // literal form, between two /
const re2 = new RegExp("abc");

/hello/.test("say hello");   // true  (does it match?)
"say hello".match(/hello/);  // match details
```

## Flags

| Flag | Meaning |
|---|---|
| `g` | Global: find **every** match, don't stop at the first |
| `i` | Case-insensitive |
| `m` | `^`, `$` match per **line** |

## Special characters

| Pattern | Matches |
|---|---|
| `.` | Any one character (except newline) |
| `\d` / `\D` | A digit / **not** a digit |
| `\w` / `\W` | A letter, digit, `_` / the opposite |
| `\s` / `\S` | Whitespace / non-whitespace |
| `[abc]` | One of `a`, `b`, `c` |
| `[a-z0-9]` | One character in a range |
| `[^abc]` | **Not** a, b, c |
| `^` / `$` | Start / end of the string |
| `\.` | A literal dot (escape with `\`) |
| `a\|b` | `a` or `b` |

## Quantifiers

| Pattern | How many times |
|---|---|
| `a*` | 0 or more |
| `a+` | 1 or more |
| `a?` | 0 or 1 |
| `a{3}` | Exactly 3 |
| `a{2,5}` | Between 2 and 5 |

By default quantifiers are **greedy** (match as much as possible); add `?` to make them **lazy**: `.+?`.

## Groups and examples

```javascript
/^\d{4}$/.test("2026");                   // true: exactly 4 digits
/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test("a@b.co");   // a simple email

const m = "21/11/2026".match(/(\d+)\/(\d+)\/(\d+)/);
m[1]; // "21"   m[2]; // "11"   m[3]; // "2026"   ← capture groups (...)

// Named groups
const { groups } = "2026-11-21".match(/(?<y>\d+)-(?<m>\d+)-(?<d>\d+)/);
groups.y; // "2026"
```

The email pattern explained: `^` start; `[^\s@]+` one or more characters that are **not** whitespace/`@`; `@`; again `[^\s@]+`; `\.` a dot; `[^\s@]+`; `$` end.

## Methods that use regex

```javascript
"a1b22".match(/\d+/g);                  // ["1","22"]   (with g: array of all matches)
"a1b22".replace(/\d+/g, "#");           // "a#b#"
"a1b22".replace(/(\d+)/g, "<$1>");      // "a<1>b<22>"  ($1 = group 1)
"a, b;c".split(/[,;]\s*/);              // ["a","b","c"]
[..."a1b22".matchAll(/\d+/g)];          // iterate each match with its position
```

## Advice

- **Don't** use regex for complex things like parsing HTML or fully standards-compliant email validation; use a library or send a confirmation email.
- Over-complicated regexes are very hard to read: split them up and **add comments**.
- Experiment and debug quickly in a tool like **regex101.com**.
- Some bad regexes cause **ReDoS** (extremely slow on odd input): beware nested quantifiers like `(a+)+`.
