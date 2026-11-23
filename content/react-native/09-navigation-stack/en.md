# Navigation: the screen stack and passing parameters

> **Note:** the right side runs on **react-native-web** — the same components and API as real React Native, rendered in the browser. To run on a phone, use **Expo** (steps at the end of the lessons).

A mobile app has many **screens**; **navigation** is how users move between them. Unlike the web (one URL per page), mobile uses a **stack** model: *go forward* = `push` a new screen on top; *go back* = `pop`.

## The stack model

```
[Home]            →  push(Detail, {id: 7})  →  [Home, Detail{7}]  →  pop  →  [Home]
```

- The top screen is the one **displayed**.
- The Back button (iOS: edge swipe; Android: system button/gesture) **pops**.
- Lower screens **stay in memory** (keeping state, scroll position).

![The screen stack: push adds on top, pop goes back](/lessons/react-native/09-navigation-stack-fig-en.svg)
*The screen stack: push adds on top, pop goes back*

## Common navigator types

| Type | Used for |
|---|---|
| **Stack** | linear flows: list → detail |
| **Tabs** | parallel main areas (Home, Search, Profile) |
| **Drawer** | a side drawer with many entries |
| **Modal** | focused tasks shown **on top** (compose mail, filters) |

Real apps **nest** them: Tabs at the root, each tab with its own Stack.

## Libraries

- **React Navigation**: the long-standing standard, navigation configured in code.
- **Expo Router**: **file-based** routing like Next.js (`app/post/[id].tsx`); built on React Navigation, supports **deep links** and web.

```js
navigation.navigate('Detail', { id: 7 })      // React Navigation
router.push({ pathname: '/post/[id]', params: { id: 7 } })   // Expo Router
const { id } = route.params                   // read parameters
```

## Passing parameters: rules

- Pass only **IDs or small, serialisable data**; the detail screen **fetches** its data by ID (so refresh or opening by link both work).
- **Don't** pass functions or large/non-serialisable objects (warnings, break state restoration and deep links).
- Type params with TypeScript (`RootStackParamList`).

## Deep links

URLs like `myapp://post/7` or web links open the detail screen directly: the foundation of **push notifications**, sharing and web-to-app handoff. Design **params as part of the URL** from the start.

## Experience

- Keep the **Back button** behaving as users expect (Android).
- To block leaving ("discard changes?"), use the library's `beforeRemove` mechanism.
- **Sign-in**: build two stacks (signed out / signed in) switched by auth state instead of manual redirects.

## References

- React Navigation documentation; Expo Router documentation.
- Apple HIG: Navigation; Material Design: Navigation.
