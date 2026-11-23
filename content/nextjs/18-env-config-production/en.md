> **Note:** Next.js needs Node.js and a server, so it **can't run inside a browser**. Here you practise the **core ideas** with real React and JavaScript (right side); each lesson has a **run it locally** part using `npx create-next-app@latest`.

# Configuration and production: env variables, validation and observability

Running on your machine is only **half** the job. Production demands correct configuration, safe secrets, and the ability to **know what's happening**.

## Environment variables

| File | For |
|---|---|
| `.env` | defaults for all environments |
| `.env.local` | secrets on your machine (**don't commit**) |
| `.env.production` | defaults for production |

Key rules:

- Only variables starting with **`NEXT_PUBLIC_`** are **inlined into browser code** at build time. All others are **server-only**.
- **Never** put secrets (API keys, DB passwords) in `NEXT_PUBLIC_*`: anyone can read them in DevTools.
- `.env.local` must be in `.gitignore`. A committed secret counts as **leaked**: rotate it immediately.
- `NEXT_PUBLIC_*` values are **frozen at build time**: changing one needs a rebuild.

![Only NEXT_PUBLIC_ variables reach the browser; secrets stay on the server](/lessons/nextjs/18-env-config-production-fig-en.svg)
*Only NEXT_PUBLIC_ variables reach the browser; secrets stay on the server*

## Validate configuration at startup

Discovering a missing `DATABASE_URL` only when the first user arrives is an expensive failure. Validate **once at startup** (with Zod or a hand-written function) and **stop immediately** if wrong:

```js
const schema = z.object({ DATABASE_URL: z.string().url(), PORT: z.coerce.number().default(3000) })
export const env = schema.parse(process.env)
```

Add `import 'server-only'` to modules holding secrets: importing them into a Client Component then **fails at build time**.

## Observability

| Pillar | Tools | Answers |
|---|---|---|
| **Logs** | structured (JSON) logs: `{level, msg, requestId}` | what happened? |
| **Metrics** | Prometheus/Grafana, Vercel Analytics | is the system healthy? |
| **Traces** | OpenTelemetry (Next.js `instrumentation.js`) | where is a request slow? |
| **Errors** | Sentry | which bug, who is affected? |

Put a **request id** in every log to follow one request. **Don't log sensitive data** (passwords, tokens, cards).

## Health check

`/api/health` returns **200** when the app and dependencies (DB, cache) are fine, **503** when broken: so load balancers, Docker and Kubernetes know when to **take it out of rotation** or **restart**.

## Deployment (recap)

- `next build` then `next start` (Node), or `output: 'standalone'` for a lean **Docker** image.
- Behind **Nginx** as a reverse proxy, enable HTTPS (Let's Encrypt), compression, security headers (lesson 6).
- Have **CI/CD**, **DB backups** you've tested restoring, and a **rollback** plan.

## Pre-launch checklist

1. Env variables complete, validated at startup.
2. HTTPS, security headers (CSP, HSTS).
3. Logs, error monitoring, alerts.
4. Backups and a tested restore.
5. Core Web Vitals pass (lesson 17); sitemap, robots (lesson 14).
6. Friendly 404/500 pages (lesson 15).

## References

- Next.js docs: "Environment Variables", "Deploying", `instrumentation`, `output: 'standalone'`.
- The Twelve-Factor App (12factor.net): Config, Logs.
- OWASP: Logging Cheat Sheet; Secrets Management Cheat Sheet.
