# Cascade, specificity and inheritance

When **several rules** target one element and set **different values** for the same property, who wins? That's the **cascade**, the C in CSS.

## Order of precedence

The browser checks in turn:

1. **Origin and `!important`**: a declaration with `!important` beats a normal one.
2. **Specificity** of the selector: the more specific wins.
3. **Source order**: when tied, the rule **written later** wins.

![Specificity ladder: inline > id > class > element](/lessons/css/15-cascade-specificity-fig-en.svg)
*Specificity ladder: inline > id > class > element*

## Specificity

Each selector is scored in three columns `(id, class, tag)`:

| Selector | Score |
|---|---|
| `p` | (0, 0, 1) |
| `.title` | (0, 1, 0) |
| `p.title` | (0, 1, 1) |
| `#heading` | (1, 0, 0) |
| `#nav .item a` | (1, 1, 1) |
| inline `style="..."` | beats all of the above |

Compare **column by column from the left**: `(1,0,0)` beats `(0,5,9)` because one id outranks any number of classes.

> That's why in the exercise `#heading` (an id) beats `.title` (a class) even though `.title` is written later.

The `*` selector and combinators (`>`, `+`) add **no** points; `:where()` scores 0; `:not()` and `:is()` take the score of their strongest argument.

## `!important`: the last resort

```css
.title { color: red !important; }
```

It overrides almost everything, and **only another `!important`** can beat it, leading to an "arms race". Use it only to override external library CSS. Instead:

- Keep selectors **simple and low-specificity** (prefer classes, avoid ids for styling).
- Order rules **from general to specific**.

## Inheritance

Some properties **automatically pass down** to children that don't set their own:

| Inherited | Not inherited |
|---|---|
| `color`, `font-family`, `font-size`, `line-height`, `text-align`, `visibility` | `margin`, `padding`, `border`, `background`, `width`, `display` |

That's why setting font and text color **once on `body`** styles the whole page:

```css
body { font-family: system-ui, sans-serif; color: #0b2540; }
```

Force or reset inheritance with keywords:

```css
a { color: inherit; }     /* take it from the parent */
.x { all: unset; }        /* wipe every style */
.y { color: initial; }    /* back to CSS's default value */
```

## Debugging tip

Open **DevTools** (F12), select the element, and look for **struck-through** declarations: those lost the cascade.
