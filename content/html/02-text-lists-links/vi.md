# Văn bản, danh sách, liên kết và hình ảnh

## Nhấn mạnh văn bản

| Thẻ | Ý nghĩa | Hiển thị thường thấy |
|---|---|---|
| `<strong>` | Rất quan trọng | **đậm** |
| `<em>` | Nhấn mạnh | *nghiêng* |
| `<code>` | Đoạn mã | `chữ đơn cách` |
| `<br />` | Xuống dòng | — |
| `<hr />` | Đường kẻ ngang ngăn cách | — |

Hãy chọn thẻ theo **ý nghĩa**, không phải theo hình thức. Hình thức sẽ do CSS lo ở bài sau.

![Cấu tạo một liên kết: thẻ, thuộc tính, nội dung](/lessons/html/02-text-lists-links-fig-vi.svg)
*Cấu tạo một liên kết: thẻ, thuộc tính, nội dung*

## Danh sách

```html
<ul>            <!-- danh sách không thứ tự (dấu chấm) -->
  <li>Phở</li>
  <li>Bún chả</li>
</ul>

<ol>            <!-- danh sách có thứ tự (1, 2, 3...) -->
  <li>Rửa tay</li>
  <li>Nấu ăn</li>
</ol>
```

`<li>` (list item) chỉ nên đặt **bên trong** `<ul>` hoặc `<ol>`.

## Liên kết

```html
<a href="https://example.com" target="_blank">Đến trang khác</a>
```

- `href`: địa chỉ đích (URL). Có thể là đường dẫn tương đối như `about.html`.
- `target="_blank"`: mở trong tab mới.
- Chữ nằm **giữa** thẻ mở và thẻ đóng chính là phần người dùng bấm vào. Tránh dùng chữ chung chung như "bấm vào đây".

## Hình ảnh

```html
<img src="anh.jpg" alt="Một chú mèo đang ngủ" width="300" />
```

- `src`: đường dẫn đến ảnh.
- `alt`: mô tả thay thế. **Bắt buộc** nên có: trình đọc màn hình đọc nó cho người khiếm thị, và nó hiện ra khi ảnh lỗi.
- `<img>` là thẻ rỗng, không có thẻ đóng.

> Mẹo: trong khung sandbox, ảnh từ Internet có thể không tải được tuỳ mạng của bạn, nhưng thẻ vẫn tồn tại và vẫn được kiểm tra đúng.
