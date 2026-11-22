# Neurons, the perceptron and activation functions

**Deep learning** uses **multi-layer neural networks** to learn representations directly from raw data (images, audio, text). It underlies image recognition, machine translation and large language models. In this course you'll **implement everything from scratch with NumPy** to truly understand it.

## The artificial neuron

Inspired (very loosely) by biological neurons. A neuron:

1. Receives inputs $x_1,\dots,x_d$.
2. Computes a **weighted sum**: $z = \sum_j w_jx_j + b = \mathbf{w}\cdot\mathbf{x}+b$.
3. Passes it through an **activation function** $\varphi$: $a = \varphi(z)$.

```text
 x1 ──w1──╲
 x2 ──w2───▶ ( Σ w·x + b ) ──▶ φ(z) ──▶ a
 x3 ──w3──╱
```

This is exactly **logistic regression** when $\varphi=\sigma$ (sigmoid). The power comes from **stacking thousands of neurons into many layers**.

![One neuron and common activation functions](/lessons/deep-learning/01-perceptron-activations-fig-en.svg)
*One neuron and common activation functions*

## The perceptron (1958)

A neuron with a **step** activation: $a=1$ if $z>0$, otherwise $0$. The **perceptron learning rule**: for each sample $(\mathbf{x},t)$ and prediction $\hat y$,

$$
\mathbf{w}\leftarrow\mathbf{w}+\eta\,(t-\hat y)\,\mathbf{x},\qquad b\leftarrow b+\eta\,(t-\hat y)
$$

If correct ($t=\hat y$): no change. If wrong: **nudge the boundary** toward the right side. For **linearly separable** data (like AND, OR gates) the perceptron is **guaranteed to converge**.

### The limitation: the XOR problem

A single perceptron **can't** learn XOR since $\{(0,1),(1,0)\}$ and $\{(0,0),(1,1)\}$ aren't separable by one line. In 1969 this finding triggered the first "AI winter". The solution: **multi-layer networks** with **non-linear** activations (next lesson).

## Why non-linear activations?

Without activations, a multi-layer network is just a **product of matrices**, still **one linear transformation**:

$$
W_2(W_1\mathbf{x}) = (W_2W_1)\mathbf{x}
$$

Stacking any number of layers is no stronger than one. **Non-linearity** is what gives the network the power to approximate complex functions.

## Common activation functions

| Function | Formula | Output | Notes |
|---|---|---|---|
| **Sigmoid** | $\dfrac{1}{1+e^{-z}}$ | $(0,1)$ | A probability; **saturates** (gradient ~0 at both ends) |
| **Tanh** | $\dfrac{e^z-e^{-z}}{e^z+e^{-z}}$ | $(-1,1)$ | Zero-centered; still saturates |
| **ReLU** | $\max(0,z)$ | $[0,\infty)$ | **Today's default**: cheap, gradient doesn't vanish for $z>0$ |
| **Leaky ReLU** | $\max(\alpha z, z)$ | $\mathbb{R}$ | Avoids "dead ReLUs" |
| **GELU / SiLU** | smoother than ReLU | | Used in Transformers |
| **Softmax** | $\dfrac{e^{z_i}}{\sum_j e^{z_j}}$ | sums to $1$ | The **last layer** of multi-class classification |

```python
def relu(z): return np.maximum(0, z)
def sigmoid(z): return 1 / (1 + np.exp(-z))
def tanh(z): return np.tanh(z)
```

### Softmax

Turns a vector of scores ("logits") into a **probability distribution**:

$$
\text{softmax}(\mathbf{z})_i = \frac{e^{z_i}}{\sum_j e^{z_j}}
$$

**Numerical stability:** $e^{1000}$ overflows. Since softmax is **unchanged when adding a constant** to every $z_i$, we subtract $\max(\mathbf z)$ first:

```python
e = np.exp(z - np.max(z))
return e / e.sum()
```

For $\mathbf z=(1,2,3)$: the result is $(0.090, 0.245, 0.665)$.

## Choosing the last-layer activation

| Problem | Last layer | Loss |
|---|---|---|
| Regression | Linear (no activation) | MSE |
| Binary | Sigmoid (1 output) | Binary cross-entropy |
| Multi-class | Softmax | Categorical cross-entropy |

**Hidden** layers usually use ReLU (or GELU).

## Why does ReLU beat sigmoid in hidden layers?

The sigmoid's derivative is $\sigma'(z)=\sigma(1-\sigma)\le 0.25$. When backpropagating through many layers the gradient gets **multiplied by small numbers repeatedly** and **vanishes**. ReLU's derivative is **1** for $z>0$, letting gradients flow better through deep networks.
