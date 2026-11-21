# DOM cơ bản và sự kiện

## DOM là gì?

Khi tải trang, trình duyệt biến HTML thành một **cây đối tượng** gọi là **DOM** (Document Object Model). Mỗi thẻ là một **nút (node)**. JavaScript đọc và thay đổi cây này, trang hiển thị thay đổi ngay.

```text
document
└── html
    ├── head
    └── body
        ├── h1#title   "Chưa đặt tên"
        └── button#btn
```

Đối tượng `document` là cửa vào của mọi thao tác.

## Chọn phần tử

```javascript
document.getElementById("title");        // theo id (nhanh, trả về 1 phần tử)
document.querySelector(".card");         // theo CSS selector, phần tử ĐẦU TIÊN
document.querySelectorAll("li");         // MỌI phần tử khớp (NodeList, duyệt được bằng for...of)
```

`querySelector` dùng đúng cú pháp CSS: `"#id"`, `".class"`, `"ul > li:first-child"`. Nếu không tìm thấy, trả về `null`: truy cập thuộc tính của `null` sẽ gây lỗi.

## Đọc và thay đổi nội dung

```javascript
el.textContent = "Chữ thường";      // gán chữ (an toàn, không hiểu HTML)
el.innerHTML = "<b>In đậm</b>";     // gán HTML (cẩn thận: nguy cơ XSS nếu chứa dữ liệu người dùng)
el.value;                           // giá trị của <input>
el.getAttribute("href");            // đọc thuộc tính
el.setAttribute("href", "/a");      // đặt thuộc tính
el.style.color = "tomato";          // đổi style trực tiếp
```

> **Bảo mật:** không bao giờ gán dữ liệu người dùng nhập vào `innerHTML`. Hãy dùng `textContent`.

## Sự kiện

Sự kiện là điều xảy ra trên trang: bấm chuột, gõ phím, tải xong... Bạn đăng ký **hàm xử lý (handler)** bằng `addEventListener`:

```javascript
btn.addEventListener("click", () => {
  console.log("Đã bấm!");
});
```

| Sự kiện | Khi nào |
|---|---|
| `click` | Bấm chuột / chạm |
| `input` | Mỗi lần giá trị ô nhập đổi |
| `change` | Giá trị đổi xong (rời ô, chọn mục) |
| `submit` | Gửi form |
| `keydown`, `keyup` | Nhấn / nhả phím |
| `mouseover`, `mouseout` | Rê chuột vào / ra |
| `DOMContentLoaded` | HTML đã tải xong |

Thẻ `<script>` đặt **cuối `<body>`** (hoặc có `defer`) để khi code chạy, các phần tử đã tồn tại.

## Ví dụ: bộ đếm

```javascript
let n = 0;
btn.addEventListener("click", () => {
  n++;
  count.textContent = n;
});
```

Biến `n` nằm ngoài hàm xử lý nên **giữ giá trị** giữa các lần bấm.
