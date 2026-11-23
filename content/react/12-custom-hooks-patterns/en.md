# Practical custom hooks: useLocalStorage and useDebounce

A **custom hook** is a function starting with `use` that can call other hooks. It lets you **reuse stateful logic** across components without restructuring the component tree (unlike HOCs or render props).

## The Rules of Hooks

1. Call hooks only at the **top level** of a component/hook (not inside `if`, loops, nested functions).
2. Call them only from **function components** or **other hooks**.

Why: React identifies hooks by their **call order** on every render. The `eslint-plugin-react-hooks` plugin catches mistakes.

![A custom hook packages stateful logic reused in many places](/lessons/react/12-custom-hooks-patterns-fig-en.svg)
*A custom hook packages stateful logic reused in many places*

## Example 1: useToggle

Repeated on/off logic (modal, menu, accordion) packs into a small hook returning `[on, toggle]`.

## Example 2: useLocalStorage

State that **survives** page reloads:

```jsx
const [theme, setTheme] = useLocalStorage("theme", "light");
```

Key details: **lazy** initialisation `useState(() => read localStorage)` to read just once; wrap in `try/catch` because `localStorage` may be blocked (private mode). With **SSR/Next.js**, `localStorage` doesn't exist on the server, so read it in `useEffect` to avoid hydration mismatches.

## Example 3: useDebounce

Typing into a search box shouldn't call the API **on every keystroke**. Debouncing waits until the user **stops typing** for a moment:

```jsx
useEffect(() => {
  const t = setTimeout(() => setV(value), ms);
  return () => clearTimeout(t);   // typing again cancels the previous wait
}, [value, ms]);
```

The effect's cleanup function *is* the mechanism cancelling the old timer. Use the `debounced` value as the dependency of the effect that calls the API.

## Designing good hooks

- One hook, **one responsibility**; name it after what it does (`useOnlineStatus`).
- Return something **easy to use**: an array `[value, setter]` for simple pairs, an object for many values.
- Hooks **don't** share state between call sites: each call has its own state. For real sharing use Context or a store.
- Try existing libraries (**usehooks-ts**, **react-use**) before writing your own.

## References

- react.dev: "Reusing Logic with Custom Hooks", "Rules of Hooks".
- Josh W. Comeau, "The Perils of Rehydration".
