# Practical middleware: request id, auth and rate limiting

> **Note:** a browser has no real Node, so Lexi Learn runs a **simulation** (in-memory fs, a mini `http`/`express`, testing with `app.inject`). The code you write is identical to real Node; each lesson ends with how to run it locally.

Middleware is the **pipeline** every request passes through. Cross-cutting concerns (logging, auth, rate limiting, compression, CORS) belong here, **not** repeated in each route.

## The middleware chain

```js
app.use(requestId)      // 1. attach a request id
app.use(logger)         // 2. log
app.use(rateLimit(100)) // 3. block abuse early
app.use(authenticate)   // 4. authenticate (who?)
app.use('/api', router) // 5. routes
app.use(errorHandler)   // LAST: error handling (4 params)
```

**Order is behaviour.** Put rate limiting **before** authentication so attackers can't make the server work to verify tokens; error handling **last**.



![Middleware order is behaviour](/lessons/nodejs/16-middleware-patterns-fig-en.svg)
*Middleware order is behaviour*

## Three common patterns

1. **Request id**: generate a unique id (`crypto.randomUUID()`), put it on `req.id`, return it in an `X-Request-Id` header and include it in **every log line**: trace one request end to end.
2. **Authentication/authorization**: read the token, attach `req.user`; a **factory** middleware `requireRole('admin')` returns 401/403.
3. **Rate limiting**: defend against login brute force, scraping, and client retry storms.

## Rate-limiting algorithms

| Algorithm | Idea | Traits |
|---|---|---|
| **Fixed window** | count within each minute | simple; allows bursts at boundaries |
| **Sliding window** | count in the last N seconds | smoother, more memory |
| **Token bucket** | a bucket of tokens refilled steadily, each request takes 1 | allows **controlled bursts**, most popular |

With **several machines**, the counter must live in a **shared store** (**Redis**), otherwise each machine counts separately. Return **429 Too Many Requests** with `Retry-After`. Libraries: `express-rate-limit`, `rate-limiter-flexible`.

## Middleware design principles

- Do **one thing**; call `next()` or **end the response**, not both, and never silently (hanging the request).
- `async` middleware must handle errors (Express 5 forwards errors/rejections to the error handler; Express 4 needs `try/catch` or a wrapper).
- Don't read large request bodies fully into memory: **limit size** (`express.json({ limit: '100kb' })`).

## References

- Express docs: "Using middleware", "Error handling".
- OWASP: Denial of Service Cheat Sheet; RFC 6585 (429).
- Stripe Engineering: "Scaling your API with rate limiters".
