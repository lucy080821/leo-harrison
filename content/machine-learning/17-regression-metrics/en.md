# Evaluating regression models: MAE, RMSE, R² and residual analysis

Models predicting **numbers** (house price, sales, delivery time) need different metrics and charts than classification.

## Main metrics

| Metric | Formula | Properties |
|---|---|---|
| **MAE** | mean `|y − ŷ|` | easy to grasp, same units, robust to outliers |
| **RMSE** | `√mean (y − ŷ)²` | punishes large errors hard |
| **R²** | `1 − SS_res / SS_tot` | share of variance explained; **can be negative** on a test set |
| **MAPE** | mean `|y − ŷ|/|y|` | relative; breaks when y ≈ 0 |

`RMSE ≥ MAE`; a big gap means a few very large errors.

![Residuals show where a model fails, which one number cannot](/lessons/machine-learning/17-regression-metrics-fig-en.svg)
*Residuals show where a model fails, which one number cannot*

## Always compare with a baseline

`DummyRegressor()` predicts the training mean (R² ≈ 0). A complex model is worth it only if it **clearly beats** the baseline and a simple linear model.

## Residual analysis

One number hides *where* the model fails:

1. **Predicted vs actual**: points should hug the diagonal.
2. **Residuals vs predicted**: should be a cloud around 0. A **funnel** (error grows with the value) means unequal variance: try predicting `log(y)`.
3. **Residuals by group** (region, month): reveals biased groups.
4. Inspect the **worst cases** for data errors or missing features.

## Predicting the log

When y is right-skewed (price, revenue): train on `log1p(y)` and `expm1` the predictions (`TransformedTargetRegressor`). Errors become **relative**, often more sensible.

## References

- scikit-learn User Guide, "Metrics and scoring: regression metrics".
- Hyndman & Koehler (2006). Another look at measures of forecast accuracy. *International Journal of Forecasting* 22(4).
- James et al. *An Introduction to Statistical Learning*, chapter 3.
