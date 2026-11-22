# Linear algebra for ML

## Systems of linear equations

Many ML problems reduce to solving $A\mathbf{x} = \mathbf{b}$. For instance linear regression has a **closed-form solution** (the normal equation):

$$
\mathbf{w} = (X^TX)^{-1}X^T\mathbf{y}
$$

```python
A = np.array([[2.0, 1.0], [1.0, 3.0]])
b = np.array([3.0, 5.0])
x = np.linalg.solve(A, b)        # [0.8, 1.4]
```

Use `solve` rather than `inv(A) @ b`: **faster and numerically more stable**.

![A network layer is a matrix product: (n×d)·(d×k) = (n×k)](/lessons/math-for-ml/02-linear-algebra-ml-fig-en.svg)
*A network layer is a matrix product: (n×d)·(d×k) = (n×k)*

## Determinant and invertibility

For a $2\times2$ matrix: $\det\begin{pmatrix}a&b\\c&d\end{pmatrix} = ad - bc$.

- $\det(A) \neq 0$: $A$ is **invertible** (the system has a unique solution).
- $\det(A) = 0$: $A$ is **singular** (rows/columns are linearly dependent), no inverse exists.

In ML, two **perfectly correlated** features make $X^TX$ singular and linear regression often fails. That's why regularization is needed.

## Eigenvalues and eigenvectors

An eigenvector $\mathbf{v}$ of $A$ is a vector that is **only scaled** (keeps its direction) when multiplied by $A$:

$$
A\mathbf{v} = \lambda\mathbf{v}
$$

$\lambda$ is the **eigenvalue** (the scaling factor). E.g. $A = \begin{pmatrix}2&1\\1&2\end{pmatrix}$ has eigenvalue $\lambda = 3$ (vector $(1,1)$) and $\lambda = 1$ (vector $(1,-1)$).

```python
vals, vecs = np.linalg.eigh(S)    # eigh is for SYMMETRIC matrices (stable, vals ascending)
```

For symmetric matrices: eigenvectors are **mutually perpendicular** and eigenvalues are real.

## Why eigenvalues matter: PCA

**PCA** (a later lesson in the ML course) finds the directions along which data **varies most**. These are the **eigenvectors of the covariance matrix**, and the eigenvalues give the **amount of variance** in that direction:

$$
\Sigma = \frac{1}{n-1}X_c^TX_c,\qquad \Sigma\mathbf{v}_k = \lambda_k\mathbf{v}_k
$$

Keep the directions with the largest eigenvalues to **reduce dimensions** while losing the least information.

## SVD decomposition

Every matrix $A$ can be factored:

$$
A = U\,\Sigma\,V^T
$$

```python
U, s, Vt = np.linalg.svd(A)
```

- $U, V$: orthogonal matrices (directions).
- $\Sigma$: a diagonal of **singular values** $s_1 \ge s_2 \ge \dots$ (importance).

Keeping the $k$ largest singular values gives the best **low-rank approximation**, used for **image compression**, denoising and recommender systems.

## Rank

Rank is the number of **linearly independent** rows (columns): `np.linalg.matrix_rank(A)`. A low-rank matrix means the data actually lives in fewer dimensions than the visible number of columns.

## Summary

| Concept | Used in ML to... |
|---|---|
| Solving systems, inverse | Closed-form linear regression |
| Determinant / rank | Detect redundant features, multicollinearity |
| Eigenvalues/eigenvectors | PCA, spectral analysis |
| SVD | Compression, dimension reduction, recommenders |
