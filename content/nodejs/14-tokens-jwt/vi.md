# Token và JWT: cấu trúc, hạn dùng và những cạm bẫy

> **Lưu ý:** trong trình duyệt không có Node thật, nên Lexi Learn chạy một bản **mô phỏng** (fs trong bộ nhớ, `http`/`express` thu nhỏ, kiểm thử bằng `app.inject`). Code bạn viết giống hệt khi chạy trên Node thật; phần cuối mỗi bài chỉ ra cách chạy ngoài máy.

**JWT (JSON Web Token)** là cách đóng gói thông tin "ai, quyền gì, đến khi nào" thành một chuỗi đã **ký**. API dùng nó để biết yêu cầu đến từ ai mà không phải tra CSDL mỗi lần.

## Cấu trúc: ba phần, ngăn bằng dấu chấm

```
eyJhbGciOiJIUzI1NiJ9 . eyJzdWIiOiI0MiIsImV4cCI6MTc... . 7dK3...
      header                    payload (claims)        signature
```

- **header**: thuật toán ký (`HS256`, `RS256`, `EdDSA`).
- **payload**: các **claim** — `sub` (chủ thể), `exp` (hết hạn, giây Unix), `iat`, `iss`, `aud`, cùng dữ liệu riêng (`role`).
- **signature**: chữ ký trên `header.payload`; ai sửa payload thì chữ ký **sai**.

Cả hai phần đầu là **base64url** (bài 10), **không mã hoá**: ai cũng đọc được. **Không đặt bí mật** (mật khẩu, số thẻ) vào payload.

![JWT gồm ba phần ngăn bằng dấu chấm](/lessons/nodejs/14-tokens-jwt-fig-vi.svg)
*JWT gồm ba phần ngăn bằng dấu chấm*

## Ký và kiểm tra

- **HS256**: một **khoá bí mật chung** (HMAC-SHA256). Đơn giản, dùng khi cùng một dịch vụ ký và kiểm tra.
- **RS256/ES256/EdDSA**: **khoá riêng ký, khoá công khai kiểm tra**: nhiều dịch vụ kiểm tra mà không biết khoá ký (mô hình của đăng nhập một lần OIDC).

Khi kiểm tra **bắt buộc**:

1. **Chữ ký** đúng, với **thuật toán bạn chỉ định** (không tin trường `alg` trong token: tấn công `alg: none`).
2. `exp` chưa quá hạn (cho phép lệch đồng hồ vài chục giây).
3. `iss` và `aud` đúng.
4. Dùng thư viện đã kiểm chứng (**jose**, `jsonwebtoken`); **đừng tự viết** (bài này dùng chữ ký giả chỉ để dạy cấu trúc).



## Khi nào dùng, khi nào không

| Phù hợp | Không phù hợp |
|---|---|
| API không trạng thái, vi dịch vụ | làm **phiên đăng nhập trình duyệt** thông thường |
| Token **ngắn hạn** (5-15 phút) | token dài hạn không thu hồi được |

**Nhược điểm lớn:** token đã phát **khó thu hồi** trước hạn (đổi mật khẩu, bị đánh cắp). Với ứng dụng web thông thường, **phiên phía máy chủ + cookie `httpOnly`** (bài 12 khoá Next.js) đơn giản và an toàn hơn. Nếu dùng JWT: token truy cập **ngắn hạn** + **refresh token** quay vòng, lưu ở cookie `httpOnly`, **không** ở `localStorage` (bị XSS đánh cắp).

## Việc cần nhớ

- Giữ khoá ký trong biến môi trường/kho bí mật, **xoay vòng** định kỳ (`kid` trong header).
- Đừng nhét quá nhiều vào payload (token gửi theo **mỗi** yêu cầu).
- Luôn dùng **HTTPS**.

## Nguồn tham khảo

- RFC 7519 (JWT), RFC 7515 (JWS), RFC 8725 (JWT Best Current Practices).
- OWASP: JSON Web Token Cheat Sheet.
- Thư viện `jose` (github.com/panva/jose).
