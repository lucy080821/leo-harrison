# Pipelines, hyperparameter tuning and data leakage

This lesson gathers everything into a **professional, safe and reproducible** workflow.

## Data leakage: the most dangerous mistake

**Leakage** happens when information from the **test set (or the future)** seeps into training, making the score **artificially good**; in the real world the model performs far worse.

### The classic example

```python
# WRONG: standardize the WHOLE dataset before splitting
Xs = StandardScaler().fit_transform(X)          # mean/std computed from the TEST set too!
Xtr, Xte, ytr, yte = train_test_split(Xs, y)
```

The test set has "contributed" to the mean and standard deviation used to transform the train set: the model has **seen** information about the test.

```python
# RIGHT: split first, then learn the transformation FROM TRAIN ONLY
Xtr, Xte, ytr, yte = train_test_split(X, y)
scaler = StandardScaler().fit(Xtr)
Xtr_s, Xte_s = scaler.transform(Xtr), scaler.transform(Xte)
```

### Other forms of leakage

- Selecting features/reducing dimensions with the **whole dataset** before splitting.
- **Cross-validation** where preprocessing was fit on all the data.
- Features containing **label information** (e.g. a "contract cancelled" column when predicting churn).
- Randomly splitting **time-series** data (must split by time: past → future).
- **Duplicates** between train and test.

> A warning sign: a score **suspiciously high** (99%+) on a hard problem.

![Pipeline: split first, then every step learns only from the training set](/lessons/machine-learning/12-pipelines-tuning-fig-en.svg)
*Pipeline: split first, then every step learns only from the training set*

## Pipeline: packaging the steps

`Pipeline` chains preprocessing steps and a model into **one object** with `fit`/`predict`:

```python
from sklearn.pipeline import Pipeline, make_pipeline
pipe = Pipeline([
    ("scale", StandardScaler()),
    ("clf", LogisticRegression(max_iter=1000)),
])
# or shorter:
pipe = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))

pipe.fit(X_train, y_train)       # the scaler learns from X_train only
pipe.predict(X_test)             # automatically applies the learned scaling
cross_val_score(pipe, X, y, cv=5)   # scaling is re-fit INSIDE each fold: no leakage
```

Benefits: **safe** (no leakage), **tidy**, easy to **save and deploy** (`joblib.dump(pipe, ...)`), and you can **tune the preprocessing steps too**.

## Mixed data: ColumnTransformer

Numeric columns need scaling, categorical columns need one-hot encoding:

```python
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
pre = ColumnTransformer([
    ("num", StandardScaler(), ["age", "income"]),
    ("cat", OneHotEncoder(handle_unknown="ignore"), ["city", "gender"]),
])
model = make_pipeline(pre, RandomForestClassifier(random_state=0))
```

Other handy preprocessors: `SimpleImputer` (fill missing), `MinMaxScaler`, `PolynomialFeatures`, `PCA`.

## Hyperparameter tuning: GridSearchCV

**Hyperparameters** (e.g. `n_neighbors`, `C`, `max_depth`) are chosen by you, not learned from data. **GridSearchCV** tries **every combination** in a grid, evaluates each with **cross-validation** and picks the best:

```python
from sklearn.model_selection import GridSearchCV
grid = GridSearchCV(
    pipe,
    param_grid={"knn__n_neighbors": [1, 3, 5, 7, 9, 11]},   # step_name__parameter
    cv=5,
    scoring="f1",
)
grid.fit(X_train, y_train)
grid.best_params_       # {'knn__n_neighbors': 5}
grid.best_score_        # the best CV score
grid.best_estimator_    # the model refit with the best params on the whole train set
grid.score(X_test, y_test)   # the FINAL evaluation on test, just once
```

The parameter naming convention in a Pipeline: **`step_name__parameter_name`**.

| Search method | Pros/cons |
|---|---|
| `GridSearchCV` | Tries the whole grid; exact but **combinatorial explosion** |
| `RandomizedSearchCV` | Tries $n$ random combinations; **more efficient** with many parameters |
| Halving, Optuna... | Prune bad combinations early |

## The correct evaluation procedure

```text
 All the data
   ├── Test (25%)  ← LOCKED, used once at the very end
   └── Train (75%)
         └── GridSearchCV with cross-validation (train split into folds)
                → choose hyperparameters → refit on all of train
 → evaluate once on Test → report
```

If you look at the test score then go back to adjust the model, the test set has been **"used up"** and the reported score becomes optimistic.

## A checklist before trusting a result

- [ ] Did you split train/test **before** every step that learns from data?
- [ ] Is all preprocessing **inside a Pipeline**?
- [ ] Is the metric suited to the problem (not just accuracy)?
- [ ] Compared with a **naive baseline**?
- [ ] Is the result stable across `random_state` (report ± deviation)?
