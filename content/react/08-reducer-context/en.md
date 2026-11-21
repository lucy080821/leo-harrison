# useReducer and Context

## useReducer

When state has many fields or many ways to change, gather the logic in a **reducer**: a function `(state, action) → new state`.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: "add", price: 25 });
```

Benefits: every change lives in one place, easy to read and test. A reducer must be **pure** — never mutate `state` in place; always return a new object.

## Context — avoid threading props through many layers

Passing props through 5 components just to reach a button at the bottom is *prop drilling*. Context "broadcasts" data instead:

```jsx
const ThemeContext = createContext("light");

<ThemeContext.Provider value="dark">
  <Page />                     {/* every descendant can read it */}
</ThemeContext.Provider>

const theme = useContext(ThemeContext);
```

Context suits **global, rarely-changing** data: theme, language, the signed-in user. `useReducer` + Context together give app-wide state without an extra library.
