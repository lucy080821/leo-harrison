# Async: callbacks, Promises, async/await

> **Note:** a browser has no real Node, so Learn With Leo runs a **simulation** (in-memory fs, a mini `http`/`express`, testing with `app.inject`). The code you write is identical to real Node; each lesson ends with how to run it locally.

Node runs on **one thread** yet handles thousands of requests thanks to the **event loop**: when it hits a wait (file read, network call, timer), it registers "call me back when done" and moves on.

## Three generations of syntax

```javascript
// 1. Callback (old, easily becomes "callback hell")
fs.readFile("a.txt", "utf8", (err, data) => { if (err) return ...; ... });

// 2. Promise
fs.promises.readFile("a.txt", "utf8").then(...).catch(...);

// 3. async/await (preferred) — reads like synchronous code
async function main() {
  try {
    const data = await fs.promises.readFile("a.txt", "utf8");
  } catch (err) {
    console.error(err.message);
  }
}
```

![Callback pyramid vs async/await](/lessons/nodejs/04-async-fig-en.svg)
*Callback pyramid vs async/await*

## Timers

```javascript
const { setTimeout: sleep } = require("timers/promises");
await sleep(1000);                 // wait 1 second
```

## Running in parallel

Awaiting one by one is **slow**. Run independent work together:

```javascript
const [users, posts] = await Promise.all([getUsers(), getPosts()]);
```

## Golden rules

- An `async` function always returns a Promise.
- Don't forget `await` — without it you get a Promise instead of the value.
- Always handle errors (`try/catch` or `.catch`) so the server doesn't crash.
