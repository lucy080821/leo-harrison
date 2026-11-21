# CSS Grid (2): areas and auto-fit

## Naming areas with `grid-template-areas`

The most visual way to build a **page layout**: you "draw" the layout with words.

```css
.page {
  display: grid;
  grid-template-columns: 160px 1fr;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
}
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

Each string in `grid-template-areas` is **a row**, each word **a column**. A repeated word (`header header`) means that area **spans several cells**. A dot `.` stands for an empty cell.

To change the layout on small screens, just rewrite these strings inside a media query:

```css
@media (max-width: 600px) {
  .page {
    grid-template-columns: 1fr;
    grid-template-areas: "header" "main" "sidebar" "footer";
  }
}
```

## Self-adjusting grids: `auto-fit` and `minmax()`

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}
```

- `minmax(150px, 1fr)`: each column is **at least 150px**, at most an even share of the free space.
- `auto-fit`: automatically computes **how many columns fit** in the available width.

For width $W$, gap $g$ and minimum column $m$, the column count is about

$$
n = \left\lfloor \frac{W + g}{m + g} \right\rfloor
$$

For example $W = 560$, $g = 12$, $m = 150$ gives $n = \lfloor 572/162 \rfloor = 3$ columns. Shrink the window and $n$ drops, **no media query needed**.

### `auto-fit` vs `auto-fill`

- `auto-fill`: creates as many columns as fit, even **empty** ones.
- `auto-fit`: like `auto-fill` but **collapses the empty columns** so the filled ones stretch to take the space. Usually what you want.

## Aligning individual cells

```css
.item { justify-self: end; align-self: center; }
```
