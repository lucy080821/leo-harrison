# Differential equations: modelling change over time

Many phenomena are described by **rates of change**, not values: a population grows at a rate proportional to its size; a drug leaves the blood at a rate proportional to its concentration. A **differential equation** links a function y(t) to its derivative.

## Exponential growth and decay

`dy/dt = k·y` has solution `y(t) = y₀·e^(kt)`.

- k > 0: growth (continuous compounding, early spread).
- k < 0: decay; the **half-life** is `t½ = ln 2 / |k|`. A drug with t½ = 6 hours is down to 1/4 after 12 hours.

## Logistic growth

Nothing grows forever. The logistic model (Verhulst, 1838):

`dP/dt = r·P·(1 − P/K)`

grows nearly exponentially at first then saturates at the **carrying capacity K**: an S-shaped curve. Used for market penetration, populations, product adoption.

![Exponential growth versus logistic growth saturating at the capacity K](/lessons/prob-stats/35-ode-ode-en.svg)
*Exponential grows without bound; logistic is S-shaped and levels off at K = 1000.*

## Numerical method: Euler

Most equations have no closed form. **Euler** walks in small steps h along the current slope: `yₙ₊₁ = yₙ + h·f(tₙ, yₙ)`. Smaller steps are more accurate but cost more; better methods (Runge–Kutta) sample several points per step. `scipy.integrate.solve_ivp` does this.

## Professional uses

Pharmacokinetics (drug concentration), epidemiology (the SIR model), finance (pricing, interest-rate models), control engineering, product-adoption models. "Neural ODEs" treat network layers as Euler steps.

## References

- Strogatz, S. *Nonlinear Dynamics and Chaos* (Westview).
- Stewart, J. *Calculus*, chapter 9 (Differential equations).
- Kermack, W. O. & McKendrick, A. G. (1927). A contribution to the mathematical theory of epidemics. *Proc. R. Soc. A* 115.
