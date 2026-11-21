# Bố cục Flexbox

> **Lưu ý:** bên phải chạy bằng **react-native-web** — cùng component và API với React Native thật nhưng hiển thị trong trình duyệt. Muốn chạy trên điện thoại, dùng **Expo** (hướng dẫn cuối mỗi bài).

Trong React Native, **mọi View đều là flex container**. Khác với web ở hai điểm: hướng mặc định là **cột** (`column`) và không có `display` để chọn.

## Các thuộc tính chính

| Thuộc tính | Tác dụng | Giá trị thường dùng |
|---|---|---|
| `flexDirection` | trục chính | `column` (mặc định), `row` |
| `justifyContent` | căn theo **trục chính** | `flex-start`, `center`, `flex-end`, `space-between`, `space-around` |
| `alignItems` | căn theo **trục phụ** | `stretch` (mặc định), `center`, `flex-start`, `flex-end` |
| `flex` | tỉ lệ chiếm chỗ | `1` = chiếm hết phần trống |
| `gap` | khoảng cách giữa các con | số |

## Ví dụ hay gặp

**Căn giữa mọi thứ**

```jsx
{ flex: 1, justifyContent: "center", alignItems: "center" }
```

**Thanh ngang có icon và chữ**

```jsx
{ flexDirection: "row", alignItems: "center", gap: 8 }
```

**Chia 1 : 2**

```jsx
<View style={{ flexDirection: "row" }}>
  <View style={{ flex: 1 }} />   {/* 1 phần */}
  <View style={{ flex: 2 }} />   {/* 2 phần */}
</View>
```

Hãy nghĩ theo hai trục: **chính** (theo `flexDirection`) và **phụ** (vuông góc). Khi `flexDirection: "row"`, trục chính nằm ngang nên `justifyContent` căn ngang, `alignItems` căn dọc.
