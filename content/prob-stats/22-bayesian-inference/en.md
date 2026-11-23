# Bayesian inference: updating beliefs with data

Lesson 4 introduced Bayes' formula for *events*. Bayesian inference applies it to **parameters**: θ too is an uncertain quantity with a distribution.

`p(θ | data) ∝ p(data | θ) · p(θ)`

**Posterior ∝ Likelihood × Prior.** The prior encodes knowledge before seeing data; the data update it.

## The Beta–binomial model

A conversion rate p with a **Beta(α, β)** prior. Observing k successes in n trials gives another Beta posterior:

`p | data ~ Beta(α + k, β + n − k)`

(this is **conjugacy**: prior and posterior share a family, so it is computable by hand). Beta(1, 1) is the uniform distribution (knowing nothing). Posterior mean `(α + k)/(α + β + n)`.

![Beta(1,1) prior and Beta(8,4) posterior after 7 successes in 10 trials](/lessons/prob-stats/22-bayesian-inference-bayes2-en.svg)
*The data concentrate belief around 0.67; the shaded area is the 95% credible interval.*

## Credible intervals

An interval containing p with 95% probability **under the posterior**; read directly: "p lies in this interval with probability 95%". Different from the frequentist confidence interval (lesson 14).

## Why professionals use Bayes

- It answers **the business question directly**: P(B beats A) = 94%, no p-value gymnastics.
- It combines **existing knowledge** (the prior) when data are scarce.
- It updates continuously as data arrive; the basis of sequential analysis, bandits and hierarchical models.
- For complex models we use **MCMC** (Stan, PyMC) instead of closed forms.

Caution: with little data the result depends on the prior; report sensitivity to the prior choice.

## References

- Gelman, A. et al. *Bayesian Data Analysis* (3rd ed., CRC Press).
- McElreath, R. *Statistical Rethinking* (2nd ed., CRC Press).
- Blitzstein & Hwang, *Introduction to Probability*, chapter 8 (Beta).
