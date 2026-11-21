# useEffect: side effects

A pure component only **computes UI from props and state**. "Outside" work — changing the page title, starting a timer, calling an API, subscribing to events — is called a **side effect** and lives in `useEffect`.

```jsx
useEffect(() => {
  // runs AFTER the UI is painted
  return () => { /* cleanup (optional) */ };
}, [dependencies]);
```

## The dependency array

| Array | When it runs |
|---|---|
| omitted | after **every** render |
| `[]` | **once**, after the first render |
| `[a, b]` | when `a` or `b` **changes** |

## Cleanup

The returned function runs before the next run and when the component disappears. Use it for `clearInterval`, removing listeners, cancelling requests.

## When you do NOT need an effect

- Deriving a value from state/props → compute it in the component body.
- Reacting to a click → put the logic in `onClick`.

Effects are for **syncing with things outside React**.
