# Your first HTML page

**HTML** (HyperText Markup Language) is a *markup* language that describes the **structure and content** of a web page. HTML is not a programming language: it doesn't compute anything, it simply tells the browser "this is a heading", "this is a paragraph", "this is an image".

> Try it right now: edit the text in the code panel on the right and the result below updates instantly.

## Tags and elements

An **element** usually consists of an opening tag, content and a closing tag:

```html
<p>Hello world</p>
```

- `<p>` is the **opening tag**, `</p>` is the **closing tag** (note the `/`).
- What sits in between is the **content**.
- Some tags have no content so they need no closing tag, e.g. `<br />` (line break) and `<img />` (image). They are called **void elements**.

## The skeleton of an HTML document

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Browser tab title</title>
  </head>
  <body>
    <h1>Visible content</h1>
  </body>
</html>
```

| Part | Role |
|---|---|
| `<!DOCTYPE html>` | Tells the browser this is HTML5 |
| `<html lang="en">` | The root element; `lang` declares the language (good for screen readers and SEO) |
| `<head>` | Information about the page, **not displayed** directly |
| `<meta charset="UTF-8">` | Character encoding, so accents and symbols render correctly |
| `<title>` | The title shown on the browser tab |
| `<body>` | Everything the user can see |

## Headings and paragraphs

- `<h1>` to `<h6>`: headings from most to least important. A page should have **one** `<h1>`.
- `<p>`: a paragraph. The browser collapses multiple spaces and line breaks into **one** space.

## Attributes

An opening tag can carry **attributes** in the form `name="value"` to give extra information:

```html
<html lang="en">
```

## Comments

```html
<!-- The browser ignores this line -->
```

Now do the exercises below to practise.
