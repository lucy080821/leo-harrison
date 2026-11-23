# Law of large numbers and the central limit theorem

## Law of large numbers (LLN)

Jacob Bernoulli proved the first version in *Ars Conjectandi* (published 1713): as the number of trials n grows, the **sample mean x̄ₙ converges to the expectation μ**. Flip a coin more and the fraction of heads gets closer to 0.5.

![Fraction of heads while flipping a coin: wild at first, then settling at 0.5](/lessons/prob-stats/10-lln-clt-lln-en.svg)
*The x-axis (log scale) is the number of flips; the more flips, the closer to 0.5.*

> The LLN does **not** say "after a run of tails, heads is due" (the *gambler's fallacy*). Each flip stays independent; the fraction stabilises because a large count *dilutes* the early deviation.

## The central limit theorem (CLT)

Laplace (1810) and later mathematicians proved: if X₁, …, Xₙ are independent, identically distributed with finite mean μ and standard deviation σ, then for large n

`x̄ₙ ≈ N(μ, σ²/n)`

**whatever the original distribution of X.** The standard deviation of the mean, the **standard error**, is **σ/√n**: to double accuracy you need **four times** the data.

![Distribution of dice sample means for n = 1, 2, 30](/lessons/prob-stats/10-lln-clt-clt-en.svg)
*The original distribution is flat, yet the mean of 30 rolls is almost bell-shaped.*

## Practical meaning

- Explains why measurement errors, aggregate scores etc. tend to be bell-shaped: they are *sums of many small effects*.
- It underlies **confidence intervals** and **hypothesis tests** (lessons 14 and 16).
- For very skewed distributions or small n you need far larger n for a good approximation; "n ≥ 30" is only a rule of thumb.

## References

- Blitzstein & Hwang, *Introduction to Probability*, chapter 10 (Inequalities and limit theorems).
- Bernoulli, J. (1713). *Ars Conjectandi*.
- Diez et al., *OpenIntro Statistics*, §4.1 (Variability in estimates) and the Central Limit Theorem.
- MIT OCW 18.05, lectures on the LLN and CLT.
