# Accessibility (a11y): semantic HTML, labels, keyboard and focus

About **1 in 6 people** worldwide lives with some disability (WHO, 2022). Accessibility also helps temporary conditions (a broken arm), keyboard-only users, and **SEO**. In many places it is also a **legal requirement** (ADA, EAA).

## Principle: use the right HTML element

Semantic tags come with **roles, keyboard handling and focus**:

| Need | Use | Don't use |
|---|---|---|
| action | `<button>` | `<div onClick>` |
| navigation | `<a href>` | `<span onClick>` |
| headings | `<h1>…<h6>` in order | `<div class="title">` |
| layout | `<header> <nav> <main> <footer>` | all `<div>` |
| lists | `<ul><li>` | `<div>`s |

A `<div onClick>` doesn't receive Tab, doesn't activate with Enter/Space, and screen readers don't know it's a button. Patching with `role`, `tabIndex`, `onKeyDown` is laborious: **just use `<button>`**.

![Semantic elements come with roles, keyboard handling and focus](/lessons/react/16-accessibility-fig-en.svg)
*Semantic elements come with roles, keyboard handling and focus*

## Form labels

Every input needs an **accessible label**: `<label htmlFor="id">` tied to `<input id>`. A placeholder is **not** a label (it disappears while typing, low contrast). Report errors in text tied to the field (`aria-describedby`, `aria-invalid`).

## ARIA: when HTML isn't enough

ARIA's first rule: **don't use ARIA if a native HTML element exists**. When needed (dialogs, tabs, custom menus): `role`, `aria-label`, `aria-expanded`, `aria-live` (announcing dynamic changes like "Added to cart").

## Keyboard and focus

- Every feature is **usable by keyboard**: Tab, Shift+Tab, Enter/Space, Escape, arrow keys.
- The **focus ring must be visible** (don't `outline: none` without a replacement).
- **Dialogs**: on open, move focus inside; on close, **return focus** to the opener; Escape closes; **trap focus** inside while modal (or use the `<dialog>` element).
- After a route change in an SPA, move focus to the page heading.

## Visual

- Text/background **contrast** ≥ **4.5:1** (WCAG AA).
- Don't convey information by **colour alone** (red error plus an icon/text).
- Images get descriptive `alt` (decorative: `alt=""`).
- Respect `prefers-reduced-motion`.

## Testing

1. Try the page with the **keyboard only**.
2. Run **Lighthouse/axe DevTools**, `eslint-plugin-jsx-a11y`.
3. Try a screen reader (NVDA, VoiceOver).
Automated tools catch only ~30–40% of issues; manual testing is required.

## References

- W3C: WCAG 2.2; WAI-ARIA Authoring Practices Guide.
- MDN: Accessibility; react.dev: Accessibility.
- WebAIM: The WebAIM Million (annual accessibility survey).
