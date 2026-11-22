# Expressions, conditions and loops

## Expressions and statements

- An **expression** *has a value*: `3 + 4`, `x > 3`, `len("abc")`.
- A **statement** *does something*: `x = 5`, `print(x)`, `if ...`, `for ...`.

## Boolean logic

George Boole (1854) built an algebra of two truth values. The three basic operations are `and`, `or`, `not`, defined by **truth tables**:

| A | B | A and B | A or B |
|---|---|---|---|
| T | T | T | T |
| T | F | F | T |
| F | T | F | T |
| F | F | F | F |

Python **short-circuits**: `A and B` does not evaluate B if A is already false.

## Three control structures

In 1966 Böhm and Jacopini proved (the **structured program theorem**) that every computable algorithm can be expressed using only three constructs:

1. **Sequence**: do step 1, then step 2.
2. **Selection**: `if / elif / else`.
3. **Iteration**: `for`, `while`.

Dijkstra (1968), in "Go To Statement Considered Harmful", argued for these constructs over unrestricted `goto`.

## Loop invariants

When writing a loop, ask: *what is always true after each iteration?* For summing 1..n: after iteration i, `total` equals 1+2+…+i. If the invariant holds at the start, is preserved by every iteration, and at exit implies the desired result, the loop is correct. This is a basic tool for proving program correctness (Hoare, 1969; Floyd, 1967).

## References

- Boole, G. (1854). *An Investigation of the Laws of Thought*.
- Böhm, C. & Jacopini, G. (1966). Flow diagrams, Turing machines and languages with only two formation rules. *CACM* 9(5).
- Dijkstra, E. W. (1968). Go To Statement Considered Harmful. *CACM* 11(3).
- Hoare, C. A. R. (1969). An axiomatic basis for computer programming. *CACM* 12(10).
- MIT 6.0001, lectures 2–3.
