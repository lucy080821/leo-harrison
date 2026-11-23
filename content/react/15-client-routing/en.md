# Client-side routing: writing a hash router

A traditional website: each URL is **a server request** that reloads the whole page. A **single-page application (SPA)** loads once, then JavaScript **changes the UI according to the URL** without reloading. Mapping URL → UI is called **client-side routing**.

## The core idea

1. **Read** the current URL (`location`).
2. **Choose** a component by URL.
3. **Listen** for URL changes (Back/Forward, link clicks) and re-render.

This lesson uses the **hash** (`#/about`) since it's simple and needs no special server. The `hashchange` event fires when the hash changes.

![The URL decides which component is displayed](/lessons/react/15-client-routing-fig-en.svg)
*The URL decides which component is displayed*

## Path parameters

`/user/42`: split the segments to get `42` (`path.split("/")[2]`). Real routers use **patterns** like `/user/:id` and match and extract parameters.

## Hash router vs History API

| | Hash (`#/a`) | History API (`/a`) |
|---|---|---|
| Server config | none | must return `index.html` for all paths |
| URL | a bit ugly | clean |
| SEO | poor | better (especially with SSR) |
| API | `hashchange` | `pushState`, `popstate` |

## Routers in practice

- **React Router**: the SPA standard (`<Routes>`, `<Link>`, `useParams`, `useNavigate`, loaders, nested routes).
- **TanStack Router**: strongly type-safe.
- **Next.js (App Router)**: **folder/file-based** routing with SSR. See the Next.js course.

## A good experience

- Use real **`<Link>`/`<a>`** so links open in new tabs and work with screen readers, not `<div onClick>`.
- Put state **in the URL** (filters, page, tab) so it's **shareable and bookmarkable**.
- **Navigation without reload**: remember to **scroll to top** and move **focus** to the heading (accessibility).
- A 404 page for unknown routes; **protect routes** needing login (and re-check on the server).

## References

- MDN: History API; Window `hashchange` event.
- React Router and TanStack Router documentation.
