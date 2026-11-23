> **Note:** Next.js needs Node.js and a server, so it **can't run inside a browser**. Here you practise the **core ideas** with real React and JavaScript (right side); each lesson has a **run it locally** part using `npx create-next-app@latest`.

# Server Actions: turning forms into server calls

It used to take writing an API, `fetch`ing from the client and hand-managing loading/errors just to save form data. A **Server Function** (usually called a **Server Action** when used for forms/mutations) lets you **call a function that runs on the server straight from the UI**.

## Declaring

```js
// app/actions.js
'use server'

export async function createPost(prevState, formData) {
  const title = formData.get('title')
  // write to the database ...
}
```

The `'use server'` directive at the top of a file (or an async function) marks code that runs on the server. It works from **Server Components** and **Client Components** (imported from a `'use server'` file).

![A form calls a server function; authorization lives inside the function](/lessons/nextjs/07-server-actions-fig-en.svg)
*A form calls a server function; authorization lives inside the function*

## Calling from a form

```jsx
<form action={createPost}>
  <input name="title" />
  <button>Create</button>
</form>
```

The form works **even before JavaScript loads** (progressive enhancement). Underneath it's a `POST` request; Next.js returns both the **new UI** and **new data** in one round trip.

## Expected errors: return them as values

*Expected* errors (validation failures, an API returning 4xx) should **not `throw`**: return an object and show it with `useActionState`:

```jsx
'use client'
const [state, formAction, pending] = useActionState(createPost, { message: '' })
<form action={formAction}>
  ...
  {state?.message && <p aria-live="polite">{state.message}</p>}
  <button disabled={pending}>Create</button>
</form>
```

`pending` lets you disable the button while sending. Only *unexpected* errors (bugs) should `throw` and fall to `error.js`.

## After changing data

Update the cache and navigate: `updateTag('posts')`/`revalidatePath('/posts')` then `redirect('/posts/' + id)` (lesson 8).

## Security: a Server Action is a public endpoint

> Server Functions are reachable via **direct POST requests**, not just through your UI. **Always verify authentication and authorization inside every Server Function.** (Next.js docs)

A checklist for **every** action:

1. **Authentication**: is there a valid session?
2. **Authorization**: may this person do this to **this resource** (don't just hide the button)?
3. **Validate** inputs (a schema like Zod); never trust `formData`.
4. Rate-limit sensitive operations.

## Try it locally

```bash
npx create-next-app@latest
```

Create `app/actions.js` with `'use server'`, a form using `action={createPost}`, and watch the POST request in the Network tab.

## References

- Next.js docs: "Mutating Data" and "Error Handling" (nextjs.org/docs).
- React docs: `'use server'`, `useActionState` (react.dev).
- OWASP: Authorization Cheat Sheet.
