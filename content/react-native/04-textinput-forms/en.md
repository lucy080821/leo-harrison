# TextInput and forms

> **Note:** the right side runs on **react-native-web** — the same components and API as real React Native, rendered in the browser. To run on a phone, use **Expo** (steps at the end of the lessons).

`TextInput` is React Native's text field. Like a controlled input in the React course, but the event is **`onChangeText`** — it hands you the **string** directly (not an event object).

```jsx
const [email, setEmail] = useState("");

<TextInput
  value={email}
  onChangeText={setEmail}
  placeholder="Email"
  keyboardType="email-address"
  autoCapitalize="none"
/>
```

## Useful props

| Prop | Effect |
|---|---|
| `placeholder` | hint when empty |
| `secureTextEntry` | hide characters (passwords) |
| `keyboardType` | keyboard: `numeric`, `email-address`, `phone-pad` |
| `multiline` | multiple lines |
| `maxLength` | length cap |
| `onSubmitEditing` | when Return/Done is pressed |

## A form = several states + one button

```jsx
const [name, setName] = useState("");
const [age, setAge] = useState("");

const valid = name.trim().length > 0 && Number(age) > 0;

<Pressable disabled={!valid} onPress={submit}>
  <Text>Submit</Text>
</Pressable>
```

There is no `<form>` tag in React Native: you gather state and validate it yourself, then call your submit function when the button is pressed.
