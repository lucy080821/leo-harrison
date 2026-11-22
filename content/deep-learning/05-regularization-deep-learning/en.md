# Fighting overfitting in deep learning

Neural networks have **millions of parameters**, enough to **memorize the entire training set**. This lesson introduces deep learning's standard **regularization** techniques.

## General principles

Priority order when a model overfits:

1. **More data** or **data augmentation**.
2. **Reduce the model's capacity** (fewer layers/neurons).
3. The techniques below.

![Early stopping: stop when the validation loss starts rising](/lessons/deep-learning/05-regularization-deep-learning-fig-en.svg)
*Early stopping: stop when the validation loss starts rising*

## Weight decay (L2)

Add a penalty for large weights to the loss (like Ridge):

$$
L_{total} = L + \frac{\lambda}{2}\sum_{\ell}\|W_\ell\|_2^2,\qquad
\frac{\partial L_{total}}{\partial W} = \frac{\partial L}{\partial W}+\lambda W
$$

Each update gets an extra term that **shrinks the weights toward 0**: $W\leftarrow W-\eta(\nabla L+\lambda W)$, hence **weight decay**. Smaller weights ⇒ a **smoother** function ⇒ less dominated by noise. Typically $\lambda\sim10^{-4}$ to $10^{-2}$. With Adam use **AdamW**.

## Dropout

During **training**, each pass **randomly turns off** a fraction $p$ of neurons (setting their output to 0):

```python
def dropout(a, p, rng):
    mask = (rng.random(a.shape) >= p) / (1 - p)     # divide by (1-p) to preserve the expectation
    return a * mask
```

Meaning:

- The network can't rely on **any particular neuron** ⇒ it's forced to learn **redundant, robust features**.
- Like training an **ensemble of very many sub-networks** sharing weights.

**Dividing by $(1-p)$** (inverted dropout) keeps the activations' **expected value** unchanged, so at **inference (test) time you do nothing** (**dropout is fully off**). Forgetting to switch to eval mode is a classic bug.

Typical values: $p=0.1$-$0.5$.

## Early stopping

Monitor the **validation loss**: when it **stops decreasing** (or starts rising), **stop** and **restore the best weights**.

```text
 loss
  │ ╲        validation
  │  ╲      ╱‾‾‾‾‾  ← overfitting begins
  │   ╲____╱
  │    ╲______________ train
  └─────────────────── epoch
         ↑ stop here
```

Very cheap and effective. The `patience` parameter (how many epochs to wait without improvement).

## Batch Normalization

Normalize each layer's inputs by the **batch mean/standard deviation**, then learn a **scale and shift** $\gamma,\beta$:

$$
\hat x = \frac{x-\mu_B}{\sqrt{\sigma_B^2+\epsilon}},\qquad y=\gamma\hat x+\beta
$$

Benefits: **more stable and faster** training, allows **large learning rates**, reduces dependence on initialization, and has a **mild regularizing effect**. At inference it uses the accumulated **running mean/std**. **Layer Normalization** (per-sample normalization) is the standard choice for Transformers.

## Data augmentation

Create new samples with label-preserving transformations:

- **Images**: flip, rotate, crop, brightness change, noise.
- **Text**: synonym replacement, back-translation.
- **Audio**: speed change, added noise.

A way to get "free data", the most effective for images.

## Other techniques

| Technique | Idea |
|---|---|
| **Label smoothing** | Soft labels (0.9 instead of 1) so the model isn't overconfident |
| **Gradient clipping** | Clip gradients to avoid explosion |
| **Mixup / CutMix** | Blend two samples and their labels |
| **Transfer learning** | Use a **pretrained** model, fine-tuning only part: effective with little data |
| **Ensembling** | Average several models |

## A practical procedure

```text
1. A simple baseline → does it overfit? (train ≪ val)
2. Yes: more data/augmentation → weight decay → dropout → shrink
3. No (underfitting): a bigger network, train longer, a suitable LR
4. Early stopping, monitor validation
```
