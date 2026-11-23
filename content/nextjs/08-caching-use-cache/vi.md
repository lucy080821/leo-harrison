> **Lưu ý:** Next.js cần Node.js và một máy chủ nên **không chạy được trong trình duyệt**. Ở đây bạn luyện các **ý tưởng cốt lõi** bằng React và JavaScript thật (bên phải); mỗi bài có phần **chạy trên máy bạn** bằng `npx create-next-app@latest`.

# Cache: 'use cache', cacheLife và cacheTag

Phần lớn dữ liệu trang web **không đổi mỗi giây**. Lưu kết quả (cache) giúp trang nhanh hơn và giảm tải CSDL/API. Khó khăn kinh điển: *"có hai việc khó trong khoa học máy tính: vô hiệu hoá cache và đặt tên"*.

## Cache Components (Next.js 16)

Khi bật `cacheComponents: true` (các ứng dụng tạo mới bằng `create-next-app` đã bật sẵn), **mọi thứ mặc định là động**, và bạn **chủ động chọn cái gì được cache** bằng chỉ thị `'use cache'`:

```js
import { cacheLife } from 'next/cache'

export async function getProducts() {
  'use cache'
  cacheLife('hours')
  return db.query('SELECT * FROM products')
}
```

- **Mức dữ liệu**: cache một hàm lấy dữ liệu.
- **Mức giao diện**: cache cả component/trang (`'use cache'` đầu thân component).
- Đối số và biến bắt từ phạm vi ngoài **tự thành một phần của khoá cache**.

![Cache theo thời gian (cacheLife) và làm mới theo thẻ (cacheTag)](/lessons/nextjs/08-caching-use-cache-fig-vi.svg)
*Cache theo thời gian (cacheLife) và làm mới theo thẻ (cacheTag)*

## cacheLife: thời hạn

| Profile | stale | revalidate | expire |
|---|---|---|---|
| `seconds` | 30 giây | 1 giây | 60 giây |
| `minutes` | 5 phút | 1 phút | 1 giờ |
| `hours` | 5 phút | 1 giờ | 1 ngày |
| `days` | 5 phút | 1 ngày | 1 tuần |
| `max` | 5 phút | 30 ngày | 1 năm |

Có thể truyền object `{ stale, revalidate, expire }` (giây). Nên **luôn đi kèm** `cacheLife` thay vì dùng mặc định.

## cacheTag + revalidateTag/updateTag: làm mới theo yêu cầu

```js
export async function getProducts() {
  'use cache'
  cacheTag('products')
  ...
}

// trong Server Action sau khi sửa dữ liệu:
updateTag('products')              // hết hạn NGAY: người dùng thấy thay đổi của mình
revalidateTag('products', 'max')   // stale-while-revalidate: trả bản cũ, làm mới nền
```

- **`updateTag`**: chỉ dùng trong Server Action; đọc-được-ghi-của-chính-mình.
- **`revalidateTag(tag, 'max')`**: cho nội dung chấp nhận trễ chút.
- **`revalidatePath('/posts')`**: làm mới theo đường dẫn.

## Dữ liệu cần mới mỗi yêu cầu

**Không** dùng `'use cache'`; bọc component trong `<Suspense fallback={…}>` để phần **tĩnh được dựng sẵn** và phần động **truyền (stream) về** khi sẵn sàng. API phụ thuộc yêu cầu (`cookies()`, `headers()`, `searchParams`) cũng nên nằm trong `<Suspense>`.

## Cache sai là bug khó thấy

- Dữ liệu **riêng của người dùng** (giỏ hàng, hồ sơ) không được cache dùng chung giữa mọi người.
- Quên làm mới sau khi sửa ⇒ người dùng thấy dữ liệu cũ.
- Chọn thời hạn theo **độ nhạy cảm của nghiệp vụ**: giá/tồn kho ngắn, bài blog dài.

## Chạy thử trên máy bạn

Trong `next.config.ts` bật `cacheComponents: true`, thêm `'use cache'` + `cacheLife('minutes')` vào một hàm có `console.log`, và xem log chỉ chạy lại khi hết hạn.

## Nguồn tham khảo

- Next.js docs: "Caching", "Revalidating", `cacheLife`, `cacheTag`, `updateTag`, `revalidateTag`.
- MDN: HTTP caching; RFC 5861 (stale-while-revalidate).
