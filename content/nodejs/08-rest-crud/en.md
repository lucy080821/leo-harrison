# REST API: CRUD with JSON

> **Note:** a browser has no real Node, so Learn With Leo runs a **simulation** (in-memory fs, a mini `http`/`express`, testing with `app.inject`). The code you write is identical to real Node; each lesson ends with how to run it locally.

**REST** is a convention for designing APIs around **resources** (todos, users, orders…) and HTTP methods. The four basic operations are **CRUD**:

| Task | Method | Path | Success |
|---|---|---|---|
| List | GET | `/todos` | 200 |
| Read one | GET | `/todos/:id` | 200 / 404 |
| Create | POST | `/todos` | **201** |
| Update | PUT / PATCH | `/todos/:id` | 200 |
| Delete | DELETE | `/todos/:id` | 204 (no content) |

## Reading a JSON body

```javascript
app.use(express.json());           // BEFORE the routes
app.post("/todos", (req, res) => {
  const { title } = req.body;
  ...
});
```

![REST CRUD: HTTP methods map to data operations](/lessons/nodejs/08-rest-crud-fig-en.svg)
*REST CRUD: HTTP methods map to data operations*

## A typical CRUD route

```javascript
app.get("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: "not found" });
  res.json(todo);
});
```

## Design rules

- Plural nouns in paths (`/todos`), **no** verbs (`/getTodos`).
- Use the right status: 201 on create, 404 when missing, 400 for bad input.
- Always return consistently-shaped JSON, errors included.

Data here lives in an array, so it vanishes on restart. In practice you'd use a database (see the SQL course).
