# Máy chủ HTTP đầu tiên

> **Lưu ý:** trong trình duyệt không có Node thật, nên Learn With Leo chạy một bản **mô phỏng** (fs trong bộ nhớ, `http`/`express` thu nhỏ, kiểm thử bằng `app.inject`). Code bạn viết giống hệt khi chạy trên Node thật; phần cuối mỗi bài chỉ ra cách chạy ngoài máy.

Web hoạt động theo mô hình **yêu cầu → phản hồi**: trình duyệt gửi *request*, server gửi *response*.

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Xin chào");
});

server.listen(3000);   // mở cổng 3000
```

## Request (`req`)

| Thuộc tính | Ý nghĩa |
|---|---|
| `req.method` | `GET`, `POST`, `PUT`, `DELETE`… |
| `req.url` | đường dẫn + query, ví dụ `/users?id=3` |
| `req.headers` | các header gửi kèm |

![Request → http.createServer → Response](/lessons/nodejs/05-http-fig-vi.svg)
*Request → http.createServer → Response*

## Response (`res`)

- `res.writeHead(status, headers)`: đặt mã trạng thái và header.
- `res.end(body)`: gửi nội dung và kết thúc.

## Mã trạng thái thường gặp

| Mã | Ý nghĩa |
|---|---|
| 200 | OK |
| 201 | Đã tạo |
| 400 | Yêu cầu sai |
| 404 | Không tìm thấy |
| 500 | Lỗi server |

## Thử trong trình duyệt

Không mở cổng thật được, nên ta gọi thẳng `server.inject(url)` — nó chạy handler của bạn và trả `{ statusCode, headers, body }`. Ngoài máy thật, mở `http://localhost:3000`.

Viết server thuần như thế này rất dài dòng khi API lớn dần — vì vậy bài sau dùng **Express**.
