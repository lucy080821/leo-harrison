# Binomial and Poisson distributions

## Binomial

A **Bernoulli trial** has two outcomes: success (probability p) or failure. Repeat **n** identical independent trials and let X be the number of successes; then X ~ **Binomial(n, p)**:

`P(X = k) = C(n, k) · pᵏ · (1 − p)ⁿ⁻ᵏ`

where C(n, k) = n! / (k!(n − k)!) counts the ways to pick k success positions. **E[X] = np, Var(X) = np(1 − p).**

Real-world example: among 20 shoppers, each buying with probability 0.3, the number of buyers is Binomial(20, 0.3), averaging 6.

![Bars of Binomial(20, 0.3), peaking at k = 6](/lessons/prob-stats/06-binomial-poisson-binom-en.svg)
*The most likely number of buyers is 6 (= np); the distribution is slightly right-skewed.*

## Poisson

When counting **rare, independent** events in a fixed interval of time/space with mean rate λ, use **Poisson(λ)**:

`P(X = k) = e⁻λ · λᵏ / k!`, with **E[X] = Var(X) = λ**.

Siméon Poisson published it in 1837; the famous historical example is Prussian soldiers killed by horse kicks per year, analysed by Ladislaus Bortkiewicz (1898). Today: calls arriving at a call centre per minute, bugs per 1,000 lines of code, customers at a counter per hour.

## Poisson as a limit of the binomial

When n is large, p small and np = λ fixed, Binomial(n, p) approximates Poisson(λ). That is why Poisson suits "many chances, each very rare".

## References

- Blitzstein & Hwang, *Introduction to Probability*, chapters 3 and 4 (Binomial, Poisson).
- NIST/SEMATECH *e-Handbook*, §1.3.6.6 (Probability distributions).
- Bortkiewicz, L. von (1898). *Das Gesetz der kleinen Zahlen*.
