# Multiple comparisons: when you run many tests

Running **one** test at α = 5% has a 5% chance of a false alarm. Running **20** tests when *nothing is real*, the chance of at least one false "discovery" is 1 − 0.95²⁰ ≈ **64%**. This is the trap when analysing many metrics, customer segments or versions, or when digging through data (*p-hacking*, as the 2016 ASA statement warns).

![Probability of at least one false positive rising fast with the number of tests](/lessons/prob-stats/21-multiple-testing-mult-en.svg)
*With 20 tests at the 5% level there is already about a 64% chance of a false positive.*

## Two error measures

- **FWER** (family-wise error rate): the probability of **at least one** false positive in the whole family.
- **FDR** (false discovery rate): the **expected proportion** of discoveries that are false.

## Corrections

- **Bonferroni**: reject when p ≤ α/m. Controls FWER; simple but very conservative (loses power) when m is large.
- **Holm**: stepwise, controls FWER and is always more powerful than Bonferroni.
- **Benjamini–Hochberg (1995)**: sort p₍₁₎ ≤ … ≤ p₍ₘ₎, find the largest i with `p₍ᵢ₎ ≤ (i/m)·q`, reject the first i hypotheses. Controls FDR at level q; suited to screening many candidates (genes, features, metrics).

For the 10 example p-values: Bonferroni rejects 1, Benjamini–Hochberg (q = 0.05) rejects 2.

## Professional advice

- **Pre-register** the tests you will run.
- Choose **one primary metric**; others are exploratory, reported with a correction.
- Report **everything** you tried, not only what was "significant".

## References

- Benjamini, Y. & Hochberg, Y. (1995). Controlling the false discovery rate. *J. Royal Statistical Society B* 57(1).
- Holm, S. (1979). A simple sequentially rejective multiple test procedure. *Scand. J. Statist.* 6.
- Wasserstein & Lazar (2016). The ASA statement on p-values. *The American Statistician* 70(2).
