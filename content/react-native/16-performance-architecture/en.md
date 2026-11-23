# Performance and architecture: the JS thread, Hermes, the New Architecture and Expo

> **Note:** the right side runs on **react-native-web** — the same components and API as real React Native, rendered in the browser. To run on a phone, use **Expo** (steps at the end of the lessons).

Mobile users **don't forgive** janky or slow-to-open apps. Understanding **how React Native runs** tells you where to optimise.

## Two important threads

| Thread | Job | Symptom when overloaded |
|---|---|---|
| **UI (main)** | draws native UI, handles touches, native animations | scrolling/animation **jank** |
| **JavaScript** | runs your React code (render, logic, networking) | **laggy touch response**, JS animations stutter |

Goal: each frame ≤ **16.7 ms** (60 fps; 8.3 ms on 120 Hz screens). Busy JS from big renders or heavy computation ⇒ jank. Measure with the **Perf Monitor** and the **React DevTools Profiler**.

![Two threads: JS runs React; the UI thread draws native, JSI links them directly](/lessons/react-native/16-performance-architecture-fig-en.svg)
*Two threads: JS runs React; the UI thread draws native, JSI links them directly*

## Optimising renders (like web React, but costlier since it touches native)

1. **Don't re-render what hasn't changed**: `React.memo`, `useCallback`, `useMemo` in the right places (see the performance lesson in the React course). A new function reference each render defeats `memo`.
2. **Push state down** near where it's used; split components.
3. **Lists**: `FlatList` + memoised rows, a stable `keyExtractor`, `getItemLayout` for fixed height; **FlashList** for large lists (lesson 6).
4. **Images**: right size, modern format, caching (`expo-image`).
5. **Heavy computation**: `useMemo`, or move off the JS thread (Worklets/Reanimated, native modules, the server).
6. **Avoid heavy `console.log`** and constantly new objects in `style` (use `StyleSheet.create`).

## Hermes and the New Architecture

- **Hermes**: the JavaScript engine Meta built for React Native, the **default**: precompiles to **bytecode** ⇒ **faster startup, less memory**.
- **The New Architecture** (default since React Native 0.76): replaces the old asynchronous "bridge" with **JSI** (JavaScript calls native directly, **synchronously**, no JSON serialisation), plus **Fabric** (the new renderer) and **TurboModules** (lazily loaded native modules). Result: less JS↔native latency, better support for concurrent React.

You usually **needn't tune** these, but knowing helps you choose **New-Architecture-compatible** libraries.

## Expo or bare React Native?

The React Native docs now **recommend starting with a framework** like **Expo**:

| Expo | Bare RN |
|---|---|
| toolchain, libraries (camera, files, notifications…), **Expo Router** | configure Xcode/Android Studio yourself |
| **EAS Build** (cloud builds), **EAS Update** (over-the-air JS updates) | build your own CI |
| **Development builds** for custom native modules | full control |

Most projects should use **Expo** (you can still add native code when needed via *config plugins*/development builds).

## Shipping

To the **App Store**/**Google Play**: a developer account, app signing, icons/screenshots, a **privacy policy**, store review (a few days). **OTA updates** (EAS Update) fix JS bugs **without waiting for review** but don't change native code. Track crashes with **Sentry/Crashlytics**.

## References

- React Native docs: "Performance Overview", "The New Architecture", "Hermes", "Get Started".
- Expo documentation: EAS Build, EAS Update; Shopify FlashList.
