# Your first HTTP server

> **Note:** a browser has no real Node, so Lexi Learn runs a **simulation** (in-memory fs, a mini `http`/`express`, testing with `app.inject`). The code you write is identical to real Node; each lesson ends with how to run it locally.

The web works on a **request → response** model: the browser sends a *request*, the server sends a *response*.

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello");
});

server.listen(3000);   // open port 3000
```

## Request (`req`)

| Property | Meaning |
|---|---|
| `req.method` | `GET`, `POST`, `PUT`, `DELETE`… |
| `req.url` | path + query, e.g. `/users?id=3` |
| `req.headers` | the headers sent along |

## Response (`res`)

- `res.writeHead(status, headers)`: set the status code and headers.
- `res.end(body)`: send the body and finish.

## Common status codes

| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 400 | Bad request |
| 404 | Not found |
| 500 | Server error |

## Trying it in the browser

We can't open a real port here, so we call `server.inject(url)` — it runs your handler and returns `{ statusCode, headers, body }`. On a real machine, open `http://localhost:3000`.

Plain servers like this get verbose as an API grows — that's why the next lesson uses **Express**.
