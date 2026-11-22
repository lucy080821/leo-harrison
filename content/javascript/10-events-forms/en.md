# Advanced events and forms

## The event object

A handler receives an **event object** with information about what just happened:

```javascript
btn.addEventListener("click", (event) => {
  console.log(event.type);     // "click"
  console.log(event.target);   // the element that was clicked
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") console.log("Enter pressed");
});
```

![Events bubble from the child up to ancestors](/lessons/javascript/10-events-forms-fig-en.svg)
*Events bubble from the child up to ancestors*

## Handling forms

When a form is submitted, the browser **reloads the page** by default. In a JavaScript app you want to handle it yourself so you must stop the default behaviour:

```javascript
form.addEventListener("submit", (event) => {
  event.preventDefault();               // stop the reload
  const name = nameInput.value.trim();  // read the data
  if (!name) return;                    // validate
  out.textContent = `Hello, ${name}!`;
});
```

`preventDefault()` also works for links (`<a>`) and other default behaviours.

Read many fields at once:

```javascript
const data = Object.fromEntries(new FormData(form));   // { name: "An", email: "..." }
```

## `input` or `change`?

| | When it fires |
|---|---|
| `input` | **Every time** the value changes (each typed character) → live search, previews |
| `change` | When the value is **committed** (blur, selection done) |

An input's value is always a **string**: use `Number(input.value)` for a number. Checkboxes use `input.checked`.

## Bubbling and event delegation

Events **bubble** from the clicked element up through its ancestors. So you can attach **one** handler to the parent instead of one per child (**event delegation**), and it also works for elements added later:

```javascript
list.addEventListener("click", (event) => {
  const li = event.target.closest("li");
  if (!li) return;
  li.classList.toggle("done");
});
```

- `event.target`: the element actually clicked.
- `closest("li")`: finds the ancestor (or itself) matching the selector.

## Removing handlers

```javascript
function onClick() { /* ... */ }
btn.addEventListener("click", onClick);
btn.removeEventListener("click", onClick);   // needs the exact registered function
btn.addEventListener("click", onClick, { once: true });  // runs only once
```

## Accessibility

Use `<button>` and `<a>` for clickable things (keyboard support built in); don't attach `click` to a `<div>`. Forms should have `<label>`s and handle the Enter key through `submit` rather than `keydown`.
