# Regression diagnostics: residuals, leverage and Anscombe's quartet

A regression always returns numbers, even when it is **wrong**. Diagnostics check whether the assumptions are reasonable. Francis Anscombe (1973) illustrated this with **four data sets** sharing the same mean, variance, correlation (≈ 0.816) and regression line, yet looking completely different: one linear, one curved, one with an outlier, one dragged by a single point.

![Two Anscombe data sets with the same fitted line but different shapes, with residual plots](/lessons/prob-stats/25-regression-diagnostics-diag-en.svg)
*Set I is linear; set II is curved so its residuals form a parabola, signalling a wrong model.*

**Lesson: always plot the data.**

## The assumptions (LINE)

1. **L**inearity: the mean relationship is linear.
2. **I**ndependence: residuals are independent (often broken in time series).
3. **N**ormality: residuals roughly normal (matters for intervals when n is small).
4. **E**qual variance: constant residual variance (*homoscedasticity*).

## Diagnostic tools

- **Residuals vs fitted plot**: should look like a random cloud around 0. A curve ⇒ a missing nonlinear term; a funnel ⇒ changing variance (fix with logs, weighted regression, robust standard errors).
- **Q–Q plot** of residuals: checks normality.
- **Leverage** hᵢ: points whose x is far from the centre. For simple regression `hᵢ = 1/n + (xᵢ − x̄)²/Sxx`.
- **Cook's distance** Dᵢ: how much one point changes the whole fit; a point with both high leverage and a large residual is **influential**.

## Handling influential points

Investigate before deleting: data-entry error or real information? Fit with and without the point and report both.

## References

- Anscombe, F. J. (1973). Graphs in statistical analysis. *The American Statistician* 27(1).
- Cook, R. D. (1977). Detection of influential observation in linear regression. *Technometrics* 19(1).
- Gelman, Hill, Vehtari. *Regression and Other Stories*, chapter 11 (Assumptions, diagnostics).
