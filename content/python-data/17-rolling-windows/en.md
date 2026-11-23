# Rolling windows, cumulative and exponentially weighted means

Daily figures are **noisy** and have **weekly seasonality** (weekends differ from weekdays). To see the trend we smooth with a **rolling window**.

## Three kinds of window

| Kind | Code | Meaning |
|---|---|---|
| **Rolling** | `s.rolling(7).mean()` | mean of the latest 7 periods, fixed window |
| **Expanding** | `s.expanding().mean()` | from the start to now (cumulative mean) |
| **Exponential** (EWM) | `s.ewm(span=7).mean()` | recent periods weigh more, no hard window |

A **7-day** window cancels weekly seasonality; **30 days** shows the monthly trend. The first few values are `NaN` (not enough data); set `min_periods` if you wish.

![A rolling mean smooths daily swings](/lessons/python-data/17-rolling-windows-fig-en.svg)
*A rolling mean smooths daily swings*

## Cumulative operations

`cumsum()` (running total), `cummax()`, `cumprod()`: cumulative revenue against a target, drawdown in finance.

## Anomaly detection with windows

A local z-score: `z = (x − rolling_mean)/rolling_std`; **|z| > 3** flags a point unusual versus recent behaviour (unlike a global threshold it adapts to the trend). Uses: monitoring abnormal revenue, system faults.

## Notes

- A **centred** window (`center=True`) smooths nicely but "sees the future": **do not use for forecasting**.
- Choose the width by the data's **cycle** (7 for weekly, 12 for monthly/yearly).
- EWM reacts fast to change but is more sensitive to noise than a long rolling mean.

## References

- pandas documentation, "Windowing operations".
- Hyndman & Athanasopoulos. *Forecasting: Principles and Practice*, the chapter on exponential smoothing.
- Montgomery, D. *Introduction to Statistical Quality Control* (EWMA control charts).
