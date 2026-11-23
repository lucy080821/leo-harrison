# Estimation and confidence intervals

## From sample to population

We rarely measure a whole **population**, so we take a **sample** and infer. A value computed from a sample (such as x̄ or a proportion p̂) is a **point estimate** of the true parameter (μ or p). Another sample gives another estimate, so we must state our *uncertainty*.

The sample must be **random**; a skewed sample (e.g. asking only web users) creates **bias** that a larger sample cannot cure. The 1936 *Literary Digest* poll mailed over 2 million ballots yet mispredicted the US election because of a biased sample.

## Confidence intervals

By the CLT, p̂ is approximately normal with standard error **SE = √(p̂(1 − p̂) / n)**. The **95% confidence interval** is:

`p̂ ± 1.96 · SE`

The number 1.96 is the z-value enclosing 95% in the middle of the normal distribution.

![20 confidence intervals from 20 different samples around the true value](/lessons/prob-stats/14-confidence-intervals-ci-en.svg)
*Most intervals contain the true value (dashed line); the red one misses.*

### Reading "95%" correctly

If you repeated the sampling and built an interval each time, **about 95% of the intervals** would contain the true parameter. This is a property of the *method*; it does **not** mean "a 95% probability that the parameter lies in this particular interval" (in the frequentist view the parameter is fixed, not random).

## Real-world example: the margin of error

Poll of 1,000 people, p̂ = 0.52: SE ≈ 0.0158, interval ≈ [0.489, 0.551]. The "margin of error ±3%" seen in news is 1.96·SE in the worst case p = 0.5. Since SE scales as 1/√n, halving the error needs four times the sample.

## References

- Diez et al., *OpenIntro Statistics*, chapter 5 (Foundations for inference), §5.2.
- Blitzstein & Hwang, *Introduction to Probability*, chapter 10 and inference material.
- Squire, P. (1988). Why the 1936 Literary Digest poll failed. *Public Opinion Quarterly* 52(1).
- Neyman, J. (1937). Outline of a theory of statistical estimation based on the classical theory of probability.
