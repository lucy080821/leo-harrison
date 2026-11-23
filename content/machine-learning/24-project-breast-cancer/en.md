# Project: breast cancer prediction

The final project of the Machine Learning course: run a full **end-to-end ML workflow** on a real medical dataset. Every skill from the course gets used.

> **The dataset:** Wisconsin Breast Cancer, 569 cases, 30 numeric features computed from tumor images (radius, texture, concavity...). Label: **benign (1)** or **malignant (0)**.

## Step 1: Understand the problem and choose a metric

This is a **medical binary classification** problem. The two kinds of error have **very different consequences**:

- **Missing a malignant case** (predicting benign when it's malignant): **dangerous** (the patient isn't treated).
- A **false alarm** (predicting malignant when benign): causes worry and extra tests, but is less serious.

So **recall** for the malignant case matters more than accuracy. (In sklearn's data the "malignant" class is coded 0, so when reporting pay attention to which class is positive. In this lesson we treat class 1 as positive for simplicity.)

![Breast-cancer prediction workflow: explore → model → evaluate](/lessons/machine-learning/24-project-breast-cancer-fig-en.svg)
*Breast-cancer prediction workflow: explore → model → evaluate*

## Step 2: Split the data and explore

```python
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=0, stratify=y)
```

- `stratify=y` keeps the **class proportions** equal in train and test.
- **Lock the test set**, don't touch it until the end.
- On the train set: check missing data, scales, correlations, label distribution.

## Step 3: A baseline

The naive model "always guess the most common class" scores ~63% accuracy. Your model must **far exceed** that.

## Step 4: Compare several models with cross-validation

```python
models = {
    "logistic": make_pipeline(StandardScaler(), LogisticRegression(max_iter=2000)),
    "forest":   RandomForestClassifier(n_estimators=200, random_state=0),
    "svm":      make_pipeline(StandardScaler(), SVC()),
}
for name, m in models.items():
    cv = cross_val_score(m, X_train, y_train, cv=5, scoring="recall")
    print(name, cv.mean().round(3), "±", cv.std().round(3))
```

Note: use a **Pipeline** so scaling happens inside each fold (no leakage), and report **mean ± deviation**. Trees/forests need no scaling.

## Step 5: Tune the chosen model

```python
grid = GridSearchCV(pipe, {"logisticregression__C": [0.01, 0.1, 1, 10]}, cv=5, scoring="recall")
```

Don't over-tune to "hunt" every 0.1%: differences smaller than the standard deviation across folds are usually **noise**.

## Step 6: The final evaluation on the test set (once)

```python
best.fit(X_train, y_train)
pred = best.predict(X_test)
print(classification_report(y_test, pred))
print(confusion_matrix(y_test, pred))
```

Report the **confusion matrix**, **precision**, **recall**, **F1**, **ROC-AUC**. If you want to prioritize catching malignant cases, **lower the decision threshold** (`predict_proba`) and weigh the tradeoff.

## Step 7: Interpretation

- The logistic regression **coefficients** (after scaling) or the forest's **feature_importances_**: which features matter most? (Usually "worst radius", "worst concave points"...)
- Which cases does the model get wrong? Inspect the misclassified samples.

## Step 8: Taking it to the real world (a summary)

| Task | Note |
|---|---|
| **Save the model** | `joblib.dump(best, "model.joblib")` (the Pipeline includes the preprocessing) |
| **Serve it** | Wrap in an API (FastAPI/Flask), or run in batches |
| **Monitor** | Watch for **data drift** (input distribution changes) and quality over time |
| **Ethics/medicine** | The model is a **support tool**, the final decision belongs to the doctor; check for bias across patient groups |

## Ideas to extend (try them yourself)

- Try `GradientBoostingClassifier` and `KNN` in the same comparison framework.
- Plot the **ROC curve** and **Precision-Recall** curve.
- Use **PCA** to reduce to 2D and visualize the two classes.
- Try **lowering the threshold** and measure the new recall/precision.
- Switch to a regression problem: predict house prices in `housing.csv` with `Ridge`, `RandomForestRegressor`.

## Congratulations!

You've finished the classical Machine Learning course: regression, classification, trees, ensembles, SVM, clustering, PCA, pipelines and correct evaluation. Next comes **Deep Learning**, where you'll **build neural networks from scratch with NumPy** to understand exactly what's running inside.
