> **Lưu ý:** Next.js cần Node.js và một máy chủ nên **không chạy được trong trình duyệt**. Ở đây bạn luyện các **ý tưởng cốt lõi** bằng React và JavaScript thật (bên phải); mỗi bài có phần **chạy trên máy bạn** bằng `npx create-next-app@latest`.

# Metadata và SEO: thẻ head, Open Graph và sitemap

**SEO** (tối ưu công cụ tìm kiếm) giúp người ta *tìm thấy* trang của bạn; **metadata** giúp công cụ tìm kiếm và mạng xã hội *hiểu và hiển thị* nó đẹp. Lợi thế lớn của Next.js: HTML được **dựng sẵn trên máy chủ** nên bot đọc được nội dung ngay.

## Metadata tĩnh và động

```js
// app/about/page.js
export const metadata = {
  title: 'Giới thiệu',
  description: 'Về Learn With Leo',
}

// app/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  return { title: post.title, description: post.summary }
}
```

Metadata **gộp** từ layout đến trang, trang con ghi đè cha. Mẫu tiêu đề trong layout gốc:

```js
title: { template: '%s | Learn With Leo', default: 'Learn With Leo' }
```

![Metadata được gộp từ layout xuống trang và biến thành thẻ head](/lessons/nextjs/14-metadata-seo-fig-vi.svg)
*Metadata được gộp từ layout xuống trang và biến thành thẻ head*

## Những thẻ quan trọng

| Thẻ | Vai trò |
|---|---|
| `<title>` | hiện trên tab và kết quả tìm kiếm; ~50-60 ký tự |
| `description` | đoạn mô tả; ~150-160 ký tự |
| **canonical** | URL "chính" để tránh nội dung trùng lặp |
| **Open Graph** (`og:title`, `og:image`…) | xem trước khi chia sẻ Facebook, Zalo, Slack |
| `robots` | cho phép/cấm lập chỉ mục |
| `alternates.languages` (**hreflang**) | liên kết các bản ngôn ngữ (VI/EN) |

Ảnh Open Graph tự sinh được bằng `opengraph-image.js` (dùng `ImageResponse`).

## sitemap.xml và robots.txt

```js
// app/sitemap.js
export default async function sitemap() {
  const posts = await getPosts()
  return posts.map((p) => ({ url: `https://site.com/blog/${p.slug}`, lastModified: p.updatedAt }))
}

// app/robots.js
export default function robots() {
  return { rules: { userAgent: '*', disallow: ['/admin'] }, sitemap: 'https://site.com/sitemap.xml' }
}
```

`robots.txt` **không phải bảo mật**: chỉ gợi ý cho bot lịch sự. Nội dung riêng tư cần xác thực.

## Dữ liệu có cấu trúc (JSON-LD)

Nhúng `<script type="application/ld+json">` mô tả bài viết, sản phẩm, đánh giá để được hiển thị **kết quả nâng cao**. Kiểm tra bằng *Rich Results Test* của Google.

## Danh sách kiểm tra

1. Mỗi trang có **title và description duy nhất**.
2. Có **một `<h1>`**; tiêu đề phân cấp đúng.
3. URL ngắn, dễ đọc; **canonical** đúng.
4. **Tốc độ** và **di động**: Core Web Vitals (bài 17).
5. Nộp **sitemap** lên Google Search Console, theo dõi lỗi lập chỉ mục.

## Nguồn tham khảo

- Next.js docs: "Metadata and OG images", API `generateMetadata`, `sitemap`, `robots`.
- Google Search Central: SEO Starter Guide; schema.org; Open Graph protocol (ogp.me).
