# Describing data: mean, median, standard deviation

**Descriptive statistics** summarises a data set with a few numbers and plots before any inference. The NIST/SEMATECH *e-Handbook of Statistical Methods* and John Tukey (*Exploratory Data Analysis*, 1977) stress: **look at the data before computing**.

## Measures of centre

- **Mean** x̄ = (x₁ + … + xₙ) / n. Sensitive to extreme values.
- **Median**: the middle value once sorted. Robust to outliers.
- **Mode**: the most frequent value.

Example: salaries of 10 employees (million VND/month) including a director on 120: the mean is dragged up to 27.7 but the median is only 17. When someone says "the average salary at the company", ask: *mean or median?*

## Measures of spread

- **Range**: max − min.
- **Sample variance** s² = Σ(xᵢ − x̄)² / (n − 1) and **standard deviation** s = √s². The denominator n − 1 (Bessel's correction) makes s² an unbiased estimator of the population variance.
- **Interquartile range (IQR)** = Q3 − Q1: the width of the middle 50% of the data, robust to outliers.

## Box plots and outliers

Tukey proposed the **box plot**: a box from Q1 to Q3, a line at the median, "whiskers" reaching the points still inside [Q1 − 1.5·IQR, Q3 + 1.5·IQR]; points outside are drawn separately and called **outliers** under this common convention.

![Box plot of 10 salaries; the point 120 is an outlier](/lessons/prob-stats/01-describing-data-box-en.svg)
*The box spans Q1 to Q3, the red line is the median; the mean is pulled up by the outlier.*

> The 1.5·IQR rule is a convention, not a law. An outlier may be a data-entry error, but it may also be the most important information.

## Try it

Change 120 to 30 and compare the mean with the median.

## References

- NIST/SEMATECH. *e-Handbook of Statistical Methods*, chapter 1 (Exploratory Data Analysis), itl.nist.gov/div898/handbook.
- Tukey, J. W. (1977). *Exploratory Data Analysis*. Addison-Wesley.
- Diez, Çetinkaya-Rundel, Barr. *OpenIntro Statistics*, chapter 2 (Summarizing data).
