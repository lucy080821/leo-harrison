# State and events

Ordinary variables do **not** update the UI. For the UI to follow your data, React has **state**.

## useState

```jsx
const [count, setCount] = useState(0);
```

- `count`: the current value.
- `setCount`: the function that **changes** it. Calling it makes React **re-render** the component.
- `0`: the initial value.

![The loop: event → setState → re-render](/lessons/react/03-state-events-fig-en.svg)
*The loop: event → setState → re-render*

## Events

Attach a function to `onClick`, `onChange`, `onSubmit`…

```jsx
<button onClick={() => setCount(count + 1)}>+1</button>
```

Pass a **function**, don't call it: `onClick={handle}` or `onClick={() => handle(5)}`, not `onClick={handle(5)}`.

## Updating from the previous value

When the new value depends on the old one, use the function form:

```jsx
setCount((c) => c + 1);
```

## Never mutate state directly

For arrays/objects, make a **new** copy:

```jsx
setList([...list, newItem]);
setUser({ ...user, name: "Lexi" });
```
