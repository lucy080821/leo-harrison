# Linear regression: estimates, R² and residuals

Regression answers: *when X changes by 1 unit, how much does Y change (on average)?* It is the core tool of quantitative analysis and the foundation of machine learning.

## The model and estimation

`ŷ = a + b·x`. **Ordinary least squares (OLS)** picks `a`, `b` to minimise the sum of squared residuals `Σ(y − ŷ)²`. With one variable: `b = cov(x,y)/var(x)`, `a = ȳ − b·x̄`.

![The least-squares line and its residuals](/lessons/python-data/23-regression-numpy-scipy-fig-en.svg)
*The least-squares line and its residuals*

## Reading the result

- **Slope `b`**: average change in Y when X rises by 1 (holding other variables fixed in multiple regression).
- **R²**: share of Y's variance explained by the model (0 to 1). A high R² does **not** mean causation.
- **Residuals** `y − ŷ`: should fluctuate around 0, with no pattern and even spread.

## Multiple regression with matrices

`β = (XᵀX)⁻¹Xᵀy`, but in practice use `np.linalg.lstsq` (numerically more stable than a direct inverse). A column of ones in X stands for the intercept.

## Checking assumptions (LINE)

1. **L**inearity: the relationship is roughly linear (plot residuals against ŷ).
2. **I**ndependence of observations.
3. **N**ormality of residuals (for exact confidence intervals).
4. **E**qual variance of residuals (no "funnel").

## Pitfalls

- **Extrapolating** beyond the data range is dangerous.
- **Multicollinearity** (strongly correlated X variables) makes coefficients unstable.
- **Correlation ≠ causation**; only controlled experiments establish causality.
- R² always rises when you add variables; use **adjusted R²** or check on a test set.

## References

- James, Witten, Hastie, Tibshirani. *An Introduction to Statistical Learning*, chapter 3.
- SciPy documentation, `scipy.stats.linregress`.
- Lexi Learn's "Math and Statistics" course, regression lesson.
