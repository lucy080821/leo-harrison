# Lấy dữ liệu, loading và lỗi

> **Lưu ý:** Next.js cần Node.js và một máy chủ nên **không chạy được trong trình duyệt**. Ở đây bạn luyện các **ý tưởng cốt lõi** bằng React và JavaScript thật (bên phải); mỗi bài có phần **chạy trên máy bạn** bằng `npx create-next-app@latest`.

## Cách của Next.js: chờ ngay trên server

Server Component có thể `async` và `await` dữ liệu **trực tiếp**, không cần `useEffect`:

```jsx
// app/posts/page.js
export default async function Posts() {
  const res = await fetch("https://api.example.com/posts");
  const posts = await res.json();
  return <ul>{posts.map((p) => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

Trình duyệt nhận HTML đã có sẵn dữ liệu. Bạn cũng có thể gọi thẳng cơ sở dữ liệu ở đây vì code chạy trên server.

![loading.tsx hiện trong lúc dữ liệu đang tải, error.tsx khi lỗi](/lessons/nextjs/04-data-loading-fig-vi.svg)
*loading.tsx hiện trong lúc dữ liệu đang tải, error.tsx khi lỗi*

## loading.js — trạng thái tải

Đặt file `loading.js` cạnh `page.js`. Next hiện nó ngay trong lúc trang chờ dữ liệu (dựa trên React Suspense):

```jsx
// app/posts/loading.js
export default function Loading() {
  return <p>Đang tải...</p>;
}
```

## error.js — bắt lỗi

```jsx
// app/posts/error.js
"use client";
export default function Error({ error, reset }) {
  return (
    <div>
      <p>Có lỗi: {error.message}</p>
      <button onClick={reset}>Thử lại</button>
    </div>
  );
}
```

## Còn bài tập bên phải?

Trình duyệt không chạy được async Server Component, nên bên phải bạn thực hành **cùng ba trạng thái** (đang tải → thành công → lỗi) bằng `useState` + `useEffect` — cách làm ở **Client Component**. Hiểu ba trạng thái này là bạn hiểu `loading.js` và `error.js`.
