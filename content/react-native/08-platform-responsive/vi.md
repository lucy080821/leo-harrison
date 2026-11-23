# Nền tảng và giao diện đáp ứng: Platform, kích thước màn hình

> **Lưu ý:** bên phải chạy bằng **react-native-web** — cùng component và API với React Native thật nhưng hiển thị trong trình duyệt. Muốn chạy trên điện thoại, dùng **Expo** (hướng dẫn cuối mỗi bài).

Một codebase chạy trên **iPhone, điện thoại Android, máy tính bảng** (và web) với kích thước, mật độ điểm ảnh, vùng an toàn khác nhau. Mã tốt **thích ứng**, không giả định một màn hình.

## Đơn vị: không phải pixel

React Native dùng **đơn vị độc lập mật độ** (dp/pt): `width: 100` trông cùng kích thước vật lý trên mọi máy; hệ thống tự nhân hệ số mật độ. Dùng **`PixelRatio`** chỉ khi cần pixel thật (ví dụ đường kẻ mảnh `StyleSheet.hairlineWidth`).

![Một codebase, nhiều kích thước: số cột theo chiều rộng](/lessons/react-native/08-platform-responsive-fig-vi.svg)
*Một codebase, nhiều kích thước: số cột theo chiều rộng*

## Khác biệt giữa nền tảng

```js
Platform.OS                         // 'ios' | 'android' | 'web'
Platform.select({ ios: 17, android: 16, default: 16 })
```

Dùng cho khác biệt **nhỏ** (phông, bóng đổ: iOS dùng `shadow*`, Android dùng `elevation`). Khác biệt lớn: tách tệp `Component.ios.js` / `Component.android.js` (bộ đóng gói tự chọn).

## Giao diện đáp ứng

`useWindowDimensions()` trả `{ width, height }` và **tự cập nhật** khi xoay màn hình/chia đôi cửa sổ (khác `Dimensions.get` chỉ đọc một lần).

```js
const { width } = useWindowDimensions()
const columns = width < 500 ? 1 : width < 900 ? 2 : 3
```

- Đặt **điểm ngắt** làm hằng số tên rõ ràng; tách thành **hàm thuần** (dễ kiểm thử).
- Ưu tiên **Flexbox** và tỷ lệ (`flex`, `%`, `aspectRatio`) hơn kích thước cố định.
- Với lưới nhiều cột trong `FlatList`, đặt `numColumns` và **đổi `key`** khi số cột đổi.

## Vùng an toàn (safe area)

Tai thỏ, thanh trạng thái, thanh điều hướng cử chỉ che mất nội dung. Dùng **`react-native-safe-area-context`** (`SafeAreaProvider` + `useSafeAreaInsets()` hoặc `SafeAreaView`) để **đệm** nội dung khỏi các vùng đó.

## Hướng màn hình và cỡ chữ

- Hỗ trợ **xoay ngang** hay khoá dọc (cấu hình app); kiểm thử cả hai.
- Người dùng có thể phóng to chữ hệ thống (**Dynamic Type/Font Scale**): bố cục **không cố định chiều cao** quanh chữ; kiểm thử với cỡ chữ lớn nhất (bài về trợ năng).

## Chế độ tối

`useColorScheme()` trả `'light' | 'dark'`: xây **chủ đề (theme)** thay vì rải màu cứng (bài về chủ đề).

## Danh sách thiết bị cần thử

Máy nhỏ (iPhone SE), máy lớn, Android thấp cấp, máy tính bảng, và **chế độ chia đôi màn hình**. Dùng trình mô phỏng và **ít nhất một thiết bị thật** mỗi hệ điều hành.

## Nguồn tham khảo

- React Native docs: `Platform`, `useWindowDimensions`, `PixelRatio`, "Platform Specific Code".
- Apple Human Interface Guidelines: Layout; Material Design 3: Adaptive layouts.
