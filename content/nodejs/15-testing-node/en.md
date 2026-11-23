# Testing Node: a hand-made test runner, assert and app.inject

> **Note:** a browser has no real Node, so Learn With Leo runs a **simulation** (in-memory fs, a mini `http`/`express`, testing with `app.inject`). The code you write is identical to real Node; each lesson ends with how to run it locally.

Testing isn't "extra work": it gives you the **courage to change code**. An API without tests is one **nobody dares touch** after three months.

## What a test runner really is

A function taking a name and a check, running it, catching errors, reporting (the opening snippet). Node 18+ has **`node:test`** built in:

```js
import { test } from 'node:test'
import assert from 'node:assert/strict'

test('adds two numbers', () => {
  assert.equal(add(2, 3), 5)
})
```

Run with `node --test`. Other options: **Vitest** (fast, Jest-compatible), **Jest**.

![Arrange - Act - Assert](/lessons/nodejs/15-testing-node-fig-en.svg)
*Arrange - Act - Assert*

## Structure of a test: Arrange - Act - Assert

1. **Arrange**: set up data/state.
2. **Act**: invoke exactly one behaviour.
3. **Assert**: check the **observable** result.

Tests should be **small, independent, fast, and named for behaviour** ("returns 404 when the post doesn't exist").



## Testing an API: no port needed

An Express app is a request-handling function. The **supertest** library (or `app.inject` in this simulator, Fastify's `fastify.inject`) calls it directly, fast and with no port clashes:

```js
const res = await request(app).get('/ping')
assert.equal(res.status, 200)
```

Test **the error paths too**: bad input (400), missing permission (401/403), not found (404).

## Mocks: replacing external dependencies

Sending email, payments, third-party APIs **shouldn't run for real** in tests. Pass the dependency in (**dependency injection**) and swap in a fake that records calls; you can check *"was it called with the right arguments"*. `node:test` has `mock.fn()`.

Principle: mock at **system boundaries** (network, email, clock), don't over-mock your own code (tests break on refactors even when behaviour is right).

## The test pyramid

| Layer | Quantity | Example |
|---|---|---|
| **Unit** | many | pure functions, computation, validation |
| **Integration** | some | API + a real database (container), slice checks |
| **End-to-end** | few | key flows through a browser |

Use a **real database in a container** (Testcontainers/Docker) for integration tests instead of mocking the DB: it catches real query bugs.

## Good habits

- Run tests in **CI** for every pull request.
- **Coverage** is an indicator, not a goal: 100% coverage can still miss bugs. Prioritise **risky spots** (payments, permissions).
- Write a test for every fixed bug so it **doesn't return**.
- Avoid time-/randomness-dependent tests: **inject the clock** and seeds.

## References

- Node.js docs: `node:test`, `assert`.
- Supertest; Vitest documentation.
- Martin Fowler: "Practical Test Pyramid".
