# Variables, data types and console.log

**JavaScript** is a programming language that runs right in the browser. In this lesson you use `console.log()` to print results to the **Console** tab on the right.

## Variables

A variable is a "named box" that stores a value.

```javascript
const name = "Lexi";  // const: cannot be reassigned
let age = 20;         // let: can be reassigned
age = 21;             // OK
```

- Prefer `const`; use `let` only when the value must change.
- Avoid `var` (the old way, prone to scoping bugs).
- Names are case-sensitive and usually written in `camelCase`: `userName`.

![A variable is a labelled box holding a value; typeof tells the type](/lessons/javascript/01-variables-console-fig-en.svg)
*A variable is a labelled box holding a value; typeof tells the type*

## Basic data types

| Type | Example | Notes |
|---|---|---|
| `number` | `42`, `3.14` | integers and decimals |
| `string` | `"hello"`, `'hi'`, `` `hey` `` | text |
| `boolean` | `true`, `false` | true/false |
| `undefined` | `undefined` | a variable with no value yet |
| `null` | `null` | deliberately "nothing" |

Use `typeof` to inspect a type:

```javascript
console.log(typeof 42);       // "number"
console.log(typeof "hello");  // "string"
```

## Operators

```javascript
console.log(7 + 2);   // 9
console.log(7 - 2);   // 5
console.log(7 * 2);   // 14
console.log(7 / 2);   // 3.5
console.log(7 % 2);   // 1  (remainder)
console.log(2 ** 3);  // 8  (power)
```

Joining strings and **template strings** (backticks and `${...}`):

```javascript
const who = "Lexi";
console.log("Hello " + who);
console.log(`Hello ${who}, 1 + 2 = ${1 + 2}`);
```

## Comparison

```javascript
console.log(5 > 3);     // true
console.log(5 === 5);   // true  (equal in value and type)
console.log(5 === "5"); // false
```

> Always use `===` and `!==` instead of `==` and `!=` to avoid surprises caused by automatic type coercion.
