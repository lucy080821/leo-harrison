# Middleware thực dụng: request id, xác thực và giới hạn tần suất

> **Lưu ý:** trong trình duyệt không có Node thật, nên Learn With Leo chạy một bản **mô phỏng** (fs trong bộ nhớ, `http`/`express` thu nhỏ, kiểm thử bằng `app.inject`). Code bạn viết giống hệt khi chạy trên Node thật; phần cuối mỗi bài chỉ ra cách chạy ngoài máy.

Middleware là **đường ống** mà mọi yêu cầu đi qua. Các mối quan tâm chung (log, xác thực, giới hạn tần suất, nén, CORS) nên nằm ở đây, **không** lặp lại trong từng route.

## Chuỗi middleware

```js
app.use(requestId)      // 1. gắn mã yêu cầu
app.use(logger)         // 2. ghi log
app.use(rateLimit(100)) // 3. chặn lạm dụng sớm
app.use(authenticate)   // 4. xác thực (ai?)
app.use('/api', router) // 5. route
app.use(errorHandler)   // CUỐI: xử lý lỗi (4 tham số)
```

**Thứ tự là hành vi.** Giới hạn tần suất đặt **trước** xác thực để kẻ tấn công không bắt máy chủ tốn công kiểm tra token; xử lý lỗi **cuối cùng**.



![Thứ tự middleware chính là hành vi](/lessons/nodejs/16-middleware-patterns-fig-vi.svg)
*Thứ tự middleware chính là hành vi*

## Ba mẫu hay dùng

1. **Request id**: sinh mã duy nhất (`crypto.randomUUID()`), đặt vào `req.id`, trả trong header `X-Request-Id` và có trong **mọi dòng log**: lần vết một yêu cầu xuyên suốt.
2. **Xác thực/phân quyền**: đọc token, gắn `req.user`; middleware **factory** `requireRole('admin')` trả 401/403.
3. **Giới hạn tần suất (rate limiting)**: chống brute-force đăng nhập, cào dữ liệu, lỗi lặp của client.

## Thuật toán giới hạn tần suất

| Thuật toán | Ý tưởng | Đặc điểm |
|---|---|---|
| **Cửa sổ cố định** | đếm trong mỗi phút | đơn giản; cho phép bùng nổ ở ranh giới |
| **Cửa sổ trượt** | đếm trong N giây gần nhất | mượt hơn, tốn bộ nhớ hơn |
| **Token bucket** | xô chứa token, nạp đều, mỗi yêu cầu lấy 1 | cho phép **bùng nổ có kiểm soát**, phổ biến nhất |

Khi chạy **nhiều máy**, bộ đếm phải nằm ở **kho chung** (**Redis**), nếu không mỗi máy đếm riêng. Trả **429 Too Many Requests** kèm `Retry-After`. Thư viện: `express-rate-limit`, `rate-limiter-flexible`.

## Nguyên tắc thiết kế middleware

- Làm **một việc**; gọi `next()` hoặc **kết thúc phản hồi**, không cả hai, và không im lặng (treo yêu cầu).
- Middleware `async` phải bắt lỗi (Express 5 tự chuyển lỗi/rejection sang xử lý lỗi; Express 4 cần `try/catch` hoặc bọc).
- Đừng đọc cả thân yêu cầu lớn vào bộ nhớ: **giới hạn kích thước** (`express.json({ limit: '100kb' })`).

## Nguồn tham khảo

- Express docs: "Using middleware", "Error handling".
- OWASP: Denial of Service Cheat Sheet; RFC 6585 (429).
- Stripe Engineering: "Scaling your API with rate limiters".
