# Router, kiểm tra dữ liệu và triển khai

> **Lưu ý:** trong trình duyệt không có Node thật, nên Lexi Learn chạy một bản **mô phỏng** (fs trong bộ nhớ, `http`/`express` thu nhỏ, kiểm thử bằng `app.inject`). Code bạn viết giống hệt khi chạy trên Node thật; phần cuối mỗi bài chỉ ra cách chạy ngoài máy.

## express.Router — chia nhỏ ứng dụng

Khi API lớn, đừng nhét hết vào một file. Mỗi nhóm tài nguyên là một **Router**:

```javascript
// routes/users.js
const router = require("express").Router();
router.get("/", listUsers);
router.post("/", createUser);
module.exports = router;

// app.js
app.use("/api/users", require("./routes/users"));
```

Cấu trúc dự án gợi ý:

```
my-api/
├─ package.json
├─ server.js        # khởi động, app.listen
├─ app.js           # tạo app, gắn middleware + router
├─ routes/          # users.js, todos.js …
└─ .env             # PORT, DATABASE_URL (không commit!)
```

Tách `app.js` (không `listen`) giúp kiểm thử dễ, giống cách `app.inject` ở đây.

## Kiểm tra dữ liệu đầu vào

**Không bao giờ tin dữ liệu từ client.** Kiểm tra kiểu, độ dài, định dạng trước khi dùng; sai thì trả `400`.

```javascript
if (typeof name !== "string" || name.length < 2) {
  return res.status(400).json({ error: "tên không hợp lệ" });
}
```

Dự án thật thường dùng thư viện như **zod** hoặc **joi** để khai báo "hình dạng" dữ liệu.

## Triển khai lên VPS (Hostinger)

1. `npm install --omit=dev` trên server.
2. Đọc cấu hình từ môi trường: `const port = process.env.PORT || 3000;`
3. Chạy bền bỉ bằng **pm2**: `pm2 start server.js --name my-api`.
4. Đặt **Nginx** phía trước làm reverse proxy tới cổng của app và gắn HTTPS (Let's Encrypt).
