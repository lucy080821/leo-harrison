# Testing React components: writing code that is easy to test

Testing isn't for "coverage scores" but to **change code without fear**. When you dare to refactor because you have a trustworthy test suite, you move faster.

## The testing pyramid

| Layer | What it tests | Quantity | Tools |
|---|---|---|---|
| **Unit** | pure functions, hooks | many | Vitest/Jest |
| **Component/integration** | a UI area with user behaviour | some | **Testing Library** |
| **End-to-end** | real flows in a browser | few | Playwright, Cypress |

![The testing pyramid: many unit, some integration, few end-to-end](/lessons/react/19-testing-react-fig-en.svg)
*The testing pyramid: many unit, some integration, few end-to-end*

## Golden rule: test behaviour, not implementation

> "The more your tests resemble the way your software is used, the more confidence they can give you." (Testing Library)

**Do:** find elements as a user would (by **label, role, text**), act (type, click), then assert **what the user sees**.

```jsx
render(<App />);
await userEvent.type(screen.getByLabelText("Discount code"), "SALE10");
expect(screen.getByTestId("total")).toHaveTextContent("180");
```

**Avoid:** testing internal `state`, function names, render counts. They break on refactors even when behaviour is unchanged.

Query priority: `getByRole` → `getByLabelText` → `getByText` → `getByTestId` (last). `getByRole` encourages **accessibility** (lesson 16).

## Writing testable code

1. **Extract pure logic** (calculations, validation) into separate functions: direct unit tests, fast, no rendering.
2. Components **receive dependencies via props** (a data-fetching function), easy to swap for a fake.
3. Limit hidden side effects (`Date.now()`, `Math.random()`): inject or fake them.

## The network: mock at the boundary

Don't scatter `fetch` mocks through each test. Use **MSW (Mock Service Worker)** to intercept requests at a low level: app code runs exactly as in production, only the server is fake.

## Async

Use `await screen.findBy...` (auto-waits for the element) instead of fixed `setTimeout`s, so tests are **stable**, not flaky.

## A few good habits

- Each test is **independent**, not order-dependent.
- Test **error and empty cases**, not only the happy path.
- Run tests in **CI** for every pull request.
- High coverage matters less than **testing the risky spots** (payments, permissions).

## References

- Testing Library documentation: "Guiding Principles", "Queries".
- Kent C. Dodds, "Testing Implementation Details".
- Vitest and MSW documentation.
