# Loss functions: softmax, cross-entropy and numerical stability

The loss is the **only yardstick** the network sees while learning. A wrong loss means perfect optimisation still gives wrong results.

## Classification: softmax + cross-entropy

**Softmax** turns a vector of raw scores (logits) into probabilities: `p_i = e^{z_i} / Σ_j e^{z_j}` (positive, summing to 1).

**Cross-entropy**: `L = −log p_true`. A correct and confident prediction (p→1) gives loss ≈ 0; a **wrong and confident** one (p→0) gives unbounded loss. It is exactly the *maximum-likelihood* objective of a classifier.

![Softmax turns raw scores into probabilities; cross-entropy punishes confident mistakes](/lessons/deep-learning/12-loss-functions-softmax-fig-en.svg)
*Softmax turns raw scores into probabilities; cross-entropy punishes confident mistakes*

## Numerical stability

`e^{1000}` overflows. Subtracting `max(z)` before exponentiating **doesn't change the result** but is safe. In practice use fused functions (`log_softmax`, `CrossEntropyLoss` taking *logits*) instead of computing `log(softmax(...))` yourself.

## A surprisingly neat gradient

For softmax + cross-entropy: `∂L/∂z = p − y_onehot` (divide by N when averaging a batch). Clean and non-saturating, which is why this pair is everywhere.

## Pick the loss by problem

| Problem | Output | Loss |
|---|---|---|
| Binary classification | sigmoid | binary cross-entropy |
| Multi-class (one label) | softmax | cross-entropy |
| Multi-label | sigmoid per label | BCE per label |
| Regression | linear | **MSE** (outlier-sensitive), **MAE**, **Huber** (a balance) |
| Imbalanced classes | | weighted cross-entropy, focal loss |

## Tips

- **Label smoothing** (target 0.9 instead of 1) reduces overconfidence.
- The initial loss should be ≈ `log(number of classes)` with sane initialisation (3 classes ⇒ ≈ 1.10): use it as a **sanity check**.
- The loss is **not** the business metric: still measure accuracy/F1/AUC.

## References

- Goodfellow, Bengio, Courville. *Deep Learning*, sections 6.2 and 3.
- Szegedy et al. (2016). Rethinking the Inception architecture (label smoothing). *CVPR*.
- Lin et al. (2017). Focal loss for dense object detection. *ICCV*.
