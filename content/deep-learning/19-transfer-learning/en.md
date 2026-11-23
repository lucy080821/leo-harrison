# Transfer learning: frozen features and fine-tuning

Training a deep network from scratch needs **millions of images** and many GPUs. Most real projects don't have that. **Transfer learning** reuses a model pre-trained on a large dataset (ImageNet, a huge text corpus) for your problem with **little data**.

## Why it works

Early layers learn **general** features (edges, textures, syntax); only the last layers learn **task-specific** ones. General features transfer almost everywhere (Yosinski et al., 2014).

![Freeze the feature extractor and train only a new classification head](/lessons/deep-learning/19-transfer-learning-fig-en.svg)
*Freeze the feature extractor and train only a new classification head*

## Two strategies

| Strategy | What you do | When |
|---|---|---|
| **Feature extraction / linear probe** | **freeze** the base network, train only a new classification head | **very little** data, task close to the source |
| **Fine-tuning** | unfreeze some/all layers, train with a **small LR** | moderate data, task somewhat different from the source |

Compute savings: a linear probe trains only a few hundred to a few thousand parameters.

## The practical recipe

1. Pick a suitable pre-trained model (ResNet/EfficientNet/ViT for images; BERT/an LLM for text).
2. Replace the final head with a new one for your number of classes.
3. **Freeze** the body, train the head for a few epochs.
4. **Unfreeze** gradually and lower the LR (e.g. `1e-5` for the body, `1e-3` for the head: **layer-wise LRs**).
5. **Augment data**, stop early, keep BatchNorm in the right mode.

## Pitfalls

- **Input normalisation** must match the original model (ImageNet mean/std).
- Large domain shift (medical vs everyday images) needs deeper fine-tuning.
- A **too-large LR** during fine-tuning causes *catastrophic forgetting* of good features.
- Check the **licence** of the model and its pre-training data.

## With LLMs

Same principle: full fine-tuning is costly so use **PEFT/LoRA** (train small extra low-rank matrices), or skip tuning and use prompting/RAG. See the "Modern AI" course.

## References

- Yosinski, Clune, Bengio, Lipson (2014). How transferable are features in deep neural networks? *NeurIPS*.
- Howard & Ruder (2018). Universal language model fine-tuning (ULMFiT). *ACL*.
- Hu et al. (2022). LoRA: low-rank adaptation of large language models. *ICLR*.
