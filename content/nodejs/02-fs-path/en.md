# Files and paths: fs, path

> **Note:** a browser has no real Node, so Lexi Learn runs a **simulation** (in-memory fs, a mini `http`/`express`, testing with `app.inject`). The code you write is identical to real Node; each lesson ends with how to run it locally.

## fs — working with files

```javascript
const fs = require("fs");

fs.writeFileSync("a.txt", "content");      // write (overwrites)
fs.appendFileSync("a.txt", "more");         // append
const text = fs.readFileSync("a.txt", "utf8");
fs.existsSync("a.txt");                      // true/false
fs.mkdirSync("folder", { recursive: true });
fs.readdirSync("folder");                    // array of names
fs.unlinkSync("a.txt");                      // delete
```

Every function comes in three flavours:

| Style | Example | Notes |
|---|---|---|
| Synchronous | `readFileSync` | blocks until done, handy for scripts |
| Callback | `readFile(p, cb)` | non-blocking, old style |
| Promise | `fs.promises.readFile(p)` | non-blocking, use with `await` |

On a server prefer the **Promise** form so other requests aren't blocked.

![path joins paths; fs reads and writes files](/lessons/nodejs/02-fs-path-fig-en.svg)
*path joins paths; fs reads and writes files*

## path — build paths correctly

Don't join strings by hand (`"a" + "/" + "b"`) because Windows uses `\`. Let `path` handle it:

```javascript
const path = require("path");
path.join("/data", "notes", "a.txt");   // /data/notes/a.txt
path.basename("/x/y/a.txt");            // a.txt
path.extname("a.tar.gz");               // .gz
path.dirname("/x/y/a.txt");             // /x/y
path.resolve("a", "b");                 // absolute path
```
