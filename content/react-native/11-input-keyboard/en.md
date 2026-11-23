# Input and keyboard: keyboard types, password fields and moving between fields

> **Note:** the right side runs on **react-native-web** — the same components and API as real React Native, rendered in the browser. To run on a phone, use **Expo** (steps at the end of the lessons).

Typing on a phone is **slower and more error-prone** than on a computer keyboard. Configuring inputs correctly is one of the cheapest ways to **raise form completion**.

## Choose the right keyboard

| Prop | Effect |
|---|---|
| `keyboardType` | `email-address`, `numeric`, `phone-pad`, `decimal-pad`, `url` |
| `autoCapitalize="none"` | no initial capital (email, usernames) |
| `autoCorrect={false}` | disable auto-correct (codes, proper names) |
| `secureTextEntry` | mask characters (passwords) |
| `returnKeyType` | label of the Enter key: `next`, `done`, `search`, `send` |
| `maxLength` | limit length |
| `multiline` | multiple lines |

A numeric keyboard for phone numbers and OTP codes; the email keyboard has `@` and `.` handy.

![Pick the right keyboard and Enter key to reduce typing friction](/lessons/react-native/11-input-keyboard-fig-en.svg)
*Pick the right keyboard and Enter key to reduce typing friction*

## Autofill and password managers

`textContentType` (iOS) and `autoComplete` (Android: `email`, `password`, `one-time-code`, `username`) let **password managers and SMS-code suggestions** fill in for the user. A big friction cut, and also **safer** (strong, unique passwords).

## Moving between fields

```js
const passRef = useRef(null)
<TextInput returnKeyType="next" onSubmitEditing={() => passRef.current?.focus()} />
<TextInput ref={passRef} returnKeyType="done" onSubmitEditing={submit} />
```

The user taps "Next" on the keyboard to move on, "Done" to submit: no need to touch the screen in between. Use `blurOnSubmit` sensibly.

## The keyboard covering inputs

The keyboard appears **over** content below it. Solutions:

- **`KeyboardAvoidingView`** (`behavior="padding"` on iOS) pushes the UI up.
- Put the form in a **`ScrollView`** with `keyboardShouldPersistTaps="handled"` so tapping a button while the keyboard is open doesn't "swallow" the first tap.
- The **react-native-keyboard-controller** library for smoother control.

## Sanitising while typing and validation

Filter characters right in `onChangeText` (digits only, length limits) so users **can't enter wrong input**; but still **re-validate on submit** and **on the server**. Show errors **after leaving the field** (touched), as in the React course (forms lesson).

## Accessibility

Every field has a **label** (`accessibilityLabel` or an accompanying `<Text>`); `placeholder` isn't a label. Report errors in text tied to the field so screen readers can read them.

## References

- React Native docs: `TextInput`, `KeyboardAvoidingView`, `Keyboard`.
- Apple HIG: Text fields; Material Design: Text fields.
- Baymard Institute: e-commerce form research (input friction).
