# Vectors and matrices

At heart, Machine Learning is **maths on numbers arranged as vectors and matrices**. An image is a matrix of pixels, a sentence is a vector of numbers, a model is a set of weight matrices. Understanding linear algebra is understanding ML's "language".

## Vectors

A vector is an **ordered list of numbers**: $\mathbf{x} = (x_1, x_2, \dots, x_n)$. Two ways to see it:

- A **list of features**: a house $= (\text{area}, \text{rooms}, \text{age})$.
- A **point / arrow in $n$-dimensional space**: it has a **length** and a **direction**.

```python
import numpy as np
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
a + b          # [5 7 9]     component-wise addition
2 * a          # [2 4 6]     multiply by a number (scalar)
```

## The dot product

$$
\mathbf{a}\cdot\mathbf{b} = \sum_{i=1}^{n} a_i b_i = a_1b_1 + a_2b_2 + \dots + a_nb_n
$$

E.g. $(1,2,3)\cdot(4,5,6) = 4 + 10 + 18 = 32$. The dot product shows up **everywhere**: a neuron computes $\mathbf{w}\cdot\mathbf{x} + b$; linear regression predicts $\hat{y} = \mathbf{w}\cdot\mathbf{x} + b$.

Geometrically: $\mathbf{a}\cdot\mathbf{b} = \|\mathbf{a}\|\,\|\mathbf{b}\|\cos\theta$, where $\theta$ is the angle between the vectors. Two **perpendicular** vectors have a dot product of 0.

## A vector's length (norm)

| Norm | Formula | Meaning |
|---|---|---|
| **L2** (Euclidean) | $\|\mathbf{x}\|_2 = \sqrt{\sum x_i^2}$ | The usual length |
| **L1** (Manhattan) | $\|\mathbf{x}\|_1 = \sum \lvert x_i\rvert$ | The sum of the components' magnitudes |

These two norms underlie L2 (Ridge) and L1 (Lasso) **regularization**, met in the Machine Learning course.

```python
np.linalg.norm(a)            # L2: sqrt(14) = 3.74
np.linalg.norm(a, ord=1)     # L1: 6
```

## Cosine similarity

When you care only about **direction** (not magnitude), use cosine:

$$
\cos\theta = \frac{\mathbf{a}\cdot\mathbf{b}}{\|\mathbf{a}\|\,\|\mathbf{b}\|}\in[-1, 1]
$$

Near 1: same direction (very similar); 0: perpendicular (unrelated); -1: opposite. It's the standard measure for comparing text **embeddings** in modern AI.

## Matrices and multiplication

A matrix is an $m \times n$ table of numbers ($m$ rows, $n$ columns). Multiplying $A$ ($m\times n$) by $B$ ($n\times p$) gives $C$ ($m\times p$):

$$
C_{ij} = \sum_{k=1}^{n} A_{ik}B_{kj}
$$

Each entry $C_{ij}$ is the **dot product of row $i$ of $A$ with column $j$ of $B$**. The **number of columns of A must equal the number of rows of B**.

```python
A = np.array([[1, 2, 3], [4, 5, 6]])         # 2x3
B = np.array([[7, 8], [9, 10], [11, 12]])    # 3x2
A @ B       # 2x2: [[58, 64], [139, 154]]
A.T         # transpose: swap rows and columns
```

> Matrix multiplication is **not commutative**: $AB \neq BA$ in general (the shapes may not even be defined).

## Why it matters for ML

A neural-network layer processes a whole batch with **one matrix multiplication**:

$$
Z = XW + \mathbf{b}
$$

with $X$ ($N$ samples × $d$ features) and $W$ ($d \times h$). GPUs are built to multiply matrices extremely fast, which is why deep learning is feasible.

## Special matrices

| Matrix | Meaning |
|---|---|
| Identity $I$ | $AI = IA = A$ |
| Diagonal | Only diagonal entries are non-zero |
| Symmetric | $A = A^T$ (e.g. a covariance matrix) |
| Inverse $A^{-1}$ | $AA^{-1} = I$ (only if $A$ is square and invertible) |
