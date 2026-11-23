# Imbalanced data: why accuracy misleads

Card fraud (0.1%), churn (5%), a rare disease (1%): the class you care about is often **very rare**. A model that always guesses "normal" scores 95–99.9% accuracy yet is **useless**.

## Step 1: always have a baseline

`DummyClassifier(strategy="most_frequent")` shows the "free" accuracy. A real model must beat it **on the right metric**, not just accuracy.

![High accuracy while missing most of the rare class](/lessons/machine-learning/15-imbalanced-classes-fig-en.svg)
*High accuracy while missing most of the rare class*

## Choose metrics by the cost of mistakes

| Metric | Question |
|---|---|
| **Recall** (sensitivity) | Of the truly positive cases, how many did we catch? |
| **Precision** | Of the cases flagged positive, how many were right? |
| **F1 / Fβ** | balances the two (β>1 favours recall) |
| **PR-AUC** | more stable than ROC-AUC when positives are rare |
| Expected cost | `FN × cost of a miss + FP × cost of a false alarm` |

## Ways to handle it

1. **`class_weight="balanced"`**: penalise rare-class errors more. Simple; try it first.
2. **Move the decision threshold** (not necessarily 0.5): choose by cost (the ROC/PR lesson).
3. **Resampling**: shrink the majority, grow the minority (SMOTE in `imbalanced-learn`). **Apply on the training set only**, inside a Pipeline/CV.
4. Collect more rare-class data, or treat it as **anomaly detection**.

## Golden rules

- Split with `stratify=y` so the test set keeps the ratio.
- **Don't** rebalance the test set: it must reflect reality.
- Probabilities after reweighting are **no longer calibrated**; recalibrate if you use them as probabilities.

## References

- He & Garcia (2009). Learning from imbalanced data. *IEEE TKDE* 21(9).
- Saito & Rehmsmeier (2015). The precision-recall plot is more informative than the ROC plot on imbalanced datasets. *PLOS ONE*.
- scikit-learn User Guide, "Metrics"; imbalanced-learn documentation.
