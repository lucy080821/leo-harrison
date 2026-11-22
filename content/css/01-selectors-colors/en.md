# Selectors and colors

**CSS** (Cascading Style Sheets) describes **how HTML is displayed**: colors, font sizes, spacing, layout.

## Anatomy of a rule

```css
selector {
  property: value;
}
```

- **selector**: picks which elements get styled.
- **property**: what will change, e.g. `color`.
- **value**: what it changes to, e.g. `tomato`.
- Each declaration ends with a `;`.

![Anatomy of a CSS rule](/lessons/css/01-selectors-colors-fig-en.svg)
*Anatomy of a CSS rule*

## Three basic selectors

| Selector | Example | Selects |
|---|---|---|
| Tag | `p { }` | every `<p>` |
| Class | `.note { }` | every element with `class="note"` |
| Id | `#title { }` | the single element with `id="title"` |

Convention: an **id is unique** on a page while a class can be reused. In practice you'll use classes most.

When several rules target the same element, **specificity** decides: id > class > tag. If equal, the rule written **later** wins.

## Writing colors

```css
color: red;                 /* named color */
color: #0b6fd6;             /* hex: red-green-blue */
color: rgb(11, 111, 214);   /* rgb */
color: hsl(210 90% 44%);    /* hsl: hue, saturation, lightness */
background-color: #fef3c7;  /* background */
```

## Handy text properties

```css
font-size: 18px;
font-weight: 700;       /* bold */
text-align: center;
line-height: 1.6;       /* line spacing */
```

## Linking CSS to HTML

In the panel on the right, `style.css` is applied automatically. On a real site you add this to `<head>`:

```html
<link rel="stylesheet" href="style.css" />
```
