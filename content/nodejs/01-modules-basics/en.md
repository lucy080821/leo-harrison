# Node.js and modules

> **Note:** a browser has no real Node, so Learn With Leo runs a **simulation** (in-memory fs, a mini `http`/`express`, testing with `app.inject`). The code you write is identical to real Node; each lesson ends with how to run it locally.

**Node.js** runs JavaScript **outside the browser** — for servers, command-line tools and automation scripts. It is the same language you already know, but instead of `window`/`document` you get system modules: `fs` (files), `http` (network), `path`…

## Modules

Every file is a **module**. Export with `module.exports` or `exports`, import with `require`:

```javascript
// math.js
exports.add = (a, b) => a + b;

// app.js
const math = require("./math");
console.log(math.add(2, 3));
```

(Node also supports ES-module `import`/`export` in `.mjs` files or with `"type": "module"`.)

![require/import loads a module; module.exports exposes it](/lessons/nodejs/01-modules-basics-fig-en.svg)
*require/import loads a module; module.exports exposes it*

## Globals

- `process`: process info — `process.env` (environment variables), `process.argv` (arguments), `process.exit()`.
- `Buffer`: raw binary data. `Buffer.from("hi").toString("hex")` → `6869`.
- `__dirname`, `__filename`: the current file's folder/path.

## Running locally

```bash
node app.js
```
