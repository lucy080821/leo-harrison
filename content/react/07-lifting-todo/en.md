# Lifting state and a Todo app

## Lifting state up

When two components need **the same data**, keep the state in their nearest **common parent** and pass it down via props. Children report changes upward through callbacks.

```jsx
function Parent() {
  const [value, setValue] = useState("");
  return (
    <>
      <Input value={value} onChange={setValue} />
      <Preview value={value} />
    </>
  );
}
```

React data flows **down** (props); events flow **up** (callbacks).

![Lift state up to the parent to share it](/lessons/react/07-lifting-todo-fig-en.svg)
*Lift state up to the parent to share it*

## How to build a React app

1. Split the UI into components.
2. Find what data changes → that's state.
3. Put state in the lowest parent that needs it.
4. Pass data down and update functions down.

## Immutable array updates

| Task | How |
|---|---|
| Add | `[...list, item]` |
| Remove | `list.filter((x) => x.id !== id)` |
| Update | `list.map((x) => x.id === id ? {...x, done: true} : x)` |

Derived values (like the number of remaining todos) **need no state** — compute them from existing state.
