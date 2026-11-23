> **Note:** Next.js needs Node.js and a server, so it **can't run inside a browser**. Here you practise the **core ideas** with real React and JavaScript (right side); each lesson has a **run it locally** part using `npx create-next-app@latest`.

# Authentication: sessions, cookies and the data access layer (DAL)

**Authentication**: *who are you*. **Authorization**: *what may you do*. Mixing them up is the root of many vulnerabilities.

> Practical advice: use a proven library (**Auth.js**, **Better Auth**, **Clerk**, **Supabase Auth**…) rather than writing your own. This lesson helps you **understand the mechanics** to use and audit them properly.

## Passwords

- **Never store raw passwords.** Store a **slow, salted hash**: **Argon2id** (OWASP's recommendation), or scrypt/bcrypt.
- Don't use bare MD5/SHA-1/SHA-256 (too fast to crack).
- Return a **generic** error ("wrong email or password") so you don't reveal which accounts exist; rate-limit attempts.

![Three layers: optimistic proxy, the DAL decides, UI is only convenience](/lessons/nextjs/12-authentication-sessions-fig-en.svg)
*Three layers: optimistic proxy, the DAL decides, UI is only convenience*

## Sessions

After sign-in the server creates a **session** and sends a **cookie**:

| Approach | Description | Pros/cons |
|---|---|---|
| **Server-side session** | the cookie holds a **random ID**; session data in a DB/Redis | instantly revocable; needs a store |
| **Stateless (JWT/signed cookie)** | the cookie holds **signed/encrypted** data | no store; hard to revoke |

A secure cookie:

```js
cookieStore.set('session', id, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 604800 })
```

- `httpOnly`: JavaScript can't read it (guards against theft via XSS).
- `secure`: sent over HTTPS only.
- `sameSite=lax`: lowers **CSRF** risk.

## Three layers of checks in Next.js

1. **Proxy**: an **optimistic** check, only reading the cookie to redirect fast (lesson 11).
2. **Data access layer (DAL)**: a centralised `verifySession()` and queries that **check ownership**, called wherever data is accessed.
3. **UI**: hiding a button is just for **better experience**, not security.

## IDOR and access control

*Insecure Direct Object Reference*: a user changes `/invoice/7` to `/invoice/8` and sees someone else's invoice. Prevent it by **checking ownership on every query** (`WHERE id = ? AND owner_id = ?`). This is the **most common security flaw** (OWASP Top 10: Broken Access Control).

## Don't forget

- **Sign-out** must delete the server-side session.
- **Rotate the session ID** after sign-in (against session fixation).
- **CSRF**: Server Actions have `Origin`-matching protection; Route Handlers must handle it themselves.
- Protect **endpoints** (Server Actions, Route Handlers) just like pages.
- Enable **two-factor authentication** for sensitive accounts.

## References

- Next.js docs: the "Authentication" guide.
- OWASP: Password Storage Cheat Sheet, Session Management Cheat Sheet, Top 10 (A01 Broken Access Control).
- MDN: `Set-Cookie`.
