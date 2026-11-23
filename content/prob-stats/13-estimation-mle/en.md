# Point estimation and maximum likelihood (MLE)

We have data and a model with an unknown parameter θ (a proportion p, a rate λ, a mean μ…). An **estimator** is a rule turning data into a value θ̂.

## Quality of an estimator

- **Bias**: `Bias(θ̂) = E[θ̂] − θ`. Unbiased if it is 0.
- **Variance** of θ̂: how much it fluctuates between samples.
- **MSE** = Var + Bias²: mean squared error. Sometimes a slightly biased estimator with small variance has a lower MSE (the bias–variance trade-off, the basis of regularisation).

Example: s² with **n − 1** is an unbiased estimator of σ²; dividing by n is biased low (by a factor (n − 1)/n).

## Maximum likelihood

The **likelihood** L(θ) = P(data | θ), viewed as a function of θ. The **MLE** is the θ that maximises L (usually we maximise log L). Ronald Fisher developed the idea around 1912–1922.

- Coin flips: k heads in n tosses ⇒ L(p) = pᵏ(1 − p)ⁿ⁻ᵏ ⇒ **p̂ = k/n**.
- Exponential: **λ̂ = 1/x̄**.
- Normal: μ̂ = x̄, σ̂² = Σ(xᵢ − x̄)²/n.

![Log-likelihood of p for 7 heads in 10 tosses, peaking at p = 0.7](/lessons/prob-stats/13-estimation-mle-mle-en.svg)
*The peak is the MLE: the value that makes the observed data most likely.*

## Why MLE matters at work

MLE is how many models are *trained*: linear regression with normal noise gives the same answer as least squares, and logistic regression and classification networks minimise cross-entropy, which is maximising likelihood. For large n the MLE is consistent, nearly unbiased and nearly minimum-variance.

## References

- Wasserman, L. *All of Statistics* (Springer), chapter 9 (Parametric inference).
- Blitzstein & Hwang, *Introduction to Probability*, inference and MLE sections.
- Fisher, R. A. (1922). On the mathematical foundations of theoretical statistics. *Phil. Trans. R. Soc. A* 222.
