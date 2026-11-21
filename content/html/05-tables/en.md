# Tables

Tables display **data in rows and columns**. Don't use tables for page layout, that is CSS's job.

## Basic structure

```html
<table>
  <caption>Scores</caption>
  <thead>
    <tr><th>Name</th><th>Math</th></tr>
  </thead>
  <tbody>
    <tr><td>An</td><td>9</td></tr>
    <tr><td>Binh</td><td>7</td></tr>
  </tbody>
  <tfoot>
    <tr><td>Average</td><td>8</td></tr>
  </tfoot>
</table>
```

| Tag | Meaning |
|---|---|
| `<table>` | Wraps the whole table |
| `<caption>` | The table's title |
| `<thead>`, `<tbody>`, `<tfoot>` | Header, body and footer row groups |
| `<tr>` | A table **row** |
| `<th>` | A **header** cell (bold and centered by default) |
| `<td>` | A **data** cell |

The temporary `border="1"` in the example is only to show the lines. In real work you draw borders with CSS.

## Merging cells

```html
<td colspan="2">Spans 2 columns</td>
<td rowspan="3">Spans 3 rows</td>
```

- `colspan`: a cell stretches across several **columns**.
- `rowspan`: a cell stretches down several **rows**.
- The cell count of every row (merges included) must match, otherwise the table looks broken.

## Accessibility

Use `<th>` for every header cell, and `scope="col"` or `scope="row"` when needed so screen readers know whether a header belongs to a column or a row.
