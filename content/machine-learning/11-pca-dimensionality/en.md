# PCA and dimensionality reduction

Real data often has **dozens to thousands of features**, many **redundant or correlated**. **Dimensionality reduction** compresses them into fewer dimensions while **keeping most of the information**.

Benefits: **visualization** (compress to 2D/3D), **faster** training, **less noise**, **fighting the curse of dimensionality** and overfitting.

## PCA (Principal Component Analysis)

PCA finds **new directions** (principal components) in the data space such that:

1. The first direction $\mathbf{v}_1$ has the **largest variance** (the data spreads out most).
2. The second direction $\mathbf{v}_2$ is **perpendicular** to $\mathbf{v}_1$ with the largest remaining variance. And so on.

Then **project the data onto the first $k$ directions** to get a $k$-dimensional representation.

```text
  y ▲        · ·  ·
    │      · · ·· ·  ╱ ← PC1: the direction of widest spread
    │    · ·· ··   ╱
    │   ·  · ··  ╱
    └─────────────────▶ x
```

### How it's computed (link to the Math course)

1. **Subtract the mean** of each column (center the data): $X_c$.
2. Compute the **covariance matrix** $\Sigma = \dfrac{1}{n-1}X_c^TX_c$.
3. Find the **eigenvectors** of $\Sigma$: these are the principal components; the **eigenvalue** $\lambda_k$ is the variance along that direction.
4. Keep the $k$ eigenvectors with the **largest eigenvalues**: the matrix $W_k$. The reduced data: $Z = X_cW_k$.

(In practice sklearn uses **SVD** for numerical stability.)

```python
from sklearn.decomposition import PCA
pca = PCA(n_components=2).fit(X)
Z = pca.transform(X)                 # n x 2
pca.components_                      # the directions (rows)
pca.explained_variance_ratio_        # each component's variance proportion
```

![PCA projects data onto the direction of greatest variance](/lessons/machine-learning/11-pca-dimensionality-fig-en.svg)
*PCA projects data onto the direction of greatest variance*

## Explained variance ratio

$$
\text{ratio}_k = \frac{\lambda_k}{\sum_j\lambda_j}
$$

For iris, the first 2 components keep ~**98%** of the variance: 4 dimensions squeezed into 2 with almost no loss.

### Choosing the number of components

Plot the **cumulative variance** and choose the smallest $k$ reaching a threshold (e.g. **95%**):

```python
ratio = PCA().fit(Xs).explained_variance_ratio_
k = np.argmax(np.cumsum(ratio) >= 0.95) + 1
# or: PCA(n_components=0.95)
```

## A must: standardize first

PCA follows **variance**, so features with a large scale **dominate**. Always use `StandardScaler` first (especially when features have different units). In the breast-cancer lesson (30 standardized features) you need **10 components** to keep 95%.

## Uses

| Purpose | How |
|---|---|
| Visualization | PCA down to 2D then `scatter`, colored by label |
| Speed-up | Reduce dimensions before training |
| Denoising | Keep the first components, drop the rest then `inverse_transform` |
| Decorrelation | Principal components are **uncorrelated** |
| Image compression | Keep few components, reconstruct approximately |

```python
X_back = pca.inverse_transform(Z)        # approximate reconstruction in the original dimensions
error = ((Xs - X_back) ** 2).mean()      # reconstruction error
```

## Limitations

- Captures only **linear** structure.
- Principal components are **hard to interpret** (combinations of all features).
- Large variance **isn't guaranteed** to be useful information for the label.
- **Sensitive to outliers**.

## Other methods

| Method | Character |
|---|---|
| **t-SNE**, **UMAP** | Non-linear, excellent for **visualizing** clusters in 2D (not for training models) |
| **Autoencoder** | A neural network learning a non-linear compressed representation (Deep Learning course) |
| **LDA** | **Supervised** reduction maximizing separation between classes |
| **Feature selection** | Keep a subset of the original features (more interpretable) |
