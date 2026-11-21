# Touch, press and state

> **Note:** the right side runs on **react-native-web** — the same components and API as real React Native, rendered in the browser. To run on a phone, use **Expo** (steps at the end of the lessons).

Phones have no mouse — users **touch**. React Native provides components that capture touches.

## Pressable — the flexible touch component

Wrap anything to make it pressable:

```jsx
<Pressable
  onPress={() => alert("Pressed")}
  onLongPress={() => console.log("Long press")}
  style={({ pressed }) => [styles.btn, pressed && { opacity: 0.6 }]}
>
  <Text>Press me</Text>
</Pressable>
```

- `onPress`: a quick tap (replaces `onClick`).
- `onLongPress`: press and hold.
- `style` can be a **function** receiving `{ pressed }` to restyle while pressed.

## Button — the ready-made button

```jsx
<Button title="Send" onPress={send} color="#0f766e" />
```

Simple but barely customisable. For your own look, use `Pressable`.

## State is still React

`useState`, `useEffect`, `useReducer`, Context… work **exactly** as in the React course: just swap `div` for `View` and `onClick` for `onPress`.

```jsx
const [liked, setLiked] = useState(false);
<Pressable onPress={() => setLiked(!liked)}>
  <Text>{liked ? "♥" : "♡"}</Text>
</Pressable>
```
