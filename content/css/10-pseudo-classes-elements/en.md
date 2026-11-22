# Pseudo-classes, pseudo-elements and combinators

## Pseudo-classes: select by **state**

Written with **one** colon `:`.

| Pseudo-class | Selects when |
|---|---|
| `:hover` | The mouse is over it |
| `:focus` | The element has focus (keyboard/click) |
| `:focus-visible` | Focus by keyboard (best for focus rings) |
| `:active` | Being pressed |
| `:disabled`, `:checked`, `:required` | Form states |
| `:first-child`, `:last-child` | First and last child |
| `:nth-child(n)` | The nth child: `2`, `odd`, `even`, `3n`, `3n+1` |
| `:not(.x)` | Elements that do **not** match the selector |

```css
.btn:hover { background: #0aa5b8; }
li:nth-child(even) { background: #eaf2fb; }   /* zebra stripes */
a:not(.btn) { text-decoration: underline; }
```

![Combinators: direct child (>) and adjacent sibling (+)](/lessons/css/10-pseudo-classes-elements-fig-en.svg)
*Combinators: direct child (>) and adjacent sibling (+)*

## Pseudo-elements: select **a part** of an element

Written with **two** colons `::`.

| Pseudo-element | Selects |
|---|---|
| `::before`, `::after` | Inserts virtual content before or after the content |
| `::first-letter`, `::first-line` | The first letter / line |
| `::placeholder` | The hint text in an input |
| `::selection` | The highlighted (selected) text |

```css
.new::before { content: "★ "; color: gold; }
```

`::before` and `::after` **only work when `content` is set** (it may be an empty string `""`). This content lives in CSS, not in HTML, so use it only for **decoration**, never for important information.

## Combinators: select by **relationship**

| Syntax | Name | Selects |
|---|---|---|
| `A B` | Descendant | Every `B` inside `A` (at any depth) |
| `A > B` | Child | `B` that is a direct child of `A` |
| `A + B` | Next sibling | The `B` right **after** `A` |
| `A ~ B` | General sibling | Every `B` after `A` with the same parent |

```css
nav a { color: white; }              /* every <a> inside nav */
ul > li { margin: 4px 0; }           /* only direct li children */
h2 + p { font-size: 1.1rem; }        /* the paragraph right after h2 */
```

Group several selectors in one rule with commas: `h1, h2, h3 { font-weight: 700; }`.
