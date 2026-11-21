# Express: routing

> **Note:** a browser has no real Node, so Lexi Learn runs a **simulation** (in-memory fs, a mini `http`/`express`, testing with `app.inject`). The code you write is identical to real Node; each lesson ends with how to run it locally.

**Express** is Node's most popular web framework: far less code than raw `http`.

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello"));
app.listen(3000, () => console.log("Listening on port 3000"));
```

## A route = method + path + handler

```javascript
app.get("/users", handler);       // read
app.post("/users", handler);      // create
app.put("/users/:id", handler);   // update
app.delete("/users/:id", handler);// delete
```

## Reading data from the request

| Source | Example | Access |
|---|---|---|
| Path parameter | `/users/5` with route `/users/:id` | `req.params.id` |
| Query string | `/search?q=node&page=2` | `req.query.q`, `req.query.page` |
| JSON body | POST with JSON | `req.body` (needs `express.json()`) |

Note: `req.params` and `req.query` are always **strings**. Use `Number(...)` when you need a number.

## Sending responses

- `res.send("text")`: text/HTML.
- `res.json(obj)`: JSON (sets the header for you).
- `res.status(404).json({...})`: set the status code.
- `res.redirect("/target")`: redirect.
