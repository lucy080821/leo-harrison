# Responsible AI: fairness, evaluation and deployment

A model with high accuracy in the lab can **cause harm** once deployed for real: discrimination, misuse, silent failure. The final lesson of the path covers what **turns a model into a trustworthy product**.

## Where does bias come from?

| Source | Example |
|---|---|
| **Historical data** | Past hiring data favoring men ⇒ the model learns it |
| **Unrepresentative data** | Face recognition trained mostly on one skin tone ⇒ more errors on others |
| **Biased labels** | Annotators carry prejudices |
| **Proxy features** | A postal code standing in for race |
| **Feedback loops** | Predictions shape future data (police sent where there are many cases see more cases) |
| **Objective design** | Optimizing "clicks" ⇒ sensational content |

**Dropping the sensitive column isn't enough** because other features still encode it (proxies).

![Responsible AI lifecycle: data → per-group evaluation → monitoring](/lessons/modern-ai/08-responsible-ai-deployment-fig-en.svg)
*Responsible AI lifecycle: data → per-group evaluation → monitoring*

## Measuring fairness

Two common metrics, computed **per group** (e.g. gender, age band):

### Demographic parity

The **positive-prediction rate** should be the same across groups:

$$
P(\hat y=1\mid A)=P(\hat y=1\mid B)
$$

The gap: $\lvert P(\hat y=1\mid A)-P(\hat y=1\mid B)\rvert$. E.g. group A approved for loans 60%, group B 20% ⇒ a gap of 0.4.

### Equal opportunity

Among those who **truly qualify** (positive label), the **rate of being correctly identified (TPR)** should be the same:

$$
\text{TPR}_A=\text{TPR}_B,\qquad \text{TPR}=\frac{TP}{TP+FN}
$$

E.g. $\text{TPR}_A=2/3$, $\text{TPR}_B=1/3$ ⇒ qualified people in group B are **missed twice as often**.

```python
def tpr(mask):
    return y_pred[mask & (y_true == 1)].mean()
```

There are also **equalized odds** (both TPR and FPR equal), **calibration** (predicted probabilities equally trustworthy in every group)...

### There is no single definition of "fair"

These criteria **often conflict** (they can't all hold simultaneously except in special cases). Choosing one is a **values decision**, not just a technical one: it needs discussion with affected people, legal and ethics experts.

## Reducing bias

| Stage | Approach |
|---|---|
| **Before training** | Collect more representative data, rebalance/reweight |
| **During training** | Add fairness constraints to the loss |
| **After training** | Adjust **per-group decision thresholds** |

Always **measure per group**; don't look only at the global average: 95% accuracy can hide 70% in a small group.

## Honest and transparent evaluation

- **Split a test set** representative of the real environment.
- Report **confidence intervals**, not a single number.
- Check **edge cases** and **adversarial examples**.
- **Document** the model: a **model card** (purpose, data, limits, performance by group), a **datasheet** for the data.
- Be **explainable** when consequences are large: coefficients, SHAP, LIME.

## Deployment and monitoring (MLOps)

A model is **not "done" at deployment**; the world changes:

| Phenomenon | Meaning | How to detect |
|---|---|---|
| **Data drift** | The **input** distribution changes | Compare current input distributions with training (PSI, KS test) |
| **Concept drift** | The input → label relationship changes | Track **quality** as new labels arrive |
| **Performance decay** | Scores decline gradually | Metrics over time, alerts |

```python
# Simple drift detection: the mean shift in training standard deviations
z = abs(new_data.mean() - train_mean) / train_std
alert = z > 0.5
```

Good practice: **version** data/models, **CI/CD** for ML, **gradual rollout** (canary, A/B), **log** predictions, have a **rollback plan**, and keep a **human in the loop** for high-stakes decisions.

## Safety and privacy

| Topic | Note |
|---|---|
| **Privacy** | Minimize personal data; anonymize; **models can memorize** training data |
| **Security** | Adversarial attacks, data poisoning, **prompt injection** |
| **Misuse** | Assess dual-use risk, restrict access |
| **Environmental impact** | Large-scale training/inference consumes energy |
| **Copyright** | Data provenance and licences |

### Specific to LLMs

- **Hallucination**: needs verification (RAG, citations, tools).
- **Harmful content**: filter inputs/outputs, **red-teaming**.
- **Leaking sensitive information** in prompts or retrieved data.
- Be transparent to users that they're interacting with an AI.

## A mindset before building

1. **Should you use AI at all?** Would simple rules suffice?
2. **Who is affected**, and what are the consequences when the model is **wrong** (which direction of error is worse)?
3. Is there **human review** and a path for **appeal/correction**?
4. Have you measured on **every relevant group**?
5. How will you **monitor** after launch?

## Congratulations, you've completed the AI path!

From **foundational maths** to **machine learning**, **deep learning** built by hand, and **modern AI** (NLP, embeddings, LLMs, RAG, agents, reinforcement learning), you now have the full picture. Next advice: **build real projects** on data you care about, read the original papers (Transformer, ResNet, Adam...), and always ask "**where does this model go wrong, and who bears the consequences?**".
