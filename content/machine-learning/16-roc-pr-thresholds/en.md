# ROC, precision-recall and choosing the decision threshold

A classifier actually outputs **probabilities**. The label results from a **threshold** (0.5 by default). 0.5 is rarely optimal for a real problem.

## The trade-off by threshold

Lower the threshold ⇒ catch more positives (**recall rises**) but raise more false alarms (**precision falls**). Curves show the whole trade-off.

![ROC and PR curves: every point is a decision threshold](/lessons/machine-learning/16-roc-pr-thresholds-fig-en.svg)
*ROC and PR curves: every point is a decision threshold*

## Two curves

| | Axes | Reading |
|---|---|---|
| **ROC** | FPR (x) and TPR = recall (y) | AUC = probability the model ranks a random positive **above** a random negative; 0.5 = guessing |
| **Precision-Recall** | recall (x), precision (y) | prefer it when **positives are rare**: ROC can look falsely good because FPR divides by a huge negative count |

## Choose the threshold from the business

1. Establish the **cost** of FN (miss) and FP (false alarm).
2. Or set a **constraint**: "recall ≥ 98%", then pick the threshold giving the highest precision that satisfies it.
3. Choose the threshold on a **validation set**, report on a separate test set.

## Notes

- AUC is threshold-free so it does **not** replace choosing a threshold.
- A model that ranks well (high AUC) can still have **miscalibrated probabilities**; check with a calibration curve (`CalibratedClassifierCV`).
- Report a confidence interval (bootstrap) for AUC on small samples.

## References

- Fawcett, T. (2006). An introduction to ROC analysis. *Pattern Recognition Letters* 27(8).
- Davis & Goadrich (2006). The relationship between Precision-Recall and ROC curves. *ICML*.
- scikit-learn User Guide, "Tuning the decision threshold for class prediction".
