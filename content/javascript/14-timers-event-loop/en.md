# Async (1): timers, callbacks and the event loop

## Why asynchronous?

JavaScript runs **one thing at a time** (single-threaded). But many tasks are **slow**: fetching data from the network, reading files, waiting for a user click. Waiting around would freeze the whole page. The solution: **start the task, go do other work, and be called back when it's done**. That's **asynchronous** programming.

![The event loop: call stack, Web APIs, callback queue](/lessons/javascript/14-timers-event-loop-fig-en.svg)
*The event loop: call stack, Web APIs, callback queue*

## setTimeout and setInterval

```javascript
setTimeout(() => console.log("1 second later"), 1000);       // runs ONCE after 1000ms

const id = setInterval(() => console.log("every second"), 1000);   // repeats forever
clearInterval(id);                                        // stop repeating
```

Both take a **callback** (a function to call back) and a number of milliseconds. Both return an `id` for cancelling: `clearTimeout(id)` and `clearInterval(id)`.

> If you forget `clearInterval`, the timer runs forever and may leak memory, especially once the page has dropped the element.

## The event loop: order of execution

```javascript
console.log("1");
setTimeout(() => console.log("3"), 0);
console.log("2");
// Prints: 1, 2, 3
```

Even with a 0ms wait, a `setTimeout` callback **always runs after** the current synchronous code finishes. The mechanism:

```text
 Call Stack  ← running synchronous code, one function at a time
      ▲
 Event Loop  ← when the Stack is empty, takes the next job from the queue
      ▲
 Queue       ← timer callbacks, events, ... waiting for their turn
```

1. Synchronous code runs to the end on the **Call Stack**.
2. A timer expires → its callback is placed in the **queue**.
3. The **Event Loop** sees the Stack is empty and runs the callback.

That's why `setTimeout(fn, 1000)` means "**at least** 1 second later", not exactly.

## Callbacks and "callback hell"

When one step depends on the result of the previous, nested callbacks become an unreadable pyramid:

```javascript
getUser(1, (user) => {
  getOrders(user.id, (orders) => {
    getItems(orders[0], (items) => {
      console.log(items);          // 😵 nested pyramid
    });
  });
});
```

The next two lessons introduce **Promises** and **async/await**: a flat, readable style with much neater error handling.

## Tips

- `setTimeout(fn, 0)` is often used to "let the browser paint, then run".
- For frame-based effects use `requestAnimationFrame` instead of `setInterval`.
- You can pass arguments to the callback: `setTimeout(greet, 500, "Lexi")`.
