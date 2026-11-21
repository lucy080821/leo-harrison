# Accessibility basics

**Accessibility (a11y)** means making the web usable by **everyone**: blind users with screen readers, keyboard-only users, low-vision users, deaf users... It is also a legal requirement in many places, and good a11y often improves SEO.

## 1. Use the right tag

Semantic tags come with accessibility built in:

- Buttons → `<button>` (Tab, Enter and Space work out of the box). **Don't** use `<div onclick>`.
- Links → `<a href>`.
- Headings → `<h1>`...`<h6>`, not big text faking a heading.

## 2. Alternative text for images

```html
<img src="chart.png" alt="Chart showing revenue up 20% on last year" />
<img src="decor.svg" alt="" />   <!-- decorative image: empty alt -->
```

Describe the image's **meaning**, not "picture of...".

## 3. Labels for inputs

Every `<input>` needs a `<label>` (see the Forms lesson). A `placeholder` alone isn't enough.

## 4. Heading order

Don't skip levels: `h1` → `h2` → `h3`, never straight from `h1` to `h4`. Screen reader users often browse a page via its list of headings.

## 5. ARIA when needed

**ARIA** are attributes that add meaning when plain HTML isn't enough:

```html
<button type="button" aria-label="Close">×</button>   <!-- icon-only button -->
<nav aria-label="Main menu">...</nav>                 <!-- tells several <nav>s apart -->
<div role="alert">Saved successfully!</div>           <!-- announced as soon as it appears -->
```

> The first rule of ARIA: **if a proper HTML tag exists, use it** and don't add ARIA. Wrong ARIA is worse than none.

## 6. Keyboard, color and language

- Everything must work with the **keyboard** (Tab, Enter) and show a clear focus ring.
- Text/background contrast of at least **4.5:1** (normal text).
- Don't convey information with **color alone** (add text or an icon).
- Declare `<html lang="en">`.
- A "Skip to main content" link at the top saves keyboard users from repeating the menu.
