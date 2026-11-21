# Overfitting, polynomials and regularization

This is the single most important lesson of ML: **the best model isn't the one that fits the training data best, but the one that generalizes best.**

## Overfitting and underfitting

Try fitting data $y = \sin x + \text{noise}$ with polynomials of different degrees:

| Degree | Shape | Train | Test |
|---|---|---|---|
| 1 (a line) | Too simple | Poor | Poor: **underfitting** |
| 3 | Moderate | Good | Good: **balanced** |
| 15 | Wiggles through every noisy point | **Excellent** | **Bad**: **overfitting** |

An overly complex model **memorizes the noise** of the training set instead of the true pattern.

## Polynomial features

Turn linear regression into a **non-linear** model by adding powers of the features:

$$
\hat y = w_0 + w_1x + w_2x^2 + \dots + w_dx^d
$$

It's still **linear in the parameters $w$**, so all the linear-regression tools apply.

```python
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline

model = make_pipeline(PolynomialFeatures(degree=3), StandardScaler(), LinearRegression())
```

Always **standardize** after building polynomials (high powers have enormous scales).

## The bias-variance tradeoff

The expected error on new data decomposes into:

$$
\text{Error} = \underbrace{\text{Bias}^2}_{\text{model too simple}} + \underbrace{\text{Variance}}_{\text{too sensitive to the training data}} + \underbrace{\text{Noise}}_{\text{irreducible}}
$$

- **High bias**: the model is systematically wrong (underfitting).
- **High variance**: the model changes drastically if the training data changes slightly (overfitting).
- Increasing complexity: **bias falls, variance rises**. The goal is the **balance** point (lowest test error).

## How to diagnose: learning curves

| Observation | Diagnosis | Remedy |
|---|---|---|
| Both train **and** test are wrong | Underfitting | A stronger model, more features |
| Train good, test bad (**big gap**) | Overfitting | **More data**, regularization, simplify |

## Regularization: restraining complexity

Add a **penalty on large weights** to the loss, forcing the model to use smaller, smoother weights.

### Ridge (L2)

$$
L = \text{MSE} + \alpha\sum_j w_j^2
$$

Shrinks weights toward 0 (but rarely exactly to 0). Suits cases where many features each help a little.

### Lasso (L1)

$$
L = \text{MSE} + \alpha\sum_j \lvert w_j\rvert
$$

Can drive many weights **to exactly 0**: **automatic feature selection**, a sparse model.

### Elastic Net

Combines L1 and L2.

```python
from sklearn.linear_model import Ridge, Lasso
Ridge(alpha=10)
Lasso(alpha=0.1)
```

**$\alpha$** is a hyperparameter controlling the strength: $\alpha=0$ is ordinary regression; a large $\alpha$ gives a very simple model (possibly underfitting). Choose it with **cross-validation**.

> These are the L1/L2 norms you met in the Math course. The same idea is **weight decay** in deep learning.

## Other ways to fight overfitting

1. **More data** (the most effective).
2. **Reduce complexity** (a lower degree, shallower trees).
3. **Select features**, dropping noisy ones.
4. **Early stopping**, **dropout** (deep learning).
5. **Cross-validation** to choose hyperparameters.

## The validation set

When you choose hyperparameters (polynomial degree, $\alpha$...) based on a score, you **accidentally overfit** to that set. So use **three parts**:

| Set | Used to |
|---|---|
| **Train** | Learn parameters |
| **Validation** | Choose hyperparameters / models |
| **Test** | Final report (touched **once**) |
