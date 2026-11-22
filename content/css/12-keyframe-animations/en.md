# Animations with `@keyframes`

`transition` only goes from state A to B when something triggers it. **Animation** lets you write a whole **multi-step script** that runs and loops on its own.

## Two steps

**1. Define the script with `@keyframes`:**

```css
@keyframes pulse {
  0%   { transform: scale(1);   opacity: 1; }
  50%  { transform: scale(1.4); opacity: 0.6; }
  100% { transform: scale(1);   opacity: 1; }
}
```

The percentages are the **progress** of one run. Two special keywords: `from` (= `0%`) and `to` (= `100%`).

**2. Attach it with `animation`:**

```css
.dot { animation: pulse 1.5s ease-in-out infinite; }
```

![@keyframes defines states along the timeline](/lessons/css/12-keyframe-animations-fig-en.svg)
*@keyframes defines states along the timeline*

## Animation properties

| Property | Meaning |
|---|---|
| `animation-name` | The `@keyframes` name |
| `animation-duration` | Length of one run (`1.5s`, `300ms`) |
| `animation-timing-function` | Speed curve (`ease`, `linear`...) |
| `animation-delay` | Wait before starting |
| `animation-iteration-count` | Number of repeats, or `infinite` |
| `animation-direction` | `normal`, `reverse`, `alternate` (forth and back), `alternate-reverse` |
| `animation-fill-mode` | `forwards` keeps the final state, `backwards` applies the first state during the delay |
| `animation-play-state` | `running` or `paused` |

Shorthand: `animation: <name> <duration> <timing> <delay> <count> <direction> <fill>`.

## Example: a loading spinner

```css
@keyframes spin { to { transform: rotate(360deg); } }
.spinner {
  width: 32px; height: 32px;
  border: 4px solid #dcebfb;
  border-top-color: #0b6fd6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
```

Only `to` is needed because with a missing `from`, the browser uses the element's current value.

## Animation or transition?

| | transition | animation |
|---|---|---|
| Triggered | When a property changes (hover, class) | Runs on its own when the element appears |
| Steps | Two (start → end) | Many |
| Looping | No | Yes |

> For motion-sensitive users, disable big animations with `@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }`.
