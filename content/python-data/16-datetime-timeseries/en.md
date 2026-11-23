# Dates and time series in pandas

Business analysis almost always has a **time** dimension. pandas has powerful tools for it, but first the data must really be **dates**, not strings.

## Converting properly

```python
df["date"] = pd.to_datetime(df["date"])           # or read_csv(..., parse_dates=["date"])
df["date"].dt.year, .dt.month, .dt.dayofweek, .dt.day_name()
```

Set the date column as the **index** (`set_index("date")`) to use time-based operations.

## Resampling

```python
s.resample("MS").sum()      # monthly totals (MS = month start)
s.resample("W").mean()      # weekly means
```

Common codes: `D` day, `W` week, `MS` month, `QS` quarter, `YS` year. (Newer versions use `ME`, `QE` for period **end**; check the docs for your version.)

![Grouping by week and month with resample](/lessons/python-data/16-datetime-timeseries-fig-en.svg)
*Grouping by week and month with resample*

## Comparing with the previous period

- `shift(1)`: move data back one period; `s - s.shift(1)` is the change.
- `pct_change()`: **% growth** versus the previous period; `pct_change(12)` compares with the same period last year (for monthly data).
- `diff()`: difference between consecutive periods.

## Pitfalls

- **Time zones**: UTC data must be converted (`tz_convert`) before grouping by day.
- **Missing days**: `resample` adds empty periods (sum 0); `asfreq("D")` exposes gaps.
- Grouping by **weekday** (`dayofweek`) and **month** reveals **seasonality**: the basis of forecasting.

## References

- pandas documentation, "Time series / date functionality".
- Hyndman, R. & Athanasopoulos, G. *Forecasting: Principles and Practice* (otexts.com/fpp3).
- McKinney, W. *Python for Data Analysis*, chapter 11.
