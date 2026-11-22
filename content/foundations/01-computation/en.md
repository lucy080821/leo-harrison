# Computation, algorithms and programs

## Concepts

**Computation** is the transformation of information by well-defined rules. An **algorithm** is a finite sequence of unambiguous steps that solves a class of problems. According to Knuth (*The Art of Computer Programming*, vol. 1), an algorithm has five properties: **finiteness** (it ends after finitely many steps), **definiteness** (each step is precisely stated), **input**, **output**, and **effectiveness** (each step is basic enough to be carried out).

A **program** is an algorithm written in a **programming language** for a machine to execute.

> In plain words: a recipe is an algorithm; the recipe book written in English is the "program" that the reader (the machine) follows.

![Diagram of input, program, output](/lessons/foundations/01-computation-io-en.svg)
*Every program takes input, processes it and produces output.*

## What does a computer really do?

In 1936 Alan Turing described an abstract machine (now called a **Turing machine**) and showed that it can carry out any calculation a person following mechanical rules could. The Church–Turing thesis states that every "effectively computable" function is computable by a Turing machine. It is a **thesis**, not a theorem, because "effective" is an intuitive notion.

Every modern computer, from a phone to a supercomputer, does the same basic thing: **take input → process it by a program → produce output**.

## Layers of language

| Layer | Example | Who can read it |
|---|---|---|
| Machine code | bits `10110000 01100001` | the CPU |
| Assembly | `MOV AL, 61h` | humans, via an assembler |
| High-level language | Python, JavaScript | humans |

High-level code becomes machine code through a **compiler** (translates everything before running) or an **interpreter** (reads and executes as it runs). Python and JavaScript are usually described as interpreted (in practice modern implementations mix both techniques).

## Two parts of a language

- **Syntax**: the rules of valid form. With a syntax error the machine refuses to run.
- **Semantics**: what a program *means* when it runs. A program can be syntactically valid yet semantically wrong (it runs but gives wrong results).

## Try it

The `average` function on the right takes a list (input), accumulates (processing) and returns the mean (output). Change the list and run again.

## References

- Knuth, D. E. *The Art of Computer Programming, Vol. 1* (§1.1 "Algorithms").
- Turing, A. M. (1936). On Computable Numbers, with an Application to the Entscheidungsproblem. *Proc. London Math. Soc.* s2-42.
- MIT 6.0001 *Introduction to Computer Science and Programming in Python* (OCW), lecture 1 "What is Computation?".
- Harvard CS50, week 0 (open course materials).
