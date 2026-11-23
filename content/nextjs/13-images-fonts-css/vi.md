> **Lưu ý:** Next.js cần Node.js và một máy chủ nên **không chạy được trong trình duyệt**. Ở đây bạn luyện các **ý tưởng cốt lõi** bằng React và JavaScript thật (bên phải); mỗi bài có phần **chạy trên máy bạn** bằng `npx create-next-app@latest`.

# Ảnh, font và CSS: tối ưu Core Web Vitals

Ảnh và font thường là phần **nặng nhất** của trang. Next.js có sẵn công cụ tối ưu chúng: dùng đúng cách cải thiện trực tiếp **LCP** và **CLS** (bài 17).

## next/image

```jsx
import Image from 'next/image'

<Image src="/hero.webp" alt="Cửa hàng Lexi" width={1600} height={900} priority />
```

Tự động:

- Tạo **nhiều kích thước** (`srcset`) và chọn kích thước **vừa đủ** theo màn hình/DPR (mặc định `deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]`).
- Chuyển sang định dạng hiện đại (**WebP/AVIF**) khi trình duyệt hỗ trợ.
- **Tải lười** (lazy) cho ảnh ngoài màn hình.
- **Giữ chỗ** bằng `width`/`height` ⇒ không **dịch chuyển bố cục (CLS)**.

| Thuộc tính | Dùng khi |
|---|---|
| `width`, `height` | ảnh cục bộ/từ xa có kích thước biết trước |
| `fill` + `sizes` | ảnh lấp đầy khung cha (cần `sizes` để chọn kích thước đúng) |
| `priority` | ảnh **LCP** (ảnh hero đầu trang), tải ngay |
| `alt` | **bắt buộc**; mô tả nội dung (trợ năng, SEO) |

Ảnh từ miền khác cần khai báo trong `images.remotePatterns` của cấu hình (bảo mật, chống lạm dụng tối ưu ảnh).

![next/image chọn kích thước vừa đủ và giữ chỗ để tránh dịch chuyển bố cục](/lessons/nextjs/13-images-fonts-css-fig-vi.svg)
*next/image chọn kích thước vừa đủ và giữ chỗ để tránh dịch chuyển bố cục*

## next/font

```jsx
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin', 'vietnamese'] })
<body className={inter.className}>
```

Font được **tải về lúc build và phục vụ từ chính tên miền của bạn**: không gửi yêu cầu tới Google khi người dùng truy cập, **không nhấp nháy chữ** (FOUT) nhờ điều chỉnh kích thước font dự phòng. Nhớ thêm subset `vietnamese` cho tiếng Việt.

## CSS

| Cách | Ghi chú |
|---|---|
| **Tailwind CSS** | tiện ích nguyên tử, lựa chọn phổ biến nhất |
| **CSS Modules** (`x.module.css`) | tên lớp cục bộ, không đụng độ |
| CSS toàn cục | `app/globals.css` cho biến, reset |
| CSS-in-JS chạy lúc chạy | cần cẩn thận với Server Components |

## Quy tắc vàng

1. Ảnh LCP: `priority`, kích thước đúng, định dạng hiện đại.
2. **Luôn** khai báo kích thước (hoặc `aspect-ratio`) để giữ chỗ.
3. Không tải ảnh lớn hơn kích thước hiển thị; dùng `sizes` chính xác.
4. Ít họ font, ít độ đậm; dùng font biến thiên.
5. Đo bằng **Lighthouse** và dữ liệu người dùng thật (CrUX).

## Nguồn tham khảo

- Next.js docs: "Images", "Fonts", `<Image>` API reference (`deviceSizes`, `remotePatterns`).
- web.dev: "Optimize Largest Contentful Paint", "Cumulative Layout Shift".
