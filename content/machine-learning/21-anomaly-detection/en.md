# Anomaly detection: Isolation Forest and its limits

Fraud, equipment faults, network intrusions, odd transactions: we must find **unusual** points when there are almost **no labels** (or very few).

## The Isolation Forest idea

Split at random: pick a feature, pick a random threshold, repeat. **Anomalies sit far away and sparse**, so they get **isolated after a few splits** (short path); normal points, crowded together, need many splits. **Anomaly score = short average path length** across many trees.

![Isolation Forest isolates anomalies in just a few splits](/lessons/machine-learning/21-anomaly-detection-fig-en.svg)
*Isolation Forest isolates anomalies in just a few splits*

## Key parameters

- `contamination`: expected anomaly rate (sets `predict`'s threshold). If unknown, use `score_samples` and pick a threshold by investigation capacity (e.g. top 0.5%).
- `n_estimators`, `max_samples`: more trees give steadier scores.

## Other methods

| Method | Idea | Suited to |
|---|---|---|
| Statistics (z-score, IQR) | one variable beyond a threshold | simple, one-dimensional |
| **Isolation Forest** | isolate by random splits | many dimensions, fast |
| **LOF** | local density lower than neighbours | clusters of different density |
| One-class SVM | boundary around normal data | clean data to learn from |
| Autoencoder | large reconstruction error | very large, complex data |

## Evaluating with few labels

- With a few labels: **precision@k** (of the top k cases, how many are truly suspicious) and PR-AUC.
- With none: **experts review a sample** of the top cases; record outcomes to build labels for next time.

## Limits

- "Anomalous" doesn't mean "bad": it may be a VIP customer or a legitimate event.
- Sensitive to **scale** and irrelevant features.
- Behaviour **drifts over time** (concept drift): retrain periodically.

## References

- Liu, Ting, Zhou (2008). Isolation Forest. *IEEE ICDM*.
- Breunig et al. (2000). LOF: identifying density-based local outliers. *SIGMOD*.
- scikit-learn User Guide, "Novelty and Outlier Detection".
