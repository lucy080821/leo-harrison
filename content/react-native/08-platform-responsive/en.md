# Platforms and responsive UI: Platform and screen size

> **Note:** the right side runs on **react-native-web** — the same components and API as real React Native, rendered in the browser. To run on a phone, use **Expo** (steps at the end of the lessons).

One codebase runs on **iPhones, Android phones, tablets** (and web) with different sizes, pixel densities and safe areas. Good code **adapts**, never assuming one screen.

## Units: not pixels

React Native uses **density-independent units** (dp/pt): `width: 100` looks the same physical size on every device; the system multiplies by the density factor. Use **`PixelRatio`** only when you need real pixels (e.g. hairlines with `StyleSheet.hairlineWidth`).

![One codebase, many sizes: column count by width](/lessons/react-native/08-platform-responsive-fig-en.svg)
*One codebase, many sizes: column count by width*

## Platform differences

```js
Platform.OS                         // 'ios' | 'android' | 'web'
Platform.select({ ios: 17, android: 16, default: 16 })
```

Use for **small** differences (fonts, shadows: iOS uses `shadow*`, Android uses `elevation`). For big differences, split files `Component.ios.js` / `Component.android.js` (the bundler picks one).

## Responsive UI

`useWindowDimensions()` returns `{ width, height }` and **updates automatically** on rotation/split-screen (unlike `Dimensions.get`, which reads once).

```js
const { width } = useWindowDimensions()
const columns = width < 500 ? 1 : width < 900 ? 2 : 3
```

- Put **breakpoints** in clearly named constants; extract **pure functions** (easy to test).
- Prefer **Flexbox** and ratios (`flex`, `%`, `aspectRatio`) over fixed sizes.
- For multi-column grids in `FlatList`, set `numColumns` and **change `key`** when the column count changes.

## Safe areas

Notches, status bars and gesture-navigation bars cover content. Use **`react-native-safe-area-context`** (`SafeAreaProvider` + `useSafeAreaInsets()` or `SafeAreaView`) to **pad** content away from them.

## Orientation and text size

- Support **landscape** or lock to portrait (app config); test both.
- Users can enlarge system text (**Dynamic Type/Font Scale**): don't **fix heights** around text; test at the largest size (the accessibility lesson).

## Dark mode

`useColorScheme()` returns `'light' | 'dark'`: build a **theme** rather than scattering hard-coded colours (the theming lesson).

## Devices to test

Small phones (iPhone SE), large ones, low-end Android, tablets, and **split-screen mode**. Use simulators and **at least one real device** per OS.

## References

- React Native docs: `Platform`, `useWindowDimensions`, `PixelRatio`, "Platform Specific Code".
- Apple Human Interface Guidelines: Layout; Material Design 3: Adaptive layouts.
