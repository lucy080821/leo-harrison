# Components and JSX

**React** builds interfaces from small pieces called **components**. A component is just **a function** that returns UI.

## What is JSX?

JSX looks like HTML but lives inside JavaScript. A compiler (Babel) turns it into function calls.

```jsx
const el = <h1 className="title">Hi</h1>;
```

Slightly different from HTML:

| HTML | JSX |
|---|---|
| `class` | `className` |
| `for` | `htmlFor` |
| `onclick` | `onClick` |
| `<br>` | `<br />` (tags must close) |

## Expressions in `{}`

Any JavaScript expression goes in `{}`: variables, math, function calls.

```jsx
<p>{name.toUpperCase()}</p>
<p>{price * 2}</p>
```

## Rules

1. Component names **start with a capital letter** (`App`, `Card`).
2. A component returns **one root element** (wrap in `<div>` or `<>...</>`).
3. Use a component like a tag: `<Card />`.

> The right side is the real result. Change `name` and watch the page update.
