# Ký tự đặc biệt và thẻ văn bản ngữ nghĩa

## Ký tự đặc biệt (HTML entities)

Một số ký tự có nghĩa riêng trong HTML (`<`, `>`, `&`). Muốn hiển thị chúng như chữ thường, dùng **entity**:

| Gõ | Hiển thị | Ghi chú |
|---|---|---|
| `&lt;` | `<` | less than |
| `&gt;` | `>` | greater than |
| `&amp;` | `&` | ampersand |
| `&quot;` | `"` | dấu nháy kép |
| `&nbsp;` | (khoảng trắng) | khoảng trắng **không ngắt dòng** |
| `&copy;` | © | bản quyền |
| `&euro;` | € | tiền euro |

```html
<p>Để tạo đoạn văn, dùng thẻ &lt;p&gt;.</p>
```

Bạn cũng có thể dùng mã số, ví dụ `&#169;` hoặc `&#x1F600;`. Với tài liệu UTF-8 bạn có thể gõ thẳng ký tự như `©` hay `é`.

![Thực thể HTML để hiển thị ký tự đặc biệt](/lessons/html/12-entities-text-semantics-fig-vi.svg)
*Thực thể HTML để hiển thị ký tự đặc biệt*

## Thẻ văn bản có ý nghĩa

| Thẻ | Dùng cho |
|---|---|
| `<blockquote>` | Trích dẫn dài (khối) |
| `<q>` | Trích dẫn ngắn trong dòng |
| `<cite>` | Tên tác phẩm hoặc nguồn |
| `<code>` | Một đoạn mã trong dòng |
| `<pre>` | Giữ nguyên khoảng trắng và xuống dòng (thường bọc `<code>`) |
| `<kbd>` | Phím bấm, ví dụ <kbd>Ctrl</kbd> + <kbd>C</kbd> |
| `<mark>` | Chữ được đánh dấu nổi bật |
| `<abbr title="...">` | Từ viết tắt, rê chuột thấy nghĩa |
| `<time datetime="...">` | Ngày giờ, giúp máy đọc được |
| `<sub>`, `<sup>` | Chỉ số dưới và trên: H<sub>2</sub>O, x<sup>2</sup> |
| `<del>`, `<ins>` | Chữ bị xoá, chữ được thêm |

```html
<pre><code>function hi() {
  return "xin chào";
}</code></pre>
```

Trong `<pre>`, mọi khoảng trắng và dòng mới được giữ nguyên, nên rất hợp để hiển thị code.
