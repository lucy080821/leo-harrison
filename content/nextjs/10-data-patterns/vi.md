> **Lưu ý:** Next.js cần Node.js và một máy chủ nên **không chạy được trong trình duyệt**. Ở đây bạn luyện các **ý tưởng cốt lõi** bằng React và JavaScript thật (bên phải); mỗi bài có phần **chạy trên máy bạn** bằng `npx create-next-app@latest`.

# Lấy dữ liệu: song song, tuần tự và chống trùng lặp

Trong Server Components bạn lấy dữ liệu **ngay trong component bất đồng bộ**, không cần `useEffect`:

```jsx
export default async function Page() {
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()
  return <ul>{posts.map((p) => <li key={p.id}>{p.title}</li>)}</ul>
}
```

Cũng có thể truy vấn **trực tiếp CSDL/ORM** (Prisma, Drizzle) vì mã chạy trên máy chủ; khoá bí mật không bao giờ lộ ra trình duyệt.

## Tuần tự và song song

- **Tuần tự (waterfall)**: yêu cầu B **phụ thuộc** kết quả A (cần `userId` để lấy bài viết). Chậm hơn nhưng đôi khi bắt buộc.
- **Song song**: các yêu cầu **độc lập** phải bắt đầu **cùng lúc**:

```js
const [user, posts] = await Promise.all([getUser(), getPosts()])
```

Quên điều này là **nguyên nhân hiệu năng số một** của trang chậm: hai yêu cầu 200 ms tuần tự tốn 400 ms; song song tốn 200 ms.

![Song song chỉ tốn thời gian của yêu cầu chậm nhất](/lessons/nextjs/10-data-patterns-fig-vi.svg)
*Song song chỉ tốn thời gian của yêu cầu chậm nhất*

## Hai mẫu hiệu quả

1. **Khởi động sớm**: gọi hàm lấy dữ liệu (chưa `await`) ở đầu, rồi `await` sau khi làm việc khác.
2. **Mỗi component tự lấy dữ liệu nó cần** thay vì một component cha lấy tất cả rồi truyền xuống: Next.js sẽ **chống trùng lặp** và cho **truyền dần (stream)** từng khối bằng `<Suspense>`.

## Chống trùng lặp: React.cache

Nhiều component cùng cần `getUser(id)` trong một lượt render: bọc bằng `cache` để chỉ chạy **một lần**:

```js
import { cache } from 'react'
export const getUser = cache(async (id) => db.user.findUnique({ where: { id } }))
```

(`fetch` giống hệt nhau cũng được chống trùng lặp tự động trong một lượt render.) Để cache **qua nhiều yêu cầu**, dùng `'use cache'` (bài 8).

## Truyền dần với Suspense và loading.js

- `loading.js` trong thư mục tuyến: giao diện chờ cho **cả trang**.
- `<Suspense>`: chờ **từng khối**, phần còn lại hiển thị ngay.

Thiết kế giao diện chờ có ý nghĩa (khung xương đúng hình dạng) để tránh **dịch chuyển bố cục**.

## Client Component

Dữ liệu trong Client Component: truyền **promise** từ Server Component rồi đọc bằng `use(promise)` trong `<Suspense>`, hoặc dùng TanStack Query/SWR.

## Sai lầm hay gặp

- `await` lần lượt các yêu cầu không phụ thuộc nhau.
- Trả cả bản ghi CSDL xuống Client Component (lộ trường nhạy cảm): chỉ truyền **trường cần thiết**.
- Lấy dữ liệu trong vòng lặp (N+1): gom thành một truy vấn.

## Nguồn tham khảo

- Next.js docs: "Fetching Data" (mục Sequential/Parallel/React.cache/Preloading).
- React docs: `cache`, `use`, `Suspense`.
