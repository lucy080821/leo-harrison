# Attention and the Transformer

The **Transformer** (2017, "Attention Is All You Need") is the architecture behind **most modern AI models**: GPT, BERT, Claude, Gemini, Vision Transformers... It replaces RNNs with the **attention** mechanism: every element of the sequence **looks directly at every other element**, and computation is **parallelizable**.

## The intuition of attention

When translating/understanding "**it**" in "The cat didn't eat because **it** was tired", the model needs to **pay more attention to "the cat"**. Attention lets each word **selectively gather information from other words** with varying degrees of interest.

Picture a **soft lookup** in a dictionary:

- **Query** ($Q$): "what I'm looking for".
- **Key** ($K$): "what I am" (a label to match against).
- **Value** ($V$): "the content I carry".

Match the **query** against every **key** ⇒ weights ⇒ mix the **values** by those weights.

![An illustrative attention matrix: each word attends to the others](/lessons/deep-learning/08-attention-transformer-fig-en.svg)
*An illustrative attention matrix: each word attends to the others*

## Scaled dot-product attention

$$
\text{Attention}(Q,K,V)=\text{softmax}\!\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

Step by step (for $n$ tokens, key size $d_k$):

1. $QK^T$: an $n\times n$ matrix of **compatibility scores** between every pair of tokens.
2. Divide by $\sqrt{d_k}$: prevents huge dot products from **saturating** softmax (gradient ~0).
3. **Row-wise softmax**: each row becomes a distribution (sums to 1) = the **attention weights**.
4. Multiply by $V$: each token = a **weighted average** of the values.

```python
scores = Q @ K.T / np.sqrt(d)
weights = softmax(scores, axis=-1)
out = weights @ V
```

### Self-attention

$Q,K,V$ are all computed from **the same sequence** by learned projections: $Q=XW_Q$, $K=XW_K$, $V=XW_V$. Each token **updates its representation based on every other token**.

### The causal mask

Text-generating models (GPT) **must not look into the future**: set the scores of later positions to $-\infty$ before softmax so their weights are 0.

## Multi-head attention

Run **several attentions in parallel** ("heads"), each with its own projections, then **concatenate**:

$$
\text{MultiHead}=\text{Concat}(\text{head}_1,\dots,\text{head}_h)\,W_O
$$

Each head may learn a different kind of relation (syntax, coreference, nearby positions...).

## Positional encoding

Attention **knows nothing about order** (shuffling words gives the same result). You must **add positional information** to the embeddings. The original used sin/cos:

$$
PE_{(pos,2i)}=\sin\!\left(\frac{pos}{10000^{2i/d}}\right),\qquad
PE_{(pos,2i+1)}=\cos\!\left(\frac{pos}{10000^{2i/d}}\right)
$$

Different frequencies let the model infer **relative distances**. Modern models often use **RoPE** (rotary encoding) or learned positions.

## The Transformer block

```text
  x ─▶ [ Multi-Head Self-Attention ] ─▶ (+x) ─▶ LayerNorm
     ─▶ [ MLP (2-layer dense network) ] ─▶ (+)  ─▶ LayerNorm ─▶ out
```

- A **residual connection** $+x$ around each sub-block: gradients flow well.
- **Layer Normalization** stabilizes training.
- A **position-wise MLP** (often expanding 4× then compressing back, with GELU).
- **Stack** tens to hundreds of blocks.

## Why does the Transformer beat RNNs?

| | RNN/LSTM | Transformer |
|---|---|---|
| Parallelization | **No** (sequential) | **Yes** (all tokens at once) |
| Path between two distant tokens | Through $T$ steps | **One step** (direct attention) |
| Long-range dependencies | Hard | **Good** |
| Cost in length $n$ | $O(n)$ | $O(n^2)$ (the attention matrix) |

The price: **quadratic** cost in context length. Hence much research on efficient attention (FlashAttention, sparse, sliding window).

## Three architecture families

| Family | Examples | Used for |
|---|---|---|
| **Encoder-only** | BERT | Understanding text: classification, search, embeddings |
| **Decoder-only** | GPT, Claude, Llama | **Text generation** (large language models) |
| **Encoder-decoder** | T5, the original translation model | Machine translation, summarization |

## Sample PyTorch code (run outside the browser)

```python
import torch.nn as nn
layer = nn.TransformerEncoderLayer(d_model=256, nhead=8, dim_feedforward=1024, batch_first=True)
encoder = nn.TransformerEncoder(layer, num_layers=6)
y = encoder(x)        # x: (batch, length, 256)
```
