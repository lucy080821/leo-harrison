# display and position

## display

`display` decides **how an element flows** in the page.

| Value | Behaviour |
|---|---|
| `block` | Takes the full width, starts a new line (`div`, `p`) |
| `inline` | Flows within text; **ignores** `width`/`height` (`span`, `a`) |
| `inline-block` | Flows in a line but accepts `width`/`height` and full padding |
| `none` | **Fully hidden**, takes no space |
| `flex`, `grid` | Modern layouts (next lessons) |

`display: none` differs from `visibility: hidden`: the latter hides but **still takes space**.

## position

| Value | Meaning |
|---|---|
| `static` | Default, normal flow |
| `relative` | Normal flow but can be nudged with `top/left...`; also the **anchor** for `absolute` children |
| `absolute` | **Removed from flow**, positioned against the nearest ancestor whose `position` isn't `static` |
| `fixed` | Fixed against the **window**; doesn't move on scroll |
| `sticky` | Like `relative` until scrolling reaches the `top` threshold, then "sticks" |

```css
.card  { position: relative; }
.badge { position: absolute; top: 8px; right: 8px; }  /* top-right of .card */

.nav   { position: sticky; top: 0; z-index: 10; }      /* sticks to the top */
```

> Memory aid: to place an `absolute` child correctly inside its parent, give the **parent `position: relative`**. If you forget, the child positions against the whole page.

## z-index: stacking order

Elements with `position` other than `static` can overlap; a higher `z-index` sits on top.

```css
.modal-overlay { position: fixed; inset: 0; z-index: 100; }
```

`inset: 0` is shorthand for `top: 0; right: 0; bottom: 0; left: 0`.
