# Language models: n-grams, probabilities and perplexity

ChatGPT, Claude and Gemini are all **language models**: they do exactly one thing, **predict the next token** `P(token | previous tokens)`. Understanding the simplest ancestor (n-grams) is a good stepping stone to LLMs.

## Probability of a sequence

By the chain rule: `P(w₁…wₙ) = Π P(wᵢ | w₁…wᵢ₋₁)`. Long contexts can't be counted, so the **Markov assumption**: look only at the last `n−1` words. **Bigram**: `P(wᵢ | wᵢ₋₁) = count(wᵢ₋₁ wᵢ) / count(wᵢ₋₁)`.

![A language model predicts the next word; perplexity measures its confusion](/lessons/deep-learning/17-language-model-basics-fig-en.svg)
*A language model predicts the next word; perplexity measures its confusion*

## Sparsity and smoothing

A never-seen pair has probability 0, zeroing the whole sentence. **Laplace smoothing**: add `α` to every count, `P = (count + α)/(context_count + α|V|)`. Better techniques: Kneser–Ney, backoff.

## Perplexity: measuring quality

`PPL = exp(−mean log P)` on a test set: read it as **"the number of words the model is torn between"**. Lower is better; guessing uniformly over `V` words gives PPL = V. A scrambled sentence has higher perplexity than a natural one.

## From n-grams to LLMs

| | n-gram | Neural / Transformer |
|---|---|---|
| Context | a few words | thousands to millions of tokens |
| Representation | discrete counts | learned **embeddings**, generalising to similar words |
| Sparsity | severe | greatly reduced |
| Objective | same | same: **predict the next token** (cross-entropy) |

## Generating text

Sample `wₙ ~ P(· | context)`, append, repeat. Control with **temperature** (high ⇒ diverse, low ⇒ deterministic) and **top-k/top-p**. See the "Modern AI" course.

## References

- Jurafsky & Martin. *Speech and Language Processing*, chapter on N-gram Language Models.
- Chen & Goodman (1999). An empirical study of smoothing techniques for language modeling.
- Bengio et al. (2003). A neural probabilistic language model. *JMLR* 3.
