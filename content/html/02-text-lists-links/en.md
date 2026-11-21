# Text, lists, links and images

## Emphasising text

| Tag | Meaning | Usually rendered as |
|---|---|---|
| `<strong>` | Very important | **bold** |
| `<em>` | Emphasis | *italic* |
| `<code>` | A piece of code | `monospace` |
| `<br />` | Line break | — |
| `<hr />` | Horizontal rule | — |

Pick tags by **meaning**, not by looks. CSS takes care of the looks in a later lesson.

## Lists

```html
<ul>            <!-- unordered list (bullets) -->
  <li>Pho</li>
  <li>Bun cha</li>
</ul>

<ol>            <!-- ordered list (1, 2, 3...) -->
  <li>Wash hands</li>
  <li>Cook</li>
</ol>
```

`<li>` (list item) should only be placed **inside** `<ul>` or `<ol>`.

## Links

```html
<a href="https://example.com" target="_blank">Go to another page</a>
```

- `href`: the destination address (URL). It can also be a relative path such as `about.html`.
- `target="_blank"`: open in a new tab.
- The text **between** the opening and closing tags is what the user clicks. Avoid vague text such as "click here".

## Images

```html
<img src="cat.jpg" alt="A cat sleeping" width="300" />
```

- `src`: the path to the image.
- `alt`: alternative text. You **should always** include it: screen readers read it to visually impaired users, and it shows when the image fails to load.
- `<img>` is a void element and has no closing tag.

> Tip: inside the sandbox, internet images may fail to load depending on your network, but the tag still exists and is still checked correctly.
