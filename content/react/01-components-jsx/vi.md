# Component và JSX

**React** là thư viện xây giao diện từ các mảnh nhỏ gọi là **component**. Một component chỉ là **một hàm** trả về giao diện.

## JSX là gì?

JSX trông như HTML nhưng nằm ngay trong JavaScript. Trình biên dịch (Babel) đổi nó thành các lệnh gọi hàm.

```jsx
const el = <h1 className="title">Chào</h1>;
```

Khác HTML một chút:

| HTML | JSX |
|---|---|
| `class` | `className` |
| `for` | `htmlFor` |
| `onclick` | `onClick` |
| `<br>` | `<br />` (thẻ phải đóng) |

![Component lồng nhau tạo thành cây giao diện](/lessons/react/01-components-jsx-fig-vi.svg)
*Component lồng nhau tạo thành cây giao diện*

## Biểu thức trong `{}`

Mọi biểu thức JavaScript đặt trong `{}`: biến, phép tính, gọi hàm.

```jsx
<p>{name.toUpperCase()}</p>
<p>{price * 2}</p>
```

## Quy tắc

1. Tên component **viết hoa chữ đầu** (`App`, `Card`).
2. Một component chỉ trả về **một phần tử gốc** (bọc bằng `<div>` hoặc `<>...</>`).
3. Dùng component như thẻ: `<Card />`.

> Bên phải là kết quả chạy thật. Hãy sửa `name` và xem trang đổi ngay.
