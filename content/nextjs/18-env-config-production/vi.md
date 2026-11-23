> **Lưu ý:** Next.js cần Node.js và một máy chủ nên **không chạy được trong trình duyệt**. Ở đây bạn luyện các **ý tưởng cốt lõi** bằng React và JavaScript thật (bên phải); mỗi bài có phần **chạy trên máy bạn** bằng `npx create-next-app@latest`.

# Cấu hình và sản xuất: biến môi trường, kiểm tra và quan sát

Chạy được trên máy bạn mới chỉ là **một nửa**. Đưa vào sản xuất đòi hỏi cấu hình đúng, bí mật an toàn, và khả năng **biết chuyện gì đang xảy ra**.

## Biến môi trường

| Tệp | Dùng cho |
|---|---|
| `.env` | giá trị mặc định mọi môi trường |
| `.env.local` | bí mật trên máy bạn (**không commit**) |
| `.env.production` | mặc định cho sản xuất |

Quy tắc quan trọng:

- Chỉ biến bắt đầu bằng **`NEXT_PUBLIC_`** được **nhúng vào mã gửi trình duyệt** lúc build. Mọi biến khác **chỉ có ở máy chủ**.
- **Không bao giờ** đặt bí mật (khoá API, mật khẩu CSDL) vào `NEXT_PUBLIC_*`: ai cũng đọc được trong DevTools.
- `.env.local` phải nằm trong `.gitignore`. Bí mật lỡ commit coi như **đã lộ**: xoay khoá ngay.
- Biến `NEXT_PUBLIC_*` được **đóng cứng lúc build**: đổi giá trị cần build lại.

![Chỉ biến NEXT_PUBLIC_ tới trình duyệt; bí mật ở lại máy chủ](/lessons/nextjs/18-env-config-production-fig-vi.svg)
*Chỉ biến NEXT_PUBLIC_ tới trình duyệt; bí mật ở lại máy chủ*

## Kiểm tra cấu hình khi khởi động

Thiếu `DATABASE_URL` mà chỉ phát hiện khi có người dùng đầu tiên là lỗi đắt giá. Kiểm tra **một lần lúc khởi động** (bằng Zod hoặc hàm tự viết) và **dừng ngay** nếu sai:

```js
const schema = z.object({ DATABASE_URL: z.string().url(), PORT: z.coerce.number().default(3000) })
export const env = schema.parse(process.env)
```

Thêm `import 'server-only'` vào module giữ bí mật: nhập nhầm vào Client Component sẽ **lỗi lúc build**.

## Quan sát (observability)

| Trụ cột | Công cụ | Trả lời |
|---|---|---|
| **Log** | log có cấu trúc (JSON): `{level, msg, requestId}` | chuyện gì xảy ra? |
| **Chỉ số** | Prometheus/Grafana, Vercel Analytics | hệ thống khoẻ không? |
| **Vết** | OpenTelemetry (`instrumentation.js` của Next.js) | yêu cầu chậm ở đâu? |
| **Lỗi** | Sentry | bug nào, ảnh hưởng ai? |

Đặt **mã yêu cầu (request id)** vào mọi log để lần theo một yêu cầu. **Không log dữ liệu nhạy cảm** (mật khẩu, token, thẻ).

## Health check

`/api/health` trả **200** khi ứng dụng và phụ thuộc (CSDL, cache) ổn, **503** khi hỏng: để bộ cân bằng tải, Docker, Kubernetes biết khi nào **loại khỏi vòng phục vụ** hoặc **khởi động lại**.

## Triển khai (nhắc lại)

- `next build` rồi `next start` (Node), hoặc `output: 'standalone'` cho **Docker** gọn nhẹ.
- Sau **Nginx** làm proxy ngược, bật HTTPS (Let's Encrypt), nén, header bảo mật (bài 6).
- Có quy trình **CI/CD**, **bản sao lưu CSDL** đã thử khôi phục, và kế hoạch **quay lui (rollback)**.

## Danh sách trước khi ra mắt

1. Biến môi trường đủ, kiểm tra khi khởi động.
2. HTTPS, header bảo mật (CSP, HSTS).
3. Log, giám sát lỗi, cảnh báo.
4. Sao lưu và thử khôi phục.
5. Core Web Vitals đạt (bài 17); sitemap, robots (bài 14).
6. Trang 404/500 thân thiện (bài 15).

## Nguồn tham khảo

- Next.js docs: "Environment Variables", "Deploying", `instrumentation`, `output: 'standalone'`.
- The Twelve-Factor App (12factor.net): Config, Logs.
- OWASP: Logging Cheat Sheet; Secrets Management Cheat Sheet.
