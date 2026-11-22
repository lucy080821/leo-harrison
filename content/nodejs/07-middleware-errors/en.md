# Middleware and error handling

> **Note:** a browser has no real Node, so Lexi Learn runs a **simulation** (in-memory fs, a mini `http`/`express`, testing with `app.inject`). The code you write is identical to real Node; each lesson ends with how to run it locally.

**Middleware** is a `(req, res, next)` function that sits *between* the request and the route. It can read/modify `req` and `res`, then either **end** the response or call `next()` to hand over.

```javascript
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();                       // forget this → the request hangs forever
});
```

## Order matters a lot

Express runs things in **declaration order**. General middleware (logging, `express.json()`) goes **before** routes.

![Middleware forms a chain; errors jump to the error handler](/lessons/nodejs/07-middleware-errors-fig-en.svg)
*Middleware forms a chain; errors jump to the error handler*

## Middleware for a single route

```javascript
function auth(req, res, next) {
  if (!req.headers.authorization) return res.status(401).json({ error: "login required" });
  next();
}
app.get("/me", auth, (req, res) => res.json({ ok: true }));
```

## Common built-in / popular middleware

- `express.json()`: parse JSON bodies into `req.body`.
- `express.static("public")`: serve static files.
- `cors()`, `helmet()`, `morgan()` (install from npm).

## Error handling

A middleware with **4 parameters** `(err, req, res, next)` is an error handler; put it **last**:

```javascript
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});
```

Calling `next(err)` (or throwing in an async handler on Express 5) jumps straight there. Never send stack traces to users in production.
