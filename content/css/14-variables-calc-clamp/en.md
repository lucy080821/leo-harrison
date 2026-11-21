# CSS variables, `calc()` and `clamp()`

## CSS variables (custom properties)

Declare once, use everywhere. Change one place and the whole page follows.

```css
:root {                  /* :root = the <html> element, so variables work page-wide */
  --brand: #0b6fd6;
  --radius: 8px;
  --space: 1rem;
}

.btn {
  background: var(--brand);
  border-radius: var(--radius);
  padding: var(--space);
}
```

- Variable names **start with `--`** and are case-sensitive.
- Use with `var(--name)`. A fallback is allowed: `var(--brand, blue)`.
- Variables **inherit** like normal properties, so you can override them in a smaller scope:

```css
.card.danger { --brand: #d64545; }    /* everything inside .danger uses the new color */
```

### Dark mode with just variables

```css
:root { --bg: #ffffff; --fg: #0b2540; }
@media (prefers-color-scheme: dark) {
  :root { --bg: #07121f; --fg: #e4eefa; }
}
body { background: var(--bg); color: var(--fg); }
```

This very website uses that approach for its dark mode.

JavaScript can read and change variables too: `el.style.setProperty("--brand", "tomato")`.

## `calc()`: math right in CSS

You can mix different units:

```css
.sidebar { width: calc(100% - 240px); }
.btn     { padding: calc(var(--space) / 2) var(--space); }
```

Note: the `+` and `-` operators **need spaces on both sides**; `*` and `/` don't.

## `min()`, `max()`, `clamp()`

| Function | Meaning |
|---|---|
| `min(a, b)` | Takes the **smaller** value |
| `max(a, b)` | Takes the **larger** value |
| `clamp(min, preferred, max)` | The preferred value, **clamped** into the given range |

```css
.container { width: min(100% - 2rem, 960px); }      /* at most 960px */
h1 { font-size: clamp(1.5rem, 5vw, 3rem); }         /* smoothly fluid font size */
```

With `clamp(1.5rem, 5vw, 3rem)`: the size is `5vw`, but never below 1.5rem (24px) and never above 3rem (48px). Mathematically:

$$
\text{clamp}(a, x, b) = \max\big(a, \min(x, b)\big)
$$
