> **Note:** Next.js needs Node.js and a server, so it **can't run inside a browser**. Here you practise the **core ideas** with real React and JavaScript (right side); each lesson has a **run it locally** part using `npx create-next-app@latest`.

# Proxy (formerly middleware): code that runs before each request

> **Note:** since Next.js 16, **Middleware has been renamed Proxy** (the `proxy.ts` file) to reflect its purpose; the functionality is unchanged.

**Proxy** lets you run code **before a request completes**, and depending on the request **rewrite**, **redirect**, modify **headers**, or respond immediately.

## Structure

```js
// proxy.js (alongside the app folder, or in src/)
import { NextResponse } from 'next/server'

export function proxy(request) {
  if (request.nextUrl.pathname.startsWith('/dashboard') && !request.cookies.get('session')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}
```

- Only **one** `proxy` per project (split logic into other modules).
- `matcher` limits which paths run the proxy: avoid running it for static files.

![Proxy runs before routing: redirect, rewrite or pass through](/lessons/nextjs/11-proxy-fig-en.svg)
*Proxy runs before routing: redirect, rewrite or pass through*

## When to use

| Use | Example |
|---|---|
| **Redirect by request properties** | not signed in ⇒ `/login`; by region/language |
| **Rewrite** | A/B testing, i18n `/vi/...` |
| **Headers** | security (CSP), request identification |

For **simple static** redirects, use `redirects` in `next.config.ts` first (no code).

## Important limits

- **Not for slow data fetching** (database/API calls) since it runs on **every matching request**, slowing everything.
- It is an **optimistic check**: just read a cookie to redirect **quickly**. It does **not** replace real authorization where data is accessed (Server Action, Route Handler, data-access layer), because an attacker can hit another endpoint directly, and a `matcher` may miss paths.
- The `'use cache'` and `'use server'` directives have **no effect** in proxy; `fetch` in proxy is **not cached**.

## i18n pattern

Read `Accept-Language` or a cookie, then redirect `/` → `/vi`. (This very Learn With Leo site does exactly this.)

## Debugging

- Remember to configure `matcher`, or proxy runs for `/_next/static` and images.
- Log briefly; proxy sits on the hot path.

## References

- Next.js docs: "Proxy" (getting-started/proxy) and the `proxy.js` API reference.
- OWASP: Broken Access Control.
