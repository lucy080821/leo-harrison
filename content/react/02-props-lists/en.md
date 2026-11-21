# Props and lists

## Props — data flowing into a component

**Props** (properties) are a component's parameters. They are **read-only**.

```jsx
function Badge({ text, color }) {
  return <span style={{ background: color }}>{text}</span>;
}

<Badge text="New" color="gold" />
```

Destructure `{ text, color }` for tidiness. Non-string values go in `{}`: `<Counter start={5} />`.

## children

Content between the tags becomes the special prop `children`:

```jsx
<Card title="Hi"><p>Content</p></Card>
```

## Lists with map

Turn an array into elements with `.map()`:

```jsx
<ul>{items.map((x) => <li key={x.id}>{x.name}</li>)}</ul>
```

**`key`** lets React tell items apart when the list changes. Use a **stable, unique** value (an id); avoid array indexes if the order can change.
