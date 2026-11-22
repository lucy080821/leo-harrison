# The box model

In CSS, **every element is a rectangular box** made of 4 layers, from the inside out:

```text
┌──────────────── margin ────────────────┐
│  ┌──────────── border ──────────────┐  │
│  │  ┌──────── padding ──────────┐   │  │
│  │  │        content            │   │  │
│  │  └───────────────────────────┘   │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

| Layer | Meaning |
|---|---|
| **content** | The real content (text, image); sized with `width`, `height` |
| **padding** | Space **inside** the border, around the content |
| **border** | The outline |
| **margin** | Space **outside** the border, pushing other elements away |

## Shorthand

```css
padding: 20px;             /* all 4 sides */
padding: 10px 20px;        /* top-bottom 10, left-right 20 */
padding: 5px 10px 15px 20px; /* top, right, bottom, left (clockwise) */

border: 2px solid #0b6fd6; /* width, style, color */
margin: 16px auto;         /* auto on left-right centers a block that has a width */
```

![The box model: content, padding, border, margin](/lessons/css/02-box-model-fig-en.svg)
*The box model: content, padding, border, margin*

## The sizing problem and `box-sizing`

By default (`content-box`), `width` only counts the **content**. So:

$$
W = w + 2p + 2b
$$

where $W$ is the total rendered width, $w$ is `width`, $p$ is the padding on one side and $b$ is the border thickness on one side.

For example `width: 300px; padding: 20px; border: 2px` gives a total of **344px**, and the box easily overflows its column.

The fix, used in almost every project:

```css
* {
  box-sizing: border-box; /* width now includes padding and border */
}
```

With `border-box`, `width: 300px` means the box is **exactly 300px** wide no matter the padding or border you add.
