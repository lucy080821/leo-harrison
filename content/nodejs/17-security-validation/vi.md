# Bảo mật API: kiểm tra đầu vào, chèn mã và header

> **Lưu ý:** trong trình duyệt không có Node thật, nên Learn With Leo chạy một bản **mô phỏng** (fs trong bộ nhớ, `http`/`express` thu nhỏ, kiểm thử bằng `app.inject`). Code bạn viết giống hệt khi chạy trên Node thật; phần cuối mỗi bài chỉ ra cách chạy ngoài máy.

Mọi dữ liệu từ ngoài (thân yêu cầu, tham số URL, header, cookie, tệp tải lên) là **không đáng tin**. Phần lớn lỗ hổng nghiêm trọng đến từ việc **tin dữ liệu người dùng gửi**.

## Nguyên tắc 1: kiểm tra đầu vào bằng danh sách cho phép

Nêu rõ **cái gì hợp lệ** (kiểu, độ dài, khoảng giá trị, định dạng), từ chối còn lại. Danh sách **cấm** ("loại bỏ `<script>`") luôn bị lách.

- Dùng thư viện schema (**Zod**, Joi, Valibot) kiểm tra ở **biên** hệ thống.
- **Chống mass assignment**: đừng gán thẳng `req.body` vào bản ghi; **chọn đúng các trường cho phép** để kẻ tấn công không tự đặt `role: "admin"`.
- Giới hạn **kích thước** thân, độ dài chuỗi, số phần tử mảng.



![Dữ liệu từ ngoài là không đáng tin; kiểm tra ở biên rồi mới dùng](/lessons/nodejs/17-security-validation-fig-vi.svg)
*Dữ liệu từ ngoài là không đáng tin; kiểm tra ở biên rồi mới dùng*

## Nguyên tắc 2: dữ liệu không bao giờ thành mã

| Tấn công | Cơ chế | Phòng chống |
|---|---|---|
| **SQL injection** | ghép dữ liệu vào câu SQL | **truy vấn tham số hoá** (`$1`), ORM/query builder |
| **XSS** | chèn `<script>` vào HTML | **thoát ký tự theo ngữ cảnh** (React/Next.js làm sẵn), CSP, cookie `httpOnly` |
| **Command injection** | ghép vào lệnh shell | tránh shell; dùng `execFile` với mảng đối số |
| **Path traversal** | `../../etc/passwd` | chuẩn hoá bằng `path.resolve` và kiểm tra nằm trong thư mục gốc |
| **SSRF** | server fetch URL do người dùng đưa | danh sách cho phép miền, chặn dải IP nội bộ |
| **NoSQL injection** | object `{ $ne: null }` trong truy vấn | kiểm tra kiểu: `typeof x === 'string'` |

## Nguyên tắc 3: header bảo mật

`helmet()` đặt sẵn nhiều header hữu ích:

- `Strict-Transport-Security` (HSTS): luôn dùng HTTPS.
- `Content-Security-Policy`: giới hạn nguồn script (giảm thiệt hại XSS).
- `X-Content-Type-Options: nosniff`, `X-Frame-Options`/`frame-ancestors` (chống nhúng khung).
- Tắt `X-Powered-By: Express` (không quảng cáo công nghệ).

## CORS: không phải bảo mật máy chủ

CORS chỉ quyết định **trình duyệt có cho trang web khác đọc phản hồi hay không**. Nó **không** chặn `curl` hay máy chủ khác. Chỉ mở cho **miền cần thiết**, **không** dùng `*` kèm thông tin xác thực.

## Nguyên tắc 4: chiều sâu phòng thủ

Giả sử một lớp thất bại: **ít đặc quyền** (tài khoản CSDL chỉ có quyền cần thiết), **không lộ lỗi nội bộ**, **cập nhật phụ thuộc** (`npm audit`, Dependabot), **bí mật ngoài mã nguồn**, **giới hạn tần suất**, **ghi log kiểm toán**.

## OWASP Top 10 (2021) cần thuộc

A01 Kiểm soát truy cập hỏng · A02 Lỗi mật mã · A03 **Injection** · A04 Thiết kế không an toàn · A05 Cấu hình sai · A06 Thành phần lỗi thời · A07 Xác thực kém · A08 Toàn vẹn dữ liệu/phần mềm · A09 Thiếu log và giám sát · A10 SSRF.

## Nguồn tham khảo

- OWASP Top 10 (2021); OWASP Cheat Sheet Series: Input Validation, SQL Injection Prevention, XSS Prevention.
- Node.js: "Security Best Practices"; Helmet.js docs.
- MDN: CORS, Content-Security-Policy.
