# Recursion and sorting

## Recursion

**Recursion** is when a function calls itself to solve a smaller problem of the same kind. Every recursive function needs two parts:

1. **Base case**: small enough to answer directly, which stops the calls.
2. **Recursive step**: reduce the problem to a *smaller* one and call again.

Factorial example: n! = n · (n−1)!, with 0! = 1. Without a base case the function keeps calling until the **call stack** overflows (Python raises `RecursionError`).

> Way of thinking: trust that the smaller call is correct (inductive hypothesis), then only prove that the current step is correct. This is **mathematical induction** turned into code.

## Sorting

Sorting is the classic problem for comparing algorithms:

- **Selection sort**: each pass picks the smallest of the remaining elements and puts it in place. Complexity **O(n²)**.
- **Merge sort** (John von Neumann, 1945): split in half, sort each half recursively, then **merge** the two sorted halves. Complexity **O(n log n)**, a textbook case of **divide and conquer**.

For big data, O(n log n) is far faster: for n = 1,000,000, n² is 10¹² but n log₂ n is only about 2·10⁷.

## A performance warning

Writing `fib(n) = fib(n−1) + fib(n−2)` directly recomputes many sub-problems (exponential time). The fixes are **memoization** or **dynamic programming**; you will meet them again in advanced algorithms.

## References

- Abelson & Sussman, *SICP*, §1.2 (recursive and iterative processes).
- Cormen et al., *Introduction to Algorithms*, chapter 2 (merge sort) and chapter 4 (divide and conquer).
- Knuth, *TAOCP* Vol. 3 "Sorting and Searching".
- Harvard CS50, week 3 (sorting, recursion); MIT 6.0001, "Recursion" and "Searching and Sorting".
