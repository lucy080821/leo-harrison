# t-tests: comparing means

Lesson 14 used the z-score, valid when σ is known or n is large. In practice we **estimate σ by s** from a small sample, and that extra uncertainty widens the distribution.

## The t distribution

William Gosset ("Student", 1908), working at the Guinness brewery, introduced the **t distribution**: for roughly normal data,

`t = (x̄ − μ) / (s/√n)` ~ **t with n − 1 degrees of freedom**.

Its tails are heavier than the normal and approach it as n grows.

![The t distribution with 3 and 30 degrees of freedom versus the normal](/lessons/prob-stats/15-t-tests-t-en.svg)
*With little data the t tails are heavier (larger thresholds); for large n t is almost the normal.*

## Three common tests

1. **One sample**: does the mean equal μ₀? `t = (x̄ − μ₀)/(s/√n)`.
2. **Two independent samples (Welch)**: `t = (x̄₁ − x̄₂)/√(s₁²/n₁ + s₂²/n₂)`. It does not assume equal variances and should be the default.
3. **Paired**: the same subjects measured twice (before–after): take differences d and run a one-sample test with μ₀ = 0. More powerful than two independent samples because it removes between-person differences.

## Assumptions and checks

Independent observations; roughly normal data (plot for small n, the CLT helps for large n); no dominating outliers. If violated: use a non-parametric test or the bootstrap (lesson 20).

## Professional examples

Page load time before vs after optimisation, training effectiveness (paired), productivity on two shifts. Always report the **confidence interval for the difference**, not just the p-value (see lesson 16).

## References

- Student (Gosset, W. S.) (1908). The probable error of a mean. *Biometrika* 6(1).
- Diez et al., *OpenIntro Statistics*, chapter 7 (Inference for numerical data).
- NIST/SEMATECH *e-Handbook*, §1.3.5.2 (t-test).
