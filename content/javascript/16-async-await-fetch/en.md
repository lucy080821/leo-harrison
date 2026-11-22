# Async (3): async/await and fetch

`async/await` is a way to write asynchronous code that **looks synchronous**, built on Promises. It is by far the most common style today.

## Syntax

```javascript
async function getUserName(id) {
  const user = await fakeFetchUser(id);   // pauses here UNTIL the Promise settles
  return user.name;
}
```

- The `async` keyword before a function: it **always returns a Promise**. `return x` becomes a Promise that resolves to `x`.
- `await` works only **inside an `async` function** (or at the top level of a module). It "pauses" **that function** (not the whole page) until the Promise completes and hands you the **value**.

The same job, two ways:

```javascript
// Promise
getUser(1).then((u) => getOrders(u.id)).then((o) => console.log(o));

// async/await
const u = await getUser(1);
const o = await getOrders(u.id);
console.log(o);
```

![fetch + await: send a request then wait for the JSON response](/lessons/javascript/16-async-await-fetch-fig-en.svg)
*fetch + await: send a request then wait for the JSON response*

## Error handling with try/catch

A rejected Promise **throws** at the `await` line, so catch it with the familiar `try/catch`:

```javascript
async function load(id) {
  try {
    const user = await fakeFetchUser(id);
    console.log(user.name);
  } catch (error) {
    console.log("Error: " + error.message);
  }
}
```

## Running in parallel with Promise.all

Sequential `await`s make tasks run **one after another**. If they're independent, run them together:

```javascript
// Slow: 50ms + 50ms = 100ms
const a = await fetchA();
const b = await fetchB();

// Fast: ~50ms
const [a2, b2] = await Promise.all([fetchA(), fetchB()]);
```

## fetch: calling a real API

`fetch` returns a Promise of the **response**; `response.json()` also returns a Promise.

```javascript
async function getTodo(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  if (!response.ok) {                       // fetch does NOT throw on 404/500!
    throw new Error(`HTTP ${response.status}`);
  }
  return await response.json();             // parse JSON
}
```

Sending data (POST):

```javascript
await fetch("/api/todos", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Learn async" }),
});
```

> **Note:** `fetch` only rejects on a **network failure**. HTTP errors like 404/500 are still "successful" responses, so always check `response.ok`.
>
> The practice panel here runs in an isolated sandbox that may block network calls, so the exercises use the simulated `fakeFetchUser`. You'll call real APIs in the Node.js and Next.js courses.

## Common mistakes

- Forgetting `await`: you get a Promise instead of the value (`[object Promise]`).
- Using `await` in `forEach`: it can't wait. Use `for...of` or `Promise.all(arr.map(...))`.
- Not catching errors: an error in an `async` function without `try/catch` becomes an "unhandled rejection".
