# Markov chains: modelling systems that change state

## The Markov property

A process with states X₀, X₁, X₂, … is a **Markov chain** if *the future depends only on the present, not on how we got here*:

`P(Xₙ₊₁ = j | Xₙ = i, past) = P(Xₙ₊₁ = j | Xₙ = i) = P_ij`

The P_ij form the **transition matrix P**; each row sums to 1. If the current distribution is the row vector π, after one step it is `π P`, after n steps `π Pⁿ`.

![State diagram of weather: sunny and rainy with transition probabilities](/lessons/prob-stats/11-markov-chains-markov-en.svg)
*Arrow labels are one-day transition probabilities; each state's outgoing probabilities sum to 1.*

## The stationary distribution

For a "good enough" chain (it does not split into disconnected parts and has no periodicity), π Pⁿ **converges** to a unique distribution **π\*** independent of the start, satisfying `π* P = π*`. It gives the *long-run* fraction of time in each state. For the weather model above: 5/6 of days sunny, 1/6 rainy.

## Professional uses

- **PageRank** (Brin & Page, 1998): a random web surfer is a Markov chain on the link graph; page scores are the stationary distribution.
- **Customer behaviour**: states "active / dormant / churned" to estimate lifetime value.
- **Queues, reliability, classic language models (n-grams)**.
- **Reinforcement learning** and MCMC (Bayesian methods) are built on Markov chains.

## References

- Blitzstein & Hwang, *Introduction to Probability*, chapter 11 (Markov chains).
- Norris, J. R. *Markov Chains* (Cambridge University Press, 1997).
- Brin, S. & Page, L. (1998). The anatomy of a large-scale hypertextual Web search engine. *Computer Networks* 30.
