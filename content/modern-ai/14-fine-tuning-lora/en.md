# Fine-tuning models: SFT, LoRA and when to use it

**Before fine-tuning**, ask: do you really need it? Most problems are solved by good prompting or RAG, which are much cheaper and easier to iterate on.

## Prompt, RAG or fine-tune?

| Need | First solution |
|---|---|
| Instructions, format, role | **prompt** (+ few-shot examples) |
| Private, changing knowledge, citations needed | **RAG** |
| **Style/voice**, a narrow repeated task, hard format compliance | **fine-tuning** |
| Cut cost/latency (a small model doing a large model's job) | fine-tuning/distillation |
| Teaching new facts | RAG, **not** fine-tuning (fine-tuning memorises facts poorly) |

![LoRA adds low-rank matrices instead of updating all the weights](/lessons/modern-ai/14-fine-tuning-lora-fig-en.svg)
*LoRA adds low-rank matrices instead of updating all the weights*

## SFT: supervised fine-tuning

Continue training the model on **(instruction, desired response)** pairs with the same next-token objective. **Data quality beats quantity**: a few hundred to a few thousand clean examples are often enough (Zhou et al., 2023, LIMA).

## LoRA: parameter-efficient fine-tuning

Fine-tuning billions of parameters costs GPU and memory. **LoRA** (Hu et al., 2022) **freezes** `W` and learns a low-rank update:

`W' = W + (α/r) · B · A`, with `A ∈ ℝ^{r×d_in}`, `B ∈ ℝ^{d_out×r}`, `r ≪ d`.

- Only **~0.1–1%** of parameters train; the adapter is tens of MB and **easy to swap** per task.
- `B` starts at 0 so training begins **exactly at the base model**.
- **QLoRA** combines a 4-bit quantised base model to fine-tune large models on one GPU.
- Choose `r` (4–64) and which matrices to adapt (often `q_proj`, `v_proj`).

## Workflow

1. Build the **eval** first (lesson 10) to know whether it improves.
2. Collect and **clean data**; hold out a test set.
3. Try prompt/RAG as a **baseline**.
4. Fine-tune, compare with the baseline on the eval; check for **forgetting of general knowledge**.

## Risks

- **Catastrophic forgetting**: reduced general ability if overdone.
- Data with **bias/sensitive information** will be learned and may be reproduced.
- **Maintenance cost**: each base-model upgrade means re-tuning.

## References

- Hu et al. (2022). LoRA: low-rank adaptation of large language models. *ICLR*.
- Dettmers et al. (2023). QLoRA: efficient finetuning of quantized LLMs. *NeurIPS*.
- Zhou et al. (2023). LIMA: less is more for alignment. *NeurIPS*.
- Ouyang et al. (2022). Training language models to follow instructions with human feedback. *NeurIPS*.
