# Dự án: API quản lý việc cần làm có xác thực, kiểm tra và kiểm thử

> **Lưu ý:** trong trình duyệt không có Node thật, nên Lexi Learn chạy một bản **mô phỏng** (fs trong bộ nhớ, `http`/`express` thu nhỏ, kiểm thử bằng `app.inject`). Code bạn viết giống hệt khi chạy trên Node thật; phần cuối mỗi bài chỉ ra cách chạy ngoài máy.

Bài tổng hợp của khoá: ghép Express, middleware, xác thực, kiểm tra đầu vào, phân quyền sở hữu và kiểm thử thành **một API nhỏ nhưng làm đúng cách**.

## Yêu cầu

- Người dùng gửi `Authorization: Bearer <token>`.
- `POST /tasks` tạo việc, `GET /tasks` liệt kê, `PATCH /tasks/:id` hoàn thành, `DELETE /tasks/:id` xoá.
- **Mỗi người chỉ thấy và sửa việc của mình.**

![Lớp xử lý của API: xác thực, kiểm tra, sở hữu](/lessons/nodejs/22-project-task-api-fig-vi.svg)
*Lớp xử lý của API: xác thực, kiểm tra, sở hữu*

## Thiết kế theo lớp

```
express.json()          → đọc JSON (giới hạn kích thước)
authenticate            → gắn req.user từ token (hoặc undefined)
requireAuth             → 401 nếu chưa xác thực
validate                → 400 nếu đầu vào sai
handler                 → nghiệp vụ + kiểm tra sở hữu
errorHandler            → 500 chung chung, log chi tiết
```



## Ba điểm mấu chốt

1. **Xác thực rồi phân quyền, theo thứ tự.** `401` = "tôi không biết bạn là ai"; `403/404` = "tôi biết bạn nhưng bạn không được".
2. **Kiểm tra sở hữu ở mọi truy vấn.** Lọc theo `ownerId === req.user.id` ngay trong tìm kiếm (hoặc `WHERE id=? AND owner_id=?` trong SQL). Quên điều này là lỗi **IDOR**, lỗi bảo mật phổ biến nhất (bài 17).
3. **Trả 404 thay vì 403 cho tài nguyên của người khác** nếu không muốn lộ rằng nó tồn tại.

## Bảng mã trạng thái

| Tình huống | Mã |
|---|---|
| tạo thành công | **201** |
| chưa xác thực | **401** |
| đầu vào sai | **400** (kèm danh sách lỗi) |
| không tồn tại / không phải của bạn | **404** |
| xoá thành công | **204** |

## Kiểm thử bằng inject

Gọi trực tiếp app như bài này (`app.inject`; thực tế `supertest`) và kiểm tra **cả đường lỗi**: thiếu token, token sai, đầu vào sai, truy cập việc của người khác (bài 15). Mỗi quy tắc bảo mật nên có **một test** để không bị phá khi sửa mã.

## Từ bài tập đến sản xuất

| Bài tập này | Sản xuất |
|---|---|
| token cứng trong mảng | phiên/JWT ngắn hạn thật, mật khẩu băm Argon2 (bài 14, 12 khoá Next.js) |
| mảng trong bộ nhớ | **PostgreSQL** + repository, giao dịch, chỉ mục (bài 18) |
| `validate` tự viết | **Zod** schema, giới hạn kích thước |
| `console.log` | **pino** + request id (bài 21) |
| không giới hạn | **rate limit**, CORS, `helmet` (bài 16, 17) |
| chạy `node` trực tiếp | **Docker**, tắt êm với SIGTERM, health check, CI/CD (bài 12) |

## Hướng đi tiếp

Học **TypeScript** để kiểu hoá yêu cầu/phản hồi; **Fastify/NestJS** nếu cần khung có cấu trúc; **OpenAPI** để mô tả API; **hàng đợi công việc** (BullMQ) cho việc nền; rồi triển khai thật lên VPS (xem khoá Next.js bài 6).

## Nguồn tham khảo

- Express docs: "Routing", "Using middleware".
- OWASP API Security Top 10 (API1: Broken Object Level Authorization).
- Microsoft REST API Guidelines; RFC 9110 (HTTP semantics).
