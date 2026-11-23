# Positional encoding and multi-head attention

The previous lesson showed attention comparing every pair of tokens. Two pieces remain for a full Transformer: **position** and **multiple heads**.

## Attention doesn't know order

`softmax(QKᵀ/√d)V` operates on a **set**: permuting tokens merely permutes the outputs. "Dog bites man" and "man bites dog" would look alike! We must **inject position information** into the input.

## Sinusoidal positional encoding

`PE(pos, 2i) = sin(pos / 10000^{2i/d})`, `PE(pos, 2i+1) = cos(...)`. Each position gets a unique vector, added to the embedding. Pros: no learning, **extrapolates** to longer sequences, and shifting position corresponds to a linear rotation (easy to learn **relative position**).

![Attention heads look at different parts of the sequence; positional encoding supplies order](/lessons/deep-learning/18-positional-multihead-fig-en.svg)
*Attention heads look at different parts of the sequence; positional encoding supplies order*

Modern variants: **learned position embeddings** (BERT, GPT-2), **RoPE** (rotating Q/K vectors, used in LLaMA), **ALiBi** (distance penalty).

## Multi-head attention

One attention head learns only one kind of relation. **Split `d` into `h` heads** (each `d/h` dims), run attention **in parallel**, concatenate and project linearly. Different heads specialise: syntax, coreference, nearby positions, rare keywords… The compute cost is almost unchanged.

| Tensor | Shape |
|---|---|
| input x | `(n, d)` |
| each head's Q, K, V | `(n, d/h)` |
| attention scores | `(h, n, n)` (**quadratic in length**) |
| output after concat | `(n, d)` |

## The causal mask

A text-generating model (GPT) must not see **future** tokens during training. Set scores at future positions to `−∞` before the softmax (upper triangle) ⇒ weight 0. Bidirectional models (BERT) don't use this mask.

## Quadratic cost

The `n × n` matrix makes memory/time grow with `n²`, the bottleneck for long contexts. Remedies: FlashAttention (blockwise, memory-saving), sparse/windowed attention, KV-cache at inference.

## References

- Vaswani et al. (2017). Attention is all you need. *NeurIPS*.
- Su et al. (2021). RoFormer: rotary position embedding. *arXiv:2104.09864*.
- Dao et al. (2022). FlashAttention. *NeurIPS*.
- Alammar, J. "The Illustrated Transformer".
