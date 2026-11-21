# Project: a quiz game

The final project of the JavaScript course: a **quiz game** with questions, choices and scoring. This lesson focuses on the **data → UI** mindset instead of hard-coding HTML.

## The core idea: separate data from UI

Instead of typing each question into HTML, you **describe the questions as data**:

```javascript
const questions = [
  { text: "2 + 2 = ?", choices: ["3", "4", "5"], answer: "4" },
  { text: "Capital of Vietnam?", choices: ["Hanoi", "Hue", "Da Nang"], answer: "Hanoi" },
];
```

Then write **one function** that turns data into UI. Adding a new question is just adding an element to the array.

## State

The program needs to **remember** a few things:

| Variable | Meaning |
|---|---|
| `current` | Which question we're on |
| `score` | The current score |

Whenever state changes, you **update the matching UI**. This is the `state → render` model that React, Vue... do automatically.

## Steps

1. **`showQuestion()`**: read `questions[current]`, write `text` into `#question`, build the choice buttons.
2. **Clicking a choice**: use event delegation on `#choices`. Compare `btn.textContent` with `answer`.
3. **Update the score** if correct; increase `current`; call `showQuestion()` again.
4. **Wrap around** with the remainder: `current = (current + 1) % questions.length`.

## Ideas to extend

- When the questions run out, show a **result screen**: "You got 2/2" and a "Play again" button.
- Show **right/wrong** with the `.correct`/`.wrong` classes (the CSS exists), then wait 800ms with `setTimeout` before the next question.
- **Shuffle** the questions and answers (the Fisher-Yates algorithm with `Math.random`).
- A **countdown timer** per question with `setInterval`.
- Save the **high score** in `localStorage`.
- Load questions from a real API with `fetch` (see the async/await lesson).

## Congratulations!

You've covered the whole JavaScript foundation: variables, conditions, loops, functions, arrays, objects, the DOM, events, async, classes, JSON, regex. Next come **Node.js** (server-side JavaScript) and **React/Next.js** (building modern web apps).
