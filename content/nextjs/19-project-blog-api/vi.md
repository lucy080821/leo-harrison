> **Lưu ý:** Next.js cần Node.js và một máy chủ nên **không chạy được trong trình duyệt**. Ở đây bạn luyện các **ý tưởng cốt lõi** bằng React và JavaScript thật (bên phải); mỗi bài có phần **chạy trên máy bạn** bằng `npx create-next-app@latest`.

# Dự án: API blog với Route Handlers, kiểm tra dữ liệu và phân trang

Bài tổng hợp: thiết kế một **API REST nhỏ nhưng đúng chuẩn** bằng Route Handlers, áp dụng những gì đã học về kiểm tra đầu vào, bảo mật, mã trạng thái và hiệu năng.

## Thiết kế tài nguyên

| Phương thức + đường dẫn | Việc | Mã thành công |
|---|---|---|
| `GET /api/posts?page=2&limit=10` | liệt kê, phân trang | 200 |
| `POST /api/posts` | tạo | **201** |
| `GET /api/posts/:id` | xem một bài | 200 / **404** |
| `DELETE /api/posts/:id` | xoá | **204** (không nội dung) / 404 |

Cấu trúc thư mục:

```
app/api/posts/route.js          # GET (danh sách), POST
app/api/posts/[id]/route.js     # GET, DELETE (params là Promise)
```

![API blog: bốn thao tác với mã trạng thái đúng](/lessons/nextjs/19-project-blog-api-fig-vi.svg)
*API blog: bốn thao tác với mã trạng thái đúng*

## Mã trạng thái đúng

- **400** dữ liệu gửi lên sai; **401** chưa xác thực; **403** không có quyền; **404** không tồn tại; **409** xung đột (trùng); **429** gọi quá nhiều.
- **500** là lỗi *của bạn*: không để lộ chi tiết.

## Kiểm tra đầu vào

```js
const body = await request.json().catch(() => null)   // JSON hỏng không làm sập
if (!body || typeof body.title !== 'string' || body.title.trim().length < 2) {
  return Response.json({ error: '...' }, { status: 400 })
}
```

Thực tế dùng **Zod** để mô tả schema một lần, dùng cho cả kiểm tra và kiểu TypeScript. **Không tin** bất kỳ trường nào, kể cả `id` từ URL.

## Phân trang

Luôn **giới hạn** `limit` (tối đa 50) và **ép về số nguyên hợp lệ**: nếu không, một yêu cầu `?limit=1000000` có thể làm sập máy chủ.

| Kiểu | Ưu | Nhược |
|---|---|---|
| **offset/limit** (`page`) | đơn giản, nhảy trang | chậm ở trang sâu; lệch khi dữ liệu đổi |
| **con trỏ (cursor)** (`after=id`) | nhanh, ổn định | không nhảy tới trang bất kỳ |

Trả kèm `total` hoặc `nextCursor` để client biết còn nữa không.

## Bảo mật và vận hành

1. **Xác thực + phân quyền** cho `POST`/`DELETE` (bài 12); kiểm tra quyền sở hữu.
2. **Giới hạn tần suất** (rate limit) theo IP/người dùng.
3. **CORS** chỉ mở cho miền cần thiết.
4. Ghi **log có cấu trúc** với request id (bài 18).
5. **Cache** `GET` công khai bằng `'use cache'` + `cacheTag('posts')`; `updateTag('posts')` sau khi tạo/xoá.
6. **Kiểm thử**: gọi handler trực tiếp với `Request` giả như trong bài này, vì chúng là hàm thuần trên Web API chuẩn.

## Hướng đi tiếp

Thay mảng trong bộ nhớ bằng **CSDL** (PostgreSQL + Drizzle/Prisma), thêm đăng nhập, rồi tự dựng giao diện quản lý bằng Server Actions (bài 7). Học khoá SQL và Node.js để hiểu phần dữ liệu và máy chủ sâu hơn.

## Nguồn tham khảo

- Next.js docs: "Route Handlers".
- MDN: HTTP response status codes; Fetch API `Request`/`Response`.
- Microsoft REST API Guidelines; Zalando RESTful API Guidelines.
