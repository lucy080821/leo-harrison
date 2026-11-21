# Logistic regression

Despite the "regression" in its name, **logistic regression** is a foundational **classification** algorithm: it predicts the **probability** that a sample belongs to class 1.

## From a line to a probability

Linear regression outputs any number ($-\infty$ to $+\infty$), not a probability ($0$ to $1$). Logistic regression pushes the linear score $z = \mathbf{w}\cdot\mathbf{x}+b$ through the **sigmoid**:

$$
\sigma(z) = \frac{1}{1+e^{-z}},\qquad \hat p = P(y=1\mid\mathbf{x}) = \sigma(\mathbf{w}\cdot\mathbf{x}+b)
$$

```text
 σ(z)
  1 ┤            ╭──────
    │          ╭╯
0.5 ┤        ╭─╯            σ(0) = 0.5
    │      ╭╯
  0 ┤──────╯
    └──────┴──────┴── z
```

- $z\to+\infty$: $\hat p\to 1$; $z\to-\infty$: $\hat p\to 0$; $z=0$: $\hat p = 0.5$.
- Class prediction: **1 if $\hat p\ge 0.5$**, otherwise 0. The $0.5$ threshold corresponds to $z = 0$: a **linear decision boundary** $\mathbf{w}\cdot\mathbf{x}+b=0$.

## Interpreting coefficients: odds

$$
\log\frac{\hat p}{1-\hat p} = \mathbf{w}\cdot\mathbf{x}+b
$$

The left side is the **log-odds**. Increasing $x_j$ by one unit raises the log-odds by $w_j$, i.e. the odds are multiplied by $e^{w_j}$. The sign of $w_j$ tells whether the feature pushes the probability up or down.

## Training: minimizing log loss

Maximizing the likelihood of the observed labels ⇔ minimizing the **binary cross-entropy** (Math lesson):

$$
L = -\frac1N\sum_i\Big[y_i\log\hat p_i + (1-y_i)\log(1-\hat p_i)\Big]
$$

There's no closed form like OLS, so we use **gradient descent**/quasi-Newton. The gradient is neat:

$$
\frac{\partial L}{\partial \mathbf{w}} = \frac1N X^T(\hat{\mathbf{p}} - \mathbf{y})
$$

This function is **convex**, so it always converges to the global minimum.

## scikit-learn

```python
from sklearn.linear_model import LogisticRegression
clf = LogisticRegression(max_iter=1000).fit(X_train, y_train)
clf.predict(X_test)              # 0/1 labels
clf.predict_proba(X_test)        # [[P(0), P(1)], ...]
clf.coef_, clf.intercept_
```

- **L2 regularization** is on by default: the parameter `C` is the **inverse** of the strength (small `C` = strong regularization).
- Increase `max_iter` if you get a non-convergence warning.

## You must scale the features

GD and regularization are scale-sensitive. Always use `StandardScaler`: **learn the scaling from the train set only**, then apply it to the test set, otherwise you get **data leakage**.

```python
scaler = StandardScaler().fit(X_train)
Xs_train = scaler.transform(X_train)
Xs_test = scaler.transform(X_test)
```

Most convenient is a **Pipeline** (a later lesson) which does it automatically and safely.

## The decision threshold

$0.5$ isn't sacred. In a **medical** problem (missing a disease is dangerous) you may lower the threshold to $0.3$ to **catch more cases** (higher recall) and accept more false alarms:

```python
pred = (clf.predict_proba(X_test)[:, 1] >= 0.3).astype(int)
```

## Many classes

- **One-vs-Rest**: one binary classifier per class.
- **Softmax (multinomial)**: predicts all class probabilities jointly: $P(c)=\dfrac{e^{z_c}}{\sum_k e^{z_k}}$. scikit-learn handles it.

## Strengths and weaknesses

| Strengths | Weaknesses |
|---|---|
| Fast, few parameters, **easy to interpret** | Only a **linear** boundary |
| Gives fairly well-calibrated **probabilities** | Sensitive to strongly correlated features |
| An excellent classification baseline | Needs scaling |
