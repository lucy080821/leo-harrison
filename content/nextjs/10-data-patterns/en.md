> **Note:** Next.js needs Node.js and a server, so it **can't run inside a browser**. Here you practise the **core ideas** with real React and JavaScript (right side); each lesson has a **run it locally** part using `npx create-next-app@latest`.

# Fetching data: parallel, sequential and de-duplication

In Server Components you fetch data **directly inside an async component**, no `useEffect` needed:

```jsx
export default async function Page() {
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()
  return <ul>{posts.map((p) => <li key={p.id}>{p.title}</li>)}</ul>
}
```

You can also query the **database/ORM directly** (Prisma, Drizzle) since the code runs on the server; secret keys never reach the browser.

## Sequential vs parallel

- **Sequential (waterfall)**: request B **depends** on A's result (you need `userId` to fetch posts). Slower but sometimes necessary.
- **Parallel**: **independent** requests must start **at the same time**:

```js
const [user, posts] = await Promise.all([getUser(), getPosts()])
```

Forgetting this is the **number-one performance cause** of slow pages: two 200 ms requests sequentially take 400 ms; in parallel 200 ms.

![Parallel costs only the time of the slowest request](/lessons/nextjs/10-data-patterns-fig-en.svg)
*Parallel costs only the time of the slowest request*

## Two effective patterns

1. **Start early**: call the data function (without `await`) at the top, then `await` after other work.
2. **Each component fetches what it needs** instead of a parent fetching everything and passing it down: Next.js **de-duplicates** and lets each block **stream** with `<Suspense>`.

## De-duplication: React.cache

Several components need `getUser(id)` in one render pass: wrap with `cache` so it runs **once**:

```js
import { cache } from 'react'
export const getUser = cache(async (id) => db.user.findUnique({ where: { id } }))
```

(Identical `fetch` calls are also de-duplicated automatically within a render pass.) To cache **across requests**, use `'use cache'` (lesson 8).

## Streaming with Suspense and loading.js

- `loading.js` in a route folder: a waiting UI for the **whole page**.
- `<Suspense>`: waits per **block**; the rest shows immediately.

Design meaningful loading states (skeletons of the right shape) to avoid **layout shift**.

## Client Components

Data in a Client Component: pass a **promise** from the Server Component and read it with `use(promise)` inside `<Suspense>`, or use TanStack Query/SWR.

## Common mistakes

- `await`ing independent requests one after another.
- Sending an entire database record to a Client Component (leaking sensitive fields): pass **only needed fields**.
- Fetching in a loop (N+1): batch into one query.

## References

- Next.js docs: "Fetching Data" (Sequential/Parallel/React.cache/Preloading sections).
- React docs: `cache`, `use`, `Suspense`.
