> **Lưu ý:** Next.js cần Node.js và một máy chủ nên **không chạy được trong trình duyệt**. Ở đây bạn luyện các **ý tưởng cốt lõi** bằng React và JavaScript thật (bên phải); mỗi bài có phần **chạy trên máy bạn** bằng `npx create-next-app@latest`.

# Hiệu năng thật: Core Web Vitals (LCP, CLS, INP)

Tốc độ không phải cảm giác mà là **số đo**. **Core Web Vitals** là ba chỉ số Google dùng để đánh giá **trải nghiệm thật** của trang, và là một tín hiệu xếp hạng tìm kiếm.

## Ba chỉ số

| Chỉ số | Đo gì | Tốt | Cần cải thiện | Kém |
|---|---|---|---|---|
| **LCP** (Largest Contentful Paint) | thời gian hiện **nội dung lớn nhất** (thường ảnh/hero) | ≤ 2,5 s | ≤ 4 s | > 4 s |
| **INP** (Interaction to Next Paint) | độ trễ phản hồi **mọi tương tác** (bấm, gõ) | ≤ 200 ms | ≤ 500 ms | > 500 ms |
| **CLS** (Cumulative Layout Shift) | **dịch chuyển bố cục** bất ngờ | ≤ 0,1 | ≤ 0,25 | > 0,25 |

(INP thay thế FID từ tháng 3/2024.) Đánh giá theo **phân vị 75** của người dùng thật.



![Ba chỉ số Core Web Vitals và ngưỡng tốt](/lessons/nextjs/17-core-web-vitals-fig-vi.svg)
*Ba chỉ số Core Web Vitals và ngưỡng tốt*

## Cải thiện LCP

- Ảnh hero: `next/image` + `priority`, định dạng AVIF/WebP, đúng kích thước (bài 13).
- **TTFB thấp**: dựng sẵn/cache, CDN, gần người dùng (bài 16).
- Giảm CSS/JS **chặn render**; font tải sớm (`next/font`).

## Cải thiện INP

- Giảm **JavaScript chạy trên luồng chính**: tách mã (`lazy`), ít Client Component, loại thư viện nặng.
- Chia nhỏ tác vụ dài (> 50 ms); `useTransition`/`useDeferredValue` (khoá React).
- Tránh render lại thừa (`memo`, hạ state xuống).

## Cải thiện CLS

- Luôn khai báo **kích thước ảnh/video/quảng cáo** (hoặc `aspect-ratio`).
- Giao diện chờ (skeleton) **đúng hình dạng** nội dung.
- Không chèn nội dung phía trên nội dung đang xem; font có điều chỉnh kích thước dự phòng.

Mỗi lần dịch chuyển = **phần viewport bị ảnh hưởng × khoảng cách dịch**; CLS cộng các lần (theo cửa sổ phiên).

## Đo lường

| Loại | Công cụ |
|---|---|
| **Phòng thí nghiệm** (tái lập được) | Lighthouse, Chrome DevTools Performance |
| **Dữ liệu thật** (field) | CrUX/PageSpeed Insights, thư viện `web-vitals`, `useReportWebVitals` của Next.js |

Dữ liệu thật mới là **chuẩn cuối cùng**; Lighthouse chỉ để gỡ lỗi.

## Phân tích gói JavaScript

`@next/bundle-analyzer` cho bản đồ cây các gói: tìm thư viện lớn (moment, lodash toàn bộ) ⇒ thay bằng bản nhẹ, `import` theo phần, hoặc chuyển vào **Server Component** (mã chạy trên máy chủ **không gửi tới trình duyệt**). Đây là lợi ích hiệu năng lớn của Server Components.

## Ngân sách hiệu năng

Đặt ngân sách (ví dụ JS ban đầu < 170 KB nén) và chặn trong CI khi vượt.

## Nguồn tham khảo

- web.dev: "Core Web Vitals", "Web Vitals" (ngưỡng), "Optimize INP", "Optimize CLS".
- Next.js docs: "Analytics/web vitals", bundle analyzer.
