# Basic time-series forecasting and measuring error

Forecasting sales, traffic and inventory is a constant need. The professional rule: **always start with a simple baseline**; a complex model is only worth it if it beats the baseline.

## Split data by time

For time series **never shuffle** or split randomly: train on the past, test on the future (as in reality). A random split leaks the future into training, giving falsely good scores.

![Baseline forecasts: repeat last week and the rolling mean](/lessons/python-data/27-forecasting-basics-fig-en.svg)
*Baseline forecasts: repeat last week and the rolling mean*

## The baselines

| Baseline | Idea | Strong when |
|---|---|---|
| Naive | tomorrow = today | low-volatility series |
| **Seasonal naive** | repeat the same day of the previous cycle (week) | clear seasonality |
| Rolling mean | average of the last N days | high noise |
| Drift | naive plus the average trend | steady trend |

## Measuring error

- **MAE** = mean |error|: easy to grasp, in the data's units.
- **RMSE** = root mean squared error: punishes big errors hard.
- **MAPE** = mean |error|/|actual| ×100%: comparable across series, **breaks when actuals are near 0**.

## Components of a series

`observation = trend + seasonality + noise`. Recognising each component (decompose with `statsmodels.tsa.seasonal_decompose` or a manual rolling mean) decides the right baseline and model.

## Next steps

Holt-Winters (seasonal exponential smoothing), ARIMA/SARIMA, Prophet, then machine learning with lag features. The Machine Learning course continues in this direction.

## References

- Hyndman & Athanasopoulos. *Forecasting: Principles and Practice* (3rd ed., OTexts, free online).
- Makridakis et al. (2020). The M4 Competition. *International Journal of Forecasting* 36(1).
