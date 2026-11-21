# Linear regression

**Linear regression** is ML's simplest and most fundamental algorithm: predicting a **continuous number** with a **linear combination** of the features.

## The model

One feature:

$$
\hat y = w x + b
$$

Many features $x_1,\dots,x_d$:

$$
\hat y = w_1x_1 + w_2x_2 + \dots + w_dx_d + b = \mathbf{w}\cdot\mathbf{x} + b
$$

- $w_j$: the **coefficient** of feature $j$ = how much $\hat y$ changes when $x_j$ increases by 1 unit (holding other features fixed).
- $b$: the **intercept**, the prediction when all features are 0.

Example house price: `price = 30·area + 150·rooms − 8·age − 60·distance + 500`. Each coefficient has an **easy interpretation**, a big strength.

## Learning the parameters: ordinary least squares (OLS)

Choose $\mathbf{w}, b$ to minimize the **sum of squared errors** (MSE):

$$
L(\mathbf{w},b)=\frac1N\sum_{i=1}^{N}\big(y_i-\hat y_i\big)^2
$$

### The closed-form solution: the normal equation

Add a column of 1s to $X$ (call it $X_b$) to fold $b$ into $\boldsymbol\theta$:

$$
\boldsymbol{\theta} = (X_b^TX_b)^{-1}X_b^T\mathbf{y}
$$

```python
Xb = np.column_stack([np.ones(len(X)), X])
theta = np.linalg.solve(Xb.T @ Xb, Xb.T @ y)       # [b, w1, w2, ...]
```

This is the result you saw in the Math course (linear algebra). It can also be solved by **gradient descent** when data is huge.

### With scikit-learn

```python
from sklearn.linear_model import LinearRegression
model = LinearRegression().fit(X, y)
model.coef_          # [w1, w2, ...]
model.intercept_     # b
model.predict(X_new)
```

## Evaluating regression

| Metric | Formula | Meaning |
|---|---|---|
| **MSE/RMSE** | $\frac1N\sum(y-\hat y)^2$ | Mean squared error |
| **MAE** | $\frac1N\sum\lvert y-\hat y\rvert$ | Mean absolute error |
| **R²** | $1-\dfrac{\sum(y-\hat y)^2}{\sum(y-\bar y)^2}$ | The **proportion of variance explained** |

$R^2 = 1$: perfect predictions; $R^2 = 0$: no better than always predicting the mean $\bar y$; $R^2<0$: **worse** than predicting the mean.

```python
from sklearn.metrics import r2_score, mean_squared_error
r2_score(y_test, pred)
mean_squared_error(y_test, pred) ** 0.5     # RMSE
```

> Always compute metrics on the **test set**; R² on the train set is always optimistic.

## The assumptions (worth checking)

1. **Linearity**: the $X$-$y$ relationship is roughly a line/plane.
2. **Independent errors with constant variance** (plot the **residuals** $y-\hat y$ against $\hat y$: there should be no funnel or curve).
3. **No multicollinearity**: features aren't linearly dependent (this makes $X^TX$ near-singular and coefficients unstable). Check with a correlation matrix.
4. Few **outliers** (MSE is very sensitive).

## Interpretation and scaling

Coefficients are only **comparable** across features when they share the **same scale**. To see which feature is "more important", **standardize** (StandardScaler) before training, then compare $|w_j|$.

## Limitations

- Captures only **linear** relationships. Curves need polynomial features (next lesson) or non-linear models.
- Sensitive to outliers.
- **Extrapolating** beyond the data range is usually wrong.

Despite its simplicity, linear regression is a superb **baseline**: always try it before reaching for complex models.
