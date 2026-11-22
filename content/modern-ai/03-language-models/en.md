# Language models: from n-grams to BPE tokenization

A **language model** (LM) assigns a **probability** to a sequence of words, or equivalently predicts the **next word**. Every conversational AI assistant today is an enormous language model.

## The probability of a sentence

By the **chain rule** of probability:

$$
P(w_1,w_2,\dots,w_n)=\prod_{t=1}^{n}P(w_t\mid w_1,\dots,w_{t-1})
$$

A language model only needs to learn $P(\text{next word}\mid\text{previous words})$. Generating text = **sampling one word at a time** from that distribution (**autoregressive**).

![A language model predicts the next token as a probability distribution](/lessons/modern-ai/03-language-models-fig-en.svg)
*A language model predicts the next token as a probability distribution*

## N-gram models

Conditioning on the **entire history** is too hard, so we approximate with the last $n-1$ words (the **Markov assumption**). A **bigram** ($n=2$):

$$
P(w_t\mid w_{t-1})=\frac{\text{count}(w_{t-1},w_t)}{\text{count}(w_{t-1})}
$$

With the corpus `the cat sat the cat ran the dog sat`: "the" appears 3 times as a previous word; "the cat" occurs 2 times ⇒ $P(\text{cat}\mid\text{the})=2/3$. "cat" appears 2 times, "cat sat" once ⇒ $P(\text{sat}\mid\text{cat})=1/2$.

```python
bigrams = Counter(zip(corpus[:-1], corpus[1:]))
unigrams = Counter(corpus[:-1])
P = bigrams[("the", "cat")] / unigrams["the"]
```

**Generating text** with a bigram: start from a word, sample the next by probability, repeat. The result has the right "flavor" but **loses coherence** since it remembers only 1 word.

### Limits of n-grams

- **Sparse**: unseen combinations get probability 0 ⇒ need **smoothing** (Laplace, Kneser-Ney).
- **Short context**; raising $n$ makes the number of combinations **explode**.
- **No notion of similarity**: "dog" and "cat" are totally separate (unlike embeddings).

## Perplexity: measuring a language model

A good model gives **high probability** to real text. **Perplexity** is the **inverse geometric mean** of the probability:

$$
\text{PPL}=\exp\!\Big(-\frac1N\sum_{t=1}^{N}\ln P(w_t\mid w_{<t})\Big)
$$

Read it as "the **effective number of choices** the model hesitates between at each step". **Lower is better**. It is exactly the **cross-entropy** (Math lesson) exponentiated.

## From n-grams to neural networks

| Generation | Approach | Context |
|---|---|---|
| n-gram | Counting | 1-4 words |
| RNN/LSTM | Hidden state | Longer, but fades |
| **Transformer** | **Attention** | Thousands to **millions of tokens** |

A neural model takes the **embeddings** of the previous words, runs them through the network and outputs a **softmax over the whole vocabulary** (the next-word probabilities). Training = minimizing **cross-entropy** on vast amounts of text.

## Subword tokenization: BPE

A **whole-word** vocabulary has the OOV problem, while **characters** make sequences too long. **Byte-Pair Encoding (BPE)** balances:

1. Start with each word as a **sequence of characters**.
2. Find the **most frequent adjacent token pair** in the data.
3. **Merge** that pair into a new token.
4. Repeat until the vocabulary reaches the target size (e.g. 50,000).

Example `l o w l o w e r`: the pair `(l, o)` occurs twice ⇒ merge into `lo`, then `(lo, w)` ⇒ `low`... In the end common words become **one token** and rare words split into **familiar pieces** (never truly "unknown").

```python
Counter(zip(tokens[:-1], tokens[1:])).most_common(1)     # the next pair to merge
```

Practical consequences for LLMs:

- **A token ≠ a word**: English is ~0.75 words/token; **Vietnamese, Chinese often cost more tokens** for the same content ⇒ pricier and a shorter effective context.
- A "128k-token context" limit is counted in tokens.
- Some letter/digit errors stem from **tokenization** (the model sees "strawberry" as a few chunks, not individual letters).

## Conditional generation

Real models also take the **prompt** as history, then continue. How the next token is chosen (temperature, top-k, top-p) decides whether text is **creative or deterministic**: next lesson.
