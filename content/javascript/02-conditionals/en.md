# Conditionals

Programs need to **branch**: do one thing if a condition is true, another if it is false.

## if / else if / else

```javascript
const score = 85;

if (score >= 90) {
  console.log("Excellent");
} else if (score >= 80) {
  console.log("Great");
} else {
  console.log("Keep going");
}
```

Branches are tested **top to bottom**; the first true one runs and the rest are skipped. So test the **narrowest/largest condition first**.

![Decision tree: if / else if / else](/lessons/javascript/02-conditionals-fig-en.svg)
*Decision tree: if / else if / else*

## Comparison and logical operators

| Operator | Meaning |
|---|---|
| `===`, `!==` | Equal / not equal (value and type) |
| `<`, `<=`, `>`, `>=` | Number comparison |
| `&&` | **AND**: both sides true |
| `\|\|` | **OR**: at least one side true |
| `!` | **NOT** |

```javascript
if (age >= 18 && hasId) { /* ... */ }
if (role === "admin" || role === "editor") { /* ... */ }
if (!isLoggedIn) { /* ... */ }
```

`&&` and `||` **short-circuit**: they stop as soon as the result is known. A common trick: `const name = input || "Anonymous";` (if `input` is empty/falsy, use the right side).

## Truthy and falsy

In a condition, JavaScript converts values to true/false automatically. **Falsy** values are exactly these 6:

`false`, `0`, `""` (empty string), `null`, `undefined`, `NaN`

Everything else is **truthy**, including `"0"`, `[]` and `{}`.

## The ternary operator

```javascript
const message = age >= 18 ? "Adult" : "Child";
```

Use it only for short expressions; use `if` for complex conditions.

## switch

When comparing **one value** against many cases:

```javascript
switch (day) {
  case 1:
    console.log("Monday");
    break;          // without break, execution "falls through" to the next case
  case 6:
  case 7:
    console.log("Weekend");
    break;
  default:
    console.log("Weekday");
}
```

> Inside functions, return early to avoid deep `if` nesting: `if (!user) return;`
