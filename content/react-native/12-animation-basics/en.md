# Animation: Animated, timing and interpolate

> **Note:** the right side runs on **react-native-web** — the same components and API as real React Native, rendered in the browser. To run on a phone, use **Expo** (steps at the end of the lessons).

Good animation isn't just decoration: it **explains what's happening** (where an element came from, where it went), gives instant **feedback** to touches, and makes the UI feel **natural**.

## The core idea

Change a value over time, **without round-tripping through React renders**. Each frame the value updates and **the UI picks it up directly**, with no `setState` 60 times per second.

```js
const opacity = useRef(new Animated.Value(0)).current

Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }).start()

<Animated.View style={{ opacity }} />
```

| Function | Used for |
|---|---|
| `Animated.timing` | time-based transitions + easing curves (`Easing`) |
| `Animated.spring` | physical **spring**: natural, bouncy |
| `Animated.decay` | coasting after a release (flick) |
| `Animated.sequence/parallel/stagger` | **combining** animations |
| `value.interpolate` | **mapping** one value to many properties |

![One Animated.Value drives many properties via interpolate](/lessons/react-native/12-animation-basics-fig-en.svg)
*One Animated.Value drives many properties via interpolate*

## interpolate: one value, many properties

```js
const width  = v.interpolate({ inputRange: [0, 1], outputRange: [50, 200] })
const rotate = v.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] })
const color  = v.interpolate({ inputRange: [0, 1], outputRange: ["#fff", "#0ea5e9"] })
```

One Animated.Value running 0 → 1 drives width, rotation and colour at once, perfectly in sync.

## The native driver and 60 fps

By default animations compute on the **JavaScript** thread: if JS is busy (heavy rendering), the animation **janks**. With **`useNativeDriver: true`** the animation description is sent to the **native UI thread** and runs independently of JS: **smooth 60 fps** even when JS is busy. Limit: only properties that **don't affect layout** (`opacity`, `transform`); **not** `width`, `height`, `backgroundColor`.

For complex gesture-driven animation (drag and drop, scroll-linked effects) use **react-native-reanimated** + **react-native-gesture-handler**: all logic runs on the UI thread (worklets).

## Design principles

1. **Purpose**: each animation answers a question ("where did this come from?"), no gratuitous decoration.
2. **Short**: 150-300 ms for small transitions; **ease-out** curves for entering elements.
3. Prefer **`opacity` and `transform`** (cheapest).
4. **Respect accessibility**: `AccessibilityInfo.isReduceMotionEnabled()`, reduce/remove motion for sensitive users (vestibular disorders).
5. **Clean up**: stop animations when the component unmounts (`animation.stop()`).

## Measuring performance

Turn on the **Perf Monitor** (developer menu) to see JS and UI thread FPS. Animations should keep the **UI thread ≈ 60 fps**.

## References

- React Native docs: `Animated`, "Animations", `AccessibilityInfo`.
- React Native Reanimated and Gesture Handler documentation.
- Material Design: Motion; Apple HIG: Motion.
