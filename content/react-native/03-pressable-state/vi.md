# Chạm, bấm và state

> **Lưu ý:** bên phải chạy bằng **react-native-web** — cùng component và API với React Native thật nhưng hiển thị trong trình duyệt. Muốn chạy trên điện thoại, dùng **Expo** (hướng dẫn cuối mỗi bài).

Trên điện thoại không có chuột — người dùng **chạm**. React Native có các thành phần bắt thao tác chạm.

## Pressable — thành phần chạm linh hoạt

Bọc bất cứ thứ gì để làm nó bấm được:

```jsx
<Pressable
  onPress={() => alert("Đã chạm")}
  onLongPress={() => console.log("Giữ lâu")}
  style={({ pressed }) => [styles.btn, pressed && { opacity: 0.6 }]}
>
  <Text>Bấm tôi</Text>
</Pressable>
```

- `onPress`: chạm nhanh (thay cho `onClick`).
- `onLongPress`: giữ lâu.
- `style` có thể là **hàm** nhận `{ pressed }` để đổi giao diện khi đang nhấn.

## Button — nút có sẵn

```jsx
<Button title="Gửi" onPress={send} color="#0f766e" />
```

Đơn giản nhưng ít tùy biến giao diện. Muốn đẹp theo ý, dùng `Pressable`.

## State vẫn như React

`useState`, `useEffect`, `useReducer`, Context… **dùng y hệt** như ở khóa React: chỉ thay `div` bằng `View`, `onClick` bằng `onPress`.

```jsx
const [liked, setLiked] = useState(false);
<Pressable onPress={() => setLiked(!liked)}>
  <Text>{liked ? "♥" : "♡"}</Text>
</Pressable>
```
