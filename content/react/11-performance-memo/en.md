# Performance: React.memo, useCallback and keys

**Rule #1: don't optimise early.** React is fast already. Optimise only when you can **measure** a problem (React DevTools Profiler, jank while typing/scrolling).

## When does React re-render a component?

1. **Its own state** changes.
2. **Its parent** re-renders (even if the child's props are unchanged!).
3. A **context** it uses changes.

(2) is the common cause: when a parent changes state, **all its children** re-render too.

![A parent re-render drags children along; memo blocks it when props are unchanged](/lessons/react/11-performance-memo-fig-en.svg)
*A parent re-render drags children along; memo blocks it when props are unchanged*

## React.memo

```jsx
const Row = memo(function Row({ label }) { ... });
```

`memo` skips rendering if the **props are unchanged** (shallow comparison, `Object.is`). Useful for **expensive** components rendered many times with the same props.

## The trap: new references every render

`<Row onPick={() => ...} />` creates a **new function** each render ⇒ the prop "changed" ⇒ `memo` is useless. When passing functions/objects/arrays to a **memoised** component, keep references stable:

```jsx
const onPick = useCallback((x) => setPicked(x), []);
const style = useMemo(() => ({ color }), [color]);
```

## key: identity in lists

`key` tells React which element is which across renders.

- Use a **stable, unique id** (a database id).
- **Don't use the index** if the list can be inserted into/removed from/sorted: element state (inputs, animations) is attached to the wrong item.
- Don't use `Math.random()` (the key changes each time ⇒ everything remounts).

## Other techniques

| Problem | Solution |
|---|---|
| Very long list | **virtualisation** (react-window, TanStack Virtual) |
| Expensive computation | `useMemo` |
| Heavy updates while typing | `useDeferredValue`, `useTransition` (next lessons) |
| Large bundle | **code splitting** with `lazy` + `Suspense` |
| State placed too high | **push state down** near where it's used |

A commonly forgotten tip: **move state down** into a small child component instead of `memo` everywhere; simpler and more effective.

## References

- react.dev: "Render and Commit", "memo", "useCallback", "Rendering Lists".
- Kent C. Dodds, "Fix the slow render before you fix the re-render".
