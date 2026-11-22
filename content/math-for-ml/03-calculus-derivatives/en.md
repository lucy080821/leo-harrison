# Calculus: derivatives and gradients

Training an ML model means **finding the parameters that make the error smallest**. The tool that tells you "which way to adjust the parameters" is the **derivative**.

## The derivative is the slope

The derivative of $f$ at $x$ measures the **instantaneous rate of change** of $f$ (the slope of the tangent line):

$$
f'(x) = \lim_{h\to 0}\frac{f(x+h)-f(x)}{h}
$$

- $f'(x) > 0$: the function is **rising** at $x$.
- $f'(x) < 0$: it is **falling**.
- $f'(x) = 0$: a **stationary point** (minimum, maximum or saddle).

Computers approximate it with the **central difference** (more accurate than the plain difference):

$$
f'(x)\approx\frac{f(x+h)-f(x-h)}{2h}
$$

![The gradient points along steepest ascent on contour lines](/lessons/math-for-ml/03-calculus-derivatives-fig-en.svg)
*The gradient points along steepest ascent on contour lines*

## Derivatives to know by heart

| $f(x)$ | $f'(x)$ |
|---|---|
| $x^n$ | $nx^{n-1}$ |
| $e^x$ | $e^x$ |
| $\ln x$ | $1/x$ |
| $\sigma(x)=\dfrac{1}{1+e^{-x}}$ | $\sigma(x)\,(1-\sigma(x))$ |
| $\tanh x$ | $1-\tanh^2 x$ |
| $\max(0,x)$ (ReLU) | $1$ if $x>0$, $0$ if $x<0$ |

Rules: $(f+g)'=f'+g'$, $(cf)'=cf'$, $(fg)'=f'g+fg'$.

## The chain rule: the heart of backpropagation

For **nested** functions $y = f(g(x))$:

$$
\frac{dy}{dx} = f'(g(x))\cdot g'(x)
$$

Example $y = (3x+1)^2$: let $u = 3x+1$, then $\dfrac{dy}{dx} = 2u \cdot 3 = 6(3x+1)$.

A neural network is a long chain of nested functions; **backpropagation is exactly the chain rule applied from the end back to the start**. This is the single most important idea of deep learning.

## Many variables: partial derivatives and the gradient

For $f(x, y)$, the **partial derivative** $\dfrac{\partial f}{\partial x}$ is the derivative with respect to $x$ while **treating $y$ as a constant**.

Example $f(x,y) = x^2 + 3y^2$: $\dfrac{\partial f}{\partial x} = 2x$, $\dfrac{\partial f}{\partial y} = 6y$.

The **gradient** collects all the partial derivatives into one vector:

$$
\nabla f = \left(\frac{\partial f}{\partial x_1},\;\dots,\;\frac{\partial f}{\partial x_n}\right)
$$

Key property: $\nabla f$ points in the direction of **steepest increase** of $f$, so $-\nabla f$ is the direction of **steepest decrease**. That's the basis of **gradient descent** (next lesson).

```python
def grad(x, y):
    return np.array([2 * x, 6 * y])   # at (1, 2): [2, 12]
```

## Gradient checking

When you implement derivatives yourself, **compare with a numerical derivative** to catch bugs:

```python
def numeric_grad(f, x, h=1e-5):
    g = np.zeros_like(x, dtype=float)
    for i in range(len(x)):
        e = np.zeros_like(x, dtype=float); e[i] = h
        g[i] = (f(x + e) - f(x - e)) / (2 * h)
    return g
```

This technique will save you when you write backpropagation yourself in the Deep Learning course.

## The Jacobian and Hessian (an introduction)

- **Jacobian**: the matrix of partial derivatives of a vector function with respect to a vector.
- **Hessian**: the matrix of second derivatives, telling you the **curvature**. Used in second-order optimization (Newton's method).

Most deep learning uses only **first-order gradients** because they're far cheaper.
