# Hypothesis testing and p-values

## The logic of a test

The question: *is the difference we see real, or just luck in sampling?* The procedure (Fisher, Neyman–Pearson, today often blended):

1. State a **null hypothesis H₀**: "no difference" (two versions have the same conversion rate).
2. Choose a **test statistic** (e.g. a z-score) measuring how far the data deviate from H₀.
3. Compute the **p-value**: the probability of a result *at least as extreme as observed*, **assuming H₀ is true**.
4. A small p ⇒ the data are hard to explain by H₀ ⇒ doubt H₀.

![Normal curve with both tails shaded beyond the observed |z|](/lessons/prob-stats/09-hypothesis-testing-pval-en.svg)
*The p-value is the total area of the two tails: the chance of a result this extreme if H₀ is true.*

## Two kinds of error

| | H₀ true | H₀ false |
|---|---|---|
| Reject H₀ | **Type I error** (false positive), probability α | correct (power = 1 − β) |
| Do not reject | correct | **Type II error** (false negative), probability β |

The threshold α = 0.05 is a common convention suggested by Ronald Fisher, **not a law of nature**.

## Warning: p-values are often misread

The American Statistical Association statement (ASA, Wasserstein & Lazar, 2016) lists six principles, including:

- A p-value is **not** the probability that the hypothesis is true.
- Conclusions should not rest only on whether p crosses a threshold.
- Full reporting and transparency are needed; trying many analyses and reporting only the "significant" one (*p-hacking*) makes results meaningless.
- A p-value does not measure the **size** or **practical importance** of an effect: with a huge sample, a tiny difference gets a small p.

## Real-world example: an A/B test

A blue "Buy now" button (A) converts 10.0%, an orange one (B) 12.0%, 2,000 visits each. The z-score ≈ 2.02, p ≈ 0.043 ⇒ at the 5% level there is evidence B differs from A. But also ask: is a +2 percentage-point change worth acting on (practical significance)? What is the confidence interval for the difference?

## References

- Wasserstein, R. L. & Lazar, N. A. (2016). The ASA Statement on p-Values: Context, Process, and Purpose. *The American Statistician* 70(2), 129–133.
- Diez et al., *OpenIntro Statistics*, chapters 5–6 (Inference for proportions).
- Fisher, R. A. (1925). *Statistical Methods for Research Workers*.
- MIT OCW 18.05: Null hypothesis significance testing.
