# Conditional rendering and forms

## Conditional rendering

JSX has no `if`, but expressions work:

```jsx
{isOpen && <Menu />}              // show when true
{user ? <Hi /> : <Login />}       // pick one of two
```

Or put an `if` **before** `return`:

```jsx
if (loading) return <p>Loading...</p>;
return <List />;
```

![Controlled input: the value comes from state](/lessons/react/04-conditional-forms-fig-en.svg)
*Controlled input: the value comes from state*

## Controlled inputs

Let React own the input's value through state:

```jsx
const [text, setText] = useState("");
<input value={text} onChange={(e) => setText(e.target.value)} />
```

- `value` comes from state → the UI always matches the data.
- `onChange` updates state on every keystroke.

## Submitting a form

```jsx
<form onSubmit={(e) => { e.preventDefault(); save(text); }}>
```

`preventDefault()` stops the browser from reloading the page.
