# Chạm và trợ năng: kích thước vùng chạm, nhãn và vai trò

> **Lưu ý:** bên phải chạy bằng **react-native-web** — cùng component và API với React Native thật nhưng hiển thị trong trình duyệt. Muốn chạy trên điện thoại, dùng **Expo** (hướng dẫn cuối mỗi bài).

Điện thoại được dùng **một tay, đang đi, dưới nắng, bằng ngón tay to**, và bởi người **khiếm thị, khiếm thính, vận động hạn chế**. Trợ năng không phải "tính năng thêm": nó là **chất lượng cơ bản**, và ở nhiều thị trường còn là **yêu cầu pháp lý**.

## Vùng chạm đủ lớn

| Hướng dẫn | Tối thiểu |
|---|---|
| Apple HIG | **44 × 44 pt** |
| Material Design | **48 × 48 dp** |
| WCAG 2.2 (mục tiêu) | 24 × 24 CSS px (tối thiểu AA), 44 cho AAA |

Biểu tượng nhỏ vẫn cần vùng chạm lớn: dùng **`minWidth/minHeight`** hoặc **`hitSlop`** (mở rộng vùng nhận chạm **không đổi bố cục**). Giữ **khoảng cách** giữa các mục chạm để tránh bấm nhầm.

![Vùng chạm tối thiểu 44 pt; hitSlop mở rộng mà không đổi bố cục](/lessons/react-native/14-touch-accessibility-fig-vi.svg)
*Vùng chạm tối thiểu 44 pt; hitSlop mở rộng mà không đổi bố cục*

## Cho trình đọc màn hình (VoiceOver, TalkBack)

| Prop | Vai trò |
|---|---|
| `accessible` | gom một nhóm thành **một** mục đọc |
| `accessibilityLabel` | điều **đọc lên** thay nội dung (nút "✕" → "Xoá") |
| `accessibilityRole` | `button`, `link`, `header`, `image`, `switch`, `tab`… |
| `accessibilityState` | `{ selected, disabled, checked, expanded }` |
| `accessibilityHint` | gợi ý kết quả ("Mở trang chi tiết") |

Quy tắc: **mọi điều tương tác** có **vai trò và nhãn** có nghĩa; ảnh có nghĩa thì mô tả, ảnh trang trí thì ẩn (`accessible={false}`). Nút chỉ có biểu tượng mà thiếu nhãn là lỗi trợ năng **phổ biến nhất**.

## Phản hồi khi chạm

Dùng `Pressable` với `style={({ pressed }) => ...}` để hiện **trạng thái nhấn** ngay; thêm **rung nhẹ (haptics)** cho thao tác quan trọng (`expo-haptics`). Phản hồi trễ khiến người dùng bấm lặp.

## Chữ và màu

- **Cỡ chữ động**: không cố định chiều cao quanh chữ; kiểm thử với cỡ chữ hệ thống lớn nhất (`allowFontScaling`, mặc định bật).
- **Tương phản** chữ/nền ≥ **4,5:1** (WCAG AA); đừng chỉ dùng màu để truyền thông tin.
- Hỗ trợ **chế độ tối** và **giảm chuyển động** (`AccessibilityInfo`).

## Thông báo thay đổi

`AccessibilityInfo.announceForAccessibility("Đã thêm vào giỏ")` thông báo cho trình đọc màn hình về thay đổi không có gì để "chạm".

## Kiểm tra

1. Bật **VoiceOver/TalkBack** và dùng thử luồng chính **không nhìn màn hình**.
2. **Accessibility Inspector** (Xcode), **Accessibility Scanner** (Android).
3. Thử với **chữ lớn nhất** và **chế độ tối**.
4. Có tay thật chạm vào: **một tay, ngón cái**.

## Nguồn tham khảo

- React Native docs: "Accessibility".
- Apple HIG: Accessibility; Material Design: Accessibility; WCAG 2.2.
