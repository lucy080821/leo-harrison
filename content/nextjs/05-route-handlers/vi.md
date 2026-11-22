# Route Handler: viết API trong Next.js

> **Lưu ý:** Next.js cần Node.js và một máy chủ nên **không chạy được trong trình duyệt**. Ở đây bạn luyện các **ý tưởng cốt lõi** bằng React và JavaScript thật (bên phải); mỗi bài có phần **chạy trên máy bạn** bằng `npx create-next-app@latest`.

Cần API cho trang của bạn (hoặc cho ứng dụng di động)? Tạo file `route.js` — không cần dựng server Express riêng.

```
app/
└─ api/
   └─ todos/
      └─ route.js     →  /api/todos
```

Export một hàm cho **mỗi phương thức HTTP**:

```javascript
// app/api/todos/route.js
export async function GET() {
  return Response.json([{ id: 1, title: "Học Next" }]);
}

export async function POST(request) {
  const body = await request.json();
  return Response.json({ id: 2, title: body.title }, { status: 201 });
}
```

## Request và Response chuẩn Web

Next.js dùng chính các lớp `Request`/`Response` của **Web Standard** (cũng có sẵn trong trình duyệt, Node 18+, Deno, Cloudflare). Vì vậy bạn thử hàm trực tiếp được như ở bên phải, không cần server.

| Việc | Cách |
|---|---|
| Đọc query | `new URL(request.url).searchParams.get("q")` |
| Đọc body JSON | `await request.json()` |
| Đọc header | `request.headers.get("authorization")` |
| Trả JSON | `Response.json(data, { status: 200 })` |

![Route Handler: URL → hàm GET/POST → JSON](/lessons/nextjs/05-route-handlers-fig-vi.svg)
*Route Handler: URL → hàm GET/POST → JSON*

## Đường dẫn động

`app/api/todos/[id]/route.js` nhận id qua tham số thứ hai (một Promise từ Next 15):

```javascript
export async function GET(request, { params }) {
  const { id } = await params;
  return Response.json({ id });
}
```

> Route Handler và `page.js` **không** được đặt cùng thư mục — một đường dẫn chỉ có một vai trò.
