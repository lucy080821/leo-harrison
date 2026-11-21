# Server Components and Client Components

> **Note:** Next.js needs Node.js and a server, so it **can't run inside a browser**. Here you practise the **core ideas** with real React and JavaScript (right side); each lesson has a **run it locally** part using `npx create-next-app@latest`.

This is the most important idea in the App Router.

## Default: Server Components

Inside `app/`, every component **runs on the server** and ships to the browser as pre-rendered HTML. Benefits:

- Faster loads, less JavaScript sent to the client.
- Read databases, files and secrets **directly** — safe because the code never leaves the server.
- Great for SEO (content is in the HTML).

```jsx
// app/posts/page.js — a Server Component, can be async
export default async function Posts() {
  const res = await fetch("https://api.example.com/posts");
  const posts = await res.json();
  return <ul>{posts.map((p) => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

## Client Components: when you need interactivity

State, events (`onClick`) and browser hooks (`useEffect`, `window`) only work on the client. Add `"use client"` at the **top of the file**:

```jsx
"use client";
import { useState } from "react";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  return <button onClick={() => setLikes(likes + 1)}>👍 {likes}</button>;
}
```

## How to combine them

- Keep most of the page as Server Components; only small interactive "islands" are Client Components.
- A Server Component may **import** Client Components and pass data via props (props must be serialisable: strings, numbers, arrays, plain objects — no functions).

## renderToString in this lesson

On the right you use `renderToString` to see exactly what the server produces: **an HTML string**. The browser receives it and (for Client Components) "hydrates" — attaches events so the page comes alive.
