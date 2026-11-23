# Eigenvalues, eigenvectors and PCA

## A matrix's special directions

Most vectors get rotated by a matrix A. But some vectors are **only stretched**, not turned:

`A v = λ v`

**v** is an **eigenvector**, **λ** the corresponding **eigenvalue** ("eigen" is German for "own/characteristic"). The eigenvalue tells the stretch along that direction.

![The unit grid and eigenvectors (1,1), (1,−1) before and after the transformation](/lessons/prob-stats/38-eigen-pca-eig-en.svg)
*The two eigenvectors keep their direction; the one along (1,1) is 3× longer.*

For A = [[2,1],[1,2]]: eigenvalue 3 (direction (1,1)) and 1 (direction (1,−1)). The matrix stretches 3× along the diagonal and leaves the perpendicular direction unchanged.

Applications: mechanical stability of bridges and buildings (natural vibration frequencies), Google's PageRank (the principal eigenvector of the web link matrix), quantum mechanics.

## Principal component analysis (PCA)

Real data often has **redundant dimensions**. Height and weight are tightly linked, so a single "body-size axis" nearly describes both. **PCA** (Karl Pearson, 1901; Harold Hotelling, 1933) does this systematically:

1. Subtract each column's mean (centre the data).
2. Compute the **covariance matrix** C.
3. Find the **eigenvectors of C**: these are the **principal components**, the directions of greatest variation.
4. The eigenvalues are the **variance along each direction**; project onto the first few components to **reduce dimension**.

![Height–weight point cloud with its two principal components](/lessons/prob-stats/38-eigen-pca-pca-en.svg)
*PC1 is the direction of greatest variation; PC2 is perpendicular and much smaller.*

Applications: image compression, visualising high-dimensional data in 2D, denoising, preprocessing for Machine Learning.

> Note: PCA captures only **linear** structure, and principal components are hard to interpret directly.

## References

- Strang, G. *Introduction to Linear Algebra*, chapter 6 (Eigenvalues and eigenvectors); MIT OCW 18.06 and 18.065.
- Jolliffe, I. T. *Principal Component Analysis* (Springer, 2nd ed., 2002).
- Pearson, K. (1901). On lines and planes of closest fit to systems of points in space. *Phil. Mag.* 2(11).
- Hotelling, H. (1933). Analysis of a complex of statistical variables into principal components. *J. Educ. Psychol.* 24.
- Page, Brin, Motwani, Winograd (1999). The PageRank citation ranking. Stanford InfoLab.
