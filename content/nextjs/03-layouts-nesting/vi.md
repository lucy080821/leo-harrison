# Layout và trang lồng nhau

> **Lưu ý:** Next.js cần Node.js và một máy chủ nên **không chạy được trong trình duyệt**. Ở đây bạn luyện các **ý tưởng cốt lõi** bằng React và JavaScript thật (bên phải); mỗi bài có phần **chạy trên máy bạn** bằng `npx create-next-app@latest`.

## layout.js — khung dùng chung

**Layout** là giao diện chia sẻ giữa nhiều trang (thanh điều hướng, chân trang). Nó nhận trang con qua `children`:

```jsx
// app/layout.js  (bắt buộc ở gốc, phải có <html> và <body>)
export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <nav>…</nav>
        {children}
      </body>
    </html>
  );
}
```

Khi chuyển trang, layout **không bị vẽ lại** và giữ nguyên state — rất mượt.

![Layout lồng nhau bao quanh page](/lessons/nextjs/03-layouts-nesting-fig-vi.svg)
*Layout lồng nhau bao quanh page*

## Layout lồng nhau

Mỗi thư mục có thể có `layout.js` riêng; chúng lồng vào nhau theo cây thư mục:

```
app/
├─ layout.js              ← bọc mọi trang
├─ page.js
└─ dashboard/
   ├─ layout.js           ← chỉ bọc /dashboard/*
   ├─ page.js             →  /dashboard
   └─ settings/page.js    →  /dashboard/settings
```

Trang `/dashboard/settings` được bọc: `RootLayout` > `DashboardLayout` > `SettingsPage` — đúng như bài tập bên phải.

## Link giữa các trang

Dùng `<Link href="/about">` thay cho `<a>` để chuyển trang tức thì, không tải lại. Thẻ `<a>` thường vẫn chạy nhưng sẽ tải lại cả trang.

## Nhóm route

Đặt tên thư mục trong ngoặc, ví dụ `app/(marketing)/about/page.js`, để **tổ chức** mà không thêm đoạn vào URL (`/about`).
