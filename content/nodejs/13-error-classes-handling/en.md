# Errors in Node: custom error classes, operational vs programmer errors

> **Note:** a browser has no real Node, so Lexi Learn runs a **simulation** (in-memory fs, a mini `http`/`express`, testing with `app.inject`). The code you write is identical to real Node; each lesson ends with how to run it locally.

Good error handling is the line between a **trustworthy** service and one that "crashes now and then for unclear reasons".

## Two kinds of errors

| | **Operational errors** | **Programmer errors** |
|---|---|---|
| Cause | environment: network drop, missing file, bad input, timeout | bugs: `undefined.x`, wrong type, missing `await` |
| Example | `ECONNREFUSED`, 404, failed validation | `TypeError`, `ReferenceError` |
| Handling | **handle**: retry, tell the user, use a fallback | **fix the code**; log, exit, let a supervisor restart |

(Joyent's classification, "Error Handling in Node.js".) Don't swallow programmer errors with an empty `catch`: you hide bugs.

![Operational errors are handled; programmer errors are fixed in code](/lessons/nodejs/13-error-classes-handling-fig-en.svg)
*Operational errors are handled; programmer errors are fixed in code*

## Custom error classes

```js
class AppError extends Error {
  constructor(message, { status = 500, code = 'INTERNAL', cause } = {}) {
    super(message, { cause })
    this.name = this.constructor.name
    this.status = status
    this.code = code
  }
}
class NotFoundError extends AppError { ... }   // 404
```

Benefits: test with `instanceof`, carry a **machine-readable `code`** and an **HTTP status**, and distinguish **expected** (`AppError`) from **unexpected** errors.



## cause: keep the root cause

`new Error('Could not load user', { cause: e })` (ES2022) chains causes: logs show **both the high-level error and the original** (database connection), losing no context.

## Mapping errors to HTTP responses

A **centralised error-handling middleware** (lesson 7) turns `AppError` into a consistent JSON response; unknown errors return a **generic 500** and log details. **Never** return stack traces or internal messages to clients (they reveal system structure).

## Practical rules

1. `catch` only when you can **do something useful** (retry, add context, translate the error).
2. **Throw `Error`**, not bare strings/objects (lose the stack).
3. In `async` code always `await` or `.catch`; an **abandoned Promise** causes `unhandledRejection`.
4. Use stable error codes (`code`) for clients/logs, never compare messages.
5. Put the **request id** in error logs to trace.

## References

- Node.js docs: `Error`, "Errors" (system error codes), `error.cause`.
- Joyent: "Error Handling in Node.js"; MDN: `Error.prototype.cause`.
