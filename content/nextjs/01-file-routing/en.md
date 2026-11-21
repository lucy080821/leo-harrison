# What Next.js is and folder-based routing

> **Note:** Next.js needs Node.js and a server, so it **can't run inside a browser**. Here you practise the **core ideas** with real React and JavaScript (right side); each lesson has a **run it locally** part using `npx create-next-app@latest`.

**Next.js** is a framework on top of React that gives you everything for a full website: routing, server-side rendering (SSR), APIs, image optimisation, deployment.

## Create a project (run locally)

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev      # http://localhost:3000
```

## App Router: folders = URLs

Inside `app/`, each folder is a URL segment, and the special file `page.js` makes it **reachable**:

```
app/
├─ page.js                 →  /
├─ about/page.js           →  /about
└─ blog/
   ├─ page.js              →  /blog
   └─ [slug]/page.js       →  /blog/anything
```

`[slug]` is a **dynamic segment**. The page receives the value through `params` (since Next 15, `params` is a **Promise**):

```jsx
// app/blog/[slug]/page.js
export default async function Post({ params }) {
  const { slug } = await params;
  return <h1>Post: {slug}</h1>;
}
```

## Navigation

```jsx
import Link from "next/link";
<Link href="/about">About</Link>
```

`Link` navigates **without a full reload** and prefetches the destination.

## Special files

`layout.js` (shared shell), `loading.js`, `error.js`, `not-found.js`, `route.js` (API). You'll meet each in later lessons.
