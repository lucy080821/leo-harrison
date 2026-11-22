# Loss functions and information theory

A **loss function** gives one number saying "how wrong the model is". Training means **minimizing** it (by gradient descent). Choosing the right loss matters as much as choosing the right model.

## Losses for regression

$N$ samples, true values $y_i$ and predictions $\hat y_i$.

| Function | Formula | Character |
|---|---|---|
| **MSE** | $\dfrac1N\sum(y_i-\hat y_i)^2$ | Penalizes large errors **heavily** (squared); **sensitive to outliers**; smooth and easy to optimize |
| **RMSE** | $\sqrt{\text{MSE}}$ | Same unit as $y$ |
| **MAE** | $\dfrac1N\sum\lvert y_i-\hat y_i\rvert$ | **Robust** to outliers but not smooth at 0 |
| **Huber** | MSE for small errors, MAE for large | A compromise of the two |

```python
mse = np.mean((y_true - y_pred) ** 2)
mae = np.mean(np.abs(y_true - y_pred))
```

![Cross-entropy loss −log p: heavy penalty for confident mistakes](/lessons/math-for-ml/07-loss-information-theory-fig-en.svg)
*Cross-entropy loss −log p: heavy penalty for confident mistakes*

## Entropy: the average "surprise"

For a distribution $p$ over outcomes:

$$
H(p) = -\sum_i p_i\log_2 p_i\quad\text{(measured in bits)}
$$

| Distribution | $H$ | Meaning |
|---|---|---|
| $(0.5, 0.5)$ | **1 bit** | A fair coin: maximum uncertainty |
| $(0.9, 0.1)$ | 0.469 bits | Easier to predict |
| $(1, 0)$ | 0 bits | Certain, no uncertainty |

Entropy is **high** when the distribution is **spread out**, **low** when **concentrated**. Decision trees use entropy (or Gini) to choose the best split.

## Cross-entropy: the loss for classification

**Cross-entropy** between the true distribution $p$ and the prediction $q$:

$$
H(p,q) = -\sum_i p_i\log q_i
$$

For binary classification ($y\in\{0,1\}$, the model predicting a probability $\hat p$):

$$
L = -\frac1N\sum_{i}\Big[y_i\log\hat p_i + (1-y_i)\log(1-\hat p_i)\Big]
$$

Intuition: if the true label is 1 but the model predicts $\hat p = 0.01$ (confidently wrong), $-\log 0.01 \approx 4.6$ is a **very heavy penalty**; a confident correct prediction ($\hat p=0.99$) costs only $0.01$. The model is encouraged to be **both correct and well-calibrated**.

For many classes (softmax):

$$
L = -\sum_{c}y_c\log\hat p_c
$$

This is the standard loss of **logistic regression** and most **classification neural networks**, including LLMs (predicting the next token).

> Cross-entropy is exactly the **negative log-likelihood** of a Bernoulli/Categorical: minimizing it = maximum likelihood estimation (previous lesson).

## KL divergence: the distance between two distributions

$$
D_{KL}(p\,\|\,q) = \sum_i p_i\log\frac{p_i}{q_i} = H(p,q) - H(p)
$$

- Always $\ge 0$, equal to 0 when $p=q$.
- **Asymmetric**: $D_{KL}(p\|q)\neq D_{KL}(q\|p)$.
- Since $H(p)$ is fixed (the true labels), **minimizing cross-entropy ⇔ minimizing KL** between the true distribution and the model.

KL appears in VAEs, knowledge distillation and RLHF.

## Choosing a loss

| Problem | Common loss |
|---|---|
| Regression | MSE, MAE, Huber |
| Binary classification | Binary cross-entropy |
| Multi-class classification | Categorical cross-entropy (softmax) |
| Clustering | Sum of distances to centroids (inertia) |
| Generative models | Log-likelihood, KL |

## Loss ≠ evaluation metric

The **loss** is what you **optimize** (must be differentiable, smooth). A **metric** (accuracy, F1...) is what you **care about** when evaluating (it may not be differentiable). They should be related but needn't coincide.

## Wrapping up the Math for ML course

You now have the foundation: **vectors/matrices** (representation), **derivatives** and **gradient descent** (learning), **probability** and **distributions** (uncertainty), **loss/entropy** (measuring error). From here on, ML algorithms are just combinations of these building blocks.
