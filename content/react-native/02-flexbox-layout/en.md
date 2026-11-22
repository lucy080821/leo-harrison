# Flexbox layout

> **Note:** the right side runs on **react-native-web** — the same components and API as real React Native, rendered in the browser. To run on a phone, use **Expo** (steps at the end of the lessons).

In React Native **every View is a flex container**. Two differences from the web: the default direction is **column**, and there is no `display` to choose.

## Key properties

| Property | Effect | Common values |
|---|---|---|
| `flexDirection` | main axis | `column` (default), `row` |
| `justifyContent` | align along the **main axis** | `flex-start`, `center`, `flex-end`, `space-between`, `space-around` |
| `alignItems` | align along the **cross axis** | `stretch` (default), `center`, `flex-start`, `flex-end` |
| `flex` | share of space | `1` = fill the free space |
| `gap` | space between children | number |

![In RN flexDirection defaults to column](/lessons/react-native/02-flexbox-layout-fig-en.svg)
*In RN flexDirection defaults to column*

## Everyday recipes

**Center everything**

```jsx
{ flex: 1, justifyContent: "center", alignItems: "center" }
```

**A row with an icon and text**

```jsx
{ flexDirection: "row", alignItems: "center", gap: 8 }
```

**Split 1 : 2**

```jsx
<View style={{ flexDirection: "row" }}>
  <View style={{ flex: 1 }} />   {/* 1 part */}
  <View style={{ flex: 2 }} />   {/* 2 parts */}
</View>
```

Think in two axes: **main** (along `flexDirection`) and **cross** (perpendicular). With `flexDirection: "row"` the main axis is horizontal, so `justifyContent` aligns horizontally and `alignItems` vertically.
