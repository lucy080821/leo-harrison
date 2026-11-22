# Middleware và xử lý lỗi

> **Lưu ý:** trong trình duyệt không có Node thật, nên Lexi Learn chạy một bản **mô phỏng** (fs trong bộ nhớ, `http`/`express` thu nhỏ, kiểm thử bằng `app.inject`). Code bạn viết giống hệt khi chạy trên Node thật; phần cuối mỗi bài chỉ ra cách chạy ngoài máy.

**Middleware** là hàm `(req, res, next)` nằm *giữa* yêu cầu và route. Nó có thể đọc/sửa `req` và `res`, rồi hoặc **kết thúc** phản hồi, hoặc gọi `next()` để chuyển cho bước kế.

```javascript
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();                       // quên dòng này → yêu cầu treo mãi
});
```

## Thứ tự rất quan trọng

Express chạy theo **thứ tự khai báo**. Middleware chung (log, `express.json()`) đặt **trước** route.

![Middleware xếp thành chuỗi; lỗi chuyển tới error handler](/lessons/nodejs/07-middleware-errors-fig-vi.svg)
*Middleware xếp thành chuỗi; lỗi chuyển tới error handler*

## Middleware cho một route

```javascript
function auth(req, res, next) {
  if (!req.headers.authorization) return res.status(401).json({ error: "cần đăng nhập" });
  next();
}
app.get("/me", auth, (req, res) => res.json({ ok: true }));
```

## Middleware có sẵn thường dùng

- `express.json()`: đọc body JSON vào `req.body`.
- `express.static("public")`: phục vụ file tĩnh.
- `cors()`, `helmet()`, `morgan()` (cài thêm từ npm).

## Xử lý lỗi

Middleware có **4 tham số** `(err, req, res, next)` là bộ xử lý lỗi, đặt **cuối cùng**:

```javascript
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});
```

Gọi `next(err)` (hoặc ném lỗi trong hàm async trên Express 5) sẽ nhảy thẳng tới đó. Đừng bao giờ trả stack trace cho người dùng ở môi trường production.
