# Real-world forms: validation and per-field errors

Forms are where users are **least patient**. A good form says clearly where the error is, at the right time, without needlessly blocking people.

## Form state

Use **one object** for all values instead of one `useState` per field:

```jsx
const [values, setValues] = useState({ email: "", password: "" });
setValues({ ...values, [name]: e.target.value });
```

![Errors are derived from values and shown only after a field is touched](/lessons/react/10-forms-validation-fig-en.svg)
*Errors are derived from values and shown only after a field is touched*

## Errors are DERIVED data

Don't store `errors` in state and try to keep it in sync. **Compute it from `values`** each render:

```jsx
const errors = validate(values);
const valid = Object.keys(errors).length === 0;
```

Always right, never out of sync ("single source of truth").

## When to show errors?

Showing an error the instant the first character is typed is annoying ("invalid email" after typing "a"). A common pattern: record which fields are **touched** (left via `onBlur`), show errors only for those, and show all errors on **submit**.

## Submitting

```jsx
<form onSubmit={(e) => { e.preventDefault(); if (valid) submit(values); }}>
```

- `preventDefault()` stops the browser reloading the page.
- While sending: disable the button, show "Sending…" to prevent double clicks.
- **Server** errors (email already exists) must also appear next to the right field.

## Client-side validation is NOT enough

A user (or attacker) can bypass the UI. **Always validate again on the server.** Client validation is only for a **better experience**.

## Libraries

Larger forms: **React Hook Form** (fewer re-renders) + **Zod** (a schema shared by client and server). Understand the manual way first.

## References

- react.dev: "Reacting to Input with State", "Choosing the State Structure".
- React Hook Form and Zod documentation.
- MDN: Client-side form validation.
