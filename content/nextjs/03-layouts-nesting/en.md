# Layouts and nested pages

> **Note:** Next.js needs Node.js and a server, so it **can't run inside a browser**. Here you practise the **core ideas** with real React and JavaScript (right side); each lesson has a **run it locally** part using `npx create-next-app@latest`.

## layout.js — the shared shell

A **layout** is UI shared across pages (navigation bar, footer). It receives the child page via `children`:

```jsx
// app/layout.js  (required at the root, must contain <html> and <body>)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>…</nav>
        {children}
      </body>
    </html>
  );
}
```

On navigation a layout **does not re-render** and keeps its state — very smooth.

![Nested layouts wrap the page](/lessons/nextjs/03-layouts-nesting-fig-en.svg)
*Nested layouts wrap the page*

## Nested layouts

Each folder may have its own `layout.js`; they nest along the folder tree:

```
app/
├─ layout.js              ← wraps every page
├─ page.js
└─ dashboard/
   ├─ layout.js           ← wraps /dashboard/* only
   ├─ page.js             →  /dashboard
   └─ settings/page.js    →  /dashboard/settings
```

The page `/dashboard/settings` is wrapped: `RootLayout` > `DashboardLayout` > `SettingsPage` — exactly the exercise on the right.

## Linking between pages

Use `<Link href="/about">` instead of `<a>` for instant navigation without reload. A plain `<a>` still works but reloads the whole page.

## Route groups

Wrap a folder name in parentheses, e.g. `app/(marketing)/about/page.js`, to **organise** without adding a URL segment (`/about`).
