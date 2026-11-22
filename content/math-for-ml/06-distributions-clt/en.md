# Probability distributions and the central limit theorem

A **probability distribution** describes the **likelihood** of each value a random variable can take. Choosing the right distribution is the core of statistical modelling.

## The normal (Gaussian) distribution

Bell-shaped, determined by its mean $\mu$ and standard deviation $\sigma$:

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}}\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

**The 68-95-99.7 rule:** $\mu\pm\sigma$ contains ~68%, $\mu\pm2\sigma$ ~95%, $\mu\pm3\sigma$ ~99.7% of the data.

```python
from scipy import stats
stats.norm.cdf(1) - stats.norm.cdf(-1)     # 0.6827
stats.norm.ppf(0.975)                       # 1.96: the z-value for a 95% confidence interval
```

- `cdf(x)`: $P(X\le x)$ (the cumulative distribution function).
- `ppf(q)`: the inverse of `cdf` (quantile).
- **The z-score** $z = (x-\mu)/\sigma$ maps any normal distribution to $N(0,1)$.

The normal distribution appears everywhere; why? Because of the **CLT** (below).

![The binomial approaches the normal curve as n grows](/lessons/math-for-ml/06-distributions-clt-fig-en.svg)
*The binomial approaches the normal curve as n grows*

## Common distributions

| Distribution | Description | Example |
|---|---|---|
| **Bernoulli**($p$) | One trial, success/failure | Does a customer buy? |
| **Binomial**($n,p$) | Number of successes in $n$ trials | Buyers among 100 customers |
| **Poisson**($\lambda$) | Count of rare events in an interval | Calls per minute |
| **Uniform** | Every value equally likely | A random number |
| **Exponential**($\lambda$) | Waiting time between events | Time between two customers |
| **Normal**($\mu,\sigma^2$) | Bell-shaped | Height, measurement error |

Binomial: $P(X=k) = \binom{n}{k}p^k(1-p)^{n-k}$. For 10 coin tosses, $P(X=3) = \binom{10}{3}/2^{10} = 120/1024 \approx 0.1172$.

## The Central Limit Theorem (CLT)

> The average of **many** independent random variables (whatever the original distribution) is **approximately normally distributed**.

More precisely: for $n$ independent samples with mean $\mu$ and standard deviation $\sigma$, the sample mean $\bar X$ satisfies

$$
\bar X \approx N\!\left(\mu,\ \frac{\sigma^2}{n}\right),\qquad \text{standard deviation of }\bar X = \frac{\sigma}{\sqrt{n}}
$$

For the exponential($\lambda=1$) with $\mu=\sigma=1$ and $n=50$: the standard deviation of the mean $=1/\sqrt{50}\approx0.141$ (exactly what you'll measure in the exercise).

Why it matters: thanks to the CLT we can compute **confidence intervals** and **hypothesis tests** for means without knowing the original distribution. And $\sigma/\sqrt n$ shows that **to cut the error 10×, you need 100× more samples**.

## Maximum likelihood estimation (MLE)

Given data and a model with parameters $\theta$, **MLE** chooses the $\theta$ that makes the observed data **most probable**:

$$
\hat\theta = \arg\max_\theta \prod_{i}P(x_i\mid\theta) = \arg\max_\theta \sum_i \log P(x_i\mid\theta)
$$

(We take logs so the sum is easier and numerically stable.)

- For the normal distribution, MLE gives $\hat\mu = \bar x$ and $\hat\sigma^2 = \frac1n\sum(x_i-\bar x)^2$.
- **Linear regression with normal errors ⇔ minimizing MSE.**
- **Logistic regression** minimizing **cross-entropy** is the MLE of a Bernoulli.

Many ML loss functions are really a **negative log-likelihood**.

## Sampling with NumPy

```python
rng = np.random.default_rng(42)
rng.normal(0, 1, 1000)
rng.binomial(10, 0.5, 1000)
rng.choice(items, size=5, replace=False)
```
