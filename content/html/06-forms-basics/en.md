# Forms (1): form, input, label

A **form** lets users enter data and send it off: logging in, searching, signing up, paying...

## The `<form>` tag

```html
<form action="/signup" method="post">
  ...
</form>
```

- `action`: where the data goes.
- `method`: `get` (data appears in the URL, used for search) or `post` (sent in the request body, used for logins or changing data).

## `<input>` and the `type` attribute

```html
<input type="text" name="name" />
```

| `type` | For entering |
|---|---|
| `text` | Single-line text |
| `email` | Email (the browser validates the format) |
| `password` | A password (masked) |
| `number` | A number (with up/down arrows) |
| `date` | A date |
| `tel`, `url`, `search` | Phone, URL, search terms |
| `submit` | A submit button |

`name` is crucial: it is the **field name** when data is sent. An input without a `name` is not submitted.

## `<label>`: the caption for an input

There are two ways to link a label to an input:

```html
<!-- Way 1: for matches id -->
<label for="email">Email</label>
<input type="email" id="email" name="email" />

<!-- Way 2: wrap it -->
<label>Email <input type="email" name="email" /></label>
```

Labels let users click the text to focus the field, and let screen readers announce the field correctly.

## Buttons

```html
<button type="submit">Send</button>
<button type="reset">Clear all</button>
<button type="button">Does nothing when clicked</button>
```

A button inside a form is `submit` by default. State the `type` explicitly to avoid accidental submissions.

## Placeholder

`placeholder="Hint..."` shows faint text when the field is empty. It is **not a replacement** for `<label>`.
