> **Note:** Next.js needs Node.js and a server, so it **can't run inside a browser**. Here you practise the **core ideas** with real React and JavaScript (right side); each lesson has a **run it locally** part using `npx create-next-app@latest`.

# Metadata and SEO: head tags, Open Graph and sitemaps

**SEO** (search engine optimisation) helps people *find* your page; **metadata** helps search engines and social networks *understand and display* it nicely. A big Next.js advantage: HTML is **prerendered on the server**, so bots read the content immediately.

## Static and dynamic metadata

```js
// app/about/page.js
export const metadata = {
  title: 'About',
  description: 'About Learn With Leo',
}

// app/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  return { title: post.title, description: post.summary }
}
```

Metadata **merges** from layout down to page, with children overriding parents. A title template in the root layout:

```js
title: { template: '%s | Learn With Leo', default: 'Learn With Leo' }
```

![Metadata merges from layout down to page and becomes head tags](/lessons/nextjs/14-metadata-seo-fig-en.svg)
*Metadata merges from layout down to page and becomes head tags*

## Important tags

| Tag | Role |
|---|---|
| `<title>` | shown on the tab and in search results; ~50-60 characters |
| `description` | the snippet; ~150-160 characters |
| **canonical** | the "main" URL to avoid duplicate content |
| **Open Graph** (`og:title`, `og:image`…) | preview when shared on Facebook, Slack, etc. |
| `robots` | allow/forbid indexing |
| `alternates.languages` (**hreflang**) | links language versions (VI/EN) |

Open Graph images can be generated with `opengraph-image.js` (using `ImageResponse`).

## sitemap.xml and robots.txt

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

`robots.txt` is **not security**: it only hints to polite bots. Private content needs authentication.

## Structured data (JSON-LD)

Embed `<script type="application/ld+json">` describing an article, product, review to earn **rich results**. Check with Google's *Rich Results Test*.

## Checklist

1. Every page has a **unique title and description**.
2. **One `<h1>`**; headings in proper hierarchy.
3. Short, readable URLs; correct **canonical**.
4. **Speed** and **mobile**: Core Web Vitals (lesson 17).
5. Submit the **sitemap** to Google Search Console, watch indexing errors.

## References

- Next.js docs: "Metadata and OG images", the `generateMetadata`, `sitemap`, `robots` APIs.
- Google Search Central: SEO Starter Guide; schema.org; Open Graph protocol (ogp.me).
