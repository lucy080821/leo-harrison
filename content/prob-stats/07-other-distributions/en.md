# Uniform, geometric and exponential: waiting times

Lesson 6 counted *how many* events. This lesson models **how long we wait** or **how many tries** it takes.

## The uniform distribution U(a, b)

Every value in [a, b] is equally likely: density f(x) = 1/(b − a), E[X] = (a + b)/2. It models "a random arrival time within a window" and underlies random-number generation.

## The geometric distribution

Repeat independent Bernoulli trials with success probability p until the first success. Let X be the number of trials:

`P(X = k) = (1 − p)ᵏ⁻¹ · p`, **E[X] = 1/p**.

Example: a 20% closing rate means 5 calls per sale on average.

## The exponential distribution Exp(λ)

For events occurring independently at rate λ (see Poisson), the **waiting time between events** T has density `f(t) = λe^(−λt)`, t ≥ 0:

- `P(T > t) = e^(−λt)` (the survival function), **E[T] = 1/λ**.
- **Memoryless:** P(T > s + t | T > s) = P(T > t). Having waited 5 minutes does not make the next call "due". This is the defining property of the exponential (and of the geometric in discrete time).

![Geometric pmf and exponential density](/lessons/prob-stats/07-other-distributions-dist-en.svg)
*Both decay: an early first success and a short wait are the most likely.*

## Professional uses

- **Reliability**: time to failure of equipment (the exponential is the simplest model; Weibull is common in practice).
- **Queueing** and call-centre design: arrival and service times.
- **Conversion analysis**: attempts until a customer buys.
- Extensions: the **Gamma** (sum of k exponential waits) and the **Beta** (a distribution on [0, 1], used in the Bayesian lesson).

## References

- Blitzstein & Hwang, *Introduction to Probability*, chapters 4 and 5 (Geometric, Exponential, memorylessness).
- NIST/SEMATECH *e-Handbook*, §1.3.6.6 (Exponential, Gamma, Weibull).
- Ross, S. *Introduction to Probability Models*, chapter 5.
