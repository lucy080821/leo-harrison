# Experimental design and the pitfalls of A/B testing

Regression and observational statistics only show **association**. To learn **cause**, we need a **controlled experiment**: intervene ourselves and compare.

## Why randomise

Randomly assigning subjects to A/B makes the two groups **alike in every respect, even traits we cannot measure**, on average. A difference in outcomes can then be attributed to the intervention (removing confounding, lesson 29). The principle comes from Fisher (1935) and randomised clinical trials.

![A/B experiment flow: randomise, intervene, measure, compare](/lessons/prob-stats/28-experiments-ab-ab-en.svg)
*Randomisation makes the two groups alike before the intervention; only the intervention explains the difference.*

## Designing a good experiment

1. A **hypothesis and primary metric** fixed in advance.
2. A sensible **unit of randomisation** (users, not page views).
3. **Sample size and duration** per lesson 17; run whole weekly cycles.
4. **No peeking or early stopping**; control multiple comparisons (lesson 21).

## Common pitfalls

- **SRM (sample ratio mismatch)**: the actual split differs from the design (50.5/49.5 over 100,000 users is already extremely unusual). It signals an assignment or logging bug; **do not trust the results** until fixed. Check with χ² (lesson 18).
- **Novelty / learning effects**: users react to something new, then return to normal.
- **Interference (network effects)**: user A affects user B (social networks, two-sided markets).
- **Many goals**: choosing the metric *after* seeing the data.
- **Reporting effects**: always give the **confidence interval for the difference** and the business meaning, not just "statistically significant".

## When you cannot experiment

Use careful observational methods: regression with confounder control, propensity-score matching, difference-in-differences (DiD), regression discontinuity. They need strong assumptions; state them explicitly.

## References

- Kohavi, R., Tang, D., Xu, Y. (2020). *Trustworthy Online Controlled Experiments*. Cambridge University Press.
- Fisher, R. A. (1935). *The Design of Experiments*.
- Angrist, J. & Pischke, J.-S. *Mostly Harmless Econometrics* (Princeton).
