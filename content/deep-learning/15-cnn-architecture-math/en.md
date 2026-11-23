# CNN arithmetic: output size, parameters and receptive field

When designing or debugging a CNN you must be able to **compute tensor shapes and parameter counts** per layer. "Shape mismatch" is the commonest beginner error.

## Output size

For input width `W`, kernel `K`, padding `P`, stride `S`:

`W_out = ⌊(W − K + 2P) / S⌋ + 1`

- `K=3, P=1, S=1`: **keeps** the size ("same").
- `K=2, S=2` (pooling): **halves** it.
- `K=7, P=3, S=2` (ResNet's first layer): 224 → 112.

![Output size and parameter count of a convolution layer](/lessons/deep-learning/15-cnn-architecture-math-fig-en.svg)
*Output size and parameter count of a convolution layer*

## Counting parameters

Conv layer: `c_out × (c_in × K × K + 1)` (+1 is the bias). Crucially it **doesn't depend on the image size**, thanks to **weight sharing**: the same filter scans the whole image.

Compare: a dense layer from a 32×32×3 image to a 32×32×16 output needs **~50 million** parameters, whereas a 3×3 conv needs just **448**. That is why CNNs are efficient: **locality** and **translation invariance**.

## Pooling

Max pooling keeps the largest value per window: shrinks size, adds invariance to small shifts, has **no parameters**. Modern architectures often replace it with a stride-2 conv.

## Receptive field

How many original pixels does a neuron "see"? Each layer `K, S` adds `(K−1) × (product of earlier strides)`. Three stacked 3×3 convs have a 7×7 field (equal to one 7×7 conv but with **fewer parameters and more non-linearity**, VGG's idea). Stacking layers and pooling lets deep neurons see **large objects**.

## Design advice

- Shrink spatial size gradually, **grow channels** (32 → 64 → 128).
- Count parameters with `model.summary()` / `sum(p.numel())` to check.
- Prefer **transfer learning** over designing from scratch.

## References

- Dumoulin & Visin (2016). A guide to convolution arithmetic for deep learning. *arXiv:1603.07285*.
- Simonyan & Zisserman (2015). Very deep convolutional networks (VGG). *ICLR*.
- He et al. (2016). Deep residual learning for image recognition. *CVPR*.
- Stanford CS231n, "Convolutional Neural Networks".
