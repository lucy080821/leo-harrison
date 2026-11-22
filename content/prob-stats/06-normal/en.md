# The normal distribution and z-scores

## Continuous variables and the density function

For a **continuous** variable (height, time) the probability of any exact value is 0; we speak of probability over an **interval**, equal to the **area under the density f(x)**: P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx (the integral lesson makes this precise).

## The normal distribution

The **normal distribution N(μ, σ²)** has the bell-shaped density:

`f(x) = 1/(σ√(2π)) · exp(−(x − μ)² / (2σ²))`

μ is the centre, σ the width. Found by Abraham de Moivre (1733) as an approximation to the binomial, and used by Gauss (1809) to describe measurement error, hence also the Gaussian distribution.

**The 68–95–99.7 rule:** μ ± 1σ holds ≈ 68% of the probability, μ ± 2σ ≈ 95%, μ ± 3σ ≈ 99.7%.

![Normal curve with 68%, 95% and 99.7% regions shaded by standard deviations](/lessons/prob-stats/06-normal-normal-en.svg)
*The area under the curve within ±1σ, ±2σ, ±3σ is about 68%, 95%, 99.7%.*

## The z-score: standardising

`z = (x − μ) / σ` tells how many standard deviations x is from the mean. So every normal reduces to **N(0, 1)** and we can compare things in different units: a student with 85/100 on a test averaging 70, σ = 10 (z = 1.5) versus 600/800 on a test averaging 500, σ = 100 (z = 1) ⇒ the first is relatively better.

## When to use the normal?

Heights, measurement errors and noise are often approximately normal; income, house prices and waiting times are usually **right-skewed**, so avoid the normal there. Why the normal appears so often is explained by the **central limit theorem** (lesson 7).

## References

- Blitzstein & Hwang, *Introduction to Probability*, chapter 5 (Continuous random variables) incl. the Normal.
- NIST/SEMATECH *e-Handbook*, §1.3.6.6.1 (Normal distribution).
- Diez et al., *OpenIntro Statistics*, chapter 3 (Distributions of random variables).
