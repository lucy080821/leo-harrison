# Project: a responsive landing page

You'll style a complete **landing page** (a product introduction page). This lesson pulls together nearly everything in the CSS course.

See the sample result in the right panel (the finished `style.css` is in the Free playground tab), then rebuild it yourself in the two exercises.

## Page structure

```text
┌───────────────────────────────┐
│ .nav   logo            menu   │  flex, space-between
├───────────────────────────────┤
│ .hero  title, text, .cta      │  gradient background, centered
├───────────────────────────────┤
│ .features  [card][card][card] │  3-column grid, 1 column on phones
└───────────────────────────────┘
```

![Landing page wireframe: hero, features, pricing, footer](/lessons/css/16-project-landing-page-fig-en.svg)
*Landing page wireframe: hero, features, pricing, footer*

## Step-by-step plan

1. **Foundation:** `box-sizing: border-box`, remove the default `body` margin, system fonts, and declare **color variables** `--brand`, `--accent` on `:root`.
2. **Navbar:** `display: flex; justify-content: space-between; align-items: center;`.
3. **Hero:** a `linear-gradient` background, `text-align: center`, heading size using `clamp()`.
4. **CTA button:** `display: inline-block`, `padding`, `border-radius: 999px` (pill), a `transition` on `transform`, and `:hover`.
5. **Feature grid:** `display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;`, cards with `border-radius` and `box-shadow`.
6. **Responsive:** `@media (max-width: 600px)` switches the grid to 1 column and stacks the menu.

## Tips

- **Build top to bottom**, one block at a time, checking the result after each.
- When a layout acts strangely, **narrow the window** to see where it breaks and add a breakpoint right there.
- Name classes by **role** (`.card`, `.cta`) rather than by appearance (`.blue-box`).
- Open DevTools (F12) to experiment with values before writing them into your file.

## Self-check

- [ ] Is there a `meta viewport` tag in the HTML?
- [ ] No horizontal scrollbar on phones?
- [ ] Enough contrast for text on the gradient?
- [ ] Do all buttons and links have `:hover` and `:focus-visible` states?
