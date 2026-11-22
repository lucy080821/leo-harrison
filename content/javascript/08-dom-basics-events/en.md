# DOM basics and events

## What is the DOM?

When a page loads, the browser turns the HTML into a **tree of objects** called the **DOM** (Document Object Model). Each tag is a **node**. JavaScript reads and changes this tree and the page updates immediately.

```text
document
└── html
    ├── head
    └── body
        ├── h1#title   "Untitled"
        └── button#btn
```

The `document` object is the entry point for everything.

![Events: the user clicks → the browser calls the handler](/lessons/javascript/08-dom-basics-events-fig-en.svg)
*Events: the user clicks → the browser calls the handler*

## Selecting elements

```javascript
document.getElementById("title");        // by id (fast, returns 1 element)
document.querySelector(".card");         // by CSS selector, the FIRST match
document.querySelectorAll("li");         // EVERY match (a NodeList, iterable with for...of)
```

`querySelector` uses exact CSS syntax: `"#id"`, `".class"`, `"ul > li:first-child"`. If nothing is found it returns `null`: accessing a property of `null` throws an error.

## Reading and changing content

```javascript
el.textContent = "Plain text";      // set text (safe, doesn't parse HTML)
el.innerHTML = "<b>Bold</b>";       // set HTML (careful: XSS risk with user data)
el.value;                           // the value of an <input>
el.getAttribute("href");            // read an attribute
el.setAttribute("href", "/a");      // set an attribute
el.style.color = "tomato";          // change style directly
```

> **Security:** never assign user-entered data to `innerHTML`. Use `textContent`.

## Events

An event is something that happens on the page: a click, a key press, loading finished... You register a **handler** with `addEventListener`:

```javascript
btn.addEventListener("click", () => {
  console.log("Clicked!");
});
```

| Event | When |
|---|---|
| `click` | Mouse click / tap |
| `input` | Every time an input's value changes |
| `change` | The value change is committed (blur, selection) |
| `submit` | A form is submitted |
| `keydown`, `keyup` | Key pressed / released |
| `mouseover`, `mouseout` | Mouse enters / leaves |
| `DOMContentLoaded` | The HTML has finished loading |

Put the `<script>` tag at the **end of `<body>`** (or use `defer`) so the elements exist when your code runs.

## Example: a counter

```javascript
let n = 0;
btn.addEventListener("click", () => {
  n++;
  count.textContent = n;
});
```

`n` lives outside the handler so it **keeps its value** between clicks.
