# Metadata, tối ưu và triển khai lên VPS

> **Lưu ý:** Next.js cần Node.js và một máy chủ nên **không chạy được trong trình duyệt**. Ở đây bạn luyện các **ý tưởng cốt lõi** bằng React và JavaScript thật (bên phải); mỗi bài có phần **chạy trên máy bạn** bằng `npx create-next-app@latest`.

## Metadata (SEO)

Đặt tiêu đề/mô tả để công cụ tìm kiếm và mạng xã hội hiểu trang của bạn:

```javascript
// app/about/page.js — metadata tĩnh
export const metadata = {
  title: "Giới thiệu",
  description: "Về Lexi Learn",
};

// app/blog/[slug]/page.js — metadata động
export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: slug };
}
```

![Triển khai lên VPS: build → chạy node → Nginx → người dùng](/lessons/nextjs/06-metadata-deploy-fig-vi.svg)
*Triển khai lên VPS: build → chạy node → Nginx → người dùng*

## Tối ưu có sẵn

- `next/image`: tự đổi cỡ, nén, tải lười ảnh. `<Image src="/a.png" alt="…" width={600} height={400} />`
- `next/font`: tải font về cùng domain, không nhấp nháy chữ.
- Tự chia nhỏ JavaScript theo trang.
- Trang tĩnh được dựng sẵn lúc build và phục vụ rất nhanh.

## Biến môi trường

File `.env.local` (không commit!):

```
DATABASE_URL=...
NEXT_PUBLIC_SITE_NAME=Lexi
```

Chỉ biến có tiền tố `NEXT_PUBLIC_` mới lộ ra trình duyệt. Còn lại chỉ dùng được ở server.

## Triển khai lên VPS Hostinger

```bash
# trên server (đã cài Node.js 20+)
git clone <repo> && cd <repo>
npm ci
npm run build          # dựng bản production
npm run start          # chạy ở cổng 3000 (đặt PORT=… để đổi)
```

Để app chạy bền và khởi động lại khi server reboot, dùng **pm2**:

```bash
npm i -g pm2
pm2 start npm --name lexi -- start
pm2 save && pm2 startup
```

Rồi đặt **Nginx** làm reverse proxy từ cổng 80/443 vào `localhost:3000` và cấp HTTPS miễn phí bằng **Let's Encrypt** (`certbot`).

Chính trang web bạn đang dùng cũng triển khai đúng như vậy.
