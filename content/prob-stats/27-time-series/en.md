# Time series: trend, seasonality and basic forecasting

Sales, traffic and demand are recorded **over time**, and observations are **not independent**: this month resembles last month. Everything in earlier lessons assumed independence, so time series need their own approach.

## Decomposition

`Series = Trend + Seasonality + Remainder`

- **Trend**: the long-run direction.
- **Seasonality**: a pattern repeating over a fixed period (week, year).
- **Remainder**: noise. It can be additive or multiplicative (when seasonal swings grow with the level).

![A 24-month sales series and its trend extracted by a moving average](/lessons/prob-stats/27-time-series-ts-en.svg)
*The solid line is the seasonal data; the dashed line is the rising trend.*

## Autocorrelation

The **ACF** measures the correlation of a series with itself k steps back: `ρₖ = Σ(xₜ − x̄)(xₜ₊ₖ − x̄)/Σ(xₜ − x̄)²`. A peak at lag 12 (monthly data) signals yearly seasonality. A stationary series (no trend) with a quickly decaying ACF is a requirement of many classic models (ARIMA).

## Basic forecasting

- **Moving average**: smoothing and trend estimation.
- **Simple exponential smoothing** `sₜ = α·xₜ + (1 − α)·sₜ₋₁`: weights decay exponentially into the past; a large α reacts fast. Extensions: Holt (trend), Holt–Winters (seasonality).
- **ARIMA**, **machine-learning models** with lag features, **Prophet**.

## Evaluating properly

**Do not shuffle the data.** Split by time (train first, test later) and use *rolling-origin cross-validation*. Measure with **MAE**, **RMSE**, **MAPE**; compare with the **naive forecast** (repeat the last value): a complex model must beat it.

## Professional uses

Demand and inventory forecasting, call-centre staffing, seasonal revenue, operational anomaly detection.

## References

- Hyndman, R. J. & Athanasopoulos, G. *Forecasting: Principles and Practice* (3rd ed., OTexts, otexts.com/fpp3).
- Box, Jenkins, Reinsel, Ljung. *Time Series Analysis: Forecasting and Control*.
- Shumway, R. & Stoffer, D. *Time Series Analysis and Its Applications*.
