# Global state: writing a store with useSyncExternalStore

When many **distant** components need the same data (signed-in user, cart, theme), the question is: **where should the state live**?

## A ladder for choosing

| Need | Solution |
|---|---|
| One component uses it | local `useState` |
| A few sibling components | **lift state** to a common parent |
| Rarely changing, read in many places (theme, language, user) | **Context** |
| **Frequently changing**, read in many places, render-sensitive | **external store** (Zustand, Redux Toolkit, Jotai) |
| **Server** data | **TanStack Query/SWR**, don't put it in a store |
| State **in the URL** (filters, page) | URL parameters |

Important: **most "state" is actually server data** or URL state; truly global client state is far smaller than people think.

![The store lives outside React; components subscribe and re-render only when their selected slice changes](/lessons/react/14-external-store-fig-en.svg)
*The store lives outside React; components subscribe and re-render only when their selected slice changes*

## Why Context isn't always enough

Every component using a Context **re-renders when the Context value changes**, even if it uses only one field. For fast-changing state this causes needless renders.

## A store outside React

State lives in an object **outside** the component tree, with `subscribe`. The `useSyncExternalStore(subscribe, getSnapshot)` hook (React 18) syncs the store with React **safely** under concurrent rendering. A component re-renders only when **the selector's result** changes (`Object.is`).

```jsx
const count = useStore((s) => s.count);
```

Note: `getSnapshot` must return the **same reference** if the data hasn't changed (don't build a new object each call), or you get an infinite loop.

## Real libraries

- **Zustand**: ~tens of lines like this lesson, an extremely small API. Today's default choice.
- **Redux Toolkit**: the standard for large apps, superb debugging tools, clear conventions.
- **Jotai/Recoil**: atomic state.

## The immutability rule

Always **create a new object** on update (`{...state, ...patch}`), never mutate in place, so React notices the change.

## References

- react.dev: "useSyncExternalStore", "Scaling Up with Reducer and Context".
- Zustand and Redux Toolkit documentation.
