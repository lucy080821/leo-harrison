# Descriptive statistics and correlation

**Descriptive statistics** compress an entire dataset into a few meaningful numbers: where the **center** is, how **spread out** it is, and how **two variables relate**.

## Measuring central tendency

| Measure | pandas | Meaning |
|---|---|---|
| **Mean** | `s.mean()` | Sum divided by count; **sensitive to outliers** |
| **Median** | `s.median()` | The **middle** value when sorted; **robust** to outliers |
| **Mode** | `s.mode()` | The **most frequent** value |

For incomes `[10, 12, 11, 13, 500]` million: the mean is 109, but the median is 12, which reflects the "typical" person far better. **Skewed data or outliers → prefer the median.**

![The correlation coefficient r for three kinds of relationship](/lessons/python-data/13-statistics-correlation-fig-en.svg)
*The correlation coefficient r for three kinds of relationship*

## Measuring spread

| Measure | pandas | Meaning |
|---|---|---|
| Range | `s.max() - s.min()` | The farthest distance |
| **Variance** | `s.var()` | Mean of the squared deviations |
| **Standard deviation** | `s.std()` | Square root of the variance, same unit as the data |
| **IQR** | `Q3 - Q1` | Width of the middle 50% of the data |

For a sample of $n$ observations, the mean $\bar{x}$ and sample standard deviation:

$$
\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i,\qquad s = \sqrt{\frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})^2}
$$

> pandas `.std()` divides by $n-1$ (**sample** standard deviation); NumPy `np.std` divides by $n$ (population) by default.

## Quantiles and describe

```python
df["math"].quantile(0.5)                 # = the median
df["math"].quantile([0.25, 0.75])        # Q1 and Q3
df[["math", "physics"]].describe()       # count, mean, std, min, 25%, 50%, 75%, max
```

## Outliers: the IQR rule

A value counts as an **outlier** if it lies outside:

$$
[\,Q_1 - 1.5\cdot IQR,\; Q_3 + 1.5\cdot IQR\,],\qquad IQR = Q_3 - Q_1
$$

```python
q1, q3 = df["math"].quantile([0.25, 0.75])
iqr = q3 - q1
low, high = q1 - 1.5 * iqr, q3 + 1.5 * iqr
outliers = df[(df["math"] < low) | (df["math"] > high)]
```

This is also the rule used to draw a **boxplot**. Finding an outlier **doesn't mean deleting it**: ask whether it's a **data-entry error** or a **genuine rare value**.

Another way: **z-score** $|z| > 3$ (only suitable when data is close to a normal distribution).

## Correlation

The **Pearson correlation coefficient** $r$ measures the strength of the **linear relationship** between two variables, within $[-1, 1]$:

$$
r = \frac{\sum (x_i-\bar{x})(y_i-\bar{y})}{\sqrt{\sum (x_i-\bar{x})^2}\sqrt{\sum (y_i-\bar{y})^2}}
$$

| $r$ | Meaning |
|---|---|
| near **+1** | Rise together, a strong positive relationship |
| near **0** | Almost **no** linear relationship |
| near **-1** | One rises as the other falls, a strong negative relationship |

```python
df["math"].corr(df["physics"])           # one pair
df[["math", "physics", "literature"]].corr()    # correlation matrix
```

Rough convention: $|r| < 0.3$ weak, $0.3$-$0.7$ moderate, $> 0.7$ strong.

### Three important cautions

1. **Correlation ≠ causation.** Ice cream and drownings both rise in summer; the common cause is *hot weather*.
2. $r$ only captures **linear relationships**; a curved (U-shaped) relationship can give $r \approx 0$. **Always draw a scatter plot** to look.
3. **Outliers** can drag $r$ strongly.

## Plotting a correlation matrix

```python
import matplotlib.pyplot as plt
corr = df[["math", "physics", "literature"]].corr()
plt.imshow(corr, cmap="coolwarm", vmin=-1, vmax=1)
plt.colorbar()
plt.xticks(range(3), corr.columns); plt.yticks(range(3), corr.columns)
```

## Statistical tests (an introduction)

The question "is the difference between two groups **real** or just luck?" needs **hypothesis testing** (t-test, chi-square...). The `scipy.stats` library provides them; you'll meet them again in the Math for Machine Learning course.
