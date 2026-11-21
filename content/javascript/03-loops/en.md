# Loops

A loop runs a block of code **many times** without you rewriting it.

## for

```javascript
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

Three parts in the parentheses, separated by `;`:

1. **Initialiser** `let i = 1`: runs once at the start.
2. **Condition** `i <= 5`: checked before every round; if false, stop.
3. **Step** `i++`: runs after every round (`i++` means `i = i + 1`).

## while and do...while

```javascript
let n = 3;
while (n > 0) {       // checked BEFORE running
  console.log(n);
  n--;
}

do {                  // runs at least ONCE, then checks
  console.log("runs once");
} while (false);
```

> Beware **infinite loops**: if you forget `n--`, the condition is always true and the browser hangs. If the preview freezes, fix the code and reload.

## for...of: iterate arrays and strings

```javascript
for (const fruit of ["apple", "orange"]) console.log(fruit);
for (const ch of "abc") console.log(ch);
```

Also, `for...in` iterates an object's **property names**:

```javascript
const user = { name: "An", age: 20 };
for (const key in user) console.log(key, user[key]);
```

## break and continue

```javascript
for (let i = 1; i <= 10; i++) {
  if (i === 3) continue;   // skip this round
  if (i === 6) break;      // leave the loop entirely
  console.log(i);          // 1, 2, 4, 5
}
```

## Common patterns

**Accumulating:**

```javascript
let total = 0;
for (let i = 1; i <= 100; i++) total += i;
```

This matches Gauss's formula: $\sum_{i=1}^{n} i = \dfrac{n(n+1)}{2}$, and with $n = 100$ we get $5050$.

**Nested** (multiplication table):

```javascript
for (let a = 1; a <= 3; a++) {
  for (let b = 1; b <= 3; b++) console.log(a, "x", b, "=", a * b);
}
```
