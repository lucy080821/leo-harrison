# Modern JavaScript (ES6+)

Since **ES6 (2015)**, JavaScript has gained many syntax features that make code shorter and clearer. You've already met some (`let/const`, arrow functions, template strings, `for...of`, spread). This lesson collects and extends the most important ones.

## Destructuring

```javascript
// Arrays: by POSITION
const [first, second] = [10, 20, 30];       // first=10, second=20
const [head, ...rest] = [1, 2, 3, 4];       // rest = [2, 3, 4]
[a, b] = [b, a];                             // swap two variables

// Objects: by NAME
const { name, age = 18 } = user;            // age defaults to 18
const { address: { city } } = user;         // nested

// Right in function parameters
function show({ name, age }) { return `${name} (${age})`; }
```

## Spread (...) and Rest (...)

The same three dots with two roles:

- **Spread**: **spreads out** an array/object: `[...a, ...b]`, `{ ...user, age: 21 }`, `Math.max(...nums)`.
- **Rest**: **collects** the remainder: `function sum(...numbers)`, `const [x, ...rest] = arr`.

## Optional chaining `?.` and nullish coalescing `??`

```javascript
user.address?.city;          // address is null/undefined → returns undefined, NO error
user.getName?.();            // call only if the function exists
list?.[0];                   // safe array access

const city = user.address?.city ?? "Unknown";   // ?? only substitutes for null/undefined
```

`??` differs from `||`:

| Expression | Result |
|---|---|
| `0 \|\| 99` | `99` (0 is falsy) |
| `0 ?? 99` | `0` (0 isn't null/undefined) |
| `"" ?? "x"` | `""` |

Use `??` when `0`, `""` or `false` are **valid values**.

## Other handy features

```javascript
const key = "color";
const obj = { [key]: "red", name };          // computed key + property shorthand
"abc".padStart(5, "*");                      // "**abc"
[1, [2, [3]]].flat(Infinity);                // [1,2,3]
Object.fromEntries([["a", 1], ["b", 2]]);    // { a: 1, b: 2 }
arr.at(-1);                                  // the last element
structuredClone(obj);                        // deep copy
x ||= 5; x ??= 5; x &&= 5;                   // conditional assignment
```

## Modules (import/export)

Split code across files:

```javascript
// math.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export default function main() { /* ... */ }

// app.js
import main, { PI, add } from "./math.js";
```

In HTML use `<script type="module" src="app.js">`. In Next.js, React and modern Node.js you write `import/export` everywhere. The practice panel here runs a single `script.js`, so you'll practise modules in the Node.js and Next.js courses.

## Keeping up

JavaScript evolves every year (ES2020, ES2021...). Look up syntax on **MDN Web Docs**: the standard reference.
