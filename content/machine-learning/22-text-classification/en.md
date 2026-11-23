# Text classification with TF-IDF and logistic regression

Spam filtering, support-ticket routing, review sentiment: **text classification** is among the most common ML applications. The trick: turn text into **numeric vectors**.

## Bag of words and TF-IDF

- **Bag of words**: one column per word, value = its count. Loses word order yet works surprisingly well.
- **TF-IDF** = *term frequency in the document* × *log(inverse number of documents containing the term)*. Words **common everywhere** (the, is) are down-weighted; words **distinctive to a document** are boosted.

![TF-IDF turns text into vectors a model can learn from](/lessons/machine-learning/22-text-classification-fig-en.svg)
*TF-IDF turns text into vectors a model can learn from*

## The text pipeline

```python
clf = make_pipeline(TfidfVectorizer(ngram_range=(1, 2), min_df=2),
                    LogisticRegression(max_iter=1000))
clf.fit(X_train_text, y_train)
```

| Parameter | Effect |
|---|---|
| `ngram_range=(1,2)` | add 2-word phrases ("not good", "fast delivery") |
| `min_df=2` | drop very rare words |
| `stop_words`, `lowercase` | preprocessing |
| `sublinear_tf=True` | dampen heavily repeated words |

The pipeline ensures the **vocabulary is learned only from the training set** (no leakage).

## Interpretation

Logistic-regression coefficients tell you **which words push toward which class**: sort `coef_` to see. Use it to check the model learns something sensible rather than a "data trick" (say a promo code appearing only in the positive class).

## Limits

- **Lost context**: "not good" needs n-grams; sarcasm is nearly undetectable.
- **Class imbalance, small samples**: use `class_weight`, stratified CV.
- Vietnamese needs word segmentation first (underthesea, pyvi).
- For deep semantics: embeddings and language models (see the Deep Learning and Modern AI courses).

## References

- Salton & Buckley (1988). Term-weighting approaches in automatic text retrieval. *Information Processing & Management* 24(5).
- scikit-learn, "Working With Text Data" (tutorial).
- Manning, Raghavan, Schütze. *Introduction to Information Retrieval*.
