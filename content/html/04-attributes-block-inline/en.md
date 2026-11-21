# Attributes, id/class and block vs inline

## Global attributes

Some attributes work on **every** tag:

| Attribute | Purpose |
|---|---|
| `id` | A **unique** identifier for the element on the page |
| `class` | Groups elements for styling; an element can have several classes |
| `title` | Tooltip shown on hover |
| `hidden` | Hides the element |
| `lang` | The language of the element |
| `data-*` | Your own data, e.g. `data-id="42"` |

```html
<div id="intro" class="box highlight" title="Introduction"></div>
```

`id` is the target of links (`<a href="#intro">`) and how JavaScript finds an element. `class` lets CSS target many elements at once.

## The `data-*` attributes

They attach arbitrary data to a tag, readable in JavaScript through `element.dataset`:

```html
<button data-action="save" data-id="42">Save</button>
```

```javascript
button.dataset.action; // "save"
button.dataset.id;     // "42"
```

## Block and inline

- **Block**: takes the full width and always starts a new line. E.g. `<div>`, `<p>`, `<h1>`, `<ul>`, `<section>`.
- **Inline**: only as wide as its content, flows within text. E.g. `<span>`, `<a>`, `<strong>`, `<em>`, `<img>`.

`<div>` is the generic block box and `<span>` the generic inline box. Neither has meaning of its own; they just group and style.

```html
<p>An <span class="hot">important</span> word is highlighted.</p>
```

> Nesting rule: inline elements usually hold text or other inline elements; do **not** put a block (`<div>`) inside a `<p>`.
