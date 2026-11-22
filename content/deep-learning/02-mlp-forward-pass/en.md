# Multi-layer networks (MLP) and the forward pass

An **MLP** (Multi-Layer Perceptron, a feed-forward neural network) arranges neurons in **layers**: input layer → one or more **hidden layers** → output layer. Each layer is **fully connected** to the next (dense).

```text
 input layer    hidden layer    output layer
   x1 ──┬──▶  ( h1 ) ──┬──▶
        │  ╲╱          │
   x2 ──┼──▶  ( h2 ) ──┼──▶  ( ŷ )
        │  ╱╲          │
   x3 ──┴──▶  ( h3 ) ──┴──▶
```

## The forward pass

Process a **batch** of $N$ samples with **matrix multiplication**. For $X\in\mathbb{R}^{N\times d}$ and a network with one hidden layer of $h$ units:

$$
Z_1 = XW_1 + \mathbf{b}_1,\qquad A_1 = \varphi(Z_1)
$$

$$
Z_2 = A_1W_2 + \mathbf{b}_2,\qquad \hat Y = \sigma(Z_2)
$$

- $W_1\in\mathbb{R}^{d\times h}$, $\mathbf{b}_1\in\mathbb{R}^{h}$ (added to each row via **broadcasting**).
- $W_2\in\mathbb{R}^{h\times k}$ with $k$ outputs.

```python
def forward(X, W1, b1, W2, b2):
    h = sigmoid(X @ W1 + b1)
    return sigmoid(h @ W2 + b2)
```

Checking **shapes** always helps: $(N,d)\cdot(d,h)\to(N,h)$, then $(N,h)\cdot(h,k)\to(N,k)$.

![A multi-layer network: data flows from input through hidden layers to output](/lessons/deep-learning/02-mlp-forward-pass-fig-en.svg)
*A multi-layer network: data flows from input through hidden layers to output*

## Solving the XOR problem

A network with **exactly 2 hidden neurons** is enough for XOR, which a single perceptron can't do. Intuition: $\text{XOR}(a,b)=\text{AND}\big(\text{OR}(a,b),\ \text{NAND}(a,b)\big)$:

| Neuron | Does | Weights, bias |
|---|---|---|
| $h_1$ | OR | $(20,20)$, $-10$ |
| $h_2$ | NAND | $(-20,-20)$, $+30$ |
| output | AND($h_1,h_2$) | $(20,20)$, $-30$ |

The hidden layer **transforms the space** so the problem becomes linearly separable. That's the essence of deep learning: **learning representations**.

## The universal approximation theorem

> An MLP with **just one sufficiently wide hidden layer** and a non-linear activation can approximate **any continuous function** to arbitrary accuracy.

But "sufficiently wide" can be **astronomically wide**. In practice **deep networks** (many narrow layers) are far more efficient: each layer learns features at an increasingly abstract level (edges → shapes → objects).

## Counting parameters

A layer connecting $n_{in}\to n_{out}$ has $n_{in}\cdot n_{out}$ weights and $n_{out}$ biases:

$$
\#\text{params} = \sum_{\ell}\big(n_{\ell-1}\,n_\ell + n_\ell\big)
$$

The $4\to8\to3$ network: $(4\cdot8+8)+(8\cdot3+3)=40+27=67$. A network for MNIST images $784\to128\to10$: $100{,}480+1{,}290=101{,}770$ parameters.

The parameter count determines the model's **capacity**, memory and overfitting risk.

## Weight initialization

Never initialize **all zeros**: every neuron in a layer is identical and gets the same gradient, so they **never differ** (the symmetry isn't broken). Use **small random numbers**, scaled to the layer size:

| Scheme | Formula (std. dev.) | Suited to |
|---|---|---|
| **Xavier/Glorot** | $\sqrt{\dfrac{2}{n_{in}+n_{out}}}$ | sigmoid, tanh |
| **He** | $\sqrt{\dfrac{2}{n_{in}}}$ | ReLU |

```python
rng = np.random.default_rng(0)
W1 = rng.normal(0, np.sqrt(2 / n_in), size=(n_in, n_hidden))
b1 = np.zeros(n_hidden)            # initializing biases to 0 is fine
```

Good initialization keeps the **signal magnitude** stable across layers (neither blowing up nor fading).

## Visualizing hidden layers

Each hidden neuron is a **detector** for a pattern in the input. Later layers combine those detectors into more complex patterns. Depth = a **feature hierarchy**.
