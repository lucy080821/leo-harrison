# Express: định tuyến

> **Lưu ý:** trong trình duyệt không có Node thật, nên Lexi Learn chạy một bản **mô phỏng** (fs trong bộ nhớ, `http`/`express` thu nhỏ, kiểm thử bằng `app.inject`). Code bạn viết giống hệt khi chạy trên Node thật; phần cuối mỗi bài chỉ ra cách chạy ngoài máy.

**Express** là framework web phổ biến nhất của Node: viết ít code hơn `http` thuần rất nhiều.

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Xin chào"));
app.listen(3000, () => console.log("Chạy ở cổng 3000"));
```

## Route = phương thức + đường dẫn + hàm xử lý

```javascript
app.get("/users", handler);       // lấy
app.post("/users", handler);      // tạo
app.put("/users/:id", handler);   // sửa
app.delete("/users/:id", handler);// xóa
```

## Lấy dữ liệu từ request

| Nguồn | Ví dụ | Truy cập |
|---|---|---|
| Tham số đường dẫn | `/users/5` với route `/users/:id` | `req.params.id` |
| Query string | `/search?q=node&page=2` | `req.query.q`, `req.query.page` |
| Body JSON | POST với JSON | `req.body` (cần `express.json()`) |

Lưu ý: `req.params` và `req.query` luôn là **chuỗi**. Dùng `Number(...)` khi cần số.

## Gửi phản hồi

- `res.send("text")`: văn bản/HTML.
- `res.json(obj)`: JSON (tự đặt header).
- `res.status(404).json({...})`: đặt mã trạng thái.
- `res.redirect("/dich")`: chuyển hướng.
