# Responsive design

**Responsive** means a web page **adapts itself** to every screen size: phones, tablets, laptops and big monitors.

## Step 1: the viewport tag

Without it, phones pretend the screen is ~980px wide and then shrink the whole page.

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

## Step 2: flexible units and images

```css
img { max-width: 100%; height: auto; }   /* images never overflow, ratio preserved */
.container { width: min(100% - 2rem, 960px); margin-inline: auto; }
```

Use `%`, `fr`, `rem`, `flex`, `grid` instead of fixed `px` for layout sizes.

## Step 3: media queries

A media query applies CSS **only when** a condition is true:

```css
@media (max-width: 600px) {
  .container { flex-direction: column; }
}
```

| Condition | Meaning |
|---|---|
| `(max-width: 600px)` | Viewport is **≤ 600px** wide |
| `(min-width: 768px)` | Viewport is **≥ 768px** wide |
| `(min-width: 600px) and (max-width: 900px)` | Within a range |
| `(prefers-color-scheme: dark)` | The user chose dark mode |
| `(prefers-reduced-motion: reduce)` | The user wants less motion |
| `print` | When printing |

## Mobile-first

Write CSS for **small screens first** (no media query needed), then add to it for larger screens with `min-width`:

```css
.container { display: flex; flex-direction: column; }   /* phones */

@media (min-width: 600px) {
  .container { flex-direction: row; }                   /* wider screens */
}
```

Why: simpler code, lighter for phones, and it forces you to focus on the core content.

## Common breakpoints

| Name | Width |
|---|---|
| Phone | < 600px |
| Tablet | ≥ 600px |
| Laptop | ≥ 900px |
| Large desktop | ≥ 1200px |

Don't cling to device names; narrow the window and **add a breakpoint where the layout starts to look bad**.

## A handy tool: `clamp()`

Fluid font sizes without media queries (covered more in the next lesson):

```css
h1 { font-size: clamp(1.5rem, 4vw, 3rem); }
```
