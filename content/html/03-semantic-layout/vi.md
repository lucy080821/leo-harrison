# Bố cục ngữ nghĩa (Semantic HTML)

Bạn có thể dựng cả trang chỉ bằng `<div>`, nhưng trình duyệt, công cụ tìm kiếm và trình đọc màn hình sẽ không hiểu phần nào là gì. **Thẻ ngữ nghĩa** nói rõ **vai trò** của từng vùng.

## Các thẻ bố cục chính

| Thẻ | Vai trò |
|---|---|
| `<header>` | Phần đầu của trang hoặc của một khối (logo, tiêu đề, menu) |
| `<nav>` | Cụm liên kết điều hướng chính |
| `<main>` | Nội dung chính, **chỉ một** trong mỗi trang |
| `<section>` | Một nhóm nội dung cùng chủ đề, thường có tiêu đề |
| `<article>` | Nội dung độc lập, tự đứng được (bài viết, bình luận, thẻ sản phẩm) |
| `<aside>` | Nội dung phụ liên quan (thanh bên, ghi chú) |
| `<footer>` | Phần cuối (bản quyền, liên hệ) |

## Ví dụ cấu trúc một trang

```html
<body>
  <header>
    <h1>Tên website</h1>
    <nav>...</nav>
  </header>

  <main>
    <section>
      <h2>Chủ đề</h2>
      <article>...</article>
      <article>...</article>
    </section>
    <aside>...</aside>
  </main>

  <footer>...</footer>
</body>
```

## Khi nào dùng `<div>`?

`<div>` vẫn có chỗ đứng: khi bạn cần một **hộp chung** để gom nhóm và tạo kiểu bằng CSS mà không mang ý nghĩa gì. Quy tắc: nếu có thẻ ngữ nghĩa phù hợp thì dùng nó, còn không mới dùng `<div>`.

## Vì sao quan trọng?

- **Truy cập (a11y):** người dùng trình đọc màn hình có thể nhảy thẳng đến `<main>` hoặc `<nav>`.
- **SEO:** công cụ tìm kiếm hiểu cấu trúc trang tốt hơn.
- **Dễ bảo trì:** đọc code `<nav>` dễ hiểu hơn `<div class="div3">`.
