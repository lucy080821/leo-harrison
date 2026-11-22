# Next.js là gì và định tuyến bằng thư mục

> **Lưu ý:** Next.js cần Node.js và một máy chủ nên **không chạy được trong trình duyệt**. Ở đây bạn luyện các **ý tưởng cốt lõi** bằng React và JavaScript thật (bên phải); mỗi bài có phần **chạy trên máy bạn** bằng `npx create-next-app@latest`.

**Next.js** là framework xây trên React, cho bạn mọi thứ để làm một website hoàn chỉnh: routing, vẽ trang trên server (SSR), API, tối ưu ảnh, triển khai.

## Tạo dự án (chạy trên máy bạn)

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev      # http://localhost:3000
```

![Thư mục app/ ánh xạ thành URL](/lessons/nextjs/01-file-routing-fig-vi.svg)
*Thư mục app/ ánh xạ thành URL*

## App Router: thư mục = đường dẫn

Trong thư mục `app/`, mỗi thư mục là một đoạn URL, và file đặc biệt `page.js` làm nó **truy cập được**:

```
app/
├─ page.js                 →  /
├─ about/page.js           →  /about
└─ blog/
   ├─ page.js              →  /blog
   └─ [slug]/page.js       →  /blog/bat-ky-gi
```

`[slug]` là **đoạn động**. Trang nhận giá trị qua `params` (từ Next 15, `params` là một **Promise**):

```jsx
// app/blog/[slug]/page.js
export default async function Post({ params }) {
  const { slug } = await params;
  return <h1>Bài: {slug}</h1>;
}
```

## Điều hướng

```jsx
import Link from "next/link";
<Link href="/about">Giới thiệu</Link>
```

`Link` chuyển trang **không tải lại** và tải trước nội dung trang đích.

## Các file đặc biệt

`layout.js` (khung chung), `loading.js`, `error.js`, `not-found.js`, `route.js` (API). Bạn sẽ gặp từng cái ở các bài sau.
