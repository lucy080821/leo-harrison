# The `<head>`, meta tags and SEO

The `<head>` holds **information about the page** that users don't see directly but that browsers, search engines and social networks all read.

## Important tags

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Page title | Site name</title>
  <meta name="description" content="A short 120–160 character summary." />
  <link rel="icon" href="/favicon.ico" />
  <link rel="stylesheet" href="style.css" />
  <script src="app.js" defer></script>
</head>
```

| Tag | Role |
|---|---|
| `meta charset` | Character encoding; put it **first** |
| `meta viewport` | **Required** for pages to display correctly on phones (responsive) |
| `title` | The tab title and the blue headline in Google results |
| `meta description` | The summary shown under the headline in search results |
| `link rel="icon"` | The small icon on the tab |
| `link rel="stylesheet"` | Loads a CSS file |
| `script defer` | Loads JavaScript without blocking page rendering |

## Open Graph: preview when sharing

When you paste a link into Facebook, Slack, etc., they read these tags to build a preview card:

```html
<meta property="og:title" content="Learn to code with Lexi" />
<meta property="og:description" content="Theory and practice side by side." />
<meta property="og:image" content="https://example.com/cover.png" />
<meta property="og:url" content="https://example.com/" />
```

## Basic SEO (search engine optimisation)

- Each page gets its **own clear `<title>`** and a single `<h1>`.
- Write an attractive `meta description` for every page.
- Use semantic tags and a sensible heading order (`h1` → `h2` → `h3`).
- Images get a descriptive `alt`; links get descriptive text.
- Declare `lang` on `<html>`.

> In the preview panel on the right you don't see these tags rendered. The checks can still read them because they live in the document.
