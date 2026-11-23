# Logistic regression: predicting probabilities of yes/no outcomes

When y is just 0/1 (pass/fail, buy/not, ill/healthy), linear regression can predict negative probabilities or values above 1. **Logistic regression** models the **probability** p = P(y = 1 | x).

## Odds and the logit

- **Odds** = p/(1 − p): p = 0.8 ⇒ odds 4 ("4 to 1").
- **Logit** = log(odds) ∈ (−∞, +∞).

The model: **logit(p) = β₀ + β₁x₁ + … + β_p x_p**, equivalently

`p = 1 / (1 + e^−(β₀ + β₁x₁ + …))` (the **sigmoid**).

![The logistic regression sigmoid with 0/1 data points](/lessons/prob-stats/26-logistic-regression-logit-en.svg)
*The probability rises with x; the p = 0.5 crossing is the default classification boundary.*

## Fitting and interpretation

Coefficients are found by **maximum likelihood** (lesson 13), with no closed form; use Newton–Raphson (IRLS) or gradient methods. Interpretation: a one-unit rise in xⱼ raises the **log-odds** by βⱼ, i.e. multiplies the odds by **e^βⱼ** (the **odds ratio**). E.g. β = 0.7 ⇒ the odds roughly double.

## Evaluation

- Since the output is a probability, use **log loss**, **AUC–ROC**, accuracy, precision/recall and **calibration curves** thay vì R².
- The 0.5 threshold is not mandatory: choose it by the cost of errors (missing a disease costs more than a false alarm).

## Professional uses

Churn prediction, credit scoring, medicine (disease risk), ad response. It is the basic unit of classification neural networks (a single sigmoid neuron) and the baseline you should try before any complex model.

## References

- Hosmer, Lemeshow, Sturdivant. *Applied Logistic Regression* (Wiley).
- James et al. *An Introduction to Statistical Learning*, chapter 4.
- Cox, D. R. (1958). The regression analysis of binary sequences. *J. Royal Statistical Society B* 20(2).
