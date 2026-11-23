# Fetching data, loading and errors

> **Note:** Next.js needs Node.js and a server, so it **can't run inside a browser**. Here you practise the **core ideas** with real React and JavaScript (right side); each lesson has a **run it locally** part using `npx create-next-app@latest`.

## The Next.js way: wait on the server

A Server Component can be `async` and `await` data **directly**, no `useEffect`:

```jsx
// app/posts/page.js
export default async function Posts() {
  const res = await fetch("https://api.example.com/posts");
  const posts = await res.json();
  return <ul>{posts.map((p) => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

The browser receives HTML that already contains the data. You can even query a database here since the code runs on the server.

![loading.tsx shows while data loads, error.tsx on failure](/lessons/nextjs/04-data-loading-fig-en.svg)
*loading.tsx shows while data loads, error.tsx on failure*

## loading.js — loading state

Put a `loading.js` file next to `page.js`. Next shows it instantly while the page waits for data (built on React Suspense):

```jsx
// app/posts/loading.js
export default function Loading() {
  return <p>Loading...</p>;
}
```

## error.js — catching errors

```jsx
// app/posts/error.js
"use client";
export default function Error({ error, retry }) {
  return (
    <div>
      <p>Something went wrong: {error.message}</p>
      <button onClick={() => retry()}>Try again</button>
    </div>
  );
}
```

## What about the exercises on the right?

A browser can't run async Server Components, so on the right you practise the **same three states** (loading → success → error) with `useState` + `useEffect` — the **Client Component** way. Understanding these three states is understanding `loading.js` and `error.js`.
