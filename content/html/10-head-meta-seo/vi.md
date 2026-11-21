# Thẻ `<head>`, meta và SEO

Phần `<head>` chứa **thông tin về trang** mà người dùng không thấy trực tiếp nhưng trình duyệt, công cụ tìm kiếm và mạng xã hội đều đọc.

## Các thẻ quan trọng

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Tiêu đề trang | Tên website</title>
  <meta name="description" content="Mô tả ngắn 120–160 ký tự." />
  <link rel="icon" href="/favicon.ico" />
  <link rel="stylesheet" href="style.css" />
  <script src="app.js" defer></script>
</head>
```

| Thẻ | Vai trò |
|---|---|
| `meta charset` | Bảng mã ký tự, nên đặt **đầu tiên** |
| `meta viewport` | **Bắt buộc** để trang hiển thị đúng trên điện thoại (responsive) |
| `title` | Tiêu đề tab và là tiêu đề xanh trên kết quả Google |
| `meta description` | Đoạn mô tả hiện dưới tiêu đề trong kết quả tìm kiếm |
| `link rel="icon"` | Biểu tượng nhỏ trên tab |
| `link rel="stylesheet"` | Nạp file CSS |
| `script defer` | Nạp JavaScript mà không chặn hiển thị trang |

## Open Graph: xem trước khi chia sẻ

Khi dán link vào Facebook, Zalo, Slack..., chúng đọc các thẻ này để dựng thẻ xem trước:

```html
<meta property="og:title" content="Học lập trình cùng Lexi" />
<meta property="og:description" content="Lý thuyết và thực hành song song." />
<meta property="og:image" content="https://example.com/cover.png" />
<meta property="og:url" content="https://example.com/" />
```

## SEO cơ bản (tối ưu cho công cụ tìm kiếm)

- Mỗi trang có **`<title>` riêng, rõ nghĩa** và một `<h1>` duy nhất.
- Viết `meta description` hấp dẫn cho từng trang.
- Dùng thẻ ngữ nghĩa và thứ tự tiêu đề hợp lý (`h1` → `h2` → `h3`).
- Ảnh có `alt` mô tả, liên kết có chữ mô tả.
- Khai báo `lang` trên `<html>`.

> Trong khung xem trước bên phải, bạn không thấy các thẻ này hiển thị. Nhưng bài kiểm tra vẫn đọc được chúng, vì chúng nằm trong tài liệu.
