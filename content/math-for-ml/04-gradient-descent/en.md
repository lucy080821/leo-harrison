# Gradient descent

**Gradient descent** (GD) is the central optimization algorithm of ML and deep learning: **repeatedly take a small step in the direction that reduces the loss fastest**.

## The idea

Imagine standing on a hillside in fog wanting to reach the valley. You **feel the slope under your feet** and step **downhill**. Repeat until the ground is flat.

Mathematically, for a loss $L(\theta)$ over parameters $\theta$:

$$
\theta \leftarrow \theta - \eta\,\nabla L(\theta)
$$

- $\nabla L$: the gradient (direction of steepest increase), so we **subtract** it to decrease.
- $\eta$ (eta): the **learning rate**, the step size.

```python
x = 0.0
for _ in range(50):
    x = x - 0.1 * 2 * (x - 3)     # minimize (x-3)^2, derivative 2(x-3)
```

![Learning rate: too small, just right, too large](/lessons/math-for-ml/04-gradient-descent-fig-en.svg)
*Learning rate: too small, just right, too large*

## The learning rate: the most important parameter

| Learning rate | What happens |
|---|---|
| **Too small** | Converges very slowly |
| **Just right** | Decreases steadily, converges fast |
| **Too large** | **Overshoots** the minimum, oscillates or **diverges** (loss explodes) |

For $f(x) = (x-3)^2$, each step: $x_{t+1} - 3 = (1 - 2\eta)(x_t - 3)$. It converges when $|1-2\eta| < 1$, i.e. $0 < \eta < 1$. With $\eta = 0.1$ the error shrinks by 0.8 each step, after 50 steps only $0.8^{50}\approx 10^{-5}$ remains.

> When training, **plot the loss against iterations**: if the loss doesn't fall or rises, lower the learning rate.

## Linear regression by GD

The model $\hat y = wx + b$ with the **MSE** (mean squared error) loss:

$$
L(w,b) = \frac{1}{N}\sum_{i=1}^{N}(wx_i+b-y_i)^2
$$

Partial derivatives:

$$
\frac{\partial L}{\partial w} = \frac{2}{N}\sum (\hat y_i - y_i)\,x_i,\qquad
\frac{\partial L}{\partial b} = \frac{2}{N}\sum (\hat y_i - y_i)
$$

```python
for _ in range(5000):
    pred = w * X + b
    dw = 2 * np.mean((pred - y) * X)
    db = 2 * np.mean(pred - y)
    w -= lr * dw
    b -= lr * db
```

Linear regression's MSE is a **convex function** (a single minimum), so GD always finds the right answer.

## Three variants

| Variant | Each step uses | Character |
|---|---|---|
| **Batch GD** | All the data | Exact but slow on big data |
| **Stochastic GD (SGD)** | **One** sample | Very fast but noisy |
| **Mini-batch GD** | A **batch** (e.g. 32-256 samples) | A **balance**, the deep-learning standard |

## Practical difficulties

- **Local minima** and **saddle points** (non-convex functions, like neural networks).
- **Features on different scales** flatten the contours so GD zig-zags slowly. Fix: **standardize features** (StandardScaler).
- **Vanishing/exploding gradients** in deep networks (Deep Learning course).

## Advanced optimizers (an introduction)

| Optimizer | Idea |
|---|---|
| **Momentum** | Keep "inertia" from previous steps, smoothing oscillations |
| **RMSprop / Adagrad** | A separate learning rate per parameter |
| **Adam** | Combines momentum and adaptive rates; **the most popular default** |

All are built on the same idea of walking against the gradient.
