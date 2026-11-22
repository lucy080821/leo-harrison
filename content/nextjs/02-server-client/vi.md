# Server Component và Client Component

> **Lưu ý:** Next.js cần Node.js và một máy chủ nên **không chạy được trong trình duyệt**. Ở đây bạn luyện các **ý tưởng cốt lõi** bằng React và JavaScript thật (bên phải); mỗi bài có phần **chạy trên máy bạn** bằng `npx create-next-app@latest`.

Đây là ý tưởng quan trọng nhất của App Router.

## Mặc định: Server Component

Trong `app/`, mọi component **chạy trên server** và gửi về trình duyệt dưới dạng HTML đã vẽ sẵn. Lợi ích:

- Tải nhanh hơn, ít JavaScript gửi xuống client.
- Đọc cơ sở dữ liệu, file, khóa bí mật **trực tiếp** — an toàn vì code không rời server.
- Tốt cho SEO (nội dung có sẵn trong HTML).

```jsx
// app/posts/page.js — Server Component, có thể async
export default async function Posts() {
  const res = await fetch("https://api.example.com/posts");
  const posts = await res.json();
  return <ul>{posts.map((p) => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

![Server Component chạy trên server, Client Component chạy trong trình duyệt](/lessons/nextjs/02-server-client-fig-vi.svg)
*Server Component chạy trên server, Client Component chạy trong trình duyệt*

## Client Component: khi cần tương tác

State, sự kiện (`onClick`), hook của trình duyệt (`useEffect`, `window`) chỉ chạy được ở client. Thêm dòng `"use client"` ở **đầu file**:

```jsx
"use client";
import { useState } from "react";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  return <button onClick={() => setLikes(likes + 1)}>👍 {likes}</button>;
}
```

## Cách kết hợp

- Giữ phần lớn trang là Server Component; chỉ những "đảo" nhỏ cần tương tác mới là Client Component.
- Server Component có thể **import** Client Component, và truyền dữ liệu xuống qua props (props phải serialize được: chuỗi, số, mảng, đối tượng thuần — không có hàm).

## renderToString trong bài này

Ở bên phải bạn dùng `renderToString` để thấy đúng thứ server tạo ra: **một chuỗi HTML**. Trình duyệt nhận chuỗi đó rồi (với Client Component) "hydrate" — gắn sự kiện vào để trang sống dậy.
