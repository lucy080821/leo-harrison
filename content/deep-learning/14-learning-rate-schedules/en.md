# Learning-rate schedules, warmup and gradient clipping

The **learning rate (LR)** is the most important hyperparameter. A constant LR is rarely optimal: large at first to move fast, small at the end to converge precisely.

## Common schedules

| Schedule | Idea |
|---|---|
| **Step decay** | multiply by 0.1 every N epochs |
| **Cosine** | smooth decline like half a cosine cycle to ≈ 0 |
| **Warmup** | rise linearly from ≈ 0 over the first few hundred steps |
| **One-cycle** | rise then fall within one cycle, for fast convergence |
| **Reduce on plateau** | lower the LR when validation loss stops improving |

![Warmup then cosine decay: the common Transformer learning-rate schedule](/lessons/deep-learning/14-learning-rate-schedules-fig-en.svg)
*Warmup then cosine decay: the common Transformer learning-rate schedule*

## Why warmup

Early on, weights are random and **Adam's adaptive estimates are unreliable** (v is still small so steps are too large). Raising the LR gradually avoids early collapse; nearly **mandatory for Transformers** (Vaswani 2017; Liu et al. 2020 analyse why).

## Finding the LR (LR range test)

Increase the LR exponentially over an epoch and plot the loss: pick the LR **just before the loss shoots up** (Smith, 2017; fastai's `lr_find`). A common starting point with Adam: `3e-4`.

## Gradient clipping

When gradients explode (RNNs, LLM training), **shrink the gradient vector** if its norm exceeds a threshold: `g ← g · max_norm/‖g‖`. It **keeps direction**, only limiting length. A threshold of 1.0 is very common.

## Adam, step by step

`m` (moving average of the gradient), `v` (moving average of the squared gradient), bias correction `m̂ = m/(1−β₁ᵗ)`, step `w −= lr · m̂/(√v̂ + ε)`. Each parameter gets its own effective LR. `AdamW` decouples weight decay properly (Loshchilov & Hutter, 2019).

## References

- Loshchilov & Hutter (2017). SGDR: stochastic gradient descent with warm restarts. *ICLR*.
- Smith, L. (2017). Cyclical learning rates for training neural networks. *WACV*.
- Kingma & Ba (2015). Adam. *ICLR*.
- Pascanu, Mikolov, Bengio (2013). On the difficulty of training RNNs. *ICML*.
