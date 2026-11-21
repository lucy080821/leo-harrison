# Probability basics and Bayes' theorem

The real world is full of **uncertainty**: noisy data, imprecise sensors, unpredictable users. **Probability** is the language for reasoning under uncertainty, and the foundation of nearly every ML model.

## Probability

$P(A)\in[0,1]$ measures how likely event $A$ is. Basic rules:

- $P(\text{not }A) = 1 - P(A)$
- $P(A\text{ or }B) = P(A) + P(B) - P(A\text{ and }B)$
- Two **independent** events: $P(A\text{ and }B) = P(A)P(B)$

## Conditional probability

$P(A\mid B)$ is the probability of $A$ **given that $B$ has occurred**:

$$
P(A\mid B) = \frac{P(A\text{ and }B)}{P(B)}
$$

E.g. the probability an email is spam **given that it contains the word "prize"**. A classifier is exactly an estimator of conditional probabilities of the form $P(\text{label}\mid\text{features})$.

## Bayes' theorem

From the definition above:

$$
P(A\mid B) = \frac{P(B\mid A)\,P(A)}{P(B)}
$$

It lets you **reverse the conditioning** and **update beliefs** when new evidence arrives:

| Component | Name | Meaning |
|---|---|---|
| $P(A)$ | **Prior** | Belief before seeing the evidence |
| $P(B\mid A)$ | **Likelihood** | How likely the evidence is if $A$ is true |
| $P(A\mid B)$ | **Posterior** | Belief after seeing the evidence |

### The classic example: testing for a rare disease

A disease has a $1\%$ rate. The test has $99\%$ sensitivity and a $5\%$ false-positive rate. You test positive; what's the probability you **truly** have it?

$$
P(\text{disease}\mid +) = \frac{0.99 \times 0.01}{0.99\times 0.01 + 0.05\times 0.99} = \frac{0.0099}{0.0594}\approx 0.167
$$

Only about **16.7%**. Because the disease is rare, the healthy people with false positives **outnumber** the truly ill. Lesson: **always consider the base rate (prior)**, and this is why accuracy can mislead on imbalanced data.

**Naive Bayes** (ML course) applies exactly this formula to classify text.

## Random variables, expectation and variance

**Expectation** (the long-run average) and **variance** (the spread):

$$
E[X] = \sum_x x\,P(x),\qquad
\mathrm{Var}(X) = E\big[(X - E[X])^2\big] = \sum_x (x-E[X])^2P(x)
$$

For a fair die: $E[X] = \dfrac{1+2+\dots+6}{6} = 3.5$, $\mathrm{Var}(X) = \dfrac{35}{12}\approx 2.9167$. The standard deviation is $\sigma = \sqrt{\mathrm{Var}}$.

Useful properties: $E[aX+b] = aE[X]+b$ and $\mathrm{Var}(aX+b) = a^2\mathrm{Var}(X)$.

## Monte Carlo simulation

When direct calculation is hard, **simulate** many times and count:

```python
rng = np.random.default_rng(0)
rolls = rng.integers(1, 7, size=100_000)
rolls.mean()          # ≈ 3.5  (the Law of Large Numbers)
(rolls == 6).mean()   # ≈ 1/6
```

**Law of Large Numbers**: the more samples, the closer the sample mean gets to the true expectation.

## Covariance and independence

- $\mathrm{Cov}(X,Y) = E[(X-\mu_X)(Y-\mu_Y)]$: whether two variables **vary together**.
- Independent ⇒ uncorrelated, but **not the other way round**.
