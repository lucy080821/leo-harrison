# Bootstrap, permutation tests and non-parametric methods

t-tests and ANOVA need **assumptions** (approximate normality, variances…). With small, skewed or outlier-ridden samples, or "unusual" statistics (median, ratios), use **simulation-based** and **non-parametric** methods.

## The bootstrap (Bradley Efron, 1979)

Treat your sample as the best picture of the population. Repeatedly **resample with replacement** (same size n) and compute the statistic (median, mean, coefficient…). The distribution of those values approximates the **sample-to-sample variability**:

- **Standard error** = standard deviation of the bootstrap values.
- **Percentile confidence interval**: take the 2.5% and 97.5% percentiles.

![Bootstrap distribution of the median with a 95% interval](/lessons/prob-stats/20-bootstrap-nonparametric-boot-en.svg)
*Bars show the median over resamples; the two vertical lines are the 2.5% and 97.5% percentiles.*

Caution: the bootstrap cannot rescue a sample that is too small or too skewed; it *reflects* the sample and adds no information.

## Permutation tests

H₀: group labels are unrelated. If so, **shuffling the labels** changes nothing. Compute the statistic (difference in means) over all shuffles (or many random ones) → the p-value is the fraction of shuffles giving a statistic **as extreme or more** than observed. For x = [1, 2, 3], y = [4, 5, 6]: only 2 of 20 splits are as extreme ⇒ p = 0.1.

## Rank-based tests

**Mann–Whitney** (two independent groups) uses *ranks* instead of values, so it resists outliers: U counts the pairs (x, y) with x > y. **Wilcoxon** handles paired data, **Kruskal–Wallis** replaces ANOVA.

## References

- Efron, B. (1979). Bootstrap methods: another look at the jackknife. *Annals of Statistics* 7(1).
- Efron, B. & Hastie, T. *Computer Age Statistical Inference* (Cambridge, 2016).
- Hollander, Wolfe, Chicken. *Nonparametric Statistical Methods*.
