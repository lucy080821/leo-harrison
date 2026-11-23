# Tokens and JWT: structure, expiry and pitfalls

> **Note:** a browser has no real Node, so Lexi Learn runs a **simulation** (in-memory fs, a mini `http`/`express`, testing with `app.inject`). The code you write is identical to real Node; each lesson ends with how to run it locally.

**JWT (JSON Web Token)** packs "who, what permissions, until when" into a **signed** string. APIs use it to know who a request comes from without a database lookup each time.

## Structure: three parts separated by dots

```
eyJhbGciOiJIUzI1NiJ9 . eyJzdWIiOiI0MiIsImV4cCI6MTc... . 7dK3...
      header                    payload (claims)        signature
```

- **header**: the signing algorithm (`HS256`, `RS256`, `EdDSA`).
- **payload**: **claims** — `sub` (subject), `exp` (expiry, Unix seconds), `iat`, `iss`, `aud`, plus custom data (`role`).
- **signature**: a signature over `header.payload`; anyone altering the payload makes the signature **wrong**.

The first two parts are **base64url** (lesson 10) and **unencrypted**: anyone can read them. **Put no secrets** (passwords, card numbers) in the payload.

![A JWT has three parts separated by dots](/lessons/nodejs/14-tokens-jwt-fig-en.svg)
*A JWT has three parts separated by dots*

## Signing and verifying

- **HS256**: one **shared secret** (HMAC-SHA256). Simple, when the same service signs and verifies.
- **RS256/ES256/EdDSA**: **private key signs, public key verifies**: many services verify without knowing the signing key (the model of OIDC single sign-on).

When verifying you **must**:

1. Check the **signature** with the **algorithm you specify** (don't trust the token's `alg` field: the `alg: none` attack).
2. `exp` hasn't passed (allow a few tens of seconds of clock skew).
3. `iss` and `aud` are right.
4. Use a vetted library (**jose**, `jsonwebtoken`); **don't write your own** (this lesson uses a fake signature just to teach the structure).



## When to use, when not

| Suitable | Not suitable |
|---|---|
| stateless APIs, microservices | ordinary **browser login sessions** |
| **short-lived** tokens (5-15 min) | long-lived, irrevocable tokens |

**The big downside:** an issued token is **hard to revoke** before expiry (password change, theft). For ordinary web apps, **server-side sessions + `httpOnly` cookies** (Next.js course lesson 12) are simpler and safer. If you use JWT: **short-lived** access tokens + a rotating **refresh token** in an `httpOnly` cookie, **not** in `localStorage` (stolen via XSS).

## Remember

- Keep the signing key in environment variables/a secret store and **rotate** it periodically (`kid` in the header).
- Don't stuff too much into the payload (the token is sent with **every** request).
- Always use **HTTPS**.

## References

- RFC 7519 (JWT), RFC 7515 (JWS), RFC 8725 (JWT Best Current Practices).
- OWASP: JSON Web Token Cheat Sheet.
- The `jose` library (github.com/panva/jose).
