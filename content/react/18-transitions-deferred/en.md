# Concurrent rendering: useTransition and useDeferredValue

Typing in a search box while a 10,000-row list re-filters on every keystroke ⇒ **the input janks**. The problem isn't total work but that **all updates are equally urgent**.

## Urgent vs non-urgent updates

| Kind | Example | Desired |
|---|---|---|
| **Urgent** | typing, clicking, dragging | **instant** feedback |
| **Transition** | filtered results, switching tab/page | **may lag**, can be interrupted |

React 18 supports **concurrent rendering**: it can **pause and discard** an unimportant render when a more urgent update arrives.

![The input updates instantly; the list catches up when idle](/lessons/react/18-transitions-deferred-fig-en.svg)
*The input updates instantly; the list catches up when idle*

## useTransition

Mark an update as *non-urgent*:

```jsx
const [isPending, startTransition] = useTransition();
startTransition(() => setTab("b"));
```

`isPending` says the transition is in progress (show a small spinner). If the user clicks again, React **discards** the older one.

## useDeferredValue

When you **don't control** where `setState` is called (the value comes from props), or you just want a "lagging copy" of a value:

```jsx
const deferred = useDeferredValue(text);
<List query={deferred} />   // memo(List): re-renders only when deferred changes
```

`text` updates immediately (smooth input), `deferred` catches up when React is idle. Wrap the child in **`memo`** for the benefit to actually happen.

## When to use

- **Filtering/searching large lists**, heavy charts, switching tabs with heavy content.
- It does **not** replace: API calls (still need debounce or request cancellation), very long lists (need **virtualisation**), extremely heavy computation (move to a Web Worker).

## Notes

- The function in `startTransition` must be **synchronous** and contain only state updates.
- For a **controlled input**, don't put `setText` itself in a transition (the input lags).
- Measure with the React Profiler before and after.

## References

- react.dev: `useTransition`, `useDeferredValue`; the "React 18: Concurrent features" write-up.
- React 18 Working Group: "Automatic batching" and "Transitions".
