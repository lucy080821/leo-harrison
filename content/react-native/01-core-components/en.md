# What React Native is: View, Text, StyleSheet

> **Note:** the right side runs on **react-native-web** — the same components and API as real React Native, rendered in the browser. To run on a phone, use **Expo** (steps at the end of the lessons).

**React Native** lets you build **real iOS and Android apps** with React and JavaScript. The UI is drawn with the OS's *native* widgets, not a web page.

You already know React (components, props, state, hooks) — it all **carries over**. Only the UI building blocks differ.

## No HTML tags

| Web | React Native |
|---|---|
| `<div>` | `<View>` |
| `<p>`, `<span>`, `<h1>` | `<Text>` |
| `<img>` | `<Image>` |
| `<input>` | `<TextInput>` |
| `<button>` | `<Pressable>` / `<Button>` |
| `<ul>` + map | `<FlatList>` |

**All text must be inside `<Text>`** — bare text in a `<View>` is an error.

![RN components map to native UI elements](/lessons/react-native/01-core-components-fig-en.svg)
*RN components map to native UI elements*

## Styling with JavaScript

No CSS files. Use `StyleSheet.create` with **camelCase** property names and numeric (dp) or string values:

```jsx
const styles = StyleSheet.create({
  card: { padding: 16, backgroundColor: "white", borderRadius: 8 },
  title: { fontSize: 20, fontWeight: "bold" },
});

<View style={styles.card}><Text style={styles.title}>Hi</Text></View>
```

Combine styles: `style={[styles.card, active && styles.active]}`.

## Running on a phone with Expo

```bash
npx create-expo-app@latest my-app
cd my-app
npx expo start        # scan the QR code with the Expo Go app
```
