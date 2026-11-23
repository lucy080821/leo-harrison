# Chi-square tests for categorical data

With **categorical** data (device, bought / did not buy, region) we compare **counts**, not means.

## The idea

Take the **observed counts** O and the **expected counts** E *if H₀ were true*. Karl Pearson's statistic (1900):

`χ² = Σ (O − E)² / E`

The further the counts stray from expectation, the larger χ². Under H₀, χ² approximately follows the **chi-square** distribution with degrees of freedom depending on the problem.

![Chi-square distribution with 1 degree of freedom, rejection region in the right tail](/lessons/prob-stats/18-chi-square-chi-en.svg)
*The further right the observed χ², the smaller the p-value (tail area).*

## The two most common forms

1. **Goodness-of-fit**: does the data follow a given distribution? E = n·pᵢ; degrees of freedom = (categories − 1). E.g. a fair die, or whether customer groups match population shares.
2. **Test of independence**: are two categorical variables related? For a contingency table, `E = (row total × column total)/grand total`; degrees of freedom = (rows − 1)(columns − 1).

Example: device (mobile / desktop) and purchase. The table [[30, 70], [45, 55]] gives χ² = 4.8 with 1 degree of freedom, p ≈ 0.028: evidence of an association at the 5% level.

## Conditions

Independent observations; every cell with **E ≥ 5** (otherwise use Fisher's exact test). A small p only says there **is** an association, not **how strong** it is: also report an effect size (e.g. Cramér's V or the difference in proportions).

## References

- Pearson, K. (1900). On the criterion that a given system of deviations… *Philosophical Magazine* 50.
- Agresti, A. *Categorical Data Analysis* (Wiley).
- Diez et al., *OpenIntro Statistics*, chapter 6 (Inference for categorical data).
