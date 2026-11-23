# Aligning models: RLHF, the Bradley–Terry reward model and DPO

A pre-trained language model only knows *next-token prediction*; it doesn't know what a **helpful, honest, harmless** answer is. **Alignment** teaches that using **human preferences**.

## The classic RLHF pipeline

1. **SFT**: fine-tune on examples of good answers.
2. **Collect preferences**: for one prompt the model generates 2+ answers; a person picks the better one.
3. **Reward model**: learn to predict a score `r(x, y)` from the preference pairs.
4. **RL optimisation** (PPO): update the model to **raise the reward**, with a **KL** penalty so it doesn't drift far from the SFT model.

![A reward model learns rankings from human preference pairs](/lessons/modern-ai/15-rlhf-preference-fig-en.svg)
*A reward model learns rankings from human preference pairs*

## The Bradley–Terry model

The probability a person prefers A over B: `P(A ≻ B) = σ(r_A − r_B)`. Train by maximum likelihood: `L = −log σ(r_chosen − r_rejected)`. Only the **difference** matters; the model learns *ranking*, not absolute scores.

## Why the KL penalty

Pure reward maximisation leads to **reward hacking**: the model exploits loopholes in the reward model (e.g. long or flattering answers) rather than truly improving. The KL penalty keeps it near the SFT model.

## DPO: skipping the reward model and RL

**Direct Preference Optimization** (Rafailov et al., 2023) shows you can optimise directly on preference pairs with a simple classification-style loss, equivalent to KL-constrained RLHF but **more stable and cheaper**. Many variants: IPO, KTO, ORPO. **RLAIF/Constitutional AI** uses AI (following a set of principles) to produce preference labels in place of some humans (Bai et al., 2022).

## Limitations

- **Human labels are noisy, inconsistent and biased** by the annotators' culture/group.
- **Sycophancy**: models go along with the user instead of being right.
- Alignment **doesn't guarantee absolute safety**; adversarial testing (red teaming) and monitoring in deployment are still needed.

## References

- Christiano et al. (2017). Deep reinforcement learning from human preferences. *NeurIPS*.
- Ouyang et al. (2022). Training language models to follow instructions with human feedback. *NeurIPS*.
- Rafailov et al. (2023). Direct preference optimization. *NeurIPS*.
- Bai et al. (2022). Constitutional AI: harmlessness from AI feedback. *arXiv:2212.08073*.
