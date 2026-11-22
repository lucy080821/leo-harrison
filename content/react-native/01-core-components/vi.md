# React Native là gì: View, Text, StyleSheet

> **Lưu ý:** bên phải chạy bằng **react-native-web** — cùng component và API với React Native thật nhưng hiển thị trong trình duyệt. Muốn chạy trên điện thoại, dùng **Expo** (hướng dẫn cuối mỗi bài).

**React Native** cho bạn viết ứng dụng **iOS và Android thật** bằng React và JavaScript. Giao diện được vẽ bằng các thành phần *native* của hệ điều hành chứ không phải trang web.

Bạn đã biết React (component, props, state, hooks) — tất cả **dùng nguyên**. Chỉ khác ở các thành phần giao diện.

## Không có thẻ HTML

| Web | React Native |
|---|---|
| `<div>` | `<View>` |
| `<p>`, `<span>`, `<h1>` | `<Text>` |
| `<img>` | `<Image>` |
| `<input>` | `<TextInput>` |
| `<button>` | `<Pressable>` / `<Button>` |
| `<ul>` + map | `<FlatList>` |

**Mọi chữ phải nằm trong `<Text>`** — viết chữ trần trong `<View>` sẽ lỗi.

![Component RN được ánh xạ sang thành phần giao diện gốc](/lessons/react-native/01-core-components-fig-vi.svg)
*Component RN được ánh xạ sang thành phần giao diện gốc*

## Style bằng JavaScript

Không có file CSS. Dùng `StyleSheet.create` với tên thuộc tính **camelCase** và giá trị là số (đơn vị dp) hoặc chuỗi:

```jsx
const styles = StyleSheet.create({
  card: { padding: 16, backgroundColor: "white", borderRadius: 8 },
  title: { fontSize: 20, fontWeight: "bold" },
});

<View style={styles.card}><Text style={styles.title}>Hi</Text></View>
```

Có thể ghép nhiều style: `style={[styles.card, active && styles.active]}`.

## Chạy trên điện thoại với Expo

```bash
npx create-expo-app@latest my-app
cd my-app
npx expo start        # quét mã QR bằng ứng dụng Expo Go
```
