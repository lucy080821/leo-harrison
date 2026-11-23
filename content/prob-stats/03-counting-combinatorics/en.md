# Counting: permutations, combinations and the birthday problem

Many probabilities are just **counting**: P(A) = (favourable outcomes) / (possible outcomes) when outcomes are equally likely. So we need to count quickly and correctly. Blitzstein & Hwang treat this as the foundation of classical probability.

## The multiplication rule

If task 1 has a ways and for each of them task 2 has b ways, there are **a × b** ways in total. An 8-character password from 62 symbols (a–z, A–Z, 0–9) has 62⁸ ≈ 2.18·10¹⁴ possibilities.

## Permutations and combinations

- **Permutations** (ordered): arranging k items chosen from n: `P(n, k) = n! / (n − k)!`. Seating n people in n chairs: `n!`.
- **Combinations** (unordered): `C(n, k) = n! / (k!(n − k)!)`.

Relation: P(n, k) = C(n, k) · k! (after choosing you still arrange them).

> A question to ask: "does swapping positions create a new outcome?" Yes ⇒ permutation; no ⇒ combination.

## Real-world example: a 6/45 lottery

There are C(45, 6) = 8,145,060 choices, so one ticket wins the jackpot with probability ≈ 1.2·10⁻⁷. (That is only the **probability**; prizes and rules decide the expected value.)

![Birthday-match probability rises fast with group size, passing 50% at n = 23](/lessons/prob-stats/03-counting-combinatorics-birthday-en.svg)
*The curve crosses 50% at 23 people.*

## The birthday problem

Among n people, the probability that *nobody* shares a birthday is (365/365)(364/365)…((365 − n + 1)/365). With just **n = 23** the probability of at least one match already exceeds 50%. Intuition fails because we should count **pairs**: 23 people form C(23, 2) = 253 pairs. The same principle explains **hash collisions** in computer science.

## References

- Blitzstein & Hwang, *Introduction to Probability*, chapter 1 (Counting).
- Ross, S. *A First Course in Probability*, chapter 1.
- Feller, W. *An Introduction to Probability Theory and Its Applications*, Vol. 1.
