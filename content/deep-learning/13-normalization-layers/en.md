# Normalisation: BatchNorm and LayerNorm

When earlier layers change, **the input distribution of later layers drifts too** (*internal covariate shift*, BatchNorm's original hypothesis). Normalisation keeps activations on a stable scale, permitting **higher learning rates** and **faster, steadier** training.

## Two variants

| | **BatchNorm** | **LayerNorm** |
|---|---|---|
| Statistics over | the whole **batch**, per feature (column) | **each sample**, across features (row) |
| Depends on batch size | **yes** (poor with small batches) | no |
| Train differs from inference | **yes** (uses running mean/variance) | no |
| Common in | vision CNNs | **Transformers**, RNNs, NLP |

![BatchNorm normalises across the batch; LayerNorm normalises each sample](/lessons/deep-learning/13-normalization-layers-fig-en.svg)
*BatchNorm normalises across the batch; LayerNorm normalises each sample*

## The formula

`x̂ = (x − μ) / √(σ² + ε)`, then `y = γ·x̂ + β`. `γ` and `β` are **learned** so the network can *undo* the normalisation if needed.

## BatchNorm at inference

There is no batch to compute statistics from (maybe a single sample), so it uses **running (moving-average) mean/variance** accumulated during training. Forgetting `model.eval()` is a classic bug giving wrong inference results.

## Side effects

BatchNorm has a mild **regularising** effect (noise from batch statistics). Later work argues the main benefit is **smoothing the loss landscape** (Santurkar et al., 2018), not just reducing covariate shift.

## When to use which

- CNNs with large enough batches (≥ 16–32): BatchNorm (or GroupNorm for small batches).
- Transformers, sequences, small batches: LayerNorm (or RMSNorm in modern LLMs).

## References

- Ioffe & Szegedy (2015). Batch Normalization. *ICML*.
- Ba, Kiros, Hinton (2016). Layer Normalization. *arXiv:1607.06450*.
- Santurkar et al. (2018). How does batch normalization help optimization? *NeurIPS*.
