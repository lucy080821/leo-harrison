> **Note:** Next.js needs Node.js and a server, so it **can't run inside a browser**. Here you practise the **core ideas** with real React and JavaScript (right side); each lesson has a **run it locally** part using `npx create-next-app@latest`.

# Real performance: Core Web Vitals (LCP, CLS, INP)

Speed isn't a feeling but a **measurement**. **Core Web Vitals** are three metrics Google uses to judge a page's **real experience**, and a search ranking signal.

## The three metrics

| Metric | Measures | Good | Needs improvement | Poor |
|---|---|---|---|---|
| **LCP** (Largest Contentful Paint) | time to show the **largest content** (usually the hero image) | ≤ 2.5 s | ≤ 4 s | > 4 s |
| **INP** (Interaction to Next Paint) | response delay of **all interactions** (click, type) | ≤ 200 ms | ≤ 500 ms | > 500 ms |
| **CLS** (Cumulative Layout Shift) | unexpected **layout shifts** | ≤ 0.1 | ≤ 0.25 | > 0.25 |

(INP replaced FID in March 2024.) Judged at the **75th percentile** of real users.

![The three Core Web Vitals and their good thresholds](/lessons/nextjs/17-core-web-vitals-fig-en.svg)
*The three Core Web Vitals and their good thresholds*

## Improving LCP

- Hero image: `next/image` + `priority`, AVIF/WebP, correct size (lesson 13).
- **Low TTFB**: prerender/cache, CDN, close to users (lesson 16).
- Cut **render-blocking** CSS/JS; load fonts early (`next/font`).

## Improving INP

- Reduce **JavaScript on the main thread**: code split (`lazy`), fewer Client Components, drop heavy libraries.
- Break up long tasks (> 50 ms); `useTransition`/`useDeferredValue` (React course).
- Avoid needless re-renders (`memo`, push state down).

## Improving CLS

- Always declare **image/video/ad dimensions** (or `aspect-ratio`).
- Skeletons of the **right shape** for content.
- Don't insert content above what the user is viewing; fonts with size-adjusted fallbacks.

Each shift = **fraction of viewport affected × distance moved**; CLS sums shifts (within a session window).

## Measuring

| Kind | Tools |
|---|---|
| **Lab** (reproducible) | Lighthouse, Chrome DevTools Performance |
| **Field** (real users) | CrUX/PageSpeed Insights, the `web-vitals` library, Next.js's `useReportWebVitals` |

Field data is the **final standard**; Lighthouse is for debugging.

## Analysing the JavaScript bundle

`@next/bundle-analyzer` maps the bundle tree: find large libraries (moment, all of lodash) ⇒ swap for lighter ones, import by part, or move into a **Server Component** (server code is **not sent to the browser**). This is a big performance win of Server Components.

## Performance budgets

Set a budget (e.g. initial JS < 170 KB compressed) and fail CI when exceeded.

## References

- web.dev: "Core Web Vitals", "Web Vitals" (thresholds), "Optimize INP", "Optimize CLS".
- Next.js docs: "Analytics/web vitals", bundle analyzer.
