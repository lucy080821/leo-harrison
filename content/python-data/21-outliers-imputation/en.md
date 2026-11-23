# Outliers and imputing missing values

The two most debated cleaning tasks. A wrong decision **biases** results or **inflates** certainty.

## Detecting outliers

- **The IQR rule** (Tukey): an outlier if `< Q1 − 1.5·IQR` or `> Q3 + 1.5·IQR`. Robust to skewed distributions.
- **z-scores**: `|z| > 3`. Sensitive to the outliers themselves (they drag the mean and SD), so unreliable for small samples.
- **By context**: age 200 or a negative area is logically wrong, no formula needed.

## What to do with outliers?

1. **Investigate first**: entry error or real information (a VIP customer)?
2. Keep if real; use **robust statistics** (median, IQR) instead of the mean.
3. **Winsorise**: clamp to [Pk, P(100−k)] (`clip`) to reduce influence without losing rows.
4. Remove only when sure it is an error, and **report** the count.

![Detecting outliers with the IQR and imputing missing values](/lessons/python-data/21-outliers-imputation-fig-en.svg)
*Detecting outliers with the IQR and imputing missing values*

## Imputing missing values

| Method | When | Risk |
|---|---|---|
| Mean/median | random, few missing | shrinks variance |
| **Group median** | a related group is known (rooms) | better than global |
| Forward fill (`ffill`) | time series | only when logical for the business |
| Model (KNN, regression) | structured missingness | complexity |

**Always create a flag column** `x_missing`: missingness itself can carry information.

## Danger: data leakage

When building a predictive model, compute the median for imputation **on the training set only**, then apply it to the test set. Filling with statistics from **all** data leaks information from the test set (data leakage).

## References

- Tukey, J. W. (1977). *Exploratory Data Analysis*.
- Little, R. & Rubin, D. *Statistical Analysis with Missing Data* (Wiley).
- pandas documentation, "Working with missing data".
