# Large language models (LLMs): training and generation

An **LLM** (Large Language Model) is a **decoder-only** Transformer with tens to hundreds of **billions of parameters**, trained on vast amounts of text to **predict the next token**. From that simple task, abilities like writing, translating, coding and reasoning **emerge**.

## The training lifecycle

```text
 1. Pretraining  ──▶  2. Instruction fine-tuning  ──▶  3. Alignment (RLHF/DPO)
   (knowledge, language)     (follow requests)             (helpful, safe)
```

### 1. Pretraining

Learn to **predict the next token** on trillions of tokens (books, web, code):

$$
L=-\sum_t\log P_\theta(w_t\mid w_{<t})
$$

It's **self-supervised learning**: the label is simply the next piece of text, **no manual labelling**. It costs thousands of GPUs for weeks. The result is a **base model** that knows a lot but doesn't yet "follow requests".

**Scaling laws:** performance improves **steadily as a power law** with more **parameters, data and compute**. That's the motivation behind investing in ever-larger models.

### 2. Instruction fine-tuning (SFT)

Continue training on **tens of thousands of (request → good answer) pairs** written by people so the model **learns to converse** and follow instructions.

### 3. Alignment with human preferences (RLHF, DPO)

Humans **compare answers** (A is better than B). Learn a **reward model** then use **reinforcement learning** (or **DPO**, more direct) so the model prefers helpful, honest, safe answers.

## Generating text: choosing the next token

At each step the model outputs **logits** $z_i$ for every token in the vocabulary; $\text{softmax}$ turns them into probabilities. How you **choose** shapes the output's character.

### Temperature

$$
P_i=\frac{e^{z_i/T}}{\sum_j e^{z_j/T}}
$$

| $T$ | Effect | Used for |
|---|---|---|
| **Low** ($\to0$) | A **sharp** distribution, nearly always picking the top token | Extraction, code, consistent answers |
| $T=1$ | The model's original distribution | Default |
| **High** ($>1$) | A **flat** distribution, diverse, risky | Creative writing, brainstorming |

With logits $(2,1,0)$: $T=1$ gives $(0.665,0.245,0.090)$; $T=0.5$ gives $(0.867,0.117,0.016)$ (more concentrated).

### Greedy decoding and sampling

- **Greedy**: always pick the highest-probability token (repetitive, dull).
- **Sampling** from the distribution: more diverse, but the long tail may contain nonsense tokens.

### Top-k and top-p (nucleus)

Cut the low-probability "tail" before sampling:

- **Top-k**: keep only the $k$ highest-probability tokens.
- **Top-p**: keep the **smallest set** whose total probability is $\ge p$ (e.g. 0.9). The number kept **adapts** to the model's confidence.

```python
order = np.argsort(-probs)
cum = np.cumsum(probs[order])
keep = order[: np.searchsorted(cum, p) + 1]
```

For $(0.5, 0.3, 0.1, 0.06, 0.04)$ and $p=0.85$: cumulative $(0.5,0.8,0.9,\dots)$ so keep the **first 3 tokens**.

After cutting, **renormalize** the probabilities then sample.

### Other controls

| Parameter | Effect |
|---|---|
| **Max tokens** | Limits the length |
| **Stop sequences** | Stop on a given string |
| **Repetition penalty** | Penalizes repeated words |
| **Seed** | Reproducible results |

## The context window

A model can only "see" a **limited number of tokens** (e.g. 128k-1M), including the **prompt + history + the answer**. Beyond the limit it **gets truncated**. Attention cost grows with length (Transformer lesson).

## Important limitations of LLMs

| Issue | Explanation |
|---|---|
| **Hallucination** | Produces **plausible-sounding but false** content: the objective is "likely text", not "truth" |
| **Knowledge cutoff** | Only knows up to the training time |
| **Bias** | Inherited from the data |
| **Hard to verify** | A "black box" |
| **Cost** | Training and inference are expensive |
| **Multi-step reasoning** | Can fail; improved by **chain-of-thought** |

Ways to reduce hallucination: **RAG** (put real documents in the context), allow **tool use**, require **citations**, cross-checking (next lessons).

## Parameter-efficient fine-tuning

Fine-tuning all billions of parameters is very expensive. **LoRA** trains only **small low-rank matrices** added on top, cutting memory many times over with nearly equal quality. **Quantization** (4-bit, 8-bit) lets large models run on modest hardware.

## Using an LLM through an API (an example, run outside the browser)

```python
# Illustrates the idea; needs a provider's API key
response = client.messages.create(
    model="<model-name>",
    max_tokens=500,
    temperature=0.2,
    messages=[{"role": "user", "content": "Summarize the following passage..."}],
)
```

You've implemented **temperature softmax** and **top-p** yourself: the two core pieces behind those `temperature` and `top_p` parameters.
