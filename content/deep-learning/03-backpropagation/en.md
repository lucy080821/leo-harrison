# Backpropagation

**Backpropagation** is the algorithm that efficiently computes the **gradient of the loss with respect to every parameter** in a neural network. It's what makes training deep networks feasible. At heart it's just the **chain rule** (which you learned in the Math course) applied systematically.

## The computation graph

The forward pass is a chain of simple operations:

```text
 X ──▶ z1 = X·W1 + b1 ──▶ a1 = tanh(z1) ──▶ out = a1·W2 + b2 ──▶ L
```

To update with gradient descent we need $\dfrac{\partial L}{\partial W_1}$, $\dfrac{\partial L}{\partial b_1}$, $\dfrac{\partial L}{\partial W_2}$, $\dfrac{\partial L}{\partial b_2}$.

## The idea: walk backward from the end

The chain rule: the gradient at a node = (the gradient arriving from the next node) × (that node's **local** derivative). Walking backward from $L$ **reuses** already-computed derivatives, so the cost is only **about one forward pass**, instead of computing each parameter separately.

## Example: one sigmoid neuron

$L = (a - y)^2$ with $a=\sigma(z)$, $z = wx+b$:

$$
\frac{\partial L}{\partial w}
=\underbrace{\frac{\partial L}{\partial a}}_{2(a-y)}\cdot
\underbrace{\frac{\partial a}{\partial z}}_{a(1-a)}\cdot
\underbrace{\frac{\partial z}{\partial w}}_{x}
$$

All three factors are **simple**; multiplying them gives the gradient.

## A two-layer network (matrix form)

With $L = \dfrac{1}{2N}\sum(\text{out}-y)^2$, a $\tanh$ hidden layer and a linear output layer. Walk backward step by step:

| Step | Formula |
|---|---|
| Gradient at the output | $\delta_{out} = \dfrac{\partial L}{\partial\text{out}}=\dfrac{\text{out}-y}{N}$ |
| Output layer | $\dfrac{\partial L}{\partial W_2}=A_1^T\delta_{out},\quad \dfrac{\partial L}{\partial \mathbf{b}_2}=\sum_{\text{rows}}\delta_{out}$ |
| Send back to the hidden layer | $\delta_{A_1}=\delta_{out}W_2^T$ |
| Through tanh | $\delta_{Z_1}=\delta_{A_1}\odot(1-A_1^2)$ |
| Hidden layer | $\dfrac{\partial L}{\partial W_1}=X^T\delta_{Z_1},\quad \dfrac{\partial L}{\partial \mathbf{b}_1}=\sum_{\text{rows}}\delta_{Z_1}$ |

($\odot$ is element-wise multiplication.)

```python
dout = (out - y) / N
dW2 = a1.T @ dout
db2 = dout.sum(axis=0, keepdims=True)
da1 = dout @ W2.T
dz1 = da1 * (1 - a1 ** 2)          # tanh'(z) = 1 - tanh(z)^2
dW1 = X.T @ dz1
db1 = dz1.sum(axis=0, keepdims=True)
```

### A shape-checking trick

A parameter's gradient always has the **same shape** as the parameter: $dW_2$ has the shape of $W_2$. If shapes don't match, there's certainly a bug.

## The general scheme for deep networks

For layer $\ell$: $Z_\ell = A_{\ell-1}W_\ell+\mathbf b_\ell$, $A_\ell=\varphi(Z_\ell)$.

$$
\delta_\ell = \big(\delta_{\ell+1}W_{\ell+1}^T\big)\odot\varphi'(Z_\ell),\qquad
\frac{\partial L}{\partial W_\ell}=A_{\ell-1}^T\delta_\ell
$$

Repeat from the last layer to the first. **PyTorch/TensorFlow do this automatically** (autograd), but understanding how it works helps you debug and design better (in the last lesson you'll write a small autograd engine yourself).

## Gradient checking

Hand-coding backprop is very error-prone. **Always compare with a numerical derivative**:

$$
\frac{\partial L}{\partial\theta_i}\approx\frac{L(\theta_i+h)-L(\theta_i-h)}{2h}
$$

```python
max_err = max(np.abs(analytic[k] - numeric[k]).max() for k in params)   # should be < 1e-6
```

Numerical derivatives are **slow** (two forward passes per parameter), so use them only to **check**, not to train.

## The vanishing / exploding gradient problem

A gradient passing through many layers is **multiplied repeatedly**:

- Multiplying by numbers $<1$ many times (sigmoid's derivative $\le 0.25$) → **vanishes**, early layers don't learn.
- Multiplying by numbers $>1$ many times → **explodes**, training becomes unstable.

Remedies: **ReLU**, **He/Xavier initialization**, **batch normalization**, **residual connections**, **gradient clipping**. Later lessons revisit them.
