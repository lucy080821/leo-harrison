# Async (2): Promises

A **Promise** is an object representing a result that **will exist in the future**. It solves "callback hell" by letting you **chain** steps.

## Three states

```text
          ┌── resolve(value) ──► fulfilled (success)
pending ──┤
          └── reject(error)  ──► rejected  (failure)
```

A Promise **changes state only once**, then stays that way.

## Creating a Promise

```javascript
const wait = (ms, value) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(value), ms);   // call resolve when done
    // call reject(new Error("...")) on failure
  });
```

Normally you **consume** Promises returned by libraries (`fetch`, etc.) rather than create them; you create your own when wrapping old callback-style APIs like `setTimeout`.

## Using a Promise: then / catch / finally

```javascript
wait(100, "done")
  .then((v) => v.toUpperCase())        // receives the result; the return value moves on
  .then((v) => console.log(v))         // "DONE"
  .catch((err) => console.log(err))    // catches an ERROR from ANY step above
  .finally(() => console.log("cleanup"));   // always runs
```

- `.then` always returns a **new Promise**, so chaining works.
- If `.then` returns another Promise, the chain **waits** for it.
- An error thrown in any step **skips the remaining `.then`s** and lands in the nearest `.catch`.

## Running several Promises at once

| Function | Result |
|---|---|
| `Promise.all([p1, p2])` | Waits for **all** → array of results in order. **One** failure fails the whole group |
| `Promise.allSettled([...])` | Waits for all; reports each one's status, never rejects |
| `Promise.race([...])` | Takes the **first to finish** (success or failure) |
| `Promise.any([...])` | Takes the **first to succeed** |

```javascript
Promise.all([wait(50, "a"), wait(100, "b"), wait(30, "c")])
  .then((results) => console.log(results));   // ["a","b","c"] after ~100ms, not 180ms
```

They run **in parallel**, so the total time equals the **slowest** one, not the sum.

## Microtasks: Promises beat timers

Promise callbacks go into the **microtask** queue, which runs **before** `setTimeout` callbacks:

```javascript
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
console.log("sync");
// sync, promise, timeout
```

## Common mistakes

- Forgetting `return` inside `.then` makes the next step receive `undefined`.
- No `.catch`: the error becomes an "unhandled rejection".
- Nesting `.then` inside `.then` instead of returning the Promise to keep the chain flat.

The next lesson, **async/await**, is an even more readable way to write on top of Promises.
