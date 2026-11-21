# Flexbox (1): main and cross axis

**Flexbox** is a **one-dimensional** layout system (a row or a column), ideal for menus, cards, buttons, centering...

## Turning it on

```css
.row { display: flex; }
```

`.row` becomes a **flex container**; its direct children become **flex items** and line up in a horizontal row.

## Two axes

```text
flex-direction: row (default)

   main axis  ────────────────────────────▶
   ┌────┐ ┌────┐ ┌────┐        ▲
   │ A  │ │ B  │ │ C  │        │ cross axis
   └────┘ └────┘ └────┘        ▼
```

- **Main axis:** the direction items follow one after another. `row` is horizontal, `column` is vertical.
- **Cross axis:** perpendicular to the main axis.

## Container properties

| Property | Effect | Common values |
|---|---|---|
| `flex-direction` | Direction of the main axis | `row`, `row-reverse`, `column`, `column-reverse` |
| `justify-content` | Aligns **along the main axis** | `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly` |
| `align-items` | Aligns **along the cross axis** | `stretch` (default), `flex-start`, `center`, `flex-end`, `baseline` |

> Remember: `justify-` = main axis, `align-` = cross axis. With `flex-direction: column` the two axes **swap** roles.

## Two patterns you'll use constantly

**Perfect centering:**

```css
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
```

**A navbar:** logo on the left, menu on the right:

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```
