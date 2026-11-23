# Data fetching: loading, errors and race conditions

Almost every real app fetches data from a server. "Call the API" sounds simple, but a good UI handles **three states**, not just success.

## The three states

| State | What the user sees |
|---|---|
| **loading** | a skeleton or "Loading…" |
| **error** | a clear message + a **Retry** button |
| **success** | the data (including the **empty** case: "No data yet") |

Combine them in one `{ status, data, error }` state rather than separate booleans (avoids impossible states like loading and error together).

![The three states of a data request](/lessons/react/09-data-fetching-fig-en.svg)
*The three states of a data request*

## The standard pattern with useEffect

```jsx
useEffect(() => {
  let ignore = false;
  setState({ status: "loading" });
  fetchUser(id)
    .then((u) => !ignore && setState({ status: "success", user: u }))
    .catch((e) => !ignore && setState({ status: "error", message: e.message }));
  return () => { ignore = true; };   // cleanup
}, [id]);
```

## Race conditions

The user clicks fast through id 1 → 2 → 3. The request for id 1 may return **after** id 3's and **overwrite** the correct result with stale data. The `ignore` flag in the cleanup discards the response of a superseded run. With real `fetch`, add an `AbortController` to **cancel** the request:

```jsx
const ctrl = new AbortController();
fetch(url, { signal: ctrl.signal });
return () => ctrl.abort();
```

## In practice: use a library

Write it by hand once to understand it. Real projects should use **TanStack Query** or **SWR**: caching, automatic retries, background refresh, request de-duplication, built-in loading/error states. With Next.js, prefer **fetching on the server** (Server Components).

## Common mistakes

- Forgetting to check `response.ok`: `fetch` **doesn't throw** on HTTP 404/500; you must check.
- Forgetting cleanup ⇒ state updates after the component is gone.
- Showing a mix of old and new data while switching ids (reset to loading).

## References

- React docs: "Synchronizing with Effects" and "You Might Not Need an Effect" (react.dev).
- MDN: Using the Fetch API; AbortController.
- TanStack Query documentation.
