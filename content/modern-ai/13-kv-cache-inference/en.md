# Efficient inference: KV-cache, quantisation and GPU memory

Training happens once; **inference** happens billions of times and dominates running cost. Understanding the bottlenecks helps you **choose hardware, model and configuration** sensibly.

## Why generation is slow

The model emits **one token per step**, and each token runs through the whole network. Recomputing attention over the entire context each step would be hugely wasteful.

## The KV-cache

In attention, **the K and V of old tokens don't change**. Store them (the **KV-cache**), and each step computes K, V only for the new token. The price is memory: per token, per layer, `2 × heads × head_dim` numbers.

`cache memory ≈ 2 × layers × heads × head_dim × length × batch × bytes`

![KV-cache memory grows linearly with context length](/lessons/modern-ai/13-kv-cache-inference-fig-en.svg)
*KV-cache memory grows linearly with context length*

Long contexts and big batches can make the **KV-cache exceed the model weights**. Remedies: **Multi-Query/Grouped-Query Attention** (share K, V across heads), PagedAttention (vLLM), compressed/windowed caches.

## Weight memory and quantisation

`memory ≈ parameters × bytes per parameter`. A 7B model: fp16 ≈ 14 GB, int8 ≈ 7 GB, int4 ≈ 3.5 GB.

**Quantisation**: store weights as integers: `q = round(w / scale)`, `scale = max|w| / 127` (int8). Cuts memory and bandwidth, usually **very little quality loss** at int8, more noticeable at int4 (GPTQ, AWQ, bitsandbytes, GGUF).

## Two phases of inference

| Phase | Trait | Bottleneck |
|---|---|---|
| **Prefill** (process the prompt) | many tokens in parallel | compute-bound |
| **Decode** (token by token) | sequential, 1 token per step | **memory bandwidth** (reading weights + cache) |

## Raising throughput

- **Continuous batching**: merge requests to keep the GPU busy.
- **Speculative decoding**: a small model drafts, the large one verifies.
- **Distillation** into a smaller model.

## Choosing how to deploy

Cloud API (no infrastructure to manage) vs self-hosting (data control, cheaper at scale, but needs an ops team). Compute the **cost per million tokens** of both before deciding.

## References

- Pope et al. (2023). Efficiently scaling Transformer inference. *MLSys*.
- Kwon et al. (2023). Efficient memory management for LLM serving with PagedAttention. *SOSP*.
- Dettmers et al. (2022). LLM.int8(). *NeurIPS*.
- Leviathan et al. (2023). Fast inference from Transformers via speculative decoding. *ICML*.
