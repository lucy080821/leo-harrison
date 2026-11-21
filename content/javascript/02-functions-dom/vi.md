# Hàm và tương tác với trang (DOM)

## Hàm

**Hàm** là một khối code có tên, có thể gọi lại nhiều lần. Hàm nhận **tham số** (đầu vào) và có thể **trả về** giá trị (đầu ra).

```javascript
function add(a, b) {
  return a + b;
}
console.log(add(2, 3)); // 5
```

Cách viết **arrow function** (ngắn gọn, rất phổ biến):

```javascript
const add = (a, b) => a + b;
```

- `return` kết thúc hàm và trả giá trị về nơi gọi.
- Hàm không có `return` sẽ trả về `undefined`.
- Biến khai báo bên trong hàm chỉ tồn tại trong hàm đó (**phạm vi**, scope).

## DOM là gì?

Khi tải trang, trình duyệt biến HTML thành một **cây đối tượng** gọi là **DOM** (Document Object Model). JavaScript đọc và thay đổi cây này để làm trang web "sống".

```javascript
const title = document.getElementById("title");          // chọn theo id
const first = document.querySelector(".note");            // chọn theo CSS selector
title.textContent = "Tiêu đề mới";                        // đổi chữ
title.style.color = "tomato";                             // đổi style
```

## Sự kiện

Dùng `addEventListener` để chạy code khi người dùng làm gì đó:

```javascript
button.addEventListener("click", () => {
  console.log("Đã bấm!");
});
```

Các sự kiện hay gặp: `click`, `input` (gõ chữ), `submit` (gửi form), `keydown` (nhấn phím).

## Ví dụ hoàn chỉnh: bộ đếm

Xem file `index.html` và `script.js` ở bên phải: mỗi lần bấm nút, biến `count` tăng lên và chữ trong `<p>` được cập nhật. Hãy thử đổi `count++` thành `count += 5`.

> Nút **Console** bên phải hiển thị mọi `console.log` và cả lỗi (chữ đỏ). Khi code không chạy như ý, hãy xem console đầu tiên.
