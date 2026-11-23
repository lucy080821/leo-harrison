# Linear systems: Gaussian elimination, rank and conditioning

Many real problems reduce to **Ax = b**: balancing flows, blending ingredients, electrical networks, least-squares regression.

## Gaussian elimination

**Row operations** (swap, scale, add a multiple of another row) reduce the matrix to echelon form, then back-substitute. Cost O(n³). **LU factorisation** (A = LU) stores the elimination so many right-hand sides b can be solved fast. NumPy does this in `np.linalg.solve`; **don't compute A⁻¹ and multiply** (slower and less accurate).

## Rank and the cases

The **rank** = number of linearly independent rows (or columns). For an n × n matrix A:

| Rank | Result |
|---|---|
| n (invertible, det ≠ 0) | **unique** solution |
| < n and b in the column space | **infinitely many** solutions |
| < n and b outside the column space | **no** solution |

Gilbert Strang suggests reading `Ax` as a *linear combination of the columns*; Ax = b is solvable when b is a combination of the columns.

![Three cases of a 2-equation system: intersecting, parallel, coincident](/lessons/prob-stats/37-linear-systems-linsys-en.svg)
*Unique, no and infinitely many solutions correspond to the relative position of the two lines.*

Geometrically (2 unknowns): each equation is a line; the solution is the intersection. Two lines meet (unique), are parallel (none) or coincide (infinite).

## The condition number

A **nearly singular** system gives solutions extremely sensitive to data error. A large `cond(A)` (10⁸ or more with 64-bit floats) warns that the solution may lose many digits of accuracy. In statistics this is **multicollinearity** (lesson 24): the columns of X are nearly dependent.

## Professional uses

Input–output economics (Leontief), diet/blend problems, electrical-network calculations, positioning, and the core of linear regression.

## References

- Strang, G. *Introduction to Linear Algebra* (5th ed.), chapters 2–3; MIT OCW 18.06.
- Trefethen, L. & Bau, D. *Numerical Linear Algebra* (SIAM).
- Golub, G. & Van Loan, C. *Matrix Computations*.
