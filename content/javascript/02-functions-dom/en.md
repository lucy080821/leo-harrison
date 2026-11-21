# Functions and page interaction (DOM)

## Functions

A **function** is a named block of code you can call many times. It takes **parameters** (input) and can **return** a value (output).

```javascript
function add(a, b) {
  return a + b;
}
console.log(add(2, 3)); // 5
```

The **arrow function** syntax (short and very common):

```javascript
const add = (a, b) => a + b;
```

- `return` ends the function and sends a value back to the caller.
- A function without `return` returns `undefined`.
- Variables declared inside a function exist only inside it (**scope**).

## What is the DOM?

When a page loads, the browser turns HTML into a tree of objects called the **DOM** (Document Object Model). JavaScript reads and changes this tree to make pages "alive".

```javascript
const title = document.getElementById("title");          // select by id
const first = document.querySelector(".note");            // select by CSS selector
title.textContent = "New title";                          // change text
title.style.color = "tomato";                             // change style
```

## Events

Use `addEventListener` to run code when the user does something:

```javascript
button.addEventListener("click", () => {
  console.log("Clicked!");
});
```

Common events: `click`, `input` (typing), `submit` (form submit), `keydown` (key press).

## Full example: a counter

Look at `index.html` and `script.js` on the right: every click raises `count` and updates the `<p>` text. Try changing `count++` to `count += 5`.

> The **Console** tab on the right shows every `console.log` and also errors (in red). When your code doesn't behave, check the console first.
