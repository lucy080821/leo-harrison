> **Note:** Next.js needs Node.js and a server, so it **can't run inside a browser**. Here you practise the **core ideas** with real React and JavaScript (right side); each lesson has a **run it locally** part using `npx create-next-app@latest`.

# Project: a blog API with Route Handlers, validation and pagination

A capstone: design a **small but standards-compliant REST API** with Route Handlers, applying what you've learned about input validation, security, status codes and performance.

## Designing resources

| Method + path | Does | Success code |
|---|---|---|
| `GET /api/posts?page=2&limit=10` | list, paginated | 200 |
| `POST /api/posts` | create | **201** |
| `GET /api/posts/:id` | read one | 200 / **404** |
| `DELETE /api/posts/:id` | delete | **204** (no content) / 404 |

Folder layout:

```
app/api/posts/route.js          # GET (list), POST
app/api/posts/[id]/route.js     # GET, DELETE (params is a Promise)
```

![The blog API: four operations with the right status codes](/lessons/nextjs/19-project-blog-api-fig-en.svg)
*The blog API: four operations with the right status codes*

## The right status codes

- **400** bad input; **401** not authenticated; **403** not permitted; **404** not found; **409** conflict (duplicate); **429** too many requests.
- **500** is *your* fault: don't leak details.

## Validating input

```js
const body = await request.json().catch(() => null)   // broken JSON doesn't crash
if (!body || typeof body.title !== 'string' || body.title.trim().length < 2) {
  return Response.json({ error: '...' }, { status: 400 })
}
```

In practice use **Zod** to describe the schema once, serving both validation and TypeScript types. **Trust no field**, including the `id` from the URL.

## Pagination

Always **cap** `limit` (max 50) and **coerce to a valid integer**: otherwise a `?limit=1000000` request can bring the server down.

| Style | Pros | Cons |
|---|---|---|
| **offset/limit** (`page`) | simple, can jump to pages | slow on deep pages; drifts when data changes |
| **cursor** (`after=id`) | fast, stable | can't jump to an arbitrary page |

Return `total` or `nextCursor` so the client knows if there's more.

## Security and operations

1. **Authenticate + authorise** `POST`/`DELETE` (lesson 12); check ownership.
2. **Rate limit** by IP/user.
3. **CORS** open only to the needed origins.
4. Write **structured logs** with a request id (lesson 18).
5. **Cache** public `GET`s with `'use cache'` + `cacheTag('posts')`; `updateTag('posts')` after create/delete.
6. **Test**: call handlers directly with fake `Request`s as in this lesson, since they're pure functions over standard Web APIs.

## Where next

Replace the in-memory array with a **database** (PostgreSQL + Drizzle/Prisma), add sign-in, then build an admin UI with Server Actions (lesson 7). Study the SQL and Node.js courses for deeper data and server knowledge.

## References

- Next.js docs: "Route Handlers".
- MDN: HTTP response status codes; Fetch API `Request`/`Response`.
- Microsoft REST API Guidelines; Zalando RESTful API Guidelines.
