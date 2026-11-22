# Limits and derivatives

## The problem: speed at one instant

A car going 100 km in 2 hours has an **average** speed of 50 km/h. But the speedometer shows the **instantaneous** speed each second. How do we define speed at *one* moment when the time interval is zero? Newton and Leibniz (17th century) found differential calculus to answer this.

## Limits

A **limit** `lim_{h→0} g(h) = L` means g(h) can be made as close to L as we like by taking h close enough to 0 (without needing h = 0). The rigorous ε–δ definition was completed by Cauchy and Weierstrass in the 19th century.

## The derivative

The **derivative** of f at x is the limit of the *slope of the secant line*:

`f′(x) = lim_{h→0} [f(x + h) − f(x)] / h`

Geometrically it is the **slope of the tangent line**; physically, the **instantaneous rate of change**. If s(t) is distance, s′(t) is velocity.

![Curve y = x² with secant lines shrinking to the tangent at x = 3](/lessons/prob-stats/12-derivatives-tangent-en.svg)
*As h → 0 the secant slope approaches the tangent slope = f′(3) = 6.*

## Rules to remember

| Function | Derivative |
|---|---|
| constant c | 0 |
| xⁿ | n·xⁿ⁻¹ |
| eˣ | eˣ |
| ln x | 1/x |
| sin x, cos x | cos x, −sin x |
| f + g | f′ + g′ |
| c·f | c·f′ |
| f·g | f′g + fg′ (product rule) |
| f(g(x)) | f′(g(x))·g′(x) (chain rule) |

Example: s(t) = t² gives s′(t) = 2t; at t = 3, velocity = 6 m/s, matching the numbers above approaching 6 as h → 0.

## Real-world examples

- **Economics**: *marginal cost* is the derivative of total cost with respect to output.
- **Medicine**: the rate a drug leaves the blood is the derivative of its concentration over time.
- **Machine Learning**: derivatives tell which way to adjust parameters to reduce error (next lesson).

## References

- Stewart, J. *Calculus* (Cengage), chapter 2 (Limits and derivatives).
- MIT OCW 18.01 *Single Variable Calculus* (Jerison), lectures on derivatives and the chain rule.
- Khan Academy, *Differential Calculus*.
- Strang, G. *Calculus* (MIT OpenCourseWare).
