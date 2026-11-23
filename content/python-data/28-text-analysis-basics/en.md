# Basic text analysis: word frequencies and lexicon sentiment

Customer reviews, support emails, social posts: most business data is **text**. Before reaching for complex NLP models, master the foundational techniques.

## Preprocessing workflow

1. **Normalise**: lowercase, strip stray characters.
2. **Tokenise**: `re.findall(r"[a-z']+", text)`.
3. **Remove stop words**: very common, low-information words (the, is, and…).
4. Optionally add **stemming/lemmatisation** (reduce to the root) and **n-grams** (2–3 word phrases).

![Counting keywords and comparing positive vs negative reviews](/lessons/python-data/28-text-analysis-basics-fig-en.svg)
*Counting keywords and comparing positive vs negative reviews*

## Word frequencies

`collections.Counter` counts very quickly; `most_common(k)` gets the top. Comparing **keywords by group** (low vs high ratings) immediately shows *what customers complain about*: slow delivery, weak battery, poor support. That is actionable information.

## Lexicon-based sentiment

Assign scores to words (good +1, bad −1) and sum per text. Simple and **explainable**, but it misses negation ("not good"), sarcasm and context. Ready-made tools: VADER, TextBlob. For higher accuracy: machine-learning models or language models.

## Validate against existing labels

You have a `rating` column, so cross-check: the mean sentiment score of 1–2 star reviews must be lower than 4–5 stars. If not, the lexicon or the processing is wrong.

## Notes

- Vietnamese text needs its own word segmentation (e.g. **underthesea**, **pyvi**) because words span several syllables.
- Word statistics on a **small sample** are easily swayed by a few long reviews.
- Always **read a random sample** of the real text; don't trust the numbers alone.

## References

- Jurafsky & Martin. *Speech and Language Processing* (3rd ed. draft, free online).
- Hutto & Gilbert (2014). VADER. *ICWSM*.
- Python documentation, `re`, `collections.Counter`.
