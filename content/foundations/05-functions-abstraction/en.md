# Functions, abstraction and scope

## Why functions?

Functions are the main tool of **abstraction**: give a name to a piece of processing so you can use it without remembering the details. Two key ideas (from *Structure and Interpretation of Computer Programs*, Abelson & Sussman):

- **Decomposition**: split a big problem into sub-problems.
- **Abstraction**: hide detail; the user of a function needs to know *what it does* (the contract), not *how it does it*.

## Terminology

- **Parameter**: the name in the function definition (`w`, `h`).
- **Argument**: the value passed at call time (`3`, `4`).
- **Return value**: the result handed back with `return`. A function without `return` gives `None`.

## Scope

Scope decides which names are visible where. Python uses the **LEGB** rule: Local → Enclosing → Global → Built-in. A variable assigned inside a function is **local**: it exists only for that call and does not affect a same-named name outside. The Python docs call this *naming and binding*.

## The call stack

Each call creates a **frame** holding local variables and the return position. Frames are stacked and removed on return. This is the basis for understanding *recursion* in a later lesson.

## Functions are first-class values

In Python a function is also an object: assign it to a variable, pass it as an argument, or return it from another function. This is the foundation of functional programming.

## References

- Abelson, H. & Sussman, G. J. *Structure and Interpretation of Computer Programs* (MIT Press), chapter 1.
- Python Software Foundation. *The Python Language Reference*, §4 "Execution model".
- MIT 6.0001, lecture 4 "Decomposition, Abstraction, and Functions".
