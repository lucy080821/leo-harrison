# Metadata, optimisation and deploying to a VPS

> **Note:** Next.js needs Node.js and a server, so it **can't run inside a browser**. Here you practise the **core ideas** with real React and JavaScript (right side); each lesson has a **run it locally** part using `npx create-next-app@latest`.

## Metadata (SEO)

Set the title/description so search engines and social networks understand your page:

```javascript
// app/about/page.js — static metadata
export const metadata = {
  title: "About",
  description: "About Lexi Learn",
};

// app/blog/[slug]/page.js — dynamic metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: slug };
}
```

## Built-in optimisation

- `next/image`: automatically resizes, compresses and lazy-loads images. `<Image src="/a.png" alt="…" width={600} height={400} />`
- `next/font`: self-hosts fonts with no text flash.
- Automatic per-page JavaScript splitting.
- Static pages are pre-built at build time and served very fast.

## Environment variables

A `.env.local` file (never commit it!):

```
DATABASE_URL=...
NEXT_PUBLIC_SITE_NAME=Lexi
```

Only variables prefixed `NEXT_PUBLIC_` are exposed to the browser. The rest are server-only.

## Deploying to a Hostinger VPS

```bash
# on the server (Node.js 20+ installed)
git clone <repo> && cd <repo>
npm ci
npm run build          # produce the production build
npm run start          # runs on port 3000 (set PORT=… to change)
```

To keep it alive and restart after a reboot, use **pm2**:

```bash
npm i -g pm2
pm2 start npm --name lexi -- start
pm2 save && pm2 startup
```

Then put **Nginx** in front as a reverse proxy from ports 80/443 to `localhost:3000`, and get free HTTPS with **Let's Encrypt** (`certbot`).

The very site you're using is deployed exactly this way.
