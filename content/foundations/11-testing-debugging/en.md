# Testing, debugging and software engineering

## Three kinds of bugs

1. **Syntax error**: wrong form; the machine refuses to run.
2. **Runtime error / exception**: it runs, then fails, e.g. division by zero, index out of range.
3. **Logic (semantic) error**: it runs normally but gives a wrong result. The hardest kind, because no error message appears.

The word "bug" is associated with a 1947 incident on the Harvard Mark II (a real moth stuck in a relay), though "bug" for a technical defect predates it.

## Testing

Dijkstra wrote: *testing shows the presence, not the absence, of bugs*. Even so, testing is the most important practical tool.

- **Assert**: states something that must be true; if false the program stops immediately.
- **Unit test**: checks one small function with specific inputs.
- Try **edge cases**: empty list, zero, negatives, maximum values.

## Systematic debugging

Following Andreas Zeller (*Why Programs Fail*) and textbooks, the scientific method:

1. **Reproduce** the failure reliably.
2. **Hypothesise** a cause.
3. **Experiment** (print values, use a debugger) to test it.
4. **Fix**, then write a test so the bug cannot return.

Practical tips: narrow the scope (bisect the code), read the error message carefully, explain the code to a "rubber duck".

## Software engineering

CS2023 lists **Software Engineering** as its own area: beyond being correct, code should be **readable**, **tested**, under **version control** (Git) and written in teams.

## References

- Zeller, A. *Why Programs Fail: A Guide to Systematic Debugging*. Morgan Kaufmann.
- Dijkstra, E. W. (1970). *Notes on Structured Programming* (EWD249).
- McConnell, S. *Code Complete* (2nd ed.).
- ACM/IEEE-CS/AAAI (2023). *CS2023*, knowledge area SE (Software Engineering).
- Python docs: the `assert` statement, the `unittest` module.
