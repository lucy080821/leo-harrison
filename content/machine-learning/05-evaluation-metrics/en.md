# Classification metrics and cross-validation

"The model reaches 99% accuracy" sounds great, but it may be **useless**. This lesson teaches how to measure correctly.

## The accuracy trap

A disease affects 1% of the population. A model that **always answers "healthy"** scores 99% accuracy while **finding no sick patients at all**. With **imbalanced** data, accuracy misleads.

## The confusion matrix

For binary classification (the "positive" class is the one of interest, e.g. has the disease):

| | Predicted **positive** | Predicted **negative** |
|---|---|---|
| Actually **positive** | **TP** (true positive) | **FN** (missed) |
| Actually **negative** | **FP** (false alarm) | **TN** (true negative) |

```python
from sklearn.metrics import confusion_matrix
tn, fp, fn, tp = confusion_matrix(y_true, y_pred).ravel()
```

## Metrics from the confusion matrix

$$
\text{Accuracy}=\frac{TP+TN}{TP+TN+FP+FN}
$$

$$
\text{Precision}=\frac{TP}{TP+FP},\qquad
\text{Recall}=\frac{TP}{TP+FN},\qquad
F_1=\frac{2\cdot P\cdot R}{P+R}
$$

| Metric | Answers | Matters when |
|---|---|---|
| **Precision** | Of the cases **predicted positive**, how many are **right**? | **False alarms are costly** (spam filter: don't block real email) |
| **Recall** (sensitivity) | Of the **truly positive** cases, how many did we catch? | **Misses are costly** (cancer, fraud) |
| **F1** | The harmonic mean of the two | You need balance, skewed data |

Example from the exercise: $TP=3,FP=1,FN=1,TN=3$ gives precision $=3/4$, recall $=3/4$, $F_1=0.75$.

**The precision-recall tradeoff:** lowering the decision threshold raises recall but lowers precision, and vice versa.

## ROC and AUC

Sweep every threshold and plot:

- **TPR** (= recall) against **FPR** $=\dfrac{FP}{FP+TN}$.

**AUC** (the area under the ROC curve) summarizes it as **one number**:

- $0.5$: random guessing. $1.0$: perfect separation.
- Meaning: the probability the model **ranks a random positive above a random negative**.

```python
from sklearn.metrics import roc_auc_score
roc_auc_score(y_test, clf.predict_proba(X_test)[:, 1])
```

For very imbalanced data, **Precision-Recall AUC** (`average_precision_score`) is more informative than ROC-AUC.

## Many classes

```python
from sklearn.metrics import classification_report
print(classification_report(y_test, pred))
```

Aggregate by **macro** (equal average over classes), **micro** (pool all samples) or **weighted** (by class size).

## Cross-validation

A single train/test split gives a result that **depends on luck** in how it was split. **K-fold cross-validation** evaluates more stably:

```text
Fold 1: [TEST][train][train][train][train]
Fold 2: [train][TEST][train][train][train]
Fold 3: [train][train][TEST][train][train]
...         (every sample is tested exactly once)
```

```python
from sklearn.model_selection import cross_val_score
scores = cross_val_score(model, X, y, cv=5)      # 5 scores
scores.mean(), scores.std()                       # mean ± deviation
```

- Report **mean ± standard deviation**; a large deviation means the model is unstable.
- For imbalanced classification use **`StratifiedKFold`** (keeps class proportions per fold). `cv=5` already stratifies for classifiers.
- Use a metric other than accuracy with `scoring="f1"`, `"roc_auc"`, `"recall"`...

## Choosing a metric by problem

| Problem | Metric to use |
|---|---|
| Balanced, all errors equal | Accuracy |
| Misses are dangerous (diagnosis) | **Recall** |
| False alarms are a nuisance (spam) | **Precision** |
| Imbalanced, need balance | **F1**, PR-AUC |
| Compare models independent of threshold | ROC-AUC |

> Always start with a **naive baseline** (always guess the most common class) to see how much better your model really is.
