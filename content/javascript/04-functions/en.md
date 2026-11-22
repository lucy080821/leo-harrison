# Functions

A **function** is a named block of code that takes **input** (parameters), processes it and can **return** a result. Functions let you **avoid repeating code** and split a program into small understandable parts.

## Declaring and calling

```javascript
function add(a, b) {       // a, b are PARAMETERS
  return a + b;
}

const result = add(2, 3);  // 2, 3 are ARGUMENTS
console.log(result);       // 5
```

- `return` ends the function and sends a value to the caller. A function without `return` returns `undefined`.
- Functions declared with `function` are **hoisted**: usable before the line that declares them.

![A function takes parameters and returns a value](/lessons/javascript/04-functions-fig-en.svg)
*A function takes parameters and returns a value*

## Default parameters and rest

```javascript
function greet(name = "friend") { return `Hello ${name}`; }
greet();            // "Hello friend"

function sum(...nums) {          // collect all arguments into an array
  let t = 0;
  for (const n of nums) t += n;
  return t;
}
sum(1, 2, 3, 4);                 // 10
```

## Arrow functions

```javascript
const square = (n) => n * n;               // single expression: auto-return
const area = (w, h) => {                   // several statements: use {} and return
  const result = w * h;
  return result;
};
const hello = () => "hello";               // no parameters
```

Arrow functions are short, ideal for small functions passed to `map`, `filter`, events... (`this` also behaves differently, which you'll meet in the classes lesson).

## Functions are values

Functions can be assigned to variables, passed as arguments, or returned from other functions (see "Scope, closures and higher-order functions").

```javascript
const operations = { double: (x) => x * 2, negate: (x) => -x };
console.log(operations.double(21));   // 42
```

## Scope

Variables declared **inside a function** exist only there:

```javascript
function demo() {
  const secret = 1;
}
demo();
// console.log(secret);  // ReferenceError!
```

## Recursion

A function calling itself to solve a problem by splitting it down. It always needs a **base case**, otherwise it loops forever and overflows the stack.

$$
n! = \begin{cases} 1 & n = 0 \\ n \times (n-1)! & n > 0 \end{cases}
$$

```javascript
function factorial(n) {
  if (n === 0) return 1;           // base case
  return n * factorial(n - 1);     // a smaller problem
}
```

## Naming and design rules

- Function names are **verbs**: `getUser`, `calculateTotal`, `isValid` (returning true/false starts with `is/has/can`).
- Each function does **one thing**.
- Prefer **pure** functions: same input gives same output, no changes to outside data.
