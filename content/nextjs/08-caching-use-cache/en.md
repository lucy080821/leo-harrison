> **Note:** Next.js needs Node.js and a server, so it **can't run inside a browser**. Here you practise the **core ideas** with real React and JavaScript (right side); each lesson has a **run it locally** part using `npx create-next-app@latest`.

# Caching: 'use cache', cacheLife and cacheTag

Most website data **doesn't change every second**. Storing results (caching) makes pages faster and eases load on the database/API. The classic difficulty: *"there are only two hard things in computer science: cache invalidation and naming things."*

## Cache Components (Next.js 16)

With `cacheComponents: true` (apps created by `create-next-app` have it on), **everything is dynamic by default** and you **opt in to caching** with the `'use cache'` directive:

```js
import { cacheLife } from 'next/cache'

export async function getProducts() {
  'use cache'
  cacheLife('hours')
  return db.query('SELECT * FROM products')
}
```

- **Data level**: cache a data-fetching function.
- **UI level**: cache a whole component/page (`'use cache'` at the top of the body).
- Arguments and values captured from the outer scope **automatically become part of the cache key**.

![Time-based caching (cacheLife) and tag-based revalidation (cacheTag)](/lessons/nextjs/08-caching-use-cache-fig-en.svg)
*Time-based caching (cacheLife) and tag-based revalidation (cacheTag)*

## cacheLife: lifetime

| Profile | stale | revalidate | expire |
|---|---|---|---|
| `seconds` | 30 s | 1 s | 60 s |
| `minutes` | 5 min | 1 min | 1 h |
| `hours` | 5 min | 1 h | 1 day |
| `days` | 5 min | 1 day | 1 week |
| `max` | 5 min | 30 days | 1 year |

You can pass an object `{ stale, revalidate, expire }` (seconds). **Always pair** it with `cacheLife` rather than relying on the default.

## cacheTag + revalidateTag/updateTag: on-demand refresh

```js
export async function getProducts() {
  'use cache'
  cacheTag('products')
  ...
}

// in a Server Action after changing data:
updateTag('products')              // expires IMMEDIATELY: the user sees their own change
revalidateTag('products', 'max')   // stale-while-revalidate: serve old, refresh in background
```

- **`updateTag`**: Server Actions only; read-your-own-writes.
- **`revalidateTag(tag, 'max')`**: for content that tolerates a slight delay.
- **`revalidatePath('/posts')`**: refresh by path.

## Data that must be fresh on every request

Do **not** use `'use cache'`; wrap the component in `<Suspense fallback={…}>` so the **static part is prerendered** and the dynamic part **streams in** when ready. Request-dependent APIs (`cookies()`, `headers()`, `searchParams`) should also sit in `<Suspense>`.

## Wrong caching is a quiet bug

- **Per-user** data (cart, profile) must not be cached and shared among everyone.
- Forgetting to refresh after a change ⇒ users see stale data.
- Choose lifetimes by **business sensitivity**: price/stock short, blog posts long.

## Try it locally

In `next.config.ts` enable `cacheComponents: true`, add `'use cache'` + `cacheLife('minutes')` to a function with a `console.log`, and watch it re-run only on expiry.

## References

- Next.js docs: "Caching", "Revalidating", `cacheLife`, `cacheTag`, `updateTag`, `revalidateTag`.
- MDN: HTTP caching; RFC 5861 (stale-while-revalidate).
