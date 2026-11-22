# Biểu mẫu (1): form, input, label

**Biểu mẫu (form)** cho phép người dùng nhập dữ liệu và gửi đi: đăng nhập, tìm kiếm, đăng ký, thanh toán...

## Thẻ `<form>`

```html
<form action="/dang-ky" method="post">
  ...
</form>
```

- `action`: địa chỉ nhận dữ liệu.
- `method`: `get` (dữ liệu hiện trên URL, dùng cho tìm kiếm) hoặc `post` (gửi trong thân yêu cầu, dùng khi đăng nhập hoặc thay đổi dữ liệu).

![Form gửi dữ liệu: label, input, nút gửi, request tới server](/lessons/html/06-forms-basics-fig-vi.svg)
*Form gửi dữ liệu: label, input, nút gửi, request tới server*

## `<input>` và thuộc tính `type`

```html
<input type="text" name="name" />
```

| `type` | Dùng để nhập |
|---|---|
| `text` | Văn bản một dòng |
| `email` | Email (trình duyệt tự kiểm tra định dạng) |
| `password` | Mật khẩu (che ký tự) |
| `number` | Số (có mũi tên tăng giảm) |
| `date` | Ngày |
| `tel`, `url`, `search` | Số điện thoại, đường dẫn, từ khoá |
| `submit` | Nút gửi |

`name` rất quan trọng: nó là **tên trường** khi dữ liệu được gửi đi. Ô nhập không có `name` sẽ không được gửi.

## `<label>`: nhãn cho ô nhập

Có hai cách gắn nhãn với ô nhập:

```html
<!-- Cách 1: for trùng id -->
<label for="email">Email</label>
<input type="email" id="email" name="email" />

<!-- Cách 2: bọc bên ngoài -->
<label>Email <input type="email" name="email" /></label>
```

Nhãn giúp người dùng bấm vào chữ là chọn ô nhập, và giúp trình đọc màn hình đọc đúng tên ô.

## Nút

```html
<button type="submit">Gửi</button>
<button type="reset">Xoá hết</button>
<button type="button">Không làm gì khi bấm</button>
```

Nút trong form mặc định là `submit`. Hãy ghi rõ `type` để tránh gửi form ngoài ý muốn.

## Placeholder

`placeholder="Gợi ý..."` hiện chữ mờ khi ô trống. **Không thay thế** được `<label>`.
