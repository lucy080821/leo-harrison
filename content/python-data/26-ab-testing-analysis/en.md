# A/B test analysis from start to finish

The A/B test is the **only** near-certain way to establish causality in a product: split users randomly into two groups, change just **one** thing, compare the outcome.

## The standard workflow

1. **Hypothesis and primary metric** (e.g. conversion rate), **declared in advance**.
2. **Compute the sample size** from the smallest effect worth caring about, α and power.
3. Run until the sample is reached and **whole weekly cycles** are covered; **don't stop early** when p looks small.
4. **Check the split** (SRM): is the 50/50 really 50/50?
5. Test, confidence interval, **effect size**, then decide.

![Comparing two groups' conversion rates with a confidence interval](/lessons/python-data/26-ab-testing-analysis-fig-en.svg)
*Comparing two groups' conversion rates with a confidence interval*

## Two-proportion test

Under H₀ the two rates are equal, so use the pooled rate `p̂` for the standard error:

`z = (p̂_B − p̂_A) / √(p̂(1−p̂)(1/n_A + 1/n_B))`

The confidence interval of the difference uses the **unpooled** standard error. Report both **absolute lift** (B − A) and **relative lift** ((B − A)/A).

## Sample size

`n = (z_{α/2} + z_β)² · [p₁(1−p₁) + p₂(1−p₂)] / (p₂ − p₁)²` per group. The smaller the effect to detect, the larger the sample (proportional to 1/Δ²).

## Pitfalls

- **Peeking** and stopping at p < 0.05 inflates false positives sharply.
- **SRM**: a skewed split signals a technical bug; the result can't be trusted.
- **Many metrics/variants**: correct for multiple comparisons.
- **Novelty effect**: users are drawn to the new thing, then it fades.
- A small, **non-significant** result ≠ "no effect".

## References

- Kohavi, Tang, Xu (2020). *Trustworthy Online Controlled Experiments*. Cambridge University Press.
- Kohavi et al. (2009). Controlled experiments on the web. *Data Mining and Knowledge Discovery* 18.
- SciPy documentation, `scipy.stats.norm`, `chisquare`.
