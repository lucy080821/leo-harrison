# Trang HTML đầu tiên

**HTML** (HyperText Markup Language) là ngôn ngữ *đánh dấu* dùng để mô tả **cấu trúc và nội dung** của một trang web. HTML không phải ngôn ngữ lập trình: nó không tính toán, nó chỉ nói với trình duyệt "đây là tiêu đề", "đây là đoạn văn", "đây là hình ảnh".

> Hãy thử ngay: sửa chữ trong khung code bên phải, kết quả ở dưới cập nhật tức thì.

## Thẻ và phần tử

Một **phần tử (element)** thường gồm thẻ mở, nội dung và thẻ đóng:

```html
<p>Xin chào thế giới</p>
```

- `<p>` là **thẻ mở**, `</p>` là **thẻ đóng** (có dấu `/`).
- Phần ở giữa là **nội dung**.
- Một số thẻ không có nội dung nên không cần thẻ đóng, ví dụ `<br />` (xuống dòng), `<img />` (hình ảnh). Chúng gọi là **thẻ rỗng**.

## Khung của một tài liệu HTML

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <title>Tiêu đề tab trình duyệt</title>
  </head>
  <body>
    <h1>Nội dung hiển thị</h1>
  </body>
</html>
```

| Phần | Vai trò |
|---|---|
| `<!DOCTYPE html>` | Báo cho trình duyệt đây là HTML5 |
| `<html lang="vi">` | Phần tử gốc; `lang` khai báo ngôn ngữ (tốt cho trình đọc màn hình và SEO) |
| `<head>` | Thông tin về trang, **không hiển thị** trực tiếp |
| `<meta charset="UTF-8">` | Bảng mã, giúp hiển thị đúng tiếng Việt có dấu |
| `<title>` | Tiêu đề hiện trên tab trình duyệt |
| `<body>` | Mọi thứ người dùng nhìn thấy |

## Tiêu đề và đoạn văn

- `<h1>` đến `<h6>`: tiêu đề từ quan trọng nhất đến ít quan trọng nhất. Mỗi trang nên có **một** `<h1>`.
- `<p>`: một đoạn văn. Trình duyệt tự gộp nhiều khoảng trắng và xuống dòng thành **một** khoảng trắng.

## Thuộc tính

Thẻ mở có thể có **thuộc tính** dạng `tên="giá trị"` để cung cấp thêm thông tin:

```html
<html lang="vi">
```

## Chú thích

```html
<!-- Trình duyệt bỏ qua dòng này -->
```

Giờ hãy làm bài tập bên dưới để luyện tay.
