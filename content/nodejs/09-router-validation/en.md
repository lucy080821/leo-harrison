# Router, validation and deployment

> **Note:** a browser has no real Node, so Learn With Leo runs a **simulation** (in-memory fs, a mini `http`/`express`, testing with `app.inject`). The code you write is identical to real Node; each lesson ends with how to run it locally.

## express.Router — splitting up your app

As an API grows, don't stuff everything in one file. Each group of resources is a **Router**:

```javascript
// routes/users.js
const router = require("express").Router();
router.get("/", listUsers);
router.post("/", createUser);
module.exports = router;

// app.js
app.use("/api/users", require("./routes/users"));
```

Suggested project layout:

```
my-api/
├─ package.json
├─ server.js        # startup, app.listen
├─ app.js           # build the app, mount middleware + routers
├─ routes/          # users.js, todos.js …
└─ .env             # PORT, DATABASE_URL (never commit!)
```

Keeping `app.js` free of `listen` makes testing easy — just like `app.inject` here.

![Routers group routes; validation blocks bad data before the handler](/lessons/nodejs/09-router-validation-fig-en.svg)
*Routers group routes; validation blocks bad data before the handler*

## Validating input

**Never trust client data.** Check type, length and format before using it; respond `400` when wrong.

```javascript
if (typeof name !== "string" || name.length < 2) {
  return res.status(400).json({ error: "invalid name" });
}
```

Real projects often use a library such as **zod** or **joi** to declare the "shape" of data.

## Deploying to a VPS (Hostinger)

1. `npm install --omit=dev` on the server.
2. Read config from the environment: `const port = process.env.PORT || 3000;`
3. Keep it alive with **pm2**: `pm2 start server.js --name my-api`.
4. Put **Nginx** in front as a reverse proxy to the app's port and add HTTPS (Let's Encrypt).
