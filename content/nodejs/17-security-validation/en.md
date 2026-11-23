# API security: input validation, injection and headers

> **Note:** a browser has no real Node, so Lexi Learn runs a **simulation** (in-memory fs, a mini `http`/`express`, testing with `app.inject`). The code you write is identical to real Node; each lesson ends with how to run it locally.

All outside data (request bodies, URL parameters, headers, cookies, uploaded files) is **untrusted**. Most serious vulnerabilities come from **trusting what users send**.

## Principle 1: validate input with allow-lists

State **what is valid** (type, length, range, format) and reject the rest. **Deny**-lists ("strip `<script>`") are always bypassed.

- Use a schema library (**Zod**, Joi, Valibot) at the system **boundary**.
- **Prevent mass assignment**: don't assign `req.body` straight into a record; **pick the allowed fields** so attackers can't set `role: "admin"` themselves.
- Limit body **size**, string length, array element count.



![Outside data is untrusted; validate at the boundary before use](/lessons/nodejs/17-security-validation-fig-en.svg)
*Outside data is untrusted; validate at the boundary before use*

## Principle 2: data never becomes code

| Attack | Mechanism | Defence |
|---|---|---|
| **SQL injection** | concatenating data into SQL | **parameterised queries** (`$1`), an ORM/query builder |
| **XSS** | injecting `<script>` into HTML | **context-aware escaping** (React/Next.js do it), CSP, `httpOnly` cookies |
| **Command injection** | concatenating into shell commands | avoid the shell; use `execFile` with an args array |
| **Path traversal** | `../../etc/passwd` | normalise with `path.resolve` and check it stays under the root |
| **SSRF** | server fetches a user-supplied URL | domain allow-list, block internal IP ranges |
| **NoSQL injection** | an object `{ $ne: null }` in a query | type checks: `typeof x === 'string'` |

## Principle 3: security headers

`helmet()` sets many useful headers:

- `Strict-Transport-Security` (HSTS): always use HTTPS.
- `Content-Security-Policy`: limit script sources (reduces XSS damage).
- `X-Content-Type-Options: nosniff`, `X-Frame-Options`/`frame-ancestors` (anti-framing).
- Remove `X-Powered-By: Express` (don't advertise the stack).

## CORS: not server security

CORS only decides **whether a browser lets another website read the response**. It does **not** block `curl` or other servers. Open it only to **needed origins**; **never** `*` together with credentials.

## Principle 4: defence in depth

Assume one layer fails: **least privilege** (a DB account with only needed rights), **don't leak internal errors**, **update dependencies** (`npm audit`, Dependabot), **secrets outside source**, **rate limiting**, **audit logging**.

## The OWASP Top 10 (2021) to know

A01 Broken Access Control · A02 Cryptographic Failures · A03 **Injection** · A04 Insecure Design · A05 Security Misconfiguration · A06 Vulnerable Components · A07 Authentication Failures · A08 Software/Data Integrity Failures · A09 Logging and Monitoring Failures · A10 SSRF.

## References

- OWASP Top 10 (2021); OWASP Cheat Sheet Series: Input Validation, SQL Injection Prevention, XSS Prevention.
- Node.js: "Security Best Practices"; Helmet.js docs.
- MDN: CORS, Content-Security-Policy.
