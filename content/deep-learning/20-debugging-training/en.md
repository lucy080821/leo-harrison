# Debugging training: gradient checking and a checklist

A neural network can **run without errors and still be wrong**: no exception, it just learns poorly. Debugging needs a **systematic procedure** (see Karpathy's "A Recipe for Training Neural Networks").

## 1. Gradient checking

When you write backprop yourself, compare the analytic gradient with the **numerical gradient** via central differences:

`∂f/∂w ≈ (f(w+h) − f(w−h)) / 2h`, `h ≈ 1e-5`.

The relative error `‖a−n‖ / (‖a‖+‖n‖)` must be **< 1e-6** (float64). Use it only to *verify* (it's slow), not to train. It is also how you self-test the `autograd` of lesson 10.

![Debugging recipe: gradient checking by finite differences and overfitting a tiny batch](/lessons/deep-learning/20-debugging-training-fig-en.svg)
*Debugging recipe: gradient checking by finite differences and overfitting a tiny batch*

## 2. An ordered checklist

1. **Look at the data**: are images/labels right, any label shift? (Many bugs live here.)
2. **Initial loss** should be ≈ `ln(number of classes)` (regression: ≈ label variance). Far off ⇒ initialisation/label bug.
3. **Overfit a tiny batch** (2–10 samples): loss must go to ≈ 0. If not ⇒ a bug in the model/loss/gradient. **Do this before anything else.**
4. Check **tensor shapes** and the **softmax/mean axes**.
5. **Split correctly** into train/validation; no leakage.
6. Only then **LR, architecture, regularisation**.

## Common bugs

| Symptom | Frequent cause |
|---|---|
| Loss doesn't fall | wrong LR (too big/small), forgot `zero_grad()`, shifted labels, training mode not enabled |
| Loss = NaN | LR too large, `log(0)`, division by 0, NaN in inputs |
| Train good, val bad | overfitting, train/val leakage differences, forgot `eval()` |
| Both bad | too little capacity, too few epochs, wrong data/labels |
| Accuracy equals majority-class rate | model predicts one class (imbalance or not learning) |

## Tools

Log **loss/metric curves** (TensorBoard, Weights & Biases), **per-layer gradient norms**, activation histograms, and **fix seeds** for reproducibility.

## References

- Karpathy, A. (2019). A recipe for training neural networks (blog).
- Stanford CS231n, "Gradient checking" & "Babysitting the learning process".
- Goodfellow, Bengio, Courville. *Deep Learning*, chapter 11 (Practical methodology).
