# Integrals: area and accumulation

## The idea: add up countless small pieces

To find the **area under the curve** f(x) from a to b, split it into n narrow rectangles of width Δx, add their areas and let n → ∞. This sum is a **Riemann sum** (Bernhard Riemann, 1854), and its limit is the **definite integral**:

`∫ₐᵇ f(x) dx = lim Σ f(xᵢ) Δx`

![Riemann sums of y = x² on [0, 3] with 6 and 24 rectangles](/lessons/prob-stats/14-integrals-riemann-en.svg)
*With more rectangles the sum gets closer to the true area (9).*

More generally: **accumulation**. If f is a *rate*, ∫f is a *total*: pumping rate → water in the tank; velocity → distance; power → energy used.

## The fundamental theorem of calculus

Differentiation and integration are **inverses**. If F′ = f then

`∫ₐᵇ f(x) dx = F(b) − F(a)`

Example ∫₀³ x² dx = [x³/3]₀³ = 9 − 0 = **9**, matching the code output. The theorem links the two halves of calculus discovered by Newton and Leibniz.

## Numerical integration when no nice antiderivative exists

Many functions such as e^(−x²/2) have **no antiderivative in elementary functions**. We compute them by **numerical integration** (trapezoid, Simpson) or tables. This is how the normal probabilities in lesson 6 are computed.

## Link to probability

For a continuous variable the **density** f satisfies ∫ f = 1 and `P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx`. The **expectation** is `E[X] = ∫ x·f(x) dx`. Probability *is* area.

## References

- Stewart, J. *Calculus*, chapters 5 (Integrals) and 7 (Techniques of integration).
- MIT OCW 18.01SC: Definite integrals, Fundamental theorem.
- Riemann, B. (1854). Über die Darstellbarkeit einer Function durch eine trigonometrische Reihe.
- Blitzstein & Hwang, *Introduction to Probability*, chapter 5.
