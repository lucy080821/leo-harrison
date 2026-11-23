# Component design: composition, children and compound components

React favours **composition** over **inheritance**: build complex components by **combining** small ones.

## children: a component's "hole"

```jsx
function Card({ title, children }) {
  return <div className="card"><h3>{title}</h3>{children}</div>;
}
<Card title="Hello"><p>Any content</p></Card>
```

`Card` needn't know what's inside ⇒ highly **reusable**. It is also a way out of **prop drilling**: instead of threading props through many levels, pass *prebuilt elements* via `children`.

![Compound components share state through Context](/lessons/react/13-composition-patterns-fig-en.svg)
*Compound components share state through Context*

## Many "holes": slots via props

```jsx
<Layout header={<Nav />} sidebar={<Menu />}>{page}</Layout>
```

Props aren't just strings/numbers; they can be **JSX**.

## Compound components

A group of components **cooperating** through shared state (Context), with the user free to arrange them:

```jsx
<Tabs defaultValue="a">
  <Tabs.Tab value="a">One</Tabs.Tab>
  <Tabs.Panel value="a">…</Tabs.Panel>
</Tabs>
```

A cleaner, more flexible API than many config props (`tabs={[{label, content}]}`). Libraries like **Radix UI**, **Headless UI**, **shadcn/ui** use this pattern.

## Render props

A component takes a **function returning JSX** to share *logic* while letting the user decide the *UI*:

```jsx
<Toggle render={(on, toggle) => <button onClick={toggle}>{on ? "Open" : "Closed"}</button>} />
```

Today **custom hooks** replace most render-prop needs, but the pattern still appears (e.g. `<Formik>`, `<Downshift>`).

## When to split a component?

- A piece of JSX is **repeated** or **has its own state**.
- A component grows beyond ~100–150 lines or does many things.
- You need to **test/reuse** it separately.

Don't split too early: extract when the benefit is real.

## References

- react.dev: "Passing Props to a Component", "Thinking in React".
- Kent C. Dodds, "Compound Components"; Radix UI documentation.
