# JSON and data storage

## What is JSON?

**JSON** (JavaScript Object Notation) is a **text format** for exchanging data between systems: APIs return JSON, config files are written in JSON, `package.json`...

```json
{
  "name": "Lexi",
  "age": 20,
  "skills": ["HTML", "JS"],
  "active": true,
  "address": null
}
```

Unlike JavaScript objects, JSON is **stricter**:

- Keys **must** be in **double quotes** `"`.
- Strings use double quotes `"` only, never `'`.
- **No** trailing commas, comments, functions or `undefined`.
- Allowed types: string, number, boolean, `null`, array, object.

![JSON.stringify and JSON.parse convert between objects and strings](/lessons/javascript/18-json-storage-fig-en.svg)
*JSON.stringify and JSON.parse convert between objects and strings*

## stringify and parse

```javascript
const text = JSON.stringify({ a: 1, tags: ["x"] });   // '{"a":1,"tags":["x"]}'
const obj  = JSON.parse(text);                        // { a: 1, tags: ["x"] }

JSON.stringify(obj, null, 2);                         // pretty-print, 2-space indent
```

- `JSON.parse` throws a `SyntaxError` for badly formed text: **wrap it in `try/catch`** when data is untrusted.
- Functions and `undefined` are **skipped**; a `Date` becomes an ISO string (it doesn't turn back into a `Date` on parse).

### Quick deep copy (with limits)

`JSON.parse(JSON.stringify(obj))` makes a deep copy but loses functions and `Date`s. `structuredClone(obj)` is better.

## Web Storage: saving data in the browser

| | `localStorage` | `sessionStorage` | Cookie |
|---|---|---|---|
| Lives until | **Forever** (until cleared) | The **tab is closed** | The set expiry |
| Capacity | ~5 MB | ~5 MB | ~4 KB |
| Sent to the server | No | No | **Yes**, automatically with every request |

```javascript
localStorage.setItem("theme", "dark");
localStorage.getItem("theme");        // "dark"  (null if absent)
localStorage.removeItem("theme");
localStorage.clear();
```

Web Storage **stores strings only**. To store objects or arrays you go through JSON:

```javascript
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function load(key, fallback) {
  const raw = localStorage.getItem(key);
  return raw === null ? fallback : JSON.parse(raw);
}

save("todos", [{ text: "Learn JS", done: false }]);
load("todos", []);
```

> **Security warning:** don't store passwords or sensitive tokens in `localStorage`, since malicious JavaScript (XSS) can read it. For login sessions use `HttpOnly` cookies set by the server.
>
> This practice panel runs in a sandbox without `localStorage` access, so the exercise simulates it with a plain object. On a real website, replace `storage` with `localStorage` and it works.
