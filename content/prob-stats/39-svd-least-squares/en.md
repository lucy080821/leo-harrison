# SVD, low-rank approximation and least squares

The **singular value decomposition (SVD)** is one of the most powerful tools of applied linear algebra. Every matrix A (not necessarily square) can be written:

`A = U Σ Vᵀ`

U and V have **orthonormal** columns; Σ is diagonal with the **singular values** σ₁ ≥ σ₂ ≥ … ≥ 0. Geometrically: A **rotates (Vᵀ), stretches (Σ), then rotates (U)**.

## Low-rank approximation (Eckart–Young)

Keeping the k largest singular values, `A_k = Σᵢ₌₁ᵏ σᵢ uᵢ vᵢᵀ`, is the **best rank-k approximation** in the Frobenius norm, with error = √(sum of squared dropped σ). Real data usually has a few large singular values and many small ones: most information lives in few dimensions.

![Singular values of a matrix and approximation accuracy by rank](/lessons/prob-stats/39-svd-least-squares-svd-en.svg)
*The first few singular values carry most of the information; keeping few dimensions already reconstructs the matrix closely.*

## Professional uses

- **Image and data compression**: store k·(m + n + 1) numbers instead of m·n.
- **Recommender systems**: a user × movie matrix ≈ the product of "user tastes" and "movie traits" (the Netflix Prize used this idea).
- **PCA** (lesson 38) is computed through the SVD of mean-centred data.
- **Denoising, LSA** in text processing, **LoRA** in fine-tuning large models (low-rank updates).

## Least squares and the pseudoinverse

When Ax = b has no solution (more equations than unknowns, as in regression), we find x minimising ‖Ax − b‖²: the solution `x = A⁺b` with the **Moore–Penrose pseudoinverse** `A⁺ = V Σ⁺ Uᵀ` (invert the nonzero σ). This is how `np.linalg.lstsq` and `np.linalg.pinv` work, numerically more stable than the normal equations `(XᵀX)⁻¹Xᵀy` when XᵀX is nearly singular (lesson 37).

## References

- Strang, G. *Linear Algebra and Learning from Data* (Wellesley-Cambridge, 2019); MIT OCW 18.065.
- Eckart, C. & Young, G. (1936). The approximation of one matrix by another of lower rank. *Psychometrika* 1.
- Koren, Bell, Volinsky (2009). Matrix factorization techniques for recommender systems. *Computer* 42(8).
