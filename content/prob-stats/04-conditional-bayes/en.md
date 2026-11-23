# Conditional probability and Bayes' theorem

## Conditional probability

**P(A | B)** is the probability of A *given that B occurred*:

`P(A | B) = P(A ∩ B) / P(B)`, for P(B) > 0.

New information shrinks the "universe" to B. Blitzstein calls this a central idea: **all probabilities are conditional** on current knowledge.

## Independence

A and B are **independent** if learning B does not change your belief about A: P(A ∩ B) = P(A)·P(B). Two coin flips are independent; two consecutive rainy days usually are not.

## Bayes' theorem

It follows from the definition (Thomas Bayes, published posthumously in 1763; developed by Laplace):

`P(H | D) = P(D | H) · P(H) / P(D)`

where P(D) comes from the **law of total probability**: P(D) = P(D | H)P(H) + P(D | not H)P(not H).

The names: **prior** P(H) → see data D → **posterior** P(H | D).

## Example: a rare-disease test

A disease has prevalence 1%. The test is positive for 90% of sick people and falsely positive for 9% of healthy ones. If you test positive, the chance you are sick is only ≈ **9.2%**, not 90%. Reason: among 1,000 people ~10 are sick (9 test positive), and 990 are healthy (~89 false positives). Gigerenzer and Hoffrage (1995) showed that counting with such **natural frequencies** helps even doctors reason correctly, compared with percentages.

![1,000 people: 10 sick (9 test positive) and 990 healthy (89 false positives)](/lessons/prob-stats/04-conditional-bayes-bayes-en.svg)
*Of ~98 positives only 9 are truly sick, about 9%.*

> The numbers above are illustrative, not from any specific test.

## Application: spam filtering

A **Naive Bayes** filter applies exactly this formula to each word of an email; Paul Graham's 2002 proposal popularised it for spam.

## References

- Blitzstein & Hwang, *Introduction to Probability*, chapter 2 (Conditional probability).
- Gigerenzer, G. & Hoffrage, U. (1995). How to improve Bayesian reasoning without instruction: frequency formats. *Psychological Review* 102(4).
- Bayes, T. (1763). An Essay towards solving a Problem in the Doctrine of Chances. *Phil. Trans. R. Soc.* 53.
- MIT OCW 18.05 (Introduction to Probability and Statistics): Bayesian updating.
