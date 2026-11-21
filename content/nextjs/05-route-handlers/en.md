# Route Handlers: building APIs in Next.js

> **Note:** Next.js needs Node.js and a server, so it **can't run inside a browser**. Here you practise the **core ideas** with real React and JavaScript (right side); each lesson has a **run it locally** part using `npx create-next-app@latest`.

Need an API for your site (or a mobile app)? Create a `route.js` file — no separate Express server required.

```
app/
└─ api/
   └─ todos/
      └─ route.js     →  /api/todos
```

Export one function **per HTTP method**:

```javascript
// app/api/todos/route.js
export async function GET() {
  return Response.json([{ id: 1, title: "Learn Next" }]);
}

export async function POST(request) {
  const body = await request.json();
  return Response.json({ id: 2, title: body.title }, { status: 201 });
}
```

## Standard Web Request and Response

Next.js uses the **Web Standard** `Request`/`Response` classes (also built into browsers, Node 18+, Deno, Cloudflare). That's why you can call the function directly on the right, no server needed.

| Task | How |
|---|---|
| Read a query | `new URL(request.url).searchParams.get("q")` |
| Read a JSON body | `await request.json()` |
| Read a header | `request.headers.get("authorization")` |
| Return JSON | `Response.json(data, { status: 200 })` |

## Dynamic paths

`app/api/todos/[id]/route.js` receives the id through the second argument (a Promise since Next 15):

```javascript
export async function GET(request, { params }) {
  const { id } = await params;
  return Response.json({ id });
}
```

> A Route Handler and a `page.js` **cannot** live in the same folder — one path, one role.
