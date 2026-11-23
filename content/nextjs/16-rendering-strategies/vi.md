> **Lưu ý:** Next.js cần Node.js và một máy chủ nên **không chạy được trong trình duyệt**. Ở đây bạn luyện các **ý tưởng cốt lõi** bằng React và JavaScript thật (bên phải); mỗi bài có phần **chạy trên máy bạn** bằng `npx create-next-app@latest`.

# Chiến lược render: tĩnh, động và Partial Prerendering

Câu hỏi cốt lõi của mọi trang: **HTML được dựng khi nào, ở đâu?** Câu trả lời quyết định **tốc độ, chi phí và độ mới** của dữ liệu.

## Ba mô hình

| Mô hình | HTML dựng | Nhanh | Mới | Dùng cho |
|---|---|---|---|---|
| **Tĩnh** | lúc **build** | nhất (phục vụ từ CDN) | cố định đến lần build sau | trang giới thiệu, tài liệu, blog |
| **Động** | mỗi **yêu cầu** | chậm hơn | luôn mới, theo người dùng | bảng điều khiển, giỏ hàng |
| **Phía client** | trên trình duyệt | HTML ban đầu rỗng | tuỳ | phần rất tương tác |

![Vỏ tĩnh phục vụ ngay, phần động truyền dần trong Suspense](/lessons/nextjs/16-rendering-strategies-fig-vi.svg)
*Vỏ tĩnh phục vụ ngay, phần động truyền dần trong Suspense*

## Cách tiếp cận hiện đại: vỏ tĩnh + phần động truyền dần

Với **Cache Components**, một trang có thể **vừa tĩnh vừa động**:

1. Phần **không phụ thuộc yêu cầu** (và phần dùng `'use cache'`) được **dựng sẵn thành "vỏ tĩnh"** phục vụ tức thì từ CDN.
2. Phần **động** (dữ liệu riêng của người dùng, `cookies()`, `headers()`, `searchParams`, dữ liệu cần luôn mới) nằm trong `<Suspense fallback={…}>` và **truyền (stream) về** khi sẵn sàng.

```jsx
export default function Page() {
  return (
    <>
      <Header />                          {/* tĩnh */}
      <Suspense fallback={<Skeleton />}>
        <UserCart />                      {/* động, truyền dần */}
      </Suspense>
    </>
  )
}
```

Người dùng thấy **nội dung gần như tức thì**, rồi phần cá nhân hoá hiện ra. Đây là ý tưởng của **Partial Prerendering**.

## Điều gì khiến phần nào đó thành động

- Dùng **API phụ thuộc yêu cầu**: `cookies()`, `headers()`, `searchParams`, `params` chưa biết trước.
- Lấy dữ liệu **không cache** (`fetch` không có `'use cache'`).
- Cache **ngắn hạn**: profile `seconds`, `revalidate: 0`, hoặc `expire` < 5 phút: bị **loại khỏi prerender**.

Nếu phần động **không nằm trong Suspense**, công cụ phát triển báo "blocking route" kèm cách sửa.

## Chọn chiến lược theo câu hỏi

1. Dữ liệu có **riêng cho từng người dùng** không? ⇒ động (Suspense).
2. Dữ liệu **đổi bao lâu một lần**? Không bao giờ ⇒ tĩnh; vài phút/giờ ⇒ `'use cache'` + `cacheLife`; từng giây ⇒ động.
3. Có cần **SEO**? Ưu tiên dựng sẵn trên máy chủ.
4. Có thể thay đổi **sau khi người dùng hành động**? ⇒ `updateTag`/`revalidateTag` trong Server Action.

## Đo để quyết định

Xem báo cáo `next build` (tuyến nào tĩnh/động), đo **TTFB** và **LCP** (bài 17), thử **chế độ mạng chậm**.

## Nguồn tham khảo

- Next.js docs: "Caching" (Cache Components), `cacheLife` (prerendering behavior), `use cache`.
- web.dev: "Rendering on the Web".
