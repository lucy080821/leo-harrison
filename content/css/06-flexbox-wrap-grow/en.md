# Flexbox (2): wrap, gap and flex-grow

## Wrapping and spacing

By default flex items **don't wrap**; they shrink to fit one line. Enable wrapping with `flex-wrap`:

```css
.tags {
  display: flex;
  flex-wrap: wrap;   /* wrap when out of space */
  gap: 8px;          /* space between items (rows and columns) */
}
```

`gap` replaces putting `margin` on every item: it is tidy and leaves no stray margin at the edges.

## Properties on flex items

```css
.item { flex: 1; }
```

`flex` is shorthand for three values: `flex-grow flex-shrink flex-basis`.

| Property | Meaning |
|---|---|
| `flex-grow` | **Growth** factor to take up free space (0 = don't grow) |
| `flex-shrink` | **Shrink** factor when space is short (0 = don't shrink) |
| `flex-basis` | The **starting** size before growing/shrinking |

Common spellings:

| Written | Meaning |
|---|---|
| `flex: 1` | Grow evenly to fill free space (`1 1 0`) |
| `flex: 0 0 140px` | **Exactly** 140px, no growing or shrinking |
| `flex: 2` | Takes **twice** the free space of an item with `flex: 1` |

## Layout pattern: sidebar + content

```css
.layout   { display: flex; gap: 12px; }
.sidebar  { flex: 0 0 140px; }   /* fixed column */
.content  { flex: 1; }           /* flexible column */
```

## Order and individual alignment

```css
.item { order: -1; }            /* move to the front (default 0) */
.item { align-self: flex-end; } /* override align-items for one item */
```

> `order` changes only the **visual** order, not the HTML order. Keyboard users and screen readers still follow the HTML order, so don't overuse it.
