# Nhập liệu và bàn phím: loại bàn phím, ô mật khẩu và chuyển ô

> **Lưu ý:** bên phải chạy bằng **react-native-web** — cùng component và API với React Native thật nhưng hiển thị trong trình duyệt. Muốn chạy trên điện thoại, dùng **Expo** (hướng dẫn cuối mỗi bài).

Gõ trên điện thoại **chậm và dễ sai** hơn bàn phím máy tính. Cấu hình ô nhập đúng là một trong những cách rẻ nhất để **cải thiện tỷ lệ hoàn thành form**.

## Chọn bàn phím đúng

| Prop | Tác dụng |
|---|---|
| `keyboardType` | `email-address`, `numeric`, `phone-pad`, `decimal-pad`, `url` |
| `autoCapitalize="none"` | không viết hoa đầu (email, tên đăng nhập) |
| `autoCorrect={false}` | tắt sửa tự động (mã, tên riêng) |
| `secureTextEntry` | che ký tự (mật khẩu) |
| `returnKeyType` | nhãn phím Enter: `next`, `done`, `search`, `send` |
| `maxLength` | giới hạn độ dài |
| `multiline` | nhiều dòng |

Bàn phím số cho số điện thoại và mã OTP; bàn phím email có sẵn `@` và `.`.

![Chọn bàn phím và nút Enter đúng để giảm ma sát khi gõ](/lessons/react-native/11-input-keyboard-fig-vi.svg)
*Chọn bàn phím và nút Enter đúng để giảm ma sát khi gõ*

## Tự điền (autofill) và quản lý mật khẩu

`textContentType` (iOS) và `autoComplete` (Android: `email`, `password`, `one-time-code`, `username`) cho phép **trình quản lý mật khẩu và gợi ý mã SMS** điền hộ. Giảm ma sát lớn, và cũng **an toàn hơn** (mật khẩu mạnh, duy nhất).

## Chuyển giữa các ô

```js
const passRef = useRef(null)
<TextInput returnKeyType="next" onSubmitEditing={() => passRef.current?.focus()} />
<TextInput ref={passRef} returnKeyType="done" onSubmitEditing={submit} />
```

Người dùng bấm "Next" trên bàn phím để sang ô kế, "Done" để gửi: không phải chạm màn hình giữa chừng. Dùng `blurOnSubmit` hợp lý.

## Bàn phím che mất ô nhập

Bàn phím hiện ra **đè lên** nội dung phía dưới. Giải pháp:

- **`KeyboardAvoidingView`** (`behavior="padding"` trên iOS) đẩy giao diện lên.
- Đặt form trong **`ScrollView`** với `keyboardShouldPersistTaps="handled"` để bấm nút khi bàn phím đang mở không bị "nuốt" lần chạm đầu.
- Thư viện **react-native-keyboard-controller** cho điều khiển mượt hơn.

## Làm sạch khi gõ và kiểm tra hợp lệ

Lọc ký tự ngay trong `onChangeText` (chỉ số, giới hạn độ dài) để người dùng **không thể nhập sai**; nhưng vẫn **kiểm tra lại khi gửi** và **ở máy chủ**. Hiện lỗi **sau khi rời ô** (touched), như khoá React (bài form).

## Trợ năng

Mỗi ô có **nhãn** (`accessibilityLabel` hoặc `<Text>` kèm); `placeholder` không thay thế nhãn. Báo lỗi bằng văn bản gắn với ô để trình đọc màn hình đọc được.

## Nguồn tham khảo

- React Native docs: `TextInput`, `KeyboardAvoidingView`, `Keyboard`.
- Apple HIG: Text fields; Material Design: Text fields.
- Baymard Institute: nghiên cứu về form thương mại điện tử (độ ma sát khi nhập).
