# Statistical power and sample size for A/B tests

Lesson 16 covered the type I error (α). But what if an effect *is real* and the test is too small to detect it? That is the type II error.

## Power

**Power = 1 − β** = the probability of rejecting H₀ **when H₀ is false** (detecting a real effect). The usual target is 80%. Power depends on four things:

1. **Sample size n** (larger n ⇒ more power).
2. **Effect size** δ (large effects are easier to detect).
3. **Noise** σ (low noise ⇒ high power).
4. **Level α** (larger α ⇒ more power, at the cost of more false positives).

![Two distributions of the test statistic under H₀ and under the alternative, power shaded](/lessons/prob-stats/17-power-sample-size-power-en.svg)
*The green area is power: the chance of crossing the threshold when the effect is real; the red area is the type II error (β).*

## Computing the sample size

To compare two proportions p₁ and p₂ (n per group):

`n = 2·(z_{α/2} + z_β)² · p̄(1 − p̄) / (p₂ − p₁)²`, p̄ = (p₁ + p₂)/2.

Detecting a conversion rate rising from 10% to 12% at α = 0.05 and 80% power needs ≈ **3,800 per group**. Halving the effect ⇒ roughly **4×** the sample (n scales as 1/δ²).

## Professional practice

- **Fix the MDE** (minimum detectable effect) *before* running, by business value rather than by looking at data.
- **Don't stop early when p < 0.05** (peeking inflates false positives); or use sequential testing methods.
- An underpowered test does not "prove there is no effect"; it simply lacks information.

## References

- Cohen, J. (1988). *Statistical Power Analysis for the Behavioral Sciences* (2nd ed.).
- Kohavi, R., Tang, D., Xu, Y. (2020). *Trustworthy Online Controlled Experiments*. Cambridge University Press.
- Diez et al., *OpenIntro Statistics*, §5.4 (Power).
