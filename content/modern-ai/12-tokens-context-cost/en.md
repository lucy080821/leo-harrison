# Tokens, context windows and cost estimation

An LLM reads not letters but **tokens** (sub-word pieces). Tokens determine an app's **cost**, **latency** and **limits**.

## What a token is

A tokenizer (BPE, lesson 3) cuts text into pieces: English ≈ **4 characters or 0.75 words per token**. **Vietnamese, source code and rare characters cost more tokens** for the same content. For exact numbers, use the provider's official token counter.

![Cost depends on input and output tokens multiplied by their prices](/lessons/modern-ai/12-tokens-context-cost-fig-en.svg)
*Cost depends on input and output tokens multiplied by their prices*

## The context window

Total **input + output tokens** must fit the context window. A typical budget:

`window = system prompt + conversation history + retrieved documents + question + room for the answer`

A large window doesn't mean you should fill it: cost and latency rise, and the model may **miss information in the middle** (Liu et al., 2023).

## Computing cost

`cost = input_tokens × input_price + output_tokens × output_price` (prices per million tokens). **Output tokens usually cost several times more** than input. Multiply by call volume for a monthly budget, and measure at peak too.

## Cutting cost and latency

| Technique | Effect |
|---|---|
| **Prompt caching** | the fixed prompt prefix is cached, much cheaper and faster |
| Trim context | retrieve only top-k chunks, summarise history |
| **Route by difficulty** | small model for easy tasks, large for hard ones |
| Cap `max_tokens`, ask for brevity | fewer output tokens |
| **Batch processing** | lower price if you don't need an instant reply |
| Cache answers | repeated questions skip the model |

## Latency

Time ≈ **prompt processing** (parallel, fast) + **token-by-token generation** (sequential, slow). Track **time to first token** and use **streaming** so users see text immediately.

## Note

Prices change often: **always check the provider's current price list**; the numbers in this lesson are illustrative.

## References

- Sennrich, Haddow, Birch (2016). Neural machine translation of rare words with subword units. *ACL*.
- Liu et al. (2023). Lost in the middle. *TACL*.
- Provider documentation on pricing, token counting and prompt caching.
