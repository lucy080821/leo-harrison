# Machine Learning overview and workflow

**Machine Learning** is a way for computers to **learn patterns from data** instead of being programmed rule by rule. Rather than writing "if the word 'prize' appears it's spam", you give the machine thousands of labelled emails and let it **work out** the pattern itself.

## The three main kinds of learning

| Kind | Data | Goal | Example |
|---|---|---|---|
| **Supervised** | **Labelled** (input + answer) | Predict labels for new data | Spam filtering, house-price prediction |
| **Unsupervised** | **No** labels | Find hidden structure | Customer segmentation, dimension reduction |
| **Reinforcement** | **Reward/penalty** feedback | Learn an action strategy | Playing chess, robots |

Supervised learning splits in two:

- **Classification**: predict a **discrete label** (spam or not, flower species).
- **Regression**: predict a **continuous number** (house price, temperature).

![The Machine Learning workflow from data to deployment](/lessons/machine-learning/01-ml-overview-workflow-fig-en.svg)
*The Machine Learning workflow from data to deployment*

## Core concepts

- **Sample**: one data row. **Features** $X$: the input columns. **Label/target** $y$: what we want to predict.
- **Model**: a function $\hat y = f_\theta(X)$ with parameters $\theta$ to learn.
- **Training (fit)**: choose the $\theta$ that minimizes the loss on the training data.
- **Inference (predict)**: use the learned model to predict new data.

## The workflow of an ML project

```text
1. Understand the problem → 2. Collect & clean data → 3. Explore (EDA)
        → 4. Prepare features → 5. Choose a model & train
        → 6. Evaluate → 7. Improve (tune) → 8. Deploy & monitor
```

In practice **steps 2-4 take most of the time**; "good data matters more than a fancy algorithm".

## Training set and test set

If you evaluate a model **on the very data it learned from**, the number is **meaningless** (like memorizing the exam and grading yourself). The goal is to **generalize** to **unseen** data. So you must **set aside part of the data for testing first**:

```python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)
```

- `test_size=0.2`: 20% for testing.
- `random_state=42`: fixes the shuffle so **results are reproducible**.
- For imbalanced classification add `stratify=y` to preserve class proportions.

> **Golden rule:** the test set is used **once at the very end** to report. Don't "peek" to adjust the model (see the Pipeline lesson: data leakage).

## scikit-learn's unified API

Every scikit-learn model uses the same interface, so swapping algorithms means changing one line:

```python
from sklearn.neighbors import KNeighborsClassifier

model = KNeighborsClassifier(n_neighbors=3)   # 1. create (set hyperparameters)
model.fit(X_train, y_train)                   # 2. learn
pred = model.predict(X_test)                  # 3. predict
model.score(X_test, y_test)                   # 4. evaluate (default: accuracy)
```

| Method | Job |
|---|---|
| `fit(X, y)` | Learn parameters from data |
| `predict(X)` | Predict labels / values |
| `predict_proba(X)` | Per-class probabilities (classification) |
| `score(X, y)` | The default score (accuracy or R²) |
| `transform(X)` | Transform data (preprocessors) |

**Parameters** (learned from data, e.g. weights) differ from **hyperparameters** (set beforehand, e.g. `n_neighbors`).

## The two ailments of models

| | Symptom | Cause |
|---|---|---|
| **Underfitting** | Wrong on **both train and test** | The model is too simple |
| **Overfitting** | Good on train, **bad on test** | The model is too complex, "memorizing" noise |

The rest of the course revolves around **balancing** these two.

## The iris dataset

150 flowers, 4 features (sepal/petal length/width) and 3 species. It's the "Hello World" of ML and ships with scikit-learn.

```python
from sklearn.datasets import load_iris
X, y = load_iris(return_X_y=True)
```
