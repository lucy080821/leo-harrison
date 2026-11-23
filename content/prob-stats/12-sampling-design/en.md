# Sampling design: who to ask and which biases to avoid

Conclusions from a sample are only trustworthy if **the sample is chosen well**. A bigger sample does *not* fix a biased one.

## Ways to sample

- **Simple random sample (SRS)**: every group of n people is equally likely to be chosen. The basis of the theory.
- **Stratified sample**: split the population into homogeneous strata (region, age band), sample within each and combine with weights. Reduces variance when strata differ a lot.
- **Cluster sample**: randomly choose *whole groups* (schools, districts) and survey everyone in them. Cheaper but less precise.
- **Systematic sample**: take every k-th person on a list.

![Four sampling methods illustrated on a grid of individuals](/lessons/prob-stats/12-sampling-design-sample-en.svg)
*Dark dots are the selected individuals: random, stratified, cluster, systematic.*

## Sources of bias

1. **Selection**: the sampling frame misses a group (asking only web users).
2. **Non-response**: responders differ from non-responders.
3. **Self-selection**: voluntary surveys attract people with strong opinions.
4. **Measurement**: leading questions or faulty memory.

The 1936 *Literary Digest* poll (over 2 million ballots) failed because of a biased frame, while Gallup's smaller but random sample was right.

## Sample size for a proportion survey

The margin of error `e = z·√(p(1 − p)/n)` gives `n = z²·p(1 − p)/e²`. With p = 0.5 (worst case): a ±3% margin at 95% confidence needs n ≈ **1,068**, almost independent of the population size (when the sample is small relative to it).

## References

- Lohr, S. *Sampling: Design and Analysis* (CRC Press).
- Diez et al., *OpenIntro Statistics*, chapters 1 (Sampling) and 5.
- Squire, P. (1988). Why the 1936 Literary Digest poll failed. *Public Opinion Quarterly* 52(1).
