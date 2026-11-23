# Taylor series: approximating complicated functions with polynomials

Polynomials are easy to compute, differentiate and integrate. The **Taylor series** (Brook Taylor, 1715) lets us replace a smooth function with a polynomial around a point a:

`f(x) ≈ f(a) + f′(a)(x − a) + f″(a)/2!·(x − a)² + f‴(a)/3!·(x − a)³ + …`

When a = 0 it is called the **Maclaurin series**.

## Series to remember

- `eˣ = 1 + x + x²/2! + x³/3! + …` (valid for all x)
- `sin x = x − x³/3! + x⁵/5! − …`
- `ln(1 + x) = x − x²/2 + x³/3 − …` (for |x| < 1)

![Taylor approximations of sin x by polynomials of degree 1, 3, 5](/lessons/prob-stats/33-taylor-series-taylor-en.svg)
*Polynomials hug the curve near x = 0 and drift away farther out; more terms widen the accurate region.*

More terms improve the approximation **near a**; far from a it fails quickly. The remaining error is bounded by the next term (the Lagrange remainder).

## Professional uses

- **First-order (linear) approximation**: `ln(1 + r) ≈ r` for small returns r: at r = 1% the two differ by only ≈ 0.005%; at r = 20% the gap is large. It justifies adding log returns over time.
- **Second-order approximation**: optimisation uses the second-order expansion around the current point (Newton's method, the Hessian) and bond **convexity**.
- **Machine learning**: gradient descent uses the first-order approximation of the loss; Newton and second-order methods use the second; the Laplace approximation in Bayesian methods.
- The **delta method** in statistics: Var(g(X̄)) ≈ g′(μ)²·Var(X̄).

## References

- Stewart, J. *Calculus*, chapter 11 (Infinite sequences and series).
- MIT OCW 18.01SC: Taylor's formula.
- Boyd & Vandenberghe. *Convex Optimization*, §9.5 (Newton's method).
