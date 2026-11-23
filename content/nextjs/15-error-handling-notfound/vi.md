> **Lưu ý:** Next.js cần Node.js và một máy chủ nên **không chạy được trong trình duyệt**. Ở đây bạn luyện các **ý tưởng cốt lõi** bằng React và JavaScript thật (bên phải); mỗi bài có phần **chạy trên máy bạn** bằng `npx create-next-app@latest`.

# Xử lý lỗi: error.js, not-found và lỗi dự kiến

Lỗi là **chuyện bình thường** của hệ thống thật: mạng rớt, dữ liệu không tồn tại, người dùng nhập sai. Một ứng dụng chuyên nghiệp **không bao giờ hiện trang trắng hoặc dấu vết lỗi** cho người dùng.

## Hai loại lỗi, hai cách xử lý

| Loại | Ví dụ | Cách xử lý |
|---|---|---|
| **Lỗi dự kiến** | kiểm tra form thất bại, API trả 4xx, không tìm thấy | **trả như giá trị** (`{ ok:false, message }`), hiện cạnh trường; `notFound()` cho 404 |
| **Lỗi không dự kiến** | bug, CSDL sập, null bất ngờ | **ném lỗi** để rơi vào `error.js` |

Với Server Function, **tránh `try/catch` + `throw` cho lỗi dự kiến**; dùng `useActionState` để hiển thị thông báo (bài 7).

![error.js giới hạn lỗi trong tuyến; layout cha vẫn sống](/lessons/nextjs/15-error-handling-notfound-fig-vi.svg)
*error.js giới hạn lỗi trong tuyến; layout cha vẫn sống*

## error.js: ranh giới lỗi theo tuyến

```jsx
// app/dashboard/error.js
'use client' // ranh giới lỗi phải là Client Component

export default function ErrorPage({ error, retry }) {
  return (
    <div>
      <h2>Có lỗi xảy ra</h2>
      <button onClick={() => retry()}>Thử lại</button>
    </div>
  )
}
```

- Bắt lỗi trong **các thành phần con của tuyến**; layout cha **vẫn hoạt động**.
- **`retry()`** thử **lấy lại dữ liệu và render lại** vùng bị lỗi (khuyến nghị). `reset()` chỉ xoá trạng thái lỗi rồi render lại **không lấy lại dữ liệu**.
- Đặt `error.js` ở **nhiều cấp** để giới hạn phạm vi hỏng.
- `global-error.js` bọc cả layout gốc (phải tự có `<html>` và `<body>`).
- Ghi log lỗi tới dịch vụ (Sentry) trong `useEffect`.

(Ghi chú: các bản Next.js cũ dùng prop `reset`; bản mới khuyên dùng `retry`.)

## not-found.js và notFound()

```jsx
import { notFound } from 'next/navigation'

const post = await getPost(slug)
if (!post) notFound()      // trả HTTP 404 + hiện not-found.js
```

Quan trọng cho **SEO** (trả đúng mã 404, không phải "trang trống" với mã 200).

## Mẫu thử lại (retry) đúng cách

- Chỉ thử lại thao tác **idempotent** (đọc, hoặc ghi có khoá chống trùng).
- Giới hạn số lần, **tăng dần thời gian chờ (exponential backoff)** + ngẫu nhiên.
- Với thao tác tạo (thanh toán), **dùng idempotency key** để không trừ tiền hai lần.

## Thông báo lỗi tốt

1. Nói **chuyện gì xảy ra** bằng ngôn ngữ người dùng.
2. Nói **làm gì tiếp** (thử lại, liên hệ).
3. **Không lộ chi tiết nội bộ** (stack trace, SQL, đường dẫn). Next.js ẩn thông điệp lỗi máy chủ ở sản xuất, chỉ gửi mã `digest` để tra log.
4. Gắn với trợ năng: `aria-live`, `role="alert"`.

## Nguồn tham khảo

- Next.js docs: "Error Handling", `error.js`, `not-found.js`, `global-error`.
- Google SRE Book: "Handling Overload" (retry, backoff); Stripe API: Idempotent requests.
