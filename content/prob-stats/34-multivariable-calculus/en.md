# Multivariable calculus: gradient, Hessian and Lagrange multipliers

Real models have many parameters: a neural network's loss has millions of variables. This lesson extends derivatives to many variables.

## Partial derivatives and the gradient

A **partial derivative** ∂f/∂xᵢ is the derivative in xᵢ with the others held fixed. The **gradient** `∇f = (∂f/∂x₁, …, ∂f/∂xₙ)` points in the direction of **steepest increase**, with the rate as its length. The **multivariable chain rule** underlies backpropagation.

## The Hessian and classifying critical points

At a critical point (∇f = 0) the **Hessian H** (the matrix of second partial derivatives, `Hᵢⱼ = ∂²f/∂xᵢ∂xⱼ`) describes the curvature:

- All eigenvalues of H **positive** (H positive definite) ⇒ **minimum**.
- All **negative** ⇒ **maximum**.
- Mixed signs ⇒ a **saddle point**, very common in deep learning.

![Contour lines of a function with a minimum and one with a saddle point](/lessons/prob-stats/34-multivariable-calculus-surface-en.svg)
*Left: closed curves around a minimum. Right: a saddle, rising in one direction and falling in the other.*

## Constrained optimisation: Lagrange multipliers

To maximise f(x, y) subject to g(x, y) = c: at the optimum **∇f is parallel to ∇g**, i.e. `∇f = λ∇g`. The multiplier λ has an economic meaning: the *shadow price* of the constraint, how much the maximum of f rises if the constraint is relaxed by one unit.

Example: maximise utility U = xy with budget x + y = 10 gives x = y = 5, U = 25.

## Professional uses

Allocating an ad budget, portfolio optimisation (Markowitz), model training (gradient plus approximate Hessian), SVM (Lagrange multipliers in the dual problem), maximum entropy.

## References

- Stewart, J. *Calculus*, chapter 14 (Partial derivatives).
- Boyd & Vandenberghe. *Convex Optimization*, chapters 4 and 5.
- Nocedal & Wright. *Numerical Optimization* (Springer).
