# ANOVA: comparing many groups at once

To compare **three or more groups** (3 methods, 4 regions, 5 page versions), running many pairwise t-tests inflates false positives (lesson 21). **ANOVA** (Ronald Fisher, 1920s) tests once: *are the means all equal?*

## The idea: compare two sources of variation

- **Between groups** `SSB = Σ nⱼ(x̄ⱼ − x̄)²`: how far apart the group means are.
- **Within groups** `SSW = Σ Σ (xᵢⱼ − x̄ⱼ)²`: spread inside each group (noise).

`F = (SSB/(k − 1)) / (SSW/(N − k))`

A large F ⇒ between-group differences are large relative to within-group noise ⇒ reject H₀: μ₁ = … = μ_k. F follows the F distribution (k − 1 and N − k degrees of freedom) for normal, equal-variance, independent data.

![Three groups of data with group means and the grand mean](/lessons/prob-stats/19-anova-anova-en.svg)
*The distance between group means (between) relative to each group's spread (within) determines F.*

## Effect size

`η² = SSB / (SSB + SSW)` is the **proportion of variation explained** by the groups. For the three groups [5–7], [8–10], [11–13]: F = 27 and η² ≈ 0.90.

## After ANOVA

ANOVA only says *at least one difference exists*, not **which group**. Use corrected **post-hoc** comparisons: Tukey HSD or t-tests with Bonferroni/Holm. If the data are non-normal or variances differ greatly: **Kruskal–Wallis** (non-parametric) or Welch-ANOVA.

## Professional uses

A/B/C/n tests of interface versions, comparing branch performance, comparing training methods. ANOVA is also a special case of **linear regression** with dummy variables (lesson 24).

## References

- Fisher, R. A. (1925). *Statistical Methods for Research Workers*.
- Diez et al., *OpenIntro Statistics*, §7.5 (ANOVA).
- NIST/SEMATECH *e-Handbook*, §7.4.3 (One-way ANOVA).
