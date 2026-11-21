# Built-in interactive elements

HTML5 has a few interactive elements that need **no JavaScript**.

## details and summary: a collapsible block

```html
<details>
  <summary>Return policy</summary>
  <p>Returns accepted within 7 days of purchase.</p>
</details>
```

- `<summary>` is the always-visible title line; click it to open or close the rest.
- Add `open` to start expanded: `<details open>`.
- Perfect for an **FAQ**.

## dialog: a dialog box

```html
<dialog open>
  <p>Are you sure you want to delete?</p>
  <form method="dialog">
    <button>Cancel</button>
    <button>Delete</button>
  </form>
</dialog>
```

The `open` attribute shows the dialog. In practice you usually open it from JavaScript: `dialog.showModal()` (a modal that blocks the content behind) and close it with `dialog.close()`. A `<form method="dialog">` closes the dialog automatically when a button is pressed.

## progress: task progress

```html
<progress value="40" max="100">40%</progress>
```

Use for a task under way (loading, signup steps). Without `value` it becomes an indeterminate "busy" bar.

## meter: a value within a range

```html
<meter min="0" max="100" low="30" high="80" optimum="90" value="75">75%</meter>
```

Use for a **measurement** (disk usage, a score), not for progress.

| | `progress` | `meter` |
|---|---|---|
| Meaning | A task being completed | A measured value |
| Example | Loading 40% | Battery at 75% |

The text inside is fallback content for old browsers.
