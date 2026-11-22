# Project: a Todo app

You'll build a complete **to-do list** app with just HTML, CSS and JavaScript: add items, mark them done, delete them. It's a classic project because it bundles all the DOM skills.

## Analysing the requirements

| Feature | Technique |
|---|---|
| Add an item on form submit | `submit` + `preventDefault` + `createElement` |
| Ignore empty items | `trim()` and `if (!text) return` |
| Mark as done | `classList.toggle("done")` (CSS strikes the text through) |
| Delete an item | `element.remove()` |
| Works for items added later | **Event delegation** on the `<ul>` |

![Todo app data flow: state → render → events](/lessons/javascript/21-project-todo-app-fig-en.svg)
*Todo app data flow: state → render → events*

## The HTML structure of each item

```html
<li>
  <span class="text">Learn JS</span>
  <button class="del">×</button>
</li>
```

## Workflow

1. **Build the static UI** in HTML/CSS (already provided).
2. Write an `addTodo(text)` function that creates an `<li>` and attaches it to the list.
3. Catch the form's `submit`, read `input.value`, call `addTodo`, clear the input.
4. Add **one** `click` handler on the `<ul>`, using `event.target.closest("li")` to know which item was clicked.
5. Test each feature before moving on.

## Ideas to extend (do them yourself)

- **Save to `localStorage`** so reloading the page keeps the items (see the JSON and storage lesson): store an array `[{ text, done }]` with `JSON.stringify`.
- Count the remaining items: "3 items left".
- Filters: All / Active / Completed.
- Edit an item's text with a double-click.
- Separate **data** (an array) from **display**: keep a `todos` array and a `render()` function that redraws the list whenever the data changes. This is exactly the core idea behind React.

## Takeaway

> UI apps are usually a loop: **event → change data/state → update the UI**. Keep this loop clear and your code stays tidy even as the app grows.
