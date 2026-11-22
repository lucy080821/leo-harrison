# Error handling and debugging

Errors are **normal** in programming. This lesson teaches how to **handle** errors at runtime and how to **find** them while writing code.

## Kinds of errors

| Kind | Example | Detected |
|---|---|---|
| **Syntax** (`SyntaxError`) | A missing bracket, a wrong keyword | Before running |
| **Runtime** (`TypeError`, `ReferenceError`...) | Calling a method on `undefined`, using an undeclared variable | While running |
| **Logic** | A wrong result but no error | You must spot it yourself |

![try / catch / finally: the error-handling flow](/lessons/javascript/12-errors-debugging-fig-en.svg)
*try / catch / finally: the error-handling flow*

## try / catch / finally

```javascript
try {
  const data = JSON.parse(text);    // code that may fail
  use(data);
} catch (error) {                   // runs IF an error is thrown
  console.log(error.name, error.message);
} finally {                         // ALWAYS runs, error or not
  hideSpinner();
}
```

`catch` needs no parameter if you don't use it: `catch { ... }`. Wrap `try` only around code that **can truly fail** (parsing JSON, network calls), not the whole program.

## Throwing errors with throw

```javascript
function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}
```

- Always throw an `Error` object (it has `name`, `message`, `stack`), **not** a string.
- There are subclasses: `TypeError`, `RangeError`... and you can define your own: `class ValidationError extends Error {}`.
- Errors **bubble up** through calling functions until a `catch` handles them. If nobody does, the program stops and the error shows in the console.

## Common errors and how to read them

| Message | Usually means |
|---|---|
| `x is not defined` | Mistyped a variable name or forgot to declare it |
| `Cannot read properties of undefined (reading 'name')` | The variable is `undefined`/`null` but you read `.name` |
| `x is not a function` | Calling something that isn't a function (wrong name/type) |
| `Unexpected token` | Syntax error: brackets, commas... |

Read the **first line** of the message and the accompanying **line number**.

## Debugging skills

1. **`console.log`** suspicious values: print `typeof x`, print whole objects. The Console panel on the right also shows errors in red.
2. **Narrow it down:** comment out code or reduce to the smallest example that still fails.
3. **DevTools** (F12): the *Sources* tab lets you set **breakpoints** to pause the program and inspect each variable; a `debugger;` statement pauses there too.
4. **Read the error message carefully**: it often says exactly what's wrong.
5. **Rubber-duck debugging**: explain each line aloud and you'll often spot the mistake yourself.

> Don't "swallow" errors with an empty `catch {}`: you'll never know why the program broke. At least `console.error(e)`.
