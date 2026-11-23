# Machine learning for time series: lag features and time-based validation

Ordinary ML models (forests, boosting, regression) **don't know time**. We turn the series into a **table**: each row is a day, its features are its **past**.

## Features for forecasting

| Group | Example | Note |
|---|---|---|
| **Lags** | yesterday's value, 7 days ago | `shift(k)` |
| **Rolling windows** | mean of the last 7 days | `shift(1).rolling(7).mean()` |
| **Calendar** | weekday, month, holiday, month-end | known in advance |
| **Exogenous** | a planned promotion, forecast weather | only if *known ahead* |

![Lag features turn a time series into a table for ML](/lessons/machine-learning/20-time-series-ml-fig-en.svg)
*Lag features turn a time series into a table for ML*

## The survival rule: never look at the future

Features for day *t* may use only information **before t**. Classic bug: `rolling(7).mean()` **includes day t** (the answer itself). `shift(1)` before rolling.

## Workflow

1. Build features, `dropna()` the first rows lacking history.
2. **Split by time**: the past to train, the final stretch to test (or `TimeSeriesSplit`).
3. Compare with the **seasonal-naive baseline**. Only a clear win justifies a complex model.
4. Analyse residuals over time (any seasonality left?).

## Multi-step forecasts

Two ways: **recursive** (forecast tomorrow, feed it as a lag for the day after; errors accumulate) or **direct** (one model per horizon). Tree models **cannot extrapolate a trend**: detrend (predict the difference) or add a linear trend feature.

## References

- Hyndman & Athanasopoulos. *Forecasting: Principles and Practice* (3rd ed.).
- Bergmeir & Benítez (2012). On the use of cross-validation for time series predictor evaluation. *Information Sciences* 191.
- scikit-learn User Guide, "TimeSeriesSplit".
