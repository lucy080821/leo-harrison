# Support vector machines

**SVM** is one of the classic and most powerful classification algorithms of the pre-deep-learning era. The idea: find the separating boundary **with the widest safety margin**.

## The idea: maximum margin

There are infinitely many lines separating two classes. SVM picks the one **farthest from both classes**:

```text
   ○  ○        ┆         ●  ●
 ○   ○     ┈┈┈┈┆┈┈┈┈     ●   ●        margin
   ○      ◄──── w ────►     ●
        boundary: w·x + b = 0
```

- **Support vectors**: the points **closest to the boundary** (on the margin). Only they determine the boundary; far-away points have no influence.
- The **margin** has width $\dfrac{2}{\|\mathbf{w}\|}$. A wider margin ⇒ better generalization.

The optimization problem (hard-margin SVM): $\min\ \tfrac12\|\mathbf{w}\|^2$ subject to $y_i(\mathbf{w}\cdot\mathbf{x}_i+b)\ge 1$.

![SVM finds the separating line with the largest margin](/lessons/machine-learning/09-support-vector-machines-fig-en.svg)
*SVM finds the separating line with the largest margin*

## Soft margin and the parameter C

Real data is **noisy** and can't be separated perfectly. The **soft margin** lets some points violate it at a cost:

$$
\min\ \tfrac12\|\mathbf{w}\|^2 + C\sum_i\xi_i
$$

| $C$ | Behaviour |
|---|---|
| **Large** | Heavy penalty for violations: a **narrow** margin, tight train fit (risk of **overfitting**) |
| **Small** | Tolerates violations: a **wide** margin, smooth (risk of **underfitting**) |

## The kernel trick: non-linear boundaries

The "two moons" data **can't** be separated by a line. The idea: **project the data into a higher-dimensional space** where it becomes linearly separable. The magic: SVM only needs the **dot products** between points, so we compute them directly with a **kernel function** $K(\mathbf{a},\mathbf{b})$ **without ever building** that space (the **kernel trick**).

| Kernel | Formula | Use when |
|---|---|---|
| **Linear** | $\mathbf{a}\cdot\mathbf{b}$ | Linearly separable, high-dimensional data (text) |
| **Polynomial** | $(\gamma\,\mathbf{a}\cdot\mathbf{b}+r)^d$ | High-order interactions |
| **RBF (Gaussian)** | $\exp(-\gamma\|\mathbf{a}-\mathbf{b}\|^2)$ | **The default for non-linear data** |

The RBF kernel measures "closeness": nearby points give a value near 1, far points near 0.

```python
from sklearn.svm import SVC
SVC(kernel="rbf", C=1, gamma="scale")
```

### The gamma parameter (RBF)

$\gamma$ controls **how far one point's influence reaches**:

- **Large** $\gamma$: narrow influence → an **extremely wiggly** boundary around individual points (**overfitting**).
- **Small** $\gamma$: wide influence → a **smooth** boundary (**underfitting**).

You usually tune the pair $(C,\gamma)$ with **GridSearchCV** (Pipeline lesson).

## In practice: scaling is required

SVM relies on distances/dot products so it's **scale-sensitive**: always use `StandardScaler` (in a Pipeline).

## SVM for probabilities and regression

- By default SVM returns **labels**, not probabilities. `SVC(probability=True)` estimates probabilities (slower).
- **SVR** (Support Vector Regression) handles regression problems.

## Strengths and weaknesses

| Strengths | Weaknesses |
|---|---|
| Effective in **high-dimensional spaces** | **Slow** on big data (training $\approx O(n^2)$ to $O(n^3)$) |
| Flexible via kernels | Sensitive to scaling and hyperparameters |
| Good with **few samples** | Hard to interpret; no natural probabilities |

Today tabular data usually uses tree ensembles and unstructured data uses deep learning; yet SVM remains a good choice for **small-to-medium, high-dimensional data** and is important background (the ideas of margin and kernel reappear in many places).
