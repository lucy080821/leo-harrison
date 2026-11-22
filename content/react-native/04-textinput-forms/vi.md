# TextInput và biểu mẫu

> **Lưu ý:** bên phải chạy bằng **react-native-web** — cùng component và API với React Native thật nhưng hiển thị trong trình duyệt. Muốn chạy trên điện thoại, dùng **Expo** (hướng dẫn cuối mỗi bài).

`TextInput` là ô nhập văn bản của React Native. Giống input điều khiển được ở khóa React, nhưng sự kiện là **`onChangeText`** — nó đưa thẳng **chuỗi** (không phải đối tượng event).

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

## Thuộc tính hữu ích

| Thuộc tính | Tác dụng |
|---|---|
| `placeholder` | gợi ý khi trống |
| `secureTextEntry` | ẩn ký tự (mật khẩu) |
| `keyboardType` | bàn phím: `numeric`, `email-address`, `phone-pad` |
| `multiline` | nhiều dòng |
| `maxLength` | giới hạn độ dài |
| `onSubmitEditing` | khi bấm Enter/Xong trên bàn phím |

![TextInput điều khiển bằng state](/lessons/react-native/04-textinput-forms-fig-vi.svg)
*TextInput điều khiển bằng state*

## Biểu mẫu = nhiều state + một nút

```jsx
const [name, setName] = useState("");
const [age, setAge] = useState("");

const valid = name.trim().length > 0 && Number(age) > 0;

<Pressable disabled={!valid} onPress={submit}>
  <Text>Gửi</Text>
</Pressable>
```

Không có thẻ `<form>` trong React Native: bạn tự gom state và kiểm tra rồi gọi hàm gửi khi người dùng chạm nút.
