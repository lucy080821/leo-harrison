# Clustering: K-Means and beyond

So far you've done **supervised** learning (with labels). **Unsupervised learning** works with **unlabelled** data and its job is to **find hidden structure**. **Clustering** groups similar samples together.

Uses: **customer segmentation**, grouping articles, image compression (reducing colors), anomaly detection, bootstrapping labels.

## K-Means

Split the data into $K$ clusters, each with a **centroid**. The algorithm alternates two steps:

1. **Assign**: put each point in the cluster with the **nearest centroid**.
2. **Update**: move each centroid to the **mean** of its cluster's points.

Repeat until the groups stop changing.

```python
from sklearn.cluster import KMeans
km = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X)
km.labels_            # each point's cluster label
km.cluster_centers_   # the centroid coordinates
km.predict(X_new)
```

K-Means minimizes **inertia** (the sum of squared distances to the cluster centers):

$$
\text{Inertia} = \sum_{k=1}^{K}\sum_{\mathbf{x}\in C_k}\|\mathbf{x}-\boldsymbol\mu_k\|^2
$$

### Points to note

- You must **choose $K$ in advance**.
- **Sensitive to initialization** (can get stuck in a local minimum): use `n_init=10` (run several times, keep the best) and smart `k-means++` initialization (the default).
- **Needs feature scaling** (distance-based).
- Assumes **spherical, similar-sized** clusters; poor with elongated, off-center or oddly shaped clusters.
- Sensitive to outliers.

![K-Means: assign points to the nearest centroid, then move the centroids](/lessons/machine-learning/10-clustering-kmeans-fig-en.svg)
*K-Means: assign points to the nearest centroid, then move the centroids*

## Choosing $K$

### The elbow method

Plot inertia against $K$: it always falls as $K$ grows; look for the "**elbow**" where the decrease slows markedly.

```python
inertias = [KMeans(k, n_init=10, random_state=0).fit(X).inertia_ for k in range(1, 9)]
```

### The silhouette coefficient

For each point: $a$ = mean distance to points in the **same cluster**, $b$ = mean distance to the **nearest other cluster**:

$$
s = \frac{b-a}{\max(a,b)}\in[-1,1]
$$

$s$ near **1**: the point is in the right cluster, well separated; near **0**: on a boundary; **negative**: possibly misassigned. Take the **average** to score $K$:

```python
from sklearn.metrics import silhouette_score
silhouette_score(X, labels)
```

Choose the $K$ with the **highest** silhouette. It needs no true labels, so it works on real problems.

## DBSCAN: density-based clustering

A cluster is a **dense region** of points separated by sparse regions. Two parameters: `eps` (neighborhood radius) and `min_samples`.

```python
from sklearn.cluster import DBSCAN
labels = DBSCAN(eps=0.3, min_samples=5).fit_predict(X)     # label -1 = noise
```

| Pros | Cons |
|---|---|
| **No need to choose $K$** | Choosing `eps` is hard |
| **Arbitrary-shaped** clusters (moons) | Poor when cluster densities differ a lot |
| Detects **outliers** itself (label -1) | Poor in high dimensions |

## Hierarchical clustering

Start with each point as a cluster and **merge** the two closest clusters step by step, producing a **dendrogram** (a tree). You can **cut at any level** to choose the number of clusters.

```python
from sklearn.cluster import AgglomerativeClustering
AgglomerativeClustering(n_clusters=3).fit_predict(X)
```

## Quick comparison

| | K-Means | DBSCAN | Hierarchical |
|---|---|---|---|
| Needs $K$ | **Yes** | No | Yes (or cut the dendrogram) |
| Cluster shape | Spherical | **Arbitrary** | Depends on linkage |
| Outliers | Sensitive | **Detected** | Sensitive |
| Speed | **Very fast** | Medium | Slow ($O(n^2)$) |

## Evaluating without labels

Clustering is hard to evaluate objectively. Combine: **silhouette**, **visualization** (PCA/t-SNE down to 2D), and most importantly **business interpretability** ("group A are heavy but infrequent buyers").
