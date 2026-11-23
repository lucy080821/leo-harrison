# Project: a shopping cart with useReducer, Context and derived state

A capstone: combine the course's techniques into a **realistic** feature, an e-commerce cart.

## Step 1: design minimal state

Rule: store **as little as possible**, **derive** the rest.

```js
// Store: id and quantity. DON'T store name, price, total.
lines = [{ id: 1, qty: 2 }, { id: 2, qty: 1 }]
```

Prices and names come from the product catalogue (the source of truth); **the total and count are computed each render**. They can never drift.

![Minimal state in a reducer; total and count are derived](/lessons/react/20-project-shopping-cart-fig-en.svg)
*Minimal state in a reducer; total and count are derived*

## Step 2: a pure reducer

```js
function reducer(state, action) {
  switch (action.type) {
    case "add": /* increase qty or add a line */
    case "remove": return state.filter((l) => l.id !== action.id);
  }
}
```

- **Pure**: same input gives same output, **no mutation** of `state`, no side effects.
- Easy to **test** directly (lesson 19): `expect(reducer([], {type:"add", id:1})).toEqual([{id:1, qty:1}])`.

## Step 3: Context for shared state

`CartProvider` holds the `useReducer` and broadcasts `{ lines, dispatch }` down the tree. A `useCart()` hook hides the Context details. The shop (Add buttons) and the cart (total) are far apart yet share data, **with no prop drilling**.



## Step 4: making it production-ready

| Feature | Suggestion |
|---|---|
| Increase/decrease quantity, remove at qty = 0 | add a `dec` action |
| Cart **persists** across reloads | `useLocalStorage` (lesson 12) for `lines` |
| Discount codes | derive an extra discount step; validate on the server |
| Real prices | fetch from an API with TanStack Query (lesson 9), never trust client prices |
| Performance | `memo` product rows, split read/write Contexts |
| Accessibility | `aria-live` announcing "Added to cart" (lesson 16) |
| Testing | the reducer (unit) + add/remove flow (Testing Library) |

## Design lessons

1. **Single source of truth**: little state, much derived data.
2. **Separate logic from UI**: a pure reducer ⇒ easy to test and extend.
3. **Put state in the right place**: Context is enough for a cart; if updates are rapid, consider an external store (lesson 14).
4. **The server has the final say** on prices and stock.

## Where next

Learn **Next.js** for routing, server data fetching and deployment; **TypeScript** to type `action` and `state` (a discriminated union for `action.type`).

## References

- react.dev: "Extracting State Logic into a Reducer", "Passing Data Deeply with Context", "Choosing the State Structure".
- Redux style guide: "Keep state minimal, derive the rest".
