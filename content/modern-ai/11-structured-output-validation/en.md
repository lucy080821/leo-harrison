# Structured output: JSON schema, validation and retries

Programs need **structured** data, not free text. But an LLM is probabilistic: sometimes it returns broken JSON, missing fields, wrong types, or extra preamble. **Never trust model output without checking it.**

## Ways to get structured output

| Method | Reliability | Notes |
|---|---|---|
| Instruction in the prompt ("return JSON") | low | often drifts |
| API **JSON mode / structured outputs** | high | schema-constrained decoding |
| **Function/tool calling** | high | the model fills the function's schema |
| Constrained decoding (grammars, the Outlines library) | very high | open-source models |

![Always validate model output before using it](/lessons/modern-ai/11-structured-output-validation-fig-en.svg)
*Always validate model output before using it*

## Layered defences

1. **A clear schema** (types, required/optional, enums, value ranges).
2. **Tolerant parsing**: extract JSON from ```` ```json ```` fences or preamble.
3. **Validate** with a library (Pydantic, `jsonschema`) and **business rules** (totals match, valid dates).
4. **Retry with feedback**: send the error back to the model ("field `age` must be an integer"), at most 2–3 times.
5. **Fallback**: a human-review queue or safe defaults.

## Function calling

You declare functions with a schema (name, description, parameters). The model **does not run the function**; it returns a **call request** `{name, arguments}`. Your program **validates, then executes**, and returns the result to the model. This is the basis of **agents** (lesson 6).

## Safety

- Model output is **untrusted data**: never `eval()`, never concatenate it into SQL/shell (injection). Use parameterised queries.
- Limit tools' **privileges** (read-only, allow-lists).
- **Log** requests/responses for investigation.

## References

- JSON Schema specification (json-schema.org).
- Pydantic documentation; OpenAI/Anthropic docs on structured outputs and tool use.
- OWASP Top 10 for LLM Applications (Insecure Output Handling).
