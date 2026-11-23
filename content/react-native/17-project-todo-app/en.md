# Project: a to-do app with a list, filters and derived state

> **Note:** the right side runs on **react-native-web** — the same components and API as real React Native, rendered in the browser. To run on a phone, use **Expo** (steps at the end of the lessons).

The course capstone: use **core components, state, forms, lists, performance and accessibility** to build a small app **done properly**.

## Step 1: design minimal state

```js
todos  = [{ id, title, done }]        // the ONE source of truth for the data
text   = "..."                        // the input's content
filter = "all" | "active" | "done"    // the chosen filter
```

Everything else is **DERIVED**: the remaining count, the displayed list. Don't store them in state (they drift), **compute from `todos`** each render (`useMemo` if costly).

![Minimal state is todos; the remaining count and visible list are derived](/lessons/react-native/17-project-todo-app-fig-en.svg)
*Minimal state is todos; the remaining count and visible list are derived*

## Step 2: immutable updates

```js
setTodos((prev) => [...prev, { id: Date.now(), title, done: false }])      // add
setTodos((prev) => prev.map((t) => t.id === id ? { ...t, done: !t.done } : t)) // toggle
setTodos((prev) => prev.filter((t) => t.id !== id))                          // delete
```

Always create **new** arrays/objects; use the **functional form** `prev => ...` when the new value depends on the old.

## Step 3: the UI

- `FlatList` with a `keyExtractor` on a stable `id`, and **`ListEmptyComponent`** for the empty list (lesson 6).
- An input with `onSubmitEditing`, `returnKeyType="done"` (lesson 11); **normalise** (`trim`) and **ignore empty strings**.
- Buttons with **`accessibilityRole`/`Label`** and touch targets ≥ 44 (lesson 14).
- Filters: three buttons, the chosen one with `accessibilityState={{ selected: true }}`.

## Step 4: making it production-ready

| Feature | Suggestion |
|---|---|
| Keep data after closing the app | `useStoredState` + AsyncStorage (lesson 13), with `migrate` |
| Multi-device sync | an API + TanStack Query, optimistic updates (lesson 10) |
| Edit titles, drag to reorder | a detail screen (lesson 9), `react-native-draggable-flatlist` |
| Deadlines, reminders | `expo-notifications`, local notifications |
| Dark theme | colour tokens + Context (lesson 15) |
| Add/delete animations | `LayoutAnimation`/Reanimated (lesson 12) |
| Performance | `memo` rows, `useCallback` (lesson 16) |
| Testing | Jest + **React Native Testing Library** (behaviour-based tests) |

## Design lessons

1. **Little state, much derived data.**
2. **Immutable, functional updates.**
3. **Every state has a UI**: empty, loading, error.
4. **Accessibility from the start**, not patched later.
5. **Extract pure logic** (filtering, counting, migration) from the UI to ease testing.

## Next steps

Build a real app with **Expo** (`npx create-expo-app`), run it on a **real device** (Expo Go or a development build), add **TypeScript**, then ship a test build via **TestFlight/Internal testing** before the stores.

## References

- React Native docs: "Get Started", "Core Components"; Expo documentation.
- react.dev: "Choosing the State Structure", "Updating Arrays in State".
- React Native Testing Library documentation.
