# Units and typography

## Length units

| Unit | Kind | Meaning |
|---|---|---|
| `px` | Absolute | Pixels; simple but **doesn't scale** with the user's settings |
| `rem` | Relative | A multiple of the **root** font size (`<html>`, usually 16px). `1.5rem` = 24px |
| `em` | Relative | A multiple of the **parent's / own** font size |
| `%` | Relative | A percentage of the corresponding value on the parent |
| `vw`, `vh` | Relative | 1% of the **viewport** width, height |
| `ch` | Relative | The width of the "0" character — great for limiting line length |

**Advice:** use `rem` for font sizes and spacing (it respects the user's font-size setting), `px` for tiny details such as a 1px border, and `%`/`fr` for layout.

Conversion: $\text{rem} = \dfrac{\text{px}}{16}$, e.g. $20 \div 16 = 1.25$rem.

## Common text properties

```css
body {
  font-family: "Segoe UI", Roboto, Arial, sans-serif;  /* priority list */
  font-size: 1rem;
  font-weight: 400;        /* 400 normal, 700 bold */
  line-height: 1.6;        /* line spacing, NO unit */
  letter-spacing: 0.02em;
  text-align: left;        /* left | center | right | justify */
  text-transform: uppercase;
  text-decoration: underline;
}
```

### Fallback font families

The browser tries each font left to right; always end with a **generic** family: `serif`, `sans-serif`, `monospace`. Font names with spaces need quotes: `"Segoe UI"`.

### Unitless line-height

`line-height: 1.6` means **1.6 × the element's own font size**, and descendants recompute it from their own size. Long text reads best at roughly **1.5–1.8**.

### Line length

Lines that are too long are hard to read. Limit them with `max-width: 60ch;` (about 60 characters).
