# Touch and accessibility: target size, labels and roles

> **Note:** the right side runs on **react-native-web** — the same components and API as real React Native, rendered in the browser. To run on a phone, use **Expo** (steps at the end of the lessons).

Phones are used **one-handed, while walking, in sunlight, with big fingers**, and by people who are **blind, deaf, or have limited mobility**. Accessibility isn't an "extra feature": it is **baseline quality**, and in many markets a **legal requirement**.

## Big-enough touch targets

| Guideline | Minimum |
|---|---|
| Apple HIG | **44 × 44 pt** |
| Material Design | **48 × 48 dp** |
| WCAG 2.2 (target size) | 24 × 24 CSS px (AA minimum), 44 for AAA |

Small icons still need big targets: use **`minWidth/minHeight`** or **`hitSlop`** (extends the touch area **without changing layout**). Keep **spacing** between touch targets to avoid mis-taps.

![A 44 pt minimum target; hitSlop enlarges it without changing layout](/lessons/react-native/14-touch-accessibility-fig-en.svg)
*A 44 pt minimum target; hitSlop enlarges it without changing layout*

## For screen readers (VoiceOver, TalkBack)

| Prop | Role |
|---|---|
| `accessible` | groups a cluster into **one** readable item |
| `accessibilityLabel` | what is **spoken** in place of content (a "✕" button → "Delete") |
| `accessibilityRole` | `button`, `link`, `header`, `image`, `switch`, `tab`… |
| `accessibilityState` | `{ selected, disabled, checked, expanded }` |
| `accessibilityHint` | hint at the result ("Opens the detail page") |

Rule: **everything interactive** has a meaningful **role and label**; meaningful images get descriptions, decorative ones are hidden (`accessible={false}`). An icon-only button without a label is the **most common** accessibility bug.

## Touch feedback

Use `Pressable` with `style={({ pressed }) => ...}` to show a **pressed state** instantly; add **haptics** for important actions (`expo-haptics`). Delayed feedback makes users tap repeatedly.

## Text and colour

- **Dynamic text size**: don't fix heights around text; test at the largest system text size (`allowFontScaling`, on by default).
- Text/background **contrast** ≥ **4.5:1** (WCAG AA); don't convey information by colour alone.
- Support **dark mode** and **reduced motion** (`AccessibilityInfo`).

## Announcing changes

`AccessibilityInfo.announceForAccessibility("Added to cart")` tells screen readers about changes with nothing to "tap".

## Testing

1. Turn on **VoiceOver/TalkBack** and try the main flow **without looking at the screen**.
2. **Accessibility Inspector** (Xcode), **Accessibility Scanner** (Android).
3. Try with the **largest text** and **dark mode**.
4. Have real hands tap it: **one hand, thumb**.

## References

- React Native docs: "Accessibility".
- Apple HIG: Accessibility; Material Design: Accessibility; WCAG 2.2.
