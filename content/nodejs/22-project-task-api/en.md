# Project: a task API with authentication, validation and tests

> **Note:** a browser has no real Node, so Learn With Leo runs a **simulation** (in-memory fs, a mini `http`/`express`, testing with `app.inject`). The code you write is identical to real Node; each lesson ends with how to run it locally.

The course capstone: combine Express, middleware, authentication, input validation, ownership authorisation and testing into **a small API done the right way**.

## Requirements

- Users send `Authorization: Bearer <token>`.
- `POST /tasks` creates, `GET /tasks` lists, `PATCH /tasks/:id` completes, `DELETE /tasks/:id` deletes.
- **Each person sees and edits only their own tasks.**

![The API's layers: authentication, validation, ownership](/lessons/nodejs/22-project-task-api-fig-en.svg)
*The API's layers: authentication, validation, ownership*

## Layered design

```
express.json()          → parse JSON (size-limited)
authenticate            → attach req.user from the token (or undefined)
requireAuth             → 401 if not authenticated
validate                → 400 on bad input
handler                 → business logic + ownership check
errorHandler            → generic 500, detailed log
```



## Three key points

1. **Authenticate, then authorise, in order.** `401` = "I don't know who you are"; `403/404` = "I know you, but you may not".
2. **Check ownership in every query.** Filter by `ownerId === req.user.id` right in the lookup (or `WHERE id=? AND owner_id=?` in SQL). Forgetting this is an **IDOR** bug, the most common security flaw (lesson 17).
3. **Return 404 rather than 403 for others' resources** if you don't want to reveal that they exist.

## Status code table

| Situation | Code |
|---|---|
| created | **201** |
| not authenticated | **401** |
| bad input | **400** (with a list of errors) |
| missing / not yours | **404** |
| deleted | **204** |

## Testing with inject

Call the app directly as in this lesson (`app.inject`; in practice `supertest`) and check **the error paths too**: missing token, bad token, bad input, accessing someone else's task (lesson 15). Each security rule deserves **a test** so edits don't break it.

## From exercise to production

| This exercise | Production |
|---|---|
| hardcoded tokens in an object | real sessions/short-lived JWT, Argon2-hashed passwords (lesson 14, Next.js course lesson 12) |
| in-memory array | **PostgreSQL** + repository, transactions, indexes (lesson 18) |
| hand-written `validate` | **Zod** schemas, size limits |
| `console.log` | **pino** + request id (lesson 21) |
| unlimited | **rate limit**, CORS, `helmet` (lessons 16, 17) |
| running `node` directly | **Docker**, graceful SIGTERM shutdown, health check, CI/CD (lesson 12) |

## Where next

Learn **TypeScript** to type requests/responses; **Fastify/NestJS** if you need a structured framework; **OpenAPI** to describe the API; a **job queue** (BullMQ) for background work; then deploy for real to a VPS (see Next.js course lesson 6).

## References

- Express docs: "Routing", "Using middleware".
- OWASP API Security Top 10 (API1: Broken Object Level Authorization).
- Microsoft REST API Guidelines; RFC 9110 (HTTP semantics).
