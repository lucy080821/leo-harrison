# Evaluating LLMs: exact match, F1, pass@k and LLM-as-judge

*"What you can't measure, you can't improve."* LLM apps often stop at "the demo looks fine". A real product needs an **eval set** to know whether a prompt/model change **improves or worsens** things.

## Why LLM evaluation is hard

Output is **free text** with many correct phrasings; the model is **non-deterministic**; and a few pretty examples easily **bias the measurement**.

![A small but systematic eval beats gut feeling](/lessons/modern-ai/10-llm-evaluation-fig-en.svg)
*A small but systematic eval beats gut feeling*

## Families of metrics

| Type | Metric | For |
|---|---|---|
| **Matching** | Exact Match, token-level F1 | short-answer QA, extraction |
| **Execution** | **pass@k**, unit tests | code and SQL generation |
| **Reference** | ROUGE, BLEU, BERTScore | summarisation/translation (weak correlation with quality) |
| **LLM judge** | rubric scores, pairwise comparison | open-ended output |
| **Human raters** | rankings, win rate | gold standard, expensive |
| **Business** | resolution rate, handling time | the final measure |

## pass@k

Generate `n` solutions, `c` correct (pass tests). The probability **at least one** of `k` samples is correct: `1 − C(n−c, k)/C(n, k)` (Chen et al., 2021, HumanEval). It shows the benefit of trying several times.

## LLM-as-judge: convenient but biased

Use a strong LLM to grade against a **clear rubric**. Known biases (Zheng et al., 2023): **position bias** (prefers the first answer), **length bias** (prefers longer text), **self-preference** (prefers its own style). Mitigate by swapping order, detailed rubrics, and **calibrating with human labels** on a sample.

## Building an eval

1. Collect **30–200 real cases**, including hard ones and past failures.
2. Write concrete **pass/fail criteria** before running.
3. Run automatically whenever the prompt/model/RAG changes (like **regression tests**).
4. Report **by segment** (topic, difficulty), not only the mean.
5. Add new cases from **real production failures**.

## Cautions

- Don't **over-optimise** on the eval (overfitting to it); keep a separate held-out set.
- Measure **cost and latency** too, not just quality.
- **Data contamination**: public benchmarks may already be in the training data.

## References

- Chen et al. (2021). Evaluating large language models trained on code (HumanEval, pass@k). *arXiv:2107.03374*.
- Zheng et al. (2023). Judging LLM-as-a-judge with MT-Bench and Chatbot Arena. *NeurIPS*.
- Liang et al. (2022). Holistic evaluation of language models (HELM). *arXiv:2211.09110*.
