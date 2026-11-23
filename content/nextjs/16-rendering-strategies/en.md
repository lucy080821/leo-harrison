> **Note:** Next.js needs Node.js and a server, so it **can't run inside a browser**. Here you practise the **core ideas** with real React and JavaScript (right side); each lesson has a **run it locally** part using `npx create-next-app@latest`.

# Rendering strategies: static, dynamic and Partial Prerendering

The core question for every page: **when and where is the HTML built?** The answer decides **speed, cost and data freshness**.

## Three models

| Model | HTML built | Fast | Fresh | Use for |
|---|---|---|---|---|
| **Static** | at **build** time | fastest (served from CDN) | fixed until the next build | about pages, docs, blogs |
| **Dynamic** | on every **request** | slower | always fresh, per user | dashboards, carts |
| **Client-side** | in the browser | empty initial HTML | varies | highly interactive parts |

![A static shell serves instantly while dynamic parts stream in Suspense](/lessons/nextjs/16-rendering-strategies-fig-en.svg)
*A static shell serves instantly while dynamic parts stream in Suspense*

## The modern approach: a static shell + streamed dynamic parts

With **Cache Components**, one page can be **both static and dynamic**:

1. Parts **independent of the request** (and parts using `'use cache'`) are **prerendered into a "static shell"** served instantly from the CDN.
2. **Dynamic** parts (per-user data, `cookies()`, `headers()`, `searchParams`, always-fresh data) sit inside `<Suspense fallback={…}>` and **stream in** when ready.

```jsx
export default function Page() {
  return (
    <>
      <Header />                          {/* static */}
      <Suspense fallback={<Skeleton />}>
        <UserCart />                      {/* dynamic, streamed */}
      </Suspense>
    </>
  )
}
```

Users see **content almost instantly**, then the personalised part appears. This is the idea of **Partial Prerendering**.

## What makes a part dynamic

- Using **request-dependent APIs**: `cookies()`, `headers()`, `searchParams`, `params` not known ahead.
- **Uncached** data fetching (`fetch` without `'use cache'`).
- **Short-lived** caches: the `seconds` profile, `revalidate: 0`, or `expire` < 5 minutes: **excluded from prerenders**.

If a dynamic part **isn't inside Suspense**, the dev tools report a "blocking route" with a suggested fix.

## Choosing by questions

1. Is the data **per user**? ⇒ dynamic (Suspense).
2. **How often does it change**? Never ⇒ static; minutes/hours ⇒ `'use cache'` + `cacheLife`; every second ⇒ dynamic.
3. Do you need **SEO**? Prefer server prerendering.
4. May it change **after a user action**? ⇒ `updateTag`/`revalidateTag` in a Server Action.

## Measure to decide

Read the `next build` report (which routes are static/dynamic), measure **TTFB** and **LCP** (lesson 17), try **throttled networks**.

## References

- Next.js docs: "Caching" (Cache Components), `cacheLife` (prerendering behavior), `use cache`.
- web.dev: "Rendering on the Web".
