# Multiple regression: several explanatory variables

Lesson 23 had a single x. Real data have many factors acting together: house price by area, rooms, location… **Multiple regression**:

`y = β₀ + β₁x₁ + β₂x₂ + … + β_p x_p + ε`

## Matrix form

For n observations, stack into `y = Xβ + ε` (X has a column of ones for the intercept). Least squares gives the **normal equations**:

`β̂ = (XᵀX)⁻¹ Xᵀ y`

(in practice QR/SVD is more stable, see lesson 39; `np.linalg.lstsq` does this.)

## Reading the coefficients

βⱼ is the average change in y when xⱼ rises by one unit **with the other variables held fixed**. That "held fixed" is the key difference from simple regression: the area coefficient *after accounting for* rooms usually differs from the one with area alone.

![Actual vs predicted values of a multiple regression lie near the diagonal](/lessons/prob-stats/24-multiple-regression-mreg-en.svg)
*A good model keeps (predicted, actual) points close to the line y = x.*

## Judging the model

- **R²** always rises when you add variables, even meaningless ones. Use **adjusted R²** = 1 − (1 − R²)(n − 1)/(n − p − 1) to penalise the number of predictors.
- **t-tests** for each coefficient and an **F-test** for the whole model.
- **Multicollinearity**: strongly correlated predictors make coefficients unstable with large standard errors. Measure with the **VIF** (VIF > 5–10 is worrying); fix by dropping or combining variables or by regularisation (Ridge/Lasso in the ML course).

## Categorical predictors (dummy variables)

A "district" variable with k levels is encoded with k − 1 columns of 0/1; the coefficients show the difference from the reference group. ANOVA (lesson 19) is exactly regression with all dummy variables.

## References

- Gelman, Hill, Vehtari. *Regression and Other Stories* (Cambridge, 2020).
- James, Witten, Hastie, Tibshirani. *An Introduction to Statistical Learning*, chapter 3.
- Kutner et al. *Applied Linear Statistical Models*.
