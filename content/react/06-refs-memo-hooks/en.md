# useRef, useMemo and custom hooks

## useRef — a box that doesn't re-render

```jsx
const ref = useRef(null);
<input ref={ref} />
ref.current.focus();
```

`ref.current` points to the real DOM element. Changing `ref.current` does **not** re-render (unlike state). Use it to focus, measure, or remember a value across renders (like a timer id).

![useMemo: recompute only when dependencies change](/lessons/react/06-refs-memo-hooks-fig-en.svg)
*useMemo: recompute only when dependencies change*

## useMemo — remember an expensive result

```jsx
const total = useMemo(() => items.reduce((s, x) => s + x.price, 0), [items]);
```

It recomputes only when `items` changes. Don't overuse — only for genuinely slow work.

## Custom hooks

When two components repeat the same stateful logic, extract a function starting with `use`:

```jsx
function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  return [on, () => setOn((v) => !v)];
}
```

Each call gets its **own** state. Hooks must be called at the top of a component or another hook — never inside `if` or loops.
