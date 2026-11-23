> **Note:** Next.js needs Node.js and a server, so it **can't run inside a browser**. Here you practise the **core ideas** with real React and JavaScript (right side); each lesson has a **run it locally** part using `npx create-next-app@latest`.

# Images, fonts and CSS: optimising Core Web Vitals

Images and fonts are often the **heaviest** part of a page. Next.js ships tools to optimise them: used correctly they directly improve **LCP** and **CLS** (lesson 17).

## next/image

```jsx
import Image from 'next/image'

<Image src="/hero.webp" alt="Lexi store" width={1600} height={900} priority />
```

Automatically:

- Generates **multiple sizes** (`srcset`) and picks the **just-enough** size for the screen/DPR (default `deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]`).
- Converts to modern formats (**WebP/AVIF**) when the browser supports them.
- **Lazy-loads** offscreen images.
- **Reserves space** via `width`/`height` ⇒ no **layout shift (CLS)**.

| Prop | Use when |
|---|---|
| `width`, `height` | local/remote images with known size |
| `fill` + `sizes` | image fills its parent (needs `sizes` to pick the right size) |
| `priority` | the **LCP** image (hero at the top), load immediately |
| `alt` | **required**; describes content (accessibility, SEO) |

Images from other domains must be declared in the config's `images.remotePatterns` (security, preventing abuse of the optimiser).

![next/image picks a fitting size and reserves space to avoid layout shift](/lessons/nextjs/13-images-fonts-css-fig-en.svg)
*next/image picks a fitting size and reserves space to avoid layout shift*

## next/font

```jsx
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin', 'vietnamese'] })
<body className={inter.className}>
```

Fonts are **downloaded at build time and served from your own domain**: no requests to Google when users visit, **no text flash** (FOUT) thanks to size-adjusted fallback fonts. Remember the `vietnamese` subset for Vietnamese text.

## CSS

| Approach | Notes |
|---|---|
| **Tailwind CSS** | atomic utilities, the most popular choice |
| **CSS Modules** (`x.module.css`) | local class names, no clashes |
| Global CSS | `app/globals.css` for variables, resets |
| Runtime CSS-in-JS | needs care with Server Components |

## Golden rules

1. LCP image: `priority`, correct size, modern format.
2. **Always** declare dimensions (or `aspect-ratio`) to reserve space.
3. Don't load images larger than displayed; use accurate `sizes`.
4. Few font families and weights; use variable fonts.
5. Measure with **Lighthouse** and real-user data (CrUX).

## References

- Next.js docs: "Images", "Fonts", `<Image>` API reference (`deviceSizes`, `remotePatterns`).
- web.dev: "Optimize Largest Contentful Paint", "Cumulative Layout Shift".
