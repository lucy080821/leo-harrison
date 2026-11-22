# Learning from data: the idea behind machine learning

## Two ways to make a program

- **Traditional programming**: people write **rules** → the machine takes rules + data → produces answers.
- **Machine learning**: people supply **data + answers** → the machine **finds the rules** (called a **model**) → applies them to new data.

Tom Mitchell (*Machine Learning*, 1997) defines it: a program *learns* from experience E with respect to a class of tasks T and performance measure P if its performance at tasks in T, as measured by P, **improves** with experience E.

> Spam filtering: T is classifying mail; E is thousands of labelled emails; P is the fraction classified correctly.

## The components

1. **Data**: pairs (input x, desired output y).
2. **Model**: a function with learnable **parameters**, e.g. ŷ = w·x.
3. **Loss function**: measures how wrong the model is, e.g. **mean squared error (MSE)**: (1/n) Σ (ŷ − y)².
4. **Optimiser**: adjusts parameters to reduce the loss, most commonly **gradient descent**: w ← w − η · ∂L/∂w, with η the learning rate.

The loop: predict → measure error → adjust parameters → repeat.

## Basic taxonomy

- **Supervised learning**: labels y available (regression, classification).
- **Unsupervised learning**: no labels (clustering).
- **Reinforcement learning**: learning from rewards while interacting.

## Generalisation and overfitting

The goal is not to memorise training data but to **generalise** to unseen data. A model that is too complex may **overfit**: good on training data, poor on new data. That is why data are split into training and test sets.

## Where next

The **Math for ML**, **Machine Learning** and **Deep Learning** courses continue from this idea. Backpropagation (Rumelhart, Hinton, Williams, 1986) and the Transformer (Vaswani et al., 2017) are two milestones of deep learning.

## References

- Mitchell, T. M. (1997). *Machine Learning*. McGraw-Hill.
- Hastie, Tibshirani, Friedman. *The Elements of Statistical Learning*.
- Rumelhart, Hinton, Williams (1986). Learning representations by back-propagating errors. *Nature* 323, 533–536.
- Vaswani et al. (2017). Attention Is All You Need. *NeurIPS*.
- Goodfellow, Bengio, Courville. *Deep Learning* (MIT Press).
