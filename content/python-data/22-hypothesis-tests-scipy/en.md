# Statistical tests in Python with scipy.stats

The "Math and Statistics" course explains **why** tests work. This lesson is the **practice**: choosing the right test and reading the result with `scipy.stats`.

## Choosing a test

| Question | Data | Function |
|---|---|---|
| Do two independent groups have different means? | numeric, ~normal | `ttest_ind(a, b, equal_var=False)` (Welch) |
| Same subjects measured twice? | numeric, paired | `ttest_rel(a, b)` |
| As above but non-normal/outliers | numeric | `mannwhitneyu` / `wilcoxon` |
| More than two groups? | numeric | `f_oneway` (ANOVA), `kruskal` |
| Are two categorical variables related? | counts | `chi2_contingency(crosstab)` |
| Do proportions differ? | binary | two-proportion z test or chi-square |

![t and chi-square tests on real data](/lessons/python-data/22-hypothesis-tests-scipy-fig-en.svg)
*t and chi-square tests on real data*

## Always report three things

1. **Effect size**: difference in means, Cohen's d (`(m₁ − m₂)/s_pooled`), odds ratio.
2. **Confidence interval** of the difference: precision and practical meaning.
3. **p-value**: one part, not everything (ASA 2016 statement).

## Workflow

1. Plot the data (box, histogram) and check assumptions.
2. Choose the test; **declare it in advance** (avoid p-hacking).
3. Run, read `statistic`, `pvalue`; compute the confidence interval.
4. **Correct for multiple comparisons** if running many tests (Bonferroni/BH).
5. Interpret in business language, with limitations.

## Pitfalls

- **Statistically significant ≠ practically significant**: large samples give small p for tiny differences.
- **Failing to reject H₀ ≠ proving equality**: power may be low.
- `chi2_contingency` needs expected counts ≥ 5 per cell; otherwise use Fisher's exact test.

## References

- SciPy documentation, "scipy.stats".
- Wasserstein & Lazar (2016). The ASA statement on p-values. *The American Statistician* 70(2).
- Lexi Learn's "Math and Statistics" course (lessons 15 to 21).
