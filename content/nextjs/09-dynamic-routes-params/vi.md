> **Lưu ý:** Next.js cần Node.js và một máy chủ nên **không chạy được trong trình duyệt**. Ở đây bạn luyện các **ý tưởng cốt lõi** bằng React và JavaScript thật (bên phải); mỗi bài có phần **chạy trên máy bạn** bằng `npx create-next-app@latest`.

# Route động: [slug], [...slug] và params bất đồng bộ

Không thể tạo một thư mục cho mỗi bài blog hay mỗi sản phẩm. **Route động** dùng tên thư mục đặc biệt làm "khuôn".

## Các loại segment

| Thư mục | Khớp | `params` |
|---|---|---|
| `app/blog/[slug]/page.js` | `/blog/hello` | `{ slug: 'hello' }` |
| `app/docs/[...slug]/page.js` | `/docs/a/b/c` (cần ≥ 1 đoạn) | `{ slug: ['a','b','c'] }` |
| `app/shop/[[...slug]]/page.js` | `/shop` và `/shop/a/b` (**tuỳ chọn**) | `{}` hoặc `{ slug: [...] }` |

![Thư mục động khớp URL và trao params cho trang](/lessons/nextjs/09-dynamic-routes-params-fig-vi.svg)
*Thư mục động khớp URL và trao params cho trang*

## params là Promise

Trong các phiên bản mới, `params` (và `searchParams`) là **Promise**: phải `await`:

```jsx
export default async function Page({ params }) {
  const { slug } = await params
  return <h1>{slug}</h1>
}
```

(Lý do: giúp Next.js dựng sẵn phần tĩnh và chỉ chờ dữ liệu theo yêu cầu khi cần.) Trong Client Component dùng `use(params)` hoặc hook `useParams()`.

## generateStaticParams: dựng sẵn lúc build

```js
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((p) => ({ slug: p.slug }))
}
```

Các đường dẫn trả về được **dựng sẵn thành HTML tĩnh** (nhanh nhất, rẻ nhất). Đường dẫn khác được dựng khi có yêu cầu đầu tiên (rồi cache). Với Cache Components, dữ liệu theo `params` thường được dựng sẵn cho các giá trị đã biết.

## searchParams

Truy vấn `?page=2` đến qua `searchParams` (cũng là Promise). Vì phụ thuộc **yêu cầu**, trang dùng `searchParams` là **động**; bọc phần dùng nó trong `<Suspense>`.

## Kiểm tra và xử lý đầu vào

`params` đến từ URL, tức **người dùng kiểm soát**:

- Kiểm tra định dạng (`/^[a-z0-9-]+$/`), kiểu số (`Number.isInteger`).
- Không tìm thấy dữ liệu ⇒ gọi `notFound()` để trả **404** đúng nghĩa.
- Không ghép `params` trực tiếp vào truy vấn SQL (dùng tham số hoá).

## Nhóm tuyến và cấu trúc

`(marketing)` là **route group**: tổ chức thư mục mà **không** thêm vào URL. `_private` bị loại khỏi định tuyến. `@slot` là parallel route (nâng cao).

## Chạy thử trên máy bạn

Tạo `app/blog/[slug]/page.js` in `slug`; thử `/blog/a`, rồi `app/docs/[...slug]/page.js` với `/docs/x/y`.

## Nguồn tham khảo

- Next.js docs: "Dynamic Routes", `generateStaticParams`, `page.js` (params/searchParams).
- MDN: URL và `URLSearchParams`.
