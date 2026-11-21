# Embeddings and semantic search

An **embedding** represents an object (a word, sentence, image, user...) as a **dense vector** (a few hundred to a few thousand real numbers) such that **objects with similar meaning sit close together**. It's the bridge between **meaning** and **mathematics**, underpinning semantic search, RAG, recommendation and LLMs.

## From one-hot to embeddings

**One-hot**: each word is a vector of zeros with a single 1 (size = vocabulary size, e.g. 50,000). Every pair of words is **perpendicular**, i.e. "dog" is as far from "cat" as from "rocket". No meaning.

**Embedding**: map each word to a **short vector (e.g. 300 dims)** **learned** by a network such that:

- "dog" and "cat" are **close**, far from "rocket".
- Semantic relations have **linear structure**.

## Learning embeddings: "know a word by the company it keeps"

> "You shall know a word by the company it keeps." (J. R. Firth)

**Word2Vec** (2013): train a small network to **predict a word from its surrounding context** (or vice versa). Words appearing in **similar contexts** get **similar vectors**. The embedding layer's weights are the word vectors. **GloVe** and **fastText** are similar.

Today **Transformers** (BERT, sentence-embedding models) give **contextual embeddings**: the same word "bank" gets different vectors in "river bank" and "bank account".

## Arithmetic on embeddings

Semantic relations become **directions** in space:

$$
\vec{\text{king}}-\vec{\text{man}}+\vec{\text{woman}}\approx\vec{\text{queen}}
$$

With toy vectors $[\text{royalty},\text{male},\text{female}]$: $(1,1,0)-(0,1,0)+(0,0,1)=(1,0,1)$, exactly "queen". (With real embeddings the result is only **approximate**.)

## Measuring similarity: cosine

Use **cosine** (Math lesson) rather than Euclidean distance because vector length matters little:

$$
\cos(\mathbf a,\mathbf b)=\frac{\mathbf a\cdot\mathbf b}{\|\mathbf a\|\,\|\mathbf b\|}
$$

If the vectors are **normalized to length 1**, cosine is just the **dot product**: much faster.

## Semantic search

Keyword search (TF-IDF) matches only **identical words**. Semantic search matches **meaning**:

1. **Embed** every document into a vector (done once, stored).
2. On a query: **embed the query** with the same model.
3. Find the **$k$ documents with the highest cosine**.

```python
def top_k(query, matrix, k):
    sims = (matrix @ query) / (np.linalg.norm(matrix, axis=1) * np.linalg.norm(query))
    return np.argsort(-sims)[:k]          # indexes of the k most similar rows
```

The query "how to cook pho" will find an article about "beef broth recipe" even with **no words in common**.

## Approximate nearest neighbors (ANN) and vector databases

Comparing against every vector is $O(N)$: slow with millions. The solution: **approximate nearest-neighbor indexes** (HNSW, IVF) trading a bit of accuracy for huge speed. Libraries/databases: **FAISS**, **pgvector**, **Chroma**, **Pinecone**, **Qdrant**...

## Sentence and text embeddings

Models like `sentence-transformers` (e.g. `all-MiniLM-L6-v2`) turn a whole **sentence/paragraph** into one vector:

```python
# run outside the browser
from sentence_transformers import SentenceTransformer
model = SentenceTransformer("all-MiniLM-L6-v2")
vecs = model.encode(["I like cats", "J'aime les chats", "the sky is blue"])
```

**Multilingual** models place same-meaning sentences in different languages **close together**.

## Applications

| Application | Idea |
|---|---|
| **RAG** (next lessons) | Retrieve relevant passages for an LLM |
| **Recommendation** | Embed users/products; recommend nearby products |
| **Deduplication** | Find near-identical texts |
| **Topic clustering** | K-Means on embeddings |
| **Anomaly detection** | Points far from every cluster |
| **Image embeddings** (CLIP) | Search images with a text description |

## Cautions and limitations

- Embeddings **inherit biases** from the training data (e.g. associating professions with gender).
- **Don't compare** embeddings from two different models.
- Quality depends on the **domain**: a general model may be weak in medicine/law.
- High cosine ≠ "the correct answer": only **topical similarity**.
