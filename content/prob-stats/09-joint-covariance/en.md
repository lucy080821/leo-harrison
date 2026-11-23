# Joint distributions, covariance and portfolios

Real problems involve **several variables at once**. We need to describe them *together*.

## Joint and marginal distributions

The **joint pmf** is p(x, y) = P(X = x, Y = y). A **marginal** is obtained by summing over the other variable: p_X(x) = Σᵧ p(x, y). X and Y are **independent** when p(x, y) = p_X(x)·p_Y(y) for all x, y.

## Covariance and correlation

`Cov(X, Y) = E[(X − μ_X)(Y − μ_Y)] = E[XY] − E[X]E[Y]`

- Positive: move together; negative: move oppositely; **independent ⇒ Cov = 0** (the converse is *not* true).
- The correlation `ρ = Cov(X, Y) / (σ_X σ_Y)` lies in [−1, 1].

## The variance of a sum

`Var(aX + bY) = a²Var(X) + b²Var(Y) + 2ab·Cov(X, Y)`

When X and Y are independent the last term vanishes (lesson 5).

## Professional example: portfolio diversification

Harry Markowitz (1952) showed that a portfolio's risk (standard deviation) is not the average of its assets' risks: it depends on **correlation**. Two assets with σ = 20% and 30%, ρ = 0.4, split 50/50, give portfolio σ ≈ 21.1%, below the 25% average. The lower the correlation, the more risk is removed: the *benefit of diversification*.

![Standard deviation of a 50/50 portfolio falls as correlation falls](/lessons/prob-stats/09-joint-covariance-cov-en.svg)
*At ρ = 1 there is no diversification benefit; the lower ρ, the lower the risk.*

## References

- Blitzstein & Hwang, *Introduction to Probability*, chapter 7 (Joint distributions).
- Markowitz, H. (1952). Portfolio Selection. *The Journal of Finance* 7(1).
- Diez et al., *OpenIntro Statistics*, chapter 7 (correlation).
