# Interpreting models: permutation importance and partial dependence

Your boss, a doctor, a regulator asks: *"Why did the model decide that?"* A powerful but **unexplainable** black box is a deployment barrier (and sometimes a legal one).

## Levels of explanation

| Level | Question | Tools |
|---|---|---|
| **Global** | Which features matter most? | coefficients, tree importance, **permutation importance** |
| **Global** | *How* does a feature affect predictions? | **partial dependence (PDP)**, ICE |
| **Local** | Why *this* prediction? | SHAP, LIME |

![Permutation importance: shuffle one feature and measure the performance drop](/lessons/machine-learning/19-model-interpretation-fig-en.svg)
*Permutation importance: shuffle one feature and measure the performance drop*

## Permutation importance

1. Measure the baseline score on the **test set**.
2. **Shuffle one column** (breaking its link to the label) and score again.
3. The **drop** in score = that column's importance. Repeat several times to get a spread.

Pros: works for **any model** and measures real performance rather than internal structure. Tree-based importance is biased toward continuous/high-cardinality features and is computed on the training set.

## Partial dependence

Vary one feature over a grid, keep the others as they are (averaging), and plot the mean prediction. It reveals the shape of the effect: linear, saturating, thresholded. `PartialDependenceDisplay.from_estimator`.

## Important limits

- **Correlated features**: shuffling one column creates unrealistic points, and importance is shared/stolen between them.
- **Importance ≠ causation**: a feature important for *prediction* need not be a cause.
- Explanations can be **unstable** across models/samples: check over repeated runs.
- When explanation is paramount, a **simple model** (regression, shallow tree) is often the better choice (Rudin, 2019).

## References

- Breiman, L. (2001). Random forests. *Machine Learning* 45.
- Molnar, C. *Interpretable Machine Learning* (free online).
- Rudin, C. (2019). Stop explaining black box models for high stakes decisions. *Nature Machine Intelligence* 1.
- scikit-learn User Guide, "Inspection".
