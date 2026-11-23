# Chủ đề và chế độ tối: token màu, useColorScheme và Context

> **Lưu ý:** bên phải chạy bằng **react-native-web** — cùng component và API với React Native thật nhưng hiển thị trong trình duyệt. Muốn chạy trên điện thoại, dùng **Expo** (hướng dẫn cuối mỗi bài).

Hơn nửa số người dùng bật **chế độ tối** ở thiết bị của họ; ứng dụng chỉ có giao diện sáng sẽ **chói mắt ban đêm** và trông lạc điệu. **Chủ đề (theme)** có hệ thống cũng giúp thương hiệu nhất quán và đổi màu trong **một chỗ**.

## Sai lầm: màu cứng rải khắp nơi

`color: "#0f172a"` ở 200 chỗ ⇒ thêm chế độ tối là sửa 200 chỗ, dễ **sót** (chữ tối trên nền tối!).

![Token màu theo vai trò: đổi chủ đề chỉ đổi bảng](/lessons/react-native/15-theming-dark-mode-fig-vi.svg)
*Token màu theo vai trò: đổi chủ đề chỉ đổi bảng*

## Token màu theo VAI TRÒ

Đặt tên theo **mục đích**, không theo giá trị:

```js
const themes = {
  light: { bg: "#ffffff", surface: "#f1f5f9", text: "#0f172a", muted: "#64748b", accent: "#0ea5e9", danger: "#dc2626" },
  dark:  { bg: "#0f172a", surface: "#1e293b", text: "#f1f5f9", muted: "#94a3b8", accent: "#38bdf8", danger: "#f87171" },
}
```

Component chỉ nói `t.bg`, `t.text`, `t.accent`; **đổi chủ đề = đổi bảng**.

## Phát chủ đề qua Context

```js
const ThemeCtx = createContext(themes.light)
const useTheme = () => useContext(ThemeCtx)

<ThemeCtx.Provider value={themes[scheme]}><App /></ThemeCtx.Provider>
```

Mọi component gọi `useTheme()` **tự cập nhật** khi chủ đề đổi (xem bài Context ở khoá React). Có thể dùng thư viện UI sẵn (Tamagui, NativeWind, React Native Paper) có hệ chủ đề.

## Theo hệ điều hành và ghi đè của người dùng

```js
const system = useColorScheme()        // 'light' | 'dark' | null
const scheme = override ?? system ?? 'light'
```

Mặc định **theo hệ thống**; cho phép người dùng **ghi đè** (Sáng/Tối/Theo hệ thống) và **lưu** lựa chọn (bài lưu trữ cục bộ). Đặt `userInterfaceStyle: "automatic"` trong cấu hình Expo để hệ thống áp dụng.

## Thiết kế màu tối đúng cách

- **Không đảo ngược mù quáng**: nền tối **không phải đen tuyệt đối** (`#0f172a`, `#121212`), giảm chói và đỡ "rung" viền.
- Giảm **độ bão hoà** của màu nhấn (màu rực trên nền tối gây mỏi mắt).
- **Độ nổi** thể hiện bằng nền **sáng hơn** (surface), không bằng bóng đổ.
- Kiểm tra **tương phản ≥ 4,5:1** ở **cả hai** chủ đề.
- Ảnh/logo cần biến thể tối hoặc nền trong suốt.
- Cả **thanh trạng thái** (`StatusBar` style) phải đổi theo.

## Ngoài màu sắc

Chủ đề cũng nên có **khoảng cách (spacing)**, **bán kính góc**, **cỡ chữ**: bảng thiết kế (design tokens) dùng chung giữa **thiết kế (Figma)** và **mã**.

## Nguồn tham khảo

- React Native docs: `useColorScheme`, `Appearance`; Expo docs: "Color themes".
- Material Design 3: Color system, Dark theme; Apple HIG: Dark Mode.
- WCAG 2.2: 1.4.3 Contrast (Minimum).
