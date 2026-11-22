# Creating and changing DOM elements

In the last lesson you selected and edited **existing** elements. Now you **create new elements** and change the page's structure.

## Creating and attaching elements

```javascript
const li = document.createElement("li");   // 1. create (not on the page yet)
li.textContent = "Binh";                    // 2. configure
list.appendChild(li);                       // 3. attach to the DOM tree → appears
```

| Method | Effect |
|---|---|
| `parent.appendChild(el)` / `parent.append(el)` | Add at the **end** of the parent |
| `parent.prepend(el)` | Add at the **start** of the parent |
| `ref.before(el)` / `ref.after(el)` | Insert before / after another element |
| `el.remove()` | Remove from the page |
| `el.cloneNode(true)` | Copy (with children) |
| `parent.replaceChildren()` | Remove all children |

![The DOM tree and creating/appending elements](/lessons/javascript/09-dom-manipulation-fig-en.svg)
*The DOM tree and creating/appending elements*

## classList: working with classes

```javascript
el.classList.add("active");
el.classList.remove("active");
el.classList.toggle("active");       // remove if present, add if not
el.classList.contains("active");     // true/false
```

The right division of labour: **JavaScript just toggles classes, CSS handles the looks**. E.g. `body.dark { ... }` in CSS and JS calls `classList.toggle("dark")`.

## Style, attributes and dataset

```javascript
el.style.backgroundColor = "tomato";   // CSS properties in camelCase
el.setAttribute("aria-pressed", "true");
el.dataset.id = "42";                   // → the attribute data-id="42"
el.hidden = true;                       // hide the element
```

## Building a list from data

An extremely common pattern: you have a **data array** → create **an element per item**:

```javascript
function render(items) {
  list.replaceChildren();              // clear the old
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  }
}
```

## Careful with `innerHTML`

```javascript
list.innerHTML = names.map(n => `<li>${n}</li>`).join("");   // short but...
```

It's concise, but if `n` contains `<script>` or `<img onerror=...>` from a user it becomes an **XSS** hole. For untrusted data use `createElement` + `textContent`.

## Performance

Every DOM operation costs time. When adding hundreds of elements, build them all and attach **once** (e.g. with a `DocumentFragment` or `append(...many)`).
