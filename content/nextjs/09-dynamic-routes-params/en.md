> **Note:** Next.js needs Node.js and a server, so it **can't run inside a browser**. Here you practise the **core ideas** with real React and JavaScript (right side); each lesson has a **run it locally** part using `npx create-next-app@latest`.

# Dynamic routes: [slug], [...slug] and async params

You can't create a folder per blog post or product. **Dynamic routes** use specially named folders as "templates".

## Segment kinds

| Folder | Matches | `params` |
|---|---|---|
| `app/blog/[slug]/page.js` | `/blog/hello` | `{ slug: 'hello' }` |
| `app/docs/[...slug]/page.js` | `/docs/a/b/c` (needs ≥ 1 segment) | `{ slug: ['a','b','c'] }` |
| `app/shop/[[...slug]]/page.js` | `/shop` and `/shop/a/b` (**optional**) | `{}` or `{ slug: [...] }` |

![Dynamic folders match URLs and hand params to the page](/lessons/nextjs/09-dynamic-routes-params-fig-en.svg)
*Dynamic folders match URLs and hand params to the page*

## params is a Promise

In recent versions `params` (and `searchParams`) are **Promises**: you must `await` them:

```jsx
export default async function Page({ params }) {
  const { slug } = await params
  return <h1>{slug}</h1>
}
```

(Reason: it lets Next.js prerender the static part and wait for request data only when needed.) In a Client Component use `use(params)` or the `useParams()` hook.

## generateStaticParams: prerender at build

```js
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((p) => ({ slug: p.slug }))
}
```

The returned paths are **prerendered to static HTML** (fastest, cheapest). Other paths are rendered on the first request (then cached). With Cache Components, `params`-based data is typically prerendered for known values.

## searchParams

A query `?page=2` arrives via `searchParams` (also a Promise). Because it depends on the **request**, a page using `searchParams` is **dynamic**; wrap the part using it in `<Suspense>`.

## Validate and handle input

`params` come from the URL, i.e. are **user-controlled**:

- Check the format (`/^[a-z0-9-]+$/`) and numeric types (`Number.isInteger`).
- Data not found ⇒ call `notFound()` to return a proper **404**.
- Never concatenate `params` into SQL (use parameterised queries).

## Route groups and structure

`(marketing)` is a **route group**: organises folders **without** adding to the URL. `_private` is excluded from routing. `@slot` is a parallel route (advanced).

## Try it locally

Create `app/blog/[slug]/page.js` printing `slug`; try `/blog/a`, then `app/docs/[...slug]/page.js` with `/docs/x/y`.

## References

- Next.js docs: "Dynamic Routes", `generateStaticParams`, `page.js` (params/searchParams).
- MDN: URL and `URLSearchParams`.
