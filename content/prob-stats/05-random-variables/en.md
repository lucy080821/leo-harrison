# Random variables, expectation and variance

## Random variables

A **random variable X** is a function assigning a number to each outcome of an experiment. Roll two dice, X = the sum. For a **discrete** variable the **probability mass function (PMF)** gives P(X = x) for each value.

## Expectation

The **expectation** is the probability-weighted average:

`E[X] = Σ x · P(X = x)`

For a die: E[X] = (1+2+3+4+5+6)/6 = **3.5**: the long-run average, not necessarily a value you can roll.

**Linearity of expectation:** E[aX + bY] = aE[X] + bE[Y], **always true, even when X and Y are dependent**. Blitzstein counts this among the most powerful tools in probability.

## Variance

**Variance** measures spread around the expectation: `Var(X) = E[(X − E[X])²] = E[X²] − (E[X])²`. The **standard deviation** is √Var. For independent X: Var(X + Y) = Var(X) + Var(Y).

Die: Var = 35/12 ≈ 2.92.

![PMF bars for the sum of two dice, peaking at 7](/lessons/prob-stats/05-random-variables-pmf-en.svg)
*A sum of 7 is most likely (6/36); the expectation E = 7 sits at the centre of symmetry.*

## Real-world example: the expected value of a decision

- **Insurance**: insurers price premiums from E[loss] plus costs and profit. Buyers accept a negative *expected* gain to reduce *variance* (risk).
- **Lotteries**: organisers design them so E[prize] is below the ticket price, so long-run play has a negative expected profit.

Daniel Bernoulli (1738) noted that people look not only at expectation but at *utility*, opening the way to decision theory.

## References

- Blitzstein & Hwang, *Introduction to Probability*, chapters 4 (Expectation) and 3 (Random variables).
- Ross, S. *A First Course in Probability*.
- Bernoulli, D. (1738). Specimen theoriae novae de mensura sortis.
