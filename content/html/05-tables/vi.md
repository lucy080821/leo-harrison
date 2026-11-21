# Bảng (table)

Bảng dùng để hiển thị **dữ liệu dạng hàng và cột**. Đừng dùng bảng để dàn bố cục trang, việc đó là của CSS.

## Cấu trúc cơ bản

```html
<table>
  <caption>Điểm số</caption>
  <thead>
    <tr><th>Tên</th><th>Toán</th></tr>
  </thead>
  <tbody>
    <tr><td>An</td><td>9</td></tr>
    <tr><td>Bình</td><td>7</td></tr>
  </tbody>
  <tfoot>
    <tr><td>Trung bình</td><td>8</td></tr>
  </tfoot>
</table>
```

| Thẻ | Ý nghĩa |
|---|---|
| `<table>` | Bao toàn bộ bảng |
| `<caption>` | Tiêu đề của bảng |
| `<thead>`, `<tbody>`, `<tfoot>` | Nhóm hàng đầu, thân và cuối |
| `<tr>` | Một **hàng** (table row) |
| `<th>` | Ô **tiêu đề** (đậm và canh giữa mặc định) |
| `<td>` | Ô **dữ liệu** |

Tuỳ chọn tạm thời `border="1"` ở ví dụ chỉ để thấy đường kẻ. Khi làm thật bạn sẽ kẻ viền bằng CSS.

## Gộp ô

```html
<td colspan="2">Gộp 2 cột</td>
<td rowspan="3">Gộp 3 hàng</td>
```

- `colspan`: ô trải ngang qua nhiều **cột**.
- `rowspan`: ô trải dọc qua nhiều **hàng**.
- Số ô trong mỗi hàng (tính cả phần gộp) phải khớp nhau, nếu không bảng sẽ lệch.

## Truy cập

Dùng `<th>` cho mọi ô tiêu đề, và `scope="col"` hoặc `scope="row"` khi cần để trình đọc màn hình biết ô tiêu đề thuộc cột hay hàng.
