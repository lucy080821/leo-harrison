# Transitions and transforms

## Transform: reshaping

`transform` moves, rotates and scales an element **without shifting** other elements (it doesn't affect layout).

```css
.box {
  transform: translate(20px, -10px);  /* move 20 right, 10 up */
  transform: scale(1.2);              /* enlarge to 120% */
  transform: rotate(45deg);           /* rotate 45° clockwise */
  transform: skewX(10deg);            /* slant */
  transform: translateY(-4px) scale(1.05) rotate(5deg); /* combined, applied left to right */
}
```

- `transform-origin` changes the pivot (default: center): `transform-origin: top left;`.
- Rotate the other way with a negative number: `rotate(-15deg)`.

A rotation by angle $\theta$ maps a point $(x, y)$ to

$$
x' = x\cos\theta - y\sin\theta,\qquad y' = x\sin\theta + y\cos\theta
$$

![transform: translate, rotate, scale](/lessons/css/11-transitions-transforms-fig-en.svg)
*transform: translate, rotate, scale*

## Transition: smooth motion

When a property **changes value** (e.g. on `:hover`), `transition` makes it change gradually instead of jumping.

```css
.btn {
  background: #0b6fd6;
  transition: background-color 0.3s ease, transform 0.2s ease-out;
}
.btn:hover {
  background: #0aa5b8;
  transform: translateY(-2px);
}
```

Syntax: `transition: <property> <duration> <timing-function> <delay>`.

| Timing function | Feel |
|---|---|
| `ease` | Fast in the middle, slow at the ends (default) |
| `linear` | Even |
| `ease-in` / `ease-out` | Slow at the start / slow at the end |
| `cubic-bezier(...)` | A custom curve |

**Important:** put `transition` on the **base** state (`.btn`), not just on `:hover`, so the effect also plays when the mouse **leaves**.

## Performance

Animate `transform` and `opacity`: the browser handles them on the GPU so they're very smooth. Avoid animating `width`, `height`, `top`, `left`, which force a layout recalculation every frame.

> Be kind to users sensitive to motion: wrap big effects in `@media (prefers-reduced-motion: no-preference) { ... }`.
