# Practical RAG: chunking and measuring retrieval quality

Lesson 5 introduced RAG. Here is what decides **real quality**: *how you split documents* and *how you measure retrieval*. Most RAG failures are in **retrieval**, not the LLM.

## Chunking: splitting documents

Embedding models and context windows are limited, so documents must be split into chunks.

| Decision | Too small | Too large |
|---|---|---|
| **Chunk size** | loses context ("it" refers to what?) | diluted meaning, token cost, noise |
| **Overlap** | information cut at the boundary | storage cost, duplication |

A pragmatic start: **200–500 tokens, 10–20% overlap**. Better to split by **structure** (headings, paragraphs, sections) than hard character cuts; keep **metadata** (source, title, page) for citations.

![Splitting a document into overlapping chunks so context at the boundary isn't lost](/lessons/modern-ai/09-rag-chunking-retrieval-fig-en.svg)
*Splitting a document into overlapping chunks so context at the boundary isn't lost*

## Retrieval

- **Lexical (BM25/TF-IDF)**: strong for exact keywords (product codes, proper names).
- **Semantic (embeddings)**: understands synonyms and rephrasing.
- **Hybrid** + **reranking** with a cross-encoder is usually best: fetch 50 candidates, rerank, put the top 3–5 in the prompt.

## Measure retrieval independently of the LLM

Build a **test set**: questions and the right chunk. Measure:

- **recall@k**: share of questions whose right chunk is in the top-k. If low, the LLM cannot answer correctly.
- **MRR** (mean reciprocal rank): mean of `1/rank` of the first correct chunk.
- **nDCG** when there are graded relevance levels.

Only then measure the **answer**: is it grounded (faithfulness), is it correct.

## Common RAG failures

1. The answer lies **between two chunks** (need overlap or bigger chunks).
2. Right retrieval but the **LLM ignores** the context ("lost in the middle", Liu et al. 2023): put key chunks first/last, use fewer chunks.
3. Ambiguous question: **rewrite the query** before retrieval.
4. **Stale/contradictory** data: needs versioning and effective dates.
5. No information: force the model to say "I don't know" and **cite sources**.

## References

- Lewis et al. (2020). Retrieval-augmented generation for knowledge-intensive NLP tasks. *NeurIPS*.
- Liu et al. (2023). Lost in the middle: how language models use long contexts. *TACL*.
- Robertson & Zaragoza (2009). The probabilistic relevance framework: BM25 and beyond.
