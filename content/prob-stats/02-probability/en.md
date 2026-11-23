# Probability: sample spaces and axioms

## The language of uncertainty

Probability is the mathematical language of uncertainty. Harvard Stat 110 (Blitzstein) describes it as a toolkit for understanding statistics, science, risk and randomness. Three foundations:

- **Random experiment**: a process with an uncertain outcome (rolling a die).
- **Sample space Ω**: the set of all possible outcomes. Two dice: Ω has 6 × 6 = 36 outcomes.
- **Event A**: a subset of Ω. "The sum is 7" has 6 outcomes: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1).

## Kolmogorov's axioms (1933)

Andrey Kolmogorov placed probability on measure theory. For a finite sample space the three axioms are:

1. P(A) ≥ 0 for every event A.
2. P(Ω) = 1.
3. If A and B are **disjoint**, then P(A ∪ B) = P(A) + P(B).

These imply P(not A) = 1 − P(A) and, for any events, the **addition rule** P(A ∪ B) = P(A) + P(B) − P(A ∩ B).

When outcomes are **equally likely**: P(A) = |A| / |Ω|. So P(sum = 7) = 6/36 = 1/6.

![6×6 grid of outcomes of two dice; shaded cells sum to 7](/lessons/prob-stats/02-probability-dice-en.svg)
*Each cell is an equally likely outcome (1/36). The shaded diagonal has 6 cells, so P = 6/36.*

## Two readings of probability

- **Frequentist**: P is the limit of relative frequency over endless repetitions.
- **Bayesian (degree of belief)**: P measures confidence in a proposition, updated by data (lesson 4).

Both obey the same axioms.

## Monte Carlo simulation

When exact calculation is hard, we **simulate**: repeat the experiment hundreds of thousands of times by computer and take the frequency. The Monte Carlo method was developed by Ulam, von Neumann and Metropolis in the 1940s at Los Alamos. Real-world example: estimating the chance a project runs late when each task has a random duration.

## References

- Blitzstein, J. & Hwang, J. *Introduction to Probability* (CRC Press), chapter 1; Harvard Stat 110.
- Kolmogorov, A. N. (1933). *Grundbegriffe der Wahrscheinlichkeitsrechnung*.
- Metropolis, N. & Ulam, S. (1949). The Monte Carlo Method. *J. Amer. Statist. Assoc.* 44.
