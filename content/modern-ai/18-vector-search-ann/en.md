# Vector search at scale: brute force, LSH and recall

RAG, recommenders and semantic search all reduce to one problem: **find the nearest vectors** to a query among millions to billions.

## Exact search

Compute similarity to **every** vector: `O(n·d)` per query. With vectors **normalised to length 1**, `cosine = dot product`, so one matrix multiplication suffices: fast for tens of thousands, **too slow** for millions.

![Approximate search trades a little accuracy for large speedups](/lessons/modern-ai/18-vector-search-ann-fig-en.svg)
*Approximate search trades a little accuracy for large speedups*

## Approximate search (ANN)

Accept **missing a few neighbours** (recall < 100%) for a 10–1000× speedup. Method families:

| Family | Idea | Example |
|---|---|---|
| **Hashing (LSH)** | nearby vectors land in the same bucket with high probability | random hyperplanes |
| **Graphs** | walk a neighbour graph from an entry point | **HNSW** (very popular) |
| **Clustering (IVF)** | split space into clusters, search only the nearest few | FAISS IVF |
| **Compression (PQ)** | quantise vectors to save memory | Product Quantization |

## Random-hyperplane LSH

Pick `b` random hyperplanes; each vector becomes a **`b`-bit string** by which side of each plane it lies on. Nearby vectors (small angle) usually share bits. Scan only **same-bucket** candidates; use several hash tables to raise recall.

Trade-off: **more bits** ⇒ smaller buckets, faster but more misses; **more tables** ⇒ higher recall but more memory/time.

## Measure with recall@k

Compare with the exact result: `recall@k = |ANN ∩ exact| / k`. Always plot a **recall vs latency curve** when tuning (`efSearch` for HNSW, `nprobe` for IVF).

## Choosing tools

- A few hundred thousand vectors: **brute force** or a simple library (NumPy, FAISS flat) is enough.
- Millions and up: **HNSW/IVF** in FAISS, hnswlib, or a vector DB (pgvector, Qdrant, Milvus, Pinecone…).
- Need **metadata filtering** (user, date) combined with vector search: check the DB supports pre-/post-filtering.
- Frequent updates/deletes: mind the index rebuild cost.

## References

- Malkov & Yashunin (2020). Efficient and robust approximate nearest neighbor search using HNSW graphs. *IEEE TPAMI* 42(4).
- Charikar (2002). Similarity estimation techniques from rounding algorithms. *STOC* (random-hyperplane LSH).
- Johnson, Douze, Jégou (2021). Billion-scale similarity search with GPUs (FAISS). *IEEE Trans. Big Data*.
- Aumüller et al. ANN-Benchmarks.
