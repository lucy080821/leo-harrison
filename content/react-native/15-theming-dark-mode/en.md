# Theming and dark mode: colour tokens, useColorScheme and Context

> **Note:** the right side runs on **react-native-web** — the same components and API as real React Native, rendered in the browser. To run on a phone, use **Expo** (steps at the end of the lessons).

More than half of users enable **dark mode** on their devices; a light-only app is **glaring at night** and looks out of place. A systematic **theme** also keeps branding consistent and lets you change colours in **one place**.

## The mistake: hard-coded colours everywhere

`color: "#0f172a"` in 200 places ⇒ adding dark mode means editing 200 places, easily **missing** some (dark text on a dark background!).

![Role-based colour tokens: changing theme just swaps the table](/lessons/react-native/15-theming-dark-mode-fig-en.svg)
*Role-based colour tokens: changing theme just swaps the table*

## Role-based colour tokens

Name by **purpose**, not value:

```js
const themes = {
  light: { bg: "#ffffff", surface: "#f1f5f9", text: "#0f172a", muted: "#64748b", accent: "#0ea5e9", danger: "#dc2626" },
  dark:  { bg: "#0f172a", surface: "#1e293b", text: "#f1f5f9", muted: "#94a3b8", accent: "#38bdf8", danger: "#f87171" },
}
```

Components say only `t.bg`, `t.text`, `t.accent`; **changing theme = changing the table**.

## Broadcasting the theme with Context

```js
const ThemeCtx = createContext(themes.light)
const useTheme = () => useContext(ThemeCtx)

<ThemeCtx.Provider value={themes[scheme]}><App /></ThemeCtx.Provider>
```

Every component calling `useTheme()` **updates automatically** when the theme changes (see the Context lesson in the React course). You can also use a UI library (Tamagui, NativeWind, React Native Paper) with a built-in theme system.

## Following the OS and user override

```js
const system = useColorScheme()        // 'light' | 'dark' | null
const scheme = override ?? system ?? 'light'
```

Default to **the system**; let users **override** (Light/Dark/System) and **persist** the choice (the local storage lesson). Set `userInterfaceStyle: "automatic"` in the Expo config so the system applies.

## Designing dark colours properly

- **Don't blindly invert**: a dark background is **not pure black** (`#0f172a`, `#121212`), reducing glare and edge "vibration".
- Lower the **saturation** of accent colours (vivid colours on dark cause eye strain).
- Show **elevation** with **lighter** surfaces, not drop shadows.
- Check **contrast ≥ 4.5:1** in **both** themes.
- Images/logos need dark variants or transparent backgrounds.
- The **status bar** (`StatusBar` style) must change too.

## Beyond colour

A theme should also hold **spacing**, **corner radii**, **font sizes**: design tokens shared between **design (Figma)** and **code**.

## References

- React Native docs: `useColorScheme`, `Appearance`; Expo docs: "Color themes".
- Material Design 3: Color system, Dark theme; Apple HIG: Dark Mode.
- WCAG 2.2: 1.4.3 Contrast (Minimum).
