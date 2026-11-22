# Semantic page layout

You can build a whole page from `<div>`s alone, but browsers, search engines and screen readers won't know what each part is. **Semantic tags** state the **role** of each region.

## The main layout tags

| Tag | Role |
|---|---|
| `<header>` | The top of a page or of a block (logo, title, menu) |
| `<nav>` | The main navigation links |
| `<main>` | The main content, **only one** per page |
| `<section>` | A group of related content, usually with a heading |
| `<article>` | Self-contained content (a post, a comment, a product card) |
| `<aside>` | Related side content (sidebar, notes) |
| `<footer>` | The bottom (copyright, contact) |

![Semantic layout: header, nav, main, aside, footer](/lessons/html/03-semantic-layout-fig-en.svg)
*Semantic layout: header, nav, main, aside, footer*

## A typical page structure

```html
<body>
  <header>
    <h1>Site name</h1>
    <nav>...</nav>
  </header>

  <main>
    <section>
      <h2>Topic</h2>
      <article>...</article>
      <article>...</article>
    </section>
    <aside>...</aside>
  </main>

  <footer>...</footer>
</body>
```

## When to use `<div>`?

`<div>` still has its place: when you need a **generic box** for grouping and styling with CSS that carries no meaning. Rule of thumb: if a fitting semantic tag exists, use it; otherwise use `<div>`.

## Why it matters

- **Accessibility:** screen reader users can jump straight to `<main>` or `<nav>`.
- **SEO:** search engines understand your page structure better.
- **Maintainability:** `<nav>` is easier to read than `<div class="div3">`.
