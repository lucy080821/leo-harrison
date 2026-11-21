# Dự án: Landing page responsive

Bạn sẽ tạo kiểu cho một **landing page** (trang giới thiệu sản phẩm) hoàn chỉnh. Bài này tập hợp gần như mọi thứ của khoá CSS.

Xem kết quả mẫu ở khung bên phải (`style.css` đã có bản hoàn chỉnh trong tab Tự do thử code), rồi tự viết lại ở hai bài tập.

## Cấu trúc trang

```text
┌───────────────────────────────┐
│ .nav   logo            menu   │  flex, space-between
├───────────────────────────────┤
│ .hero  tiêu đề, mô tả, .cta   │  nền gradient, chữ giữa
├───────────────────────────────┤
│ .features  [card][card][card] │  grid 3 cột, 1 cột trên điện thoại
└───────────────────────────────┘
```

## Kế hoạch từng bước

1. **Nền tảng:** `box-sizing: border-box`, bỏ margin mặc định của `body`, phông chữ hệ thống, khai báo **biến màu** `--brand`, `--accent` ở `:root`.
2. **Thanh điều hướng:** `display: flex; justify-content: space-between; align-items: center;`.
3. **Hero:** nền `linear-gradient`, `text-align: center`, cỡ chữ tiêu đề dùng `clamp()`.
4. **Nút CTA:** `display: inline-block`, `padding`, `border-radius: 999px` (viên thuốc), `transition` cho `transform`, và `:hover`.
5. **Lưới tính năng:** `display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;`, thẻ có `border-radius` và `box-shadow`.
6. **Responsive:** `@media (max-width: 600px)` đổi lưới về 1 cột và menu xếp dọc.

## Mẹo

- **Dựng từ trên xuống**, từng khối một, xem kết quả sau mỗi khối.
- Gặp bố cục lạ, **kéo hẹp cửa sổ** để xem chỗ nào vỡ và thêm điểm ngắt đúng chỗ đó.
- Đặt tên class theo **vai trò** (`.card`, `.cta`) thay vì theo hình thức (`.blue-box`).
- Mở DevTools (F12) để thử giá trị trước khi ghi vào file.

## Tự kiểm tra

- [ ] Có thẻ `meta viewport` trong HTML?
- [ ] Không có thanh cuộn ngang trên điện thoại?
- [ ] Chữ đủ tương phản trên nền gradient?
- [ ] Mọi nút và liên kết có trạng thái `:hover` và `:focus-visible`?
