# Sự kiện nâng cao và biểu mẫu

## Đối tượng sự kiện

Hàm xử lý nhận một **đối tượng sự kiện** chứa thông tin về điều vừa xảy ra:

```javascript
btn.addEventListener("click", (event) => {
  console.log(event.type);     // "click"
  console.log(event.target);   // phần tử được bấm
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") console.log("Nhấn Enter");
});
```

## Xử lý form

Khi form được gửi, trình duyệt mặc định **tải lại trang**. Với ứng dụng JavaScript, bạn muốn tự xử lý nên phải chặn hành vi mặc định:

```javascript
form.addEventListener("submit", (event) => {
  event.preventDefault();               // chặn tải lại
  const name = nameInput.value.trim();  // lấy dữ liệu
  if (!name) return;                    // kiểm tra
  out.textContent = `Xin chào, ${name}!`;
});
```

`preventDefault()` cũng dùng cho liên kết (`<a>`) và các hành vi mặc định khác.

Đọc nhiều trường cùng lúc:

```javascript
const data = Object.fromEntries(new FormData(form));   // { name: "An", email: "..." }
```

## `input` hay `change`?

| | Khi nào chạy |
|---|---|
| `input` | **Mỗi lần** giá trị đổi (từng ký tự gõ) → tìm kiếm trực tiếp, xem trước |
| `change` | Khi giá trị **chốt** (rời ô, chọn xong) |

Giá trị của ô nhập luôn là **chuỗi**: `Number(input.value)` để lấy số. Checkbox dùng `input.checked`.

## Nổi bọt (bubbling) và ủy quyền sự kiện

Sự kiện **nổi** từ phần tử được bấm lên các phần tử cha. Nhờ vậy bạn gắn **một** handler lên cha thay vì từng con (**event delegation**), và nó cũng chạy cho phần tử tạo thêm sau này:

```javascript
list.addEventListener("click", (event) => {
  const li = event.target.closest("li");
  if (!li) return;
  li.classList.toggle("done");
});
```

- `event.target`: phần tử thực sự bị bấm.
- `closest("li")`: tìm tổ tiên (hoặc chính nó) khớp selector.

## Gỡ bỏ handler

```javascript
function onClick() { /* ... */ }
btn.addEventListener("click", onClick);
btn.removeEventListener("click", onClick);   // cần đúng hàm đã đăng ký
btn.addEventListener("click", onClick, { once: true });  // chỉ chạy một lần
```

## Truy cập (a11y)

Dùng `<button>` và `<a>` cho thao tác bấm (có sẵn bàn phím), đừng gắn `click` lên `<div>`. Form nên có `<label>` và xử lý phím Enter bằng `submit` thay vì `keydown`.
