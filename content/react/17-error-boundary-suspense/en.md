# Error boundaries, Suspense and lazy loading

Two "unusual" UI situations: **errors** and **waiting**. React has standard mechanisms for both.

## The problem: one error crashes the whole app

If a component throws during **render**, React unmounts the **entire tree** and the user sees a **white page**. An **Error Boundary** contains the damage: only the failing area shows a fallback while the rest lives on.

```jsx
class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { /* log it */ }
  render() { return this.state.error ? <Fallback /> : this.props.children; }
}
```

Error Boundaries **must still be classes** (no hook yet). The **react-error-boundary** library offers a nicer function API (`resetErrorBoundary`, `FallbackComponent`).

**They catch errors only in rendering, lifecycle and constructors of the subtree.** They do **not** catch: errors in **event handlers** (use `try/catch`), **async code** (`setTimeout`, promises), **SSR**.

Place boundaries at **several levels**: app-wide (last resort) and per **independent area** (widget, tab). Log to **Sentry** in `componentDidCatch`.

![An Error Boundary contains errors; Suspense shows the waiting state](/lessons/react/17-error-boundary-suspense-fig-en.svg)
*An Error Boundary contains errors; Suspense shows the waiting state*

## Suspense: declaring the waiting state

```jsx
<Suspense fallback={<Spinner />}>
  <SomethingLoading />
</Suspense>
```

When a child **isn't ready** (code not loaded, or data being fetched with a supporting library), `Suspense` shows the `fallback`. Choose **waiting boundaries** thoughtfully so ready parts aren't hidden.

## React.lazy: code splitting

```jsx
const Chart = lazy(() => import("./Chart"));   // loaded only when needed
```

A smaller initial JavaScript bundle ⇒ **faster page load**. Split by **route** (one chunk per page) and by **heavy rarely-used components** (charts, editors, maps).

## Combining them

```jsx
<ErrorBoundary>
  <Suspense fallback={<Skeleton />}>
    <Chart />
  </Suspense>
</ErrorBoundary>
```

A code-loading failure (network drop) is also caught by the ErrorBoundary and can offer a **retry**.

## In Next.js

The App Router builds this in: `error.js` (route-level Error Boundary), `loading.js` (route-level Suspense), and **streaming** Server Components.

## References

- react.dev: `Component`, `Suspense`, `lazy`, the Error Boundaries section.
- react-error-boundary; Sentry for React.
