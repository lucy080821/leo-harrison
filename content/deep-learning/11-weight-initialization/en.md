# Weight initialisation: Xavier, He and vanishing gradients

A deep network **cannot learn** if the signal *fades* or *explodes* as it passes through layers, however good the optimiser. The initial weights decide that.

## The problem

Each layer multiplies by a matrix W. If W's variance is too small, activation magnitudes **shrink exponentially** with depth (vanishing gradients); too large and they **explode**. Either stalls training or yields NaN.

![Activation std across layers under three initialisations](/lessons/deep-learning/11-weight-initialization-fig-en.svg)
*Activation std across layers under three initialisations*

## Keeping the variance stable

For `y = Σ w·x` over `n_in` independent inputs: `Var(y) = n_in · Var(w) · Var(x)`. To get `Var(y) = Var(x)` ⇒ `Var(w) = 1/n_in`.

| Method | `Var(w)` | Use with |
|---|---|---|
| **Xavier/Glorot** | `2/(n_in + n_out)` or `1/n_in` | tanh, sigmoid |
| **He/Kaiming** | `2/n_in` | **ReLU** (ReLU zeroes half the outputs so it needs double) |
| Too small (0.01) | fixed | signal dies in deep nets |
| **All zeros** | 0 | neurons stay **identical** (symmetry), never diverge |

## Why zero initialisation fails

All neurons in a layer get the same gradient so they **stay equal**: a 256-neuron layer behaves like 1. **Random** initialisation breaks the symmetry. (Biases may start at 0.)

## Complementary tools

Today correct initialisation is usually combined with **batch/layer normalisation**, **residual connections** and adaptive optimisers (Adam), letting networks with hundreds of layers train. PyTorch/Keras set sensible defaults (Keras: Glorot; `kaiming_normal_` for ReLU).

## References

- Glorot & Bengio (2010). Understanding the difficulty of training deep feedforward neural networks. *AISTATS*.
- He, Zhang, Ren, Sun (2015). Delving deep into rectifiers. *ICCV*.
- Goodfellow, Bengio, Courville. *Deep Learning*, section 8.4.
