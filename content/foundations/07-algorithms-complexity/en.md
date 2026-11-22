# Algorithms and complexity

## Judging an algorithm

A *correct* algorithm is not enough; we also ask **how many resources** (time, memory) it uses as data grows. **Analysis of algorithms** (Knuth) counts steps as a function of input size n, ignoring machine-dependent constants.

![Growth curves of common complexity classes](/lessons/foundations/07-algorithms-complexity-bigo-en.svg)
*As n grows, O(n²) shoots up while O(log n) stays nearly flat.*

## Big-O notation

**O(f(n))** is an *asymptotic upper bound*: running time grows no faster than f(n) (up to a constant factor) for large n. Common classes, fast to slow:

| Class | Name | Example |
|---|---|---|
| O(1) | constant | `a[i]` access, `dict` lookup |
| O(log n) | logarithmic | binary search |
| O(n) | linear | linear search |
| O(n log n) | | merge sort |
| O(n²) | quadratic | selection sort, two nested loops |
| O(2ⁿ) | exponential | trying every subset |

## Example: searching a phone book

CS50 illustrates it with a phone book: flipping page by page is **linear** (O(n)); opening in the middle and discarding half each time is **binary** (O(log n)). For 1,000,000 items, linear takes up to ~1,000,000 steps, binary about 20 (log₂ 10⁶ ≈ 20). Requirement: the data must be **sorted**.

## Common confusions

- Big-O describes how cost *grows*, not absolute time. For small n a simple O(n²) algorithm can be faster.
- We usually quote the **worst case**; average case can be analysed too.

## References

- Cormen, Leiserson, Rivest, Stein. *Introduction to Algorithms* (CLRS), chapters 2–3.
- Knuth, D. E. *The Art of Computer Programming*, Vol. 1 §1.2.
- Harvard CS50, week 0 (algorithms, Big-O) and week 3.
- MIT 6.0001, "Searching and Sorting" and "Algorithmic Complexity".
- ACM/IEEE-CS/AAAI (2023). *CS2023*, knowledge area AL (Algorithmic Foundations).
