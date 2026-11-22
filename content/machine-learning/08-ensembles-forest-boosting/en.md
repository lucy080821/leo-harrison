# Ensembles: Random Forest and Gradient Boosting

> "The wisdom of crowds": **combining many weak models** is often **stronger** than one good model.

A single decision tree has high variance (it's unstable). An **ensemble** combines many trees to fix that. This family is the **strongest on tabular data**, often beating even deep learning on this kind of data.

## Bagging and Random Forest

### Bagging (Bootstrap AGGregatING)

1. Make $B$ datasets by **bootstrapping**: sampling **with replacement** from the training set (each the same size, containing ~63% of the original samples, some repeated).
2. Train **one tree per dataset** (independent, parallelizable).
3. **Aggregate**: majority vote (classification) or average (regression).

Averaging many models **reduces variance** while barely raising bias. If $B$ models each have variance $\sigma^2$ and pairwise correlation $\rho$, the average has variance

$$
\rho\sigma^2 + \frac{1-\rho}{B}\sigma^2
$$

so the **less correlated** the trees, the more variance you can remove.

### Random Forest: adding randomness

Besides bootstrapping, each node split considers only a **random subset of features** (`max_features`, default $\sqrt d$). This makes trees **less alike** ⇒ a stronger ensemble.

```python
from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_estimators=100, random_state=0).fit(X_train, y_train)
```

| Parameter | Meaning |
|---|---|
| `n_estimators` | Number of trees (more is usually better, costs time) |
| `max_depth`, `min_samples_leaf` | Control each tree's complexity |
| `max_features` | Features considered per split |
| `oob_score=True` | The **out-of-bag** score: free evaluation using samples that missed each bootstrap |

**Pros**: effective "out of the box", little tuning, hard to overfit, gives **feature importances**, needs no scaling.

![Random Forest: many trees vote, take the majority](/lessons/machine-learning/08-ensembles-forest-boosting-fig-en.svg)
*Random Forest: many trees vote, take the majority*

## Boosting and Gradient Boosting

Bagging trains trees **in parallel, independently**. **Boosting** trains **sequentially**: each new tree **fixes the errors** of the previous ones.

### Gradient Boosting for regression (the idea)

1. Start with a simple prediction $F_0$ (e.g. the mean).
2. Compute the **residuals** (errors): $r_i = y_i - F_{m-1}(x_i)$. Residuals are exactly the **negative gradient** of MSE.
3. Train a **shallow** tree $h_m$ to predict the residuals.
4. Update: $F_m = F_{m-1} + \eta\,h_m$ where $\eta$ is the **learning rate**.

This is literally **gradient descent in function space**: each tree is a step against the gradient.

```python
from sklearn.ensemble import GradientBoostingClassifier
gb = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=0)
```

| Parameter | Meaning |
|---|---|
| `n_estimators` | Number of trees (steps) |
| `learning_rate` | Each tree's contribution: smaller = steadier, needs more trees |
| `max_depth` | **Shallow** trees (3-5) are enough |
| `subsample` | Use a fraction of samples each round (**stochastic** boosting) |

Boosting **can overfit** with too many trees: use `early stopping` (`n_iter_no_change`).

### Popular libraries

**XGBoost**, **LightGBM**, **CatBoost** are highly optimized gradient-boosting implementations that often win tabular-data competitions (Kaggle). scikit-learn has `HistGradientBoostingClassifier`, fast like LightGBM.

## Comparison

| | Random Forest | Gradient Boosting |
|---|---|---|
| Training | Parallel | **Sequential** |
| Reduces | **Variance** | **Bias** (and variance) |
| Trees | Deep, each strong | **Shallow**, each weak |
| Tuning | Little | **More** (learning rate, tree count...) |
| Peak accuracy | Very good | **Often the highest** |
| Overfitting risk | Low | Higher if uncontrolled |

## Feature importance

```python
import pandas as pd
pd.Series(rf.feature_importances_, index=feature_names).sort_values(ascending=False).head(5)
```

Useful for **understanding the data** and **selecting features**; for deeper interpretation there are **permutation importance** and **SHAP**.

> **When to use?** Tabular data: try a **Random Forest** as a strong baseline, then **gradient boosting** to squeeze out more performance.
