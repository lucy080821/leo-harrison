# Scope, closures and higher-order functions

## Scope

**Scope** decides which variables are "visible" where.

| Kind | Visible where |
|---|---|
| **Global** | Everywhere (declared outside functions/blocks) |
| **Function** | Only inside that function |
| **Block** (`let`, `const` inside `{ }`) | Only inside that `{ }` block (if, for...) |

```javascript
const global = "everyone sees me";

function f() {
  const local = "only inside f";
  if (true) {
    let block = "only inside the if block";
  }
  // console.log(block);  // ReferenceError
}
```

Variables are looked up along the **scope chain**: from the inside out, the first matching name is used. `var` has function scope only (not block scope) which causes bugs, so use `let` and `const`.

![Closure: the inner function remembers the outer variables](/lessons/javascript/11-scope-closures-higher-order-fig-en.svg)
*Closure: the inner function remembers the outer variables*

## Closures

A **closure** is a function that **remembers** the variables from where it was created, even after the outer function has finished.

```javascript
function makeCounter() {
  let count = 0;                // the outer function's variable
  return function () {          // the inner function "closes over" count
    count++;
    return count;
  };
}

const a = makeCounter();
a(); // 1
a(); // 2
```

- Every call to `makeCounter()` creates a **fresh** `count`, so counters are **independent**.
- `count` **can't be reached from outside**: this is how you create "private" data.

Closures appear everywhere: event handlers, `setTimeout`, functions that return functions.

## Higher-order functions

Functions that **take a function as an argument** or **return a function**. You've already used many: `map`, `filter`, `addEventListener`.

```javascript
// takes a function
function repeat(n, action) {
  for (let i = 0; i < n; i++) action(i);
}
repeat(3, (i) => console.log(i));

// returns a function (a function "factory")
const multiplier = (k) => (n) => n * k;
const double = multiplier(2);
double(21);                       // 42
```

## Callbacks

A **callback** is a function you hand to someone else to **call back later**. It's the foundation of asynchronous code (next lessons).

```javascript
setTimeout(() => console.log("after 1 second"), 1000);
```

## Compose: combining functions

```javascript
const compose = (f, g) => (x) => f(g(x));
const inc = (n) => n + 1;
const dbl = (n) => n * 2;
compose(inc, dbl)(5);             // inc(dbl(5)) = 11
```

> A classic trap: using `var` in a `for` loop then creating functions inside — they all share **one** variable. Use `let` so each iteration gets its own.
