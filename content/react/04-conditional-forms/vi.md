# Hiển thị có điều kiện và form

## Hiển thị có điều kiện

JSX không có `if`, nhưng dùng được biểu thức:

```jsx
{isOpen && <Menu />}              // hiện khi đúng
{user ? <Hi /> : <Login />}       // chọn một trong hai
```

Hoặc đặt `if` **trước** `return`:

```jsx
if (loading) return <p>Đang tải...</p>;
return <List />;
```

![Controlled input: giá trị lấy từ state](/lessons/react/04-conditional-forms-fig-vi.svg)
*Controlled input: giá trị lấy từ state*

## Input được điều khiển

Cho React giữ giá trị của ô nhập bằng state:

```jsx
const [text, setText] = useState("");
<input value={text} onChange={(e) => setText(e.target.value)} />
```

- `value` lấy từ state → giao diện luôn khớp dữ liệu.
- `onChange` cập nhật state mỗi lần gõ.

## Gửi form

```jsx
<form onSubmit={(e) => { e.preventDefault(); save(text); }}>
```

`preventDefault()` ngăn trình duyệt tải lại trang.
