# The event loop and concurrency: execution order and parallelism limits

> **Note:** a browser has no real Node, so Learn With Leo runs a **simulation** (in-memory fs, a mini `http`/`express`, testing with `app.inject`). The code you write is identical to real Node; each lesson ends with how to run it locally.

Node runs JavaScript on a **single main thread**, yet serves tens of thousands of connections. The secret is the **event loop** plus **non-blocking I/O**. Understanding it helps you avoid Node's most expensive performance mistake.

## The model

1. Synchronous code runs to completion on the **call stack**.
2. Slow operations (file reads, network, timers) are **handed to the OS/background threads**; when done they put a **callback** in a queue.
3. The **event loop** takes callbacks from the queue and runs them **when the stack is empty**.

![Synchronous first, then microtasks, then macrotasks](/lessons/nodejs/20-event-loop-concurrency-fig-en.svg)
*Synchronous first, then microtasks, then macrotasks*

## Order: microtasks before macrotasks

| Queue | Contains | When it runs |
|---|---|---|
| **Synchronous** | currently running code | immediately |
| **`process.nextTick`** | highest priority | after the current operation |
| **Microtasks** | `Promise.then`, `await`, `queueMicrotask` | **all** microtasks drain before the next step |
| **Macrotasks** | `setTimeout`, `setInterval`, `setImmediate`, I/O | a portion each loop iteration |

So `Promise.then` runs **before** `setTimeout(…, 0)`. Abusing recursive microtasks can **starve** I/O.



## The cardinal sin: blocking the event loop

A **heavy synchronous** task makes **every other user wait**:

- `readFileSync`/`JSON.parse` of a huge file in a route.
- Long compute loops (hand-rolled hashing, compression, image processing).
- **Catastrophic** regular expressions (ReDoS).

Fixes: use **async** versions, **streams** (lesson 11), split work into small pieces, or move CPU-heavy work to **Worker Threads** (separate threads, shared memory); **cluster**/multiple processes (PM2, Kubernetes) to use many cores.

## Controlled concurrency

`Promise.all` over 10,000 items **fires 10,000 requests at once**: overloading the DB, APIs, or exceeding open-file limits. Use a **concurrency limit** (`p-limit`, `p-map`, or hand-write with "workers" pulling the next index as in this lesson):

```js
const results = await mapLimit(urls, 5, (u) => fetch(u))   // at most 5 at once
```

Combine with **timeouts** (`AbortSignal.timeout(5000)`) and **retries with backoff** for outside calls.

## I/O-bound vs CPU-bound

| Kind | Example | Fits |
|---|---|---|
| **I/O-bound** (waiting) | APIs, databases, files | Node excels (async) |
| **CPU-bound** (computing) | encryption, images, ML | Worker Threads, a separate service, or another language |

## Debugging

Measure **event-loop delay** (`perf_hooks.monitorEventLoopDelay`); if it spikes, something is blocking. Use `node --cpu-prof`/`clinic` to find hot functions.

## References

- Node.js docs: "The Node.js Event Loop, Timers, and process.nextTick()", `worker_threads`, "Don't Block the Event Loop".
- Jake Archibald: "Tasks, microtasks, queues and schedules".
