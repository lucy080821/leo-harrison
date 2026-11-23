> **Note:** Next.js needs Node.js and a server, so it **can't run inside a browser**. Here you practise the **core ideas** with real React and JavaScript (right side); each lesson has a **run it locally** part using `npx create-next-app@latest`.

# Error handling: error.js, not-found and expected errors

Errors are **normal** in real systems: network drops, missing data, wrong user input. A professional app **never shows a blank page or a stack trace** to users.

## Two kinds of errors, two treatments

| Kind | Example | Handling |
|---|---|---|
| **Expected errors** | form validation fails, API returns 4xx, not found | **return as values** (`{ ok:false, message }`), show next to the field; `notFound()` for 404 |
| **Unexpected errors** | bugs, database down, surprise null | **throw** so it falls into `error.js` |

For Server Functions, **avoid `try/catch` + `throw` for expected errors**; use `useActionState` to display messages (lesson 7).

![error.js contains errors inside a route; the parent layout lives on](/lessons/nextjs/15-error-handling-notfound-fig-en.svg)
*error.js contains errors inside a route; the parent layout lives on*

## error.js: a per-route error boundary

```jsx
// app/dashboard/error.js
'use client' // error boundaries must be Client Components

export default function ErrorPage({ error, retry }) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={() => retry()}>Try again</button>
    </div>
  )
}
```

- Catches errors in **the route's children**; parent layouts **keep working**.
- **`retry()`** tries to **re-fetch and re-render** the failed area (recommended). `reset()` only clears the error state and re-renders **without re-fetching**.
- Put `error.js` at **several levels** to limit the blast radius.
- `global-error.js` wraps even the root layout (must include its own `<html>` and `<body>`).
- Log errors to a service (Sentry) in `useEffect`.

(Note: older Next.js versions used the `reset` prop; newer ones recommend `retry`.)

## not-found.js and notFound()

```jsx
import { notFound } from 'next/navigation'

const post = await getPost(slug)
if (!post) notFound()      // returns HTTP 404 + renders not-found.js
```

Important for **SEO** (return a true 404, not an "empty page" with status 200).

## Retrying properly

- Retry only **idempotent** operations (reads, or writes with a dedupe key).
- Cap attempts, use **exponential backoff** + jitter.
- For creating operations (payments), **use an idempotency key** so money isn't charged twice.

## Good error messages

1. Say **what happened** in the user's language.
2. Say **what to do next** (retry, contact).
3. **Don't leak internals** (stack traces, SQL, paths). In production Next.js hides server error messages and sends only a `digest` for log lookup.
4. Tie in accessibility: `aria-live`, `role="alert"`.

## References

- Next.js docs: "Error Handling", `error.js`, `not-found.js`, `global-error`.
- Google SRE Book: "Handling Overload" (retry, backoff); Stripe API: Idempotent requests.
