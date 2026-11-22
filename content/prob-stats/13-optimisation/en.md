# Optimisation, partial derivatives and the gradient

## Finding extrema with derivatives

If f has a maximum or minimum at x (and f is differentiable), then **f′(x) = 0** (Fermat's theorem). Solve f′(x) = 0 for **critical points**; the **second derivative** f″ classifies them: f″ < 0 is a maximum, f″ > 0 a minimum.

### Real-world example: the best selling price

Demand q = 100 − 2p, unit cost 10. Profit L(p) = (p − 10)(100 − 2p) = −2p² + 120p − 1000. L′(p) = −4p + 120 = 0 ⇒ **p = 30**, L(30) = 800 and L″ = −4 < 0 so it is a maximum. A higher price sells fewer units; a lower price leaves a thin margin. The derivative finds the balance.

![Profit parabola against price, peaking at p = 30](/lessons/prob-stats/13-optimisation-profit-en.svg)
*At the peak the tangent is horizontal (L′ = 0): that is the optimal price.*

## Several variables: partial derivatives

Real models have many parameters. The **partial derivative** ∂f/∂x is the derivative with respect to x, treating other variables as constants. The **gradient** ∇f is the vector of partial derivatives:

`∇f = (∂f/∂x, ∂f/∂y, …)`

The gradient points in the direction of **steepest increase** of f; conversely −∇f is the direction of steepest decrease.

## Gradient descent

The iterative algorithm: `θ ← θ − η · ∇f(θ)`, with η the **learning rate**. Augustin-Louis Cauchy proposed the method in 1847. It is the core training algorithm of nearly every Machine Learning and Deep Learning model: parameters θ are adjusted so the **loss function** keeps decreasing.

- η too large: overshoots the minimum, may diverge.
- η too small: converges very slowly.
- For non-convex functions it may get stuck in a local minimum.

![Contour lines of f(x,y) and the gradient-descent path to the minimum](/lessons/prob-stats/13-optimisation-gd-en.svg)
*Each step follows −∇f, perpendicular to the contour lines.*

## References

- Stewart, J. *Calculus*, chapters 4 (Applications of differentiation) and 14 (Partial derivatives).
- Boyd, S. & Vandenberghe, L. *Convex Optimization* (Cambridge University Press), chapter 9.
- Cauchy, A.-L. (1847). Méthode générale pour la résolution des systèmes d'équations simultanées. *C. R. Acad. Sci.* 25.
- Goodfellow, Bengio, Courville. *Deep Learning*, chapter 4 (Numerical computation).
