# Embeddings: representing words and entities as vectors

Neural networks only understand numbers. How do we feed **words, products, users** (discrete categories) into a network?

## One-hot: simple but dumb

Each word is an all-zero vector with a single 1: as long as the vocabulary (tens of thousands), **sparse**, and **all words are equidistant** (king is no closer to queen than to apple).

## Embedding: dense, meaningful vectors

Each item maps to a small **dense vector** (50–1024 dims) that is *learned*. It is essentially a **lookup table**: a matrix `E` of size `|V| × d`, and the embedding of word `i` is **row `i`**. (Equivalent to one-hot times E.)

![Related words sit close together in vector space](/lessons/deep-learning/16-embeddings-fig-en.svg)
*Related words sit close together in vector space*

## Learning embeddings from context

*"You shall know a word by the company it keeps"* (Firth, 1957). **word2vec** (Mikolov 2013) trains a network to predict a word from its context (CBOW) or context from a word (skip-gram): words appearing in similar contexts get nearby vectors. GloVe and fastText share the idea.

## Geometric structure

- **Cosine** measures relatedness: king~queen high, king~apple low.
- Approximate **analogies**: `king − man + woman ≈ queen`: directions such as "gender" are encoded as directions in space.

## Modern embeddings

- **Contextual**: BERT and GPT give a different vector depending on the sentence ("bank" riverside vs financial).
- **Sentence/document embeddings** for semantic search and RAG.
- Usable for **any entity**: users, products (recommenders), zip codes, any ID (`nn.Embedding`).

## Warning

Embeddings learned from data **inherit societal bias** (Bolukbasi et al., 2016). Audit before using in decisions affecting people.

## References

- Mikolov et al. (2013). Efficient estimation of word representations in vector space. *arXiv:1301.3781*.
- Pennington, Socher, Manning (2014). GloVe. *EMNLP*.
- Bolukbasi et al. (2016). Man is to computer programmer as woman is to homemaker? *NeurIPS*.
