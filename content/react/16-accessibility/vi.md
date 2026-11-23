# Trợ năng (a11y): HTML ngữ nghĩa, nhãn, bàn phím và focus

Khoảng **1 trong 6 người** trên thế giới sống với một dạng khuyết tật (WHO, 2022). Trợ năng cũng giúp người dùng tạm thời (tay gãy), người dùng chỉ dùng bàn phím, và **SEO**. Ở nhiều nơi nó còn là **yêu cầu pháp lý** (ADA, EAA, Thông tư tiếp cận).

## Nguyên tắc: dùng đúng thẻ HTML

Thẻ ngữ nghĩa mang sẵn **vai trò, bàn phím, focus**:

| Cần | Dùng | Đừng dùng |
|---|---|---|
| hành động | `<button>` | `<div onClick>` |
| điều hướng | `<a href>` | `<span onClick>` |
| tiêu đề | `<h1>…<h6>` theo thứ bậc | `<div class="title">` |
| bố cục | `<header> <nav> <main> <footer>` | toàn `<div>` |
| danh sách | `<ul><li>` | các `<div>` |

`<div onClick>` không nhận Tab, không kích hoạt bằng Enter/Space, trình đọc màn hình không biết nó là nút. Sửa bằng `role`, `tabIndex`, `onKeyDown` rất công phu: **dùng `<button>` là xong**.

![Thẻ ngữ nghĩa mang sẵn vai trò, bàn phím và focus](/lessons/react/16-accessibility-fig-vi.svg)
*Thẻ ngữ nghĩa mang sẵn vai trò, bàn phím và focus*

## Nhãn cho form

Mỗi ô nhập cần **nhãn truy cập được**: `<label htmlFor="id">` gắn với `<input id>`. Placeholder **không** thay thế nhãn (biến mất khi gõ, tương phản thấp). Báo lỗi bằng văn bản gắn với ô (`aria-describedby`, `aria-invalid`).

## ARIA: dùng khi HTML không đủ

Quy tắc đầu tiên của ARIA: **đừng dùng ARIA nếu có thẻ HTML tương đương**. Khi cần (hộp thoại, tab, menu tuỳ biến): `role`, `aria-label`, `aria-expanded`, `aria-live` (thông báo thay đổi động như "Đã thêm vào giỏ").

## Bàn phím và focus

- Mọi chức năng **dùng được bằng bàn phím**: Tab, Shift+Tab, Enter/Space, Escape, phím mũi tên.
- **Vòng focus phải nhìn thấy** (đừng `outline: none` mà không thay thế).
- **Hộp thoại**: khi mở, chuyển focus vào trong; khi đóng, **trả focus** về nút đã mở; Escape đóng; **nhốt focus** bên trong khi modal (hoặc dùng thẻ `<dialog>`).
- Sau khi đổi tuyến trong SPA, đưa focus tới tiêu đề trang.

## Thị giác

- **Tương phản** văn bản/nền ≥ **4,5:1** (WCAG AA).
- Đừng dùng **chỉ màu** để truyền thông tin (lỗi đỏ nhưng cần cả biểu tượng/văn bản).
- Ảnh có `alt` mô tả (ảnh trang trí: `alt=""`).
- Tôn trọng `prefers-reduced-motion`.

## Kiểm tra

1. Thử dùng trang chỉ bằng **bàn phím**.
2. Chạy **Lighthouse/axe DevTools**, `eslint-plugin-jsx-a11y`.
3. Thử với trình đọc màn hình (NVDA, VoiceOver).
Công cụ tự động chỉ bắt được ~30–40% lỗi; cần kiểm thử thủ công.

## Nguồn tham khảo

- W3C: WCAG 2.2; WAI-ARIA Authoring Practices Guide.
- MDN: Accessibility; react.dev: Accessibility.
- WebAIM: Million (khảo sát hàng năm về lỗi trợ năng).
