# Cross-validation strategies: stratified, group and time-based

`cross_val_score` splits randomly by default. On real data a **wrong split** gives falsely good scores and disappointment in production. The rule: **the validation split must mimic how the model will be used**.

## Choose the split by data structure

| Situation | Split | Reason |
|---|---|---|
| Independent, fairly balanced data | `KFold` | basic |
| **Imbalanced classification** | `StratifiedKFold` | keeps class ratio per fold |
| **Many rows per entity** (customer, patient, device) | `GroupKFold` | one entity is never in both train and test |
| **Time series** | `TimeSeriesSplit` | train on the past, test on the future |

![Each splitting scheme fits a different data structure](/lessons/machine-learning/18-cross-validation-strategies-fig-en.svg)
*Each splitting scheme fits a different data structure*

## Why a wrong split leaks

- **Same customer on both sides**: the model "remembers" customers instead of learning rules, so the score is falsely high. New customers go badly.
- **Shuffling a time series**: the model sees the future of the very point to predict.
- **Preprocessing all data** before splitting: use a Pipeline to fit inside each fold.

## Usage

```python
from sklearn.model_selection import cross_val_score, StratifiedKFold
cv = StratifiedKFold(5, shuffle=True, random_state=0)
scores = cross_val_score(pipe, X, y, cv=cv, scoring="roc_auc")
print(scores.mean(), scores.std())
```

Report **mean ± standard deviation**: a large deviation means the model or conclusion is unstable.

## Nested cross-validation

Tuning hyperparameters **and** estimating performance on the same folds gives optimistic scores. Use the inner loop to tune (`GridSearchCV`), the outer loop to evaluate.

## References

- scikit-learn User Guide, "Cross-validation: evaluating estimator performance".
- Cawley & Talbot (2010). On over-fitting in model selection. *JMLR* 11.
- Roberts et al. (2017). Cross-validation strategies for data with temporal, spatial, hierarchical structure. *Ecography* 40.
