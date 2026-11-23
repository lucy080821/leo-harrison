> **Lưu ý:** Next.js cần Node.js và một máy chủ nên **không chạy được trong trình duyệt**. Ở đây bạn luyện các **ý tưởng cốt lõi** bằng React và JavaScript thật (bên phải); mỗi bài có phần **chạy trên máy bạn** bằng `npx create-next-app@latest`.

# Proxy (trước là middleware): chạy mã trước mỗi yêu cầu

> **Ghi chú:** từ Next.js 16, **Middleware được đổi tên thành Proxy** (tệp `proxy.ts`) để phản ánh đúng vai trò; chức năng giữ nguyên.

**Proxy** cho phép chạy mã **trước khi yêu cầu hoàn tất**, rồi tuỳ yêu cầu mà **viết lại (rewrite)**, **chuyển hướng (redirect)**, sửa **header**, hoặc trả phản hồi ngay.

## Cấu trúc

```js
// proxy.js (cùng cấp với thư mục app, hoặc trong src/)
import { NextResponse } from 'next/server'

export function proxy(request) {
  if (request.nextUrl.pathname.startsWith('/dashboard') && !request.cookies.get('session')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}
```

- Chỉ **một** `proxy` cho mỗi dự án (chia nhỏ logic ra module khác).
- `matcher` giới hạn các đường dẫn chạy proxy: tránh chạy cho tệp tĩnh.

![Proxy chạy trước định tuyến: chuyển hướng, viết lại hoặc cho qua](/lessons/nextjs/11-proxy-fig-vi.svg)
*Proxy chạy trước định tuyến: chuyển hướng, viết lại hoặc cho qua*

## Khi nào dùng

| Dùng | Ví dụ |
|---|---|
| **Chuyển hướng theo thuộc tính yêu cầu** | chưa đăng nhập ⇒ `/login`; theo vùng/ngôn ngữ |
| **Rewrite** | A/B test, đa ngôn ngữ `/vi/...` |
| **Header** | bảo mật (CSP), nhận diện yêu cầu |

Với chuyển hướng **tĩnh, đơn giản**, dùng `redirects` trong `next.config.ts` trước (không cần mã).

## Giới hạn quan trọng

- **Không dành cho lấy dữ liệu chậm** (gọi CSDL/API) vì chạy trên **mọi yêu cầu khớp**, làm chậm toàn bộ.
- Là **kiểm tra lạc quan (optimistic)**: chỉ đọc cookie để quyết định chuyển hướng **nhanh**. **Không** thay thế kiểm tra quyền thật ở nơi truy cập dữ liệu (Server Action, Route Handler, lớp truy cập dữ liệu), vì kẻ tấn công có thể gọi thẳng điểm cuối khác, và proxy có thể bị cấu hình `matcher` bỏ sót.
- Chỉ thị `'use cache'` và `'use server'` **không có tác dụng** trong proxy; `fetch` trong proxy **không cache**.

## Mẫu đa ngôn ngữ

Đọc `Accept-Language` hoặc cookie, rồi redirect `/` → `/vi`. (Trang này của Learn With Leo dùng đúng cách này.)

## Gỡ lỗi

- Nhớ cấu hình `matcher`, kẻo proxy chạy cho cả `/_next/static` và ảnh.
- Ghi log ngắn gọn; proxy nằm trên đường nóng.

## Nguồn tham khảo

- Next.js docs: "Proxy" (getting-started/proxy) và `proxy.js` API reference.
- OWASP: Broken Access Control.
