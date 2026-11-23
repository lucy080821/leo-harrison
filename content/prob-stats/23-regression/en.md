# Correlation and linear regression

## Correlation

The **Pearson correlation coefficient** r measures the strength of a *linear* relationship between two variables, from −1 to 1:

`r = Σ(xᵢ − x̄)(yᵢ − ȳ) / √(Σ(xᵢ − x̄)² · Σ(yᵢ − ȳ)²)`

r ≈ 1: rise together; r ≈ −1: opposite directions; r ≈ 0: no **linear** relationship (a nonlinear one may still exist).

## Simple linear regression

We look for the line ŷ = a + bx **closest to the data**. "Closest" means **least squares**: pick a, b minimising the sum of squared **residuals** (differences between true y and ŷ). The method was published by Legendre (1805) and developed by Gauss (1809). The closed-form solution:

`b = Σ(xᵢ − x̄)(yᵢ − ȳ) / Σ(xᵢ − x̄)²`,  `a = ȳ − b·x̄`

![Scatter plot of area vs price with the regression line and residuals](/lessons/prob-stats/23-regression-reg-en.svg)
*Each vertical segment is a residual; least squares picks the line minimising the sum of their squares.*

The **coefficient of determination R²** (= r² in simple regression) says what fraction of the variation in y the model explains.

## Why "regression"?

Francis Galton (1886) observed that children of very tall parents tend to be slightly shorter and "regress" toward the mean, hence *regression*. This is a general statistical phenomenon, **regression to the mean**, often mistaken for a causal effect.

## Real-world example: pricing a house

Predict price from area. Warnings: predict only **within the observed range** (interpolation); extrapolation is risky; and always plot the **residuals** to check the model is sensible.

> This is the foundation of supervised Machine Learning: linear regression is the first model in the Lexi Learn ML course.

## References

- Diez et al., *OpenIntro Statistics*, chapter 7 (Introduction to linear regression).
- Legendre, A.-M. (1805). *Nouvelles méthodes pour la détermination des orbites des comètes*.
- Galton, F. (1886). Regression towards mediocrity in hereditary stature. *J. Anthropological Institute* 15.
- NIST/SEMATECH *e-Handbook*, chapter 4 (Process Modeling).
