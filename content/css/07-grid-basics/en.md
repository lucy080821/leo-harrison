# CSS Grid (1): rows, columns and fr

**CSS Grid** is a **two-dimensional** layout system: it controls **rows and columns** together. Flexbox lays out along one axis; Grid builds the whole "mesh".

## Turning it on

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;  /* 3 equal columns */
  gap: 12px;                            /* spacing for rows and columns */
}
```

Direct children fill the grid cells in order, wrapping to the next row when one is full.

![A 3-column grid with 1fr 2fr 1fr](/lessons/css/07-grid-basics-fig-en.svg)
*A 3-column grid with 1fr 2fr 1fr*

## The `fr` unit

`fr` (fraction) is **a share of the free space**.

```css
grid-template-columns: 1fr 2fr;        /* column 2 is twice column 1 */
grid-template-columns: 200px 1fr;      /* fixed column + flexible column */
grid-template-columns: repeat(3, 1fr); /* shorthand for 1fr 1fr 1fr */
```

If the total width is $W$, columns $1\text{fr}\ 2\text{fr}$ take $\dfrac{W}{3}$ and $\dfrac{2W}{3}$ (minus the `gap`).

## Rows

```css
grid-template-rows: 80px auto 60px;  /* fixed, flexible, fixed row heights */
grid-auto-rows: minmax(80px, auto);  /* height of automatically created rows */
```

## One cell spanning many

```css
.wide  { grid-column: span 2; }   /* spans 2 columns */
.tall  { grid-row: span 2; }      /* spans 2 rows */
.hero  { grid-column: 1 / -1; }   /* from the first to the last line: the full row */
```

`1 / 3` means start at grid **line** 1 and end at line 3. Lines are numbered from 1, and `-1` is the last line.

## Aligning in a grid

```css
.grid { justify-items: center; align-items: center; }  /* align content inside each cell */
.grid { justify-content: center; }                      /* align the whole grid in its container */
```

## Flexbox or Grid?

| Use | When |
|---|---|
| **Flexbox** | One dimension: menus, button groups, centering |
| **Grid** | Two dimensions: page layouts, card grids, photo galleries |

They combine well: grid for the page frame, flex for the content inside each cell.
