# Vectors and matrices

## Vectors

A **vector** is an ordered list of numbers, both a point and an *arrow* with direction and length. In data, a vector is *an object described by many features*: a customer (age, income, purchases), an image (thousands of pixels), a word (an embedding).

Two basic operations: adding vectors and scaling by a number. The **length (norm)** is `‖v‖ = √(v₁² + v₂² + …)`.

## The dot product and similarity

`u · v = u₁v₁ + u₂v₂ + … = ‖u‖‖v‖ cos θ`

θ is the angle between the vectors. Hence **cosine similarity** = cos θ ∈ [−1, 1] measures how much two vectors "point the same way", regardless of magnitude. Movie recommenders and semantic search use exactly this idea.

![Three user vectors: An and Binh point the same way, Chi differs](/lessons/prob-stats/36-vectors-matrices-vec-en.svg)
*A small angle between An and Binh ⇒ high cosine (similar taste); Chi is far off.*

## Matrices

A **matrix** is a rectangular table of numbers; each row (or column) is a vector. An m×n matrix A **transforms** an n-dimensional vector into an m-dimensional one: `y = A x`. The product of two matrices is the **composition** of the two transformations (and in general `AB ≠ BA`).

Geometrically a matrix can rotate, scale, reflect or shear the whole plane.

![A matrix turning the unit square into a parallelogram](/lessons/prob-stats/36-vectors-matrices-matrix-en.svg)
*The matrix [[2,1],[0,1]] stretches and shears the plane.*

## Systems of linear equations

`2x + y = 5, x − y = 1` is written compactly as `A x = b`. If A is invertible then `x = A⁻¹ b`. Gauss–Jordan elimination solves it; `numpy.linalg.solve` does the work. Applications: balancing electrical networks, traffic flow, least-squares regression.

> Gilbert Strang (MIT 18.06) suggests reading `A x` by columns: it is a *linear combination of the columns of A* with coefficients x. This view explains most of linear algebra.

## References

- Strang, G. *Introduction to Linear Algebra* (Wellesley-Cambridge Press); MIT OCW 18.06.
- Axler, S. *Linear Algebra Done Right*.
- 3Blue1Brown, *Essence of Linear Algebra* (video series).
- Harris et al. (2020). Array programming with NumPy. *Nature* 585.
