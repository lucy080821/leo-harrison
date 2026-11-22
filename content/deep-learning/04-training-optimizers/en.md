# Training a neural network and optimizers

You now have the **forward pass** (prediction), the **loss** (measuring error) and **backpropagation** (gradients). This lesson assembles them into the **training loop** and introduces modern optimizers.

## The training loop

```python
for epoch in range(num_epochs):
    a1, p = forward(X)                       # 1. predict
    loss = bce(p, y)                         # 2. measure the error (to monitor)
    grads = backward(X, y, a1, p)            # 3. gradients
    for param, g in zip(params, grads):
        param -= lr * g                      # 4. update
```

On the "two moons" problem, a $2\to16\to1$ network learns the **non-linear** boundary and reaches ~97%.

### Cross-entropy with sigmoid: a surprisingly neat gradient

With a sigmoid output and **binary cross-entropy**, the derivative with respect to the logit $z$ is simply:

$$
\frac{\partial L}{\partial z} = \hat p - y
$$

(Because $\sigma'(z)$ cancels with the derivative of the log.) Likewise for softmax + categorical cross-entropy: $\hat{\mathbf p} - \mathbf y$. That's why this "activation + loss" pair always goes together.

![SGD and momentum paths on the same landscape](/lessons/deep-learning/04-training-optimizers-fig-en.svg)
*SGD and momentum paths on the same landscape*

## Epoch, batch, iteration

| Term | Meaning |
|---|---|
| **Epoch** | One pass over the **entire** training set |
| **Batch size** | Samples per update |
| **Iteration** | One update = one batch |

With $N=1000$ samples and batch 100 ⇒ 10 iterations per epoch.

| Method | Each update uses | Character |
|---|---|---|
| **Batch GD** | Everything | Exact, slow, memory-hungry |
| **SGD** (batch=1) | 1 sample | Fast but **noisy** |
| **Mini-batch** (32-256) | A batch | A **balance**, exploits GPUs, standard |

**Shuffle** the data each epoch. Mini-batch noise even **helps escape local minima** and generalizes better.

## The learning rate

The most important hyperparameter. Too large: the loss oscillates/diverges; too small: slow. Common techniques: a **learning-rate schedule** (decreasing over epochs), **warm-up** (rising at the start), or **cosine decay**.

## Advanced optimizers

Plain GD often has two issues: **oscillation** along steep directions and **slowness** along shallow ones.

### Momentum

Accumulate "velocity" from previous steps:

$$
\mathbf v\leftarrow\beta\mathbf v+\mathbf g,\qquad \theta\leftarrow\theta-\eta\,\mathbf v
$$

($\beta\approx0.9$.) Like a ball rolling downhill: it **damps oscillations** and **speeds up** along consistent directions.

### RMSprop / Adagrad: a per-parameter learning rate

Divide the step by the **square root of the recent mean squared gradient**: parameters with large gradients get **smaller steps**, those with small gradients get **larger steps**.

### Adam: momentum + adaptive rates (the most popular default)

$$
\begin{aligned}
m_t&=\beta_1 m_{t-1}+(1-\beta_1)g_t &&\text{(mean of the gradient)}\\
v_t&=\beta_2 v_{t-1}+(1-\beta_2)g_t^2 &&\text{(mean of the squared gradient)}\\
\hat m_t&=\frac{m_t}{1-\beta_1^t},\quad \hat v_t=\frac{v_t}{1-\beta_2^t} &&\text{(correct the early bias)}\\
\theta_t&=\theta_{t-1}-\eta\,\frac{\hat m_t}{\sqrt{\hat v_t}+\epsilon}
\end{aligned}
$$

Defaults: $\beta_1=0.9,\ \beta_2=0.999,\ \epsilon=10^{-8}$, $\eta\approx10^{-3}$. **Adam works well out of the box with little tuning**, the first choice in most projects. The variant **AdamW** (decoupled weight decay) is the standard for Transformers.

```python
m = b1 * m + (1 - b1) * g
v = b2 * v + (1 - b2) * g ** 2
m_hat = m / (1 - b1 ** t); v_hat = v / (1 - b2 ** t)
theta -= lr * m_hat / (np.sqrt(v_hat) + eps)
```

## Monitoring training

| Observation (loss curves) | Meaning |
|---|---|
| Train loss **doesn't fall** | Wrong LR, a code/gradient bug, a network too weak |
| Train falls, **validation rises** | **Overfitting**: needs regularization (next lesson) |
| Loss **jumps / NaN** | LR too large, exploding gradients |
| Both fall then **plateau** | Converged; you may stop |

Always **measure on a validation set**, plot loss curves, and first try to **overfit a tiny batch** (the model should reach loss ~0 on 10 samples, otherwise there's a bug).

## Standardize the inputs

As in classical ML, standardize inputs (mean 0, std 1) for faster, more stable training.
