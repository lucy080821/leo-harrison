> **Lưu ý:** Next.js cần Node.js và một máy chủ nên **không chạy được trong trình duyệt**. Ở đây bạn luyện các **ý tưởng cốt lõi** bằng React và JavaScript thật (bên phải); mỗi bài có phần **chạy trên máy bạn** bằng `npx create-next-app@latest`.

# Xác thực: phiên, cookie và lớp truy cập dữ liệu (DAL)

**Xác thực (authentication)**: *bạn là ai*. **Phân quyền (authorization)**: *bạn được làm gì*. Lẫn lộn hai khái niệm này là nguồn gốc của nhiều lỗ hổng.

> Khuyến nghị thực tế: dùng thư viện đã kiểm chứng (**Auth.js**, **Better Auth**, **Clerk**, **Supabase Auth**...) thay vì tự viết. Bài này giúp bạn **hiểu cơ chế** để dùng và kiểm tra chúng đúng.

## Mật khẩu

- **Không bao giờ lưu mật khẩu thô.** Lưu **băm chậm có muối**: **Argon2id** (khuyến nghị OWASP), hoặc scrypt/bcrypt.
- Không dùng MD5/SHA-1/SHA-256 trần (quá nhanh để bẻ).
- Báo lỗi **chung** ("email hoặc mật khẩu sai") để không lộ tài khoản nào tồn tại; giới hạn số lần thử.

![Ba lớp kiểm tra: proxy lạc quan, DAL quyết định, giao diện chỉ để tiện](/lessons/nextjs/12-authentication-sessions-fig-vi.svg)
*Ba lớp kiểm tra: proxy lạc quan, DAL quyết định, giao diện chỉ để tiện*

## Phiên (session)

Sau khi đăng nhập, máy chủ tạo **phiên** và gửi **cookie**:

| Cách | Mô tả | Ưu/nhược |
|---|---|---|
| **Phiên phía máy chủ** | cookie chứa **ID ngẫu nhiên**; dữ liệu phiên trong CSDL/Redis | thu hồi được ngay; cần kho lưu |
| **Phiên không trạng thái (JWT/cookie ký)** | cookie chứa dữ liệu đã **ký/mã hoá** | không cần kho; khó thu hồi |

Cookie an toàn:

```js
cookieStore.set('session', id, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 604800 })
```

- `httpOnly`: JavaScript không đọc được (chống đánh cắp qua XSS).
- `secure`: chỉ gửi qua HTTPS.
- `sameSite=lax`: giảm rủi ro **CSRF**.

## Ba lớp kiểm tra trong Next.js

1. **Proxy**: kiểm tra **lạc quan**, chỉ đọc cookie để chuyển hướng nhanh (bài 11).
2. **Lớp truy cập dữ liệu (DAL)**: hàm tập trung `verifySession()` và truy vấn **kiểm tra quyền sở hữu**, được gọi ở mọi nơi truy cập dữ liệu.
3. **Giao diện**: ẩn nút chỉ để **trải nghiệm tốt hơn**, không phải bảo mật.

## IDOR và kiểm soát truy cập

*Insecure Direct Object Reference*: người dùng đổi `/invoice/7` thành `/invoice/8` và xem hoá đơn người khác. Cách chặn: **kiểm tra quyền sở hữu mỗi lần truy vấn** (`WHERE id = ? AND owner_id = ?`). Đây là **lỗi bảo mật phổ biến nhất** (OWASP Top 10: Broken Access Control).

## Đừng quên

- **Đăng xuất** phải xoá phiên phía máy chủ.
- **Quay vòng ID phiên** sau đăng nhập (chống session fixation).
- **CSRF**: Server Actions có bảo vệ so khớp `Origin`; Route Handler tự gánh.
- Bảo vệ các **điểm cuối** (Server Action, Route Handler) y như trang.
- Bật **xác thực hai lớp** cho tài khoản nhạy cảm.

## Nguồn tham khảo

- Next.js docs: guide "Authentication".
- OWASP: Password Storage Cheat Sheet, Session Management Cheat Sheet, Top 10 (A01 Broken Access Control).
- MDN: `Set-Cookie`.
