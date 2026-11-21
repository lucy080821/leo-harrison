# NLP: representing text (tokens, bag of words, TF-IDF)

**NLP** (Natural Language Processing) teaches machines to understand and generate human language: machine translation, search, chatbots, sentiment analysis, summarization. The first problem: **machines only work with numbers**, so how do we turn text into numbers?

## Step 1: Tokenization

Split text into **tokens** (the smallest units the model processes).

```python
import re
tokens = re.findall(r"[a-z']+", "The cat sat on the mat!".lower())
# ['the', 'cat', 'sat', 'on', 'the', 'mat']
```

| Level | A token is | Pros/cons |
|---|---|---|
| **Word** | a whole word | Easy to understand; huge vocabulary, **out-of-vocabulary (OOV)** words can't be handled |
| **Character** | each letter | No OOV; very long sequences |
| **Subword** | word pieces (BPE, WordPiece) | A **balance**: the standard for modern LLMs |

### Common preprocessing

- Convert to **lowercase**, remove punctuation.
- Remove **stop words** ("the", "and", "is"): very common, little information.
- **Stemming/lemmatization**: reduce "running", "ran" to the root "run".
- Modern models (Transformers) usually **skip** these steps and learn directly from raw text.

## Step 2: Bag of Words (BoW)

Each document becomes a **count vector** over the vocabulary, **ignoring order**:

| | cat | dog | sat | the |
|---|---|---|---|---|
| "the cat sat" | 1 | 0 | 1 | 1 |
| "the dog sat the" | 0 | 1 | 1 | 2 |

```python
from sklearn.feature_extraction.text import CountVectorizer
X = CountVectorizer().fit_transform(docs)       # a sparse matrix
```

The data is **sparse**: most cells are 0 (each document contains a few dozen of tens of thousands of words). Use **sparse matrices** to save memory.

Drawbacks: loses **order** ("dog bites man" ≈ "man bites dog") and **meaning**; common words ("the") dominate.

## Step 3: TF-IDF: down-weighting common words

**TF-IDF** gives a **high score** to words that appear **often in this document** but are **rare in other documents** (characteristic of the document):

$$
\text{tf-idf}(t,d)=\underbrace{\text{tf}(t,d)}_{\text{count of }t\text{ in }d}\times\underbrace{\ln\frac{1+N}{1+\text{df}(t)}+1}_{\text{idf: inverse document frequency}}
$$

- $\text{tf}$: a word repeated in a document ⇒ important to that document.
- $\text{df}(t)$: the number of documents containing $t$. A word **present everywhere** ("the") has a **low** idf.

```python
from sklearn.feature_extraction.text import TfidfVectorizer
vec = TfidfVectorizer(stop_words="english")
M = vec.fit_transform(docs)
vec.get_feature_names_out()
```

By default sklearn also **L2-normalizes** each row so documents can be compared with cosine.

## Uses of TF-IDF

| Task | How |
|---|---|
| **Search** | Turn the query into a vector, rank documents by **cosine** |
| **Text classification** | TF-IDF + logistic regression / Naive Bayes / SVM (a very strong baseline) |
| **Keywords** | The highest-TF-IDF words of each document |
| **Similar documents** | Cosine between matrix rows |

```python
from sklearn.metrics.pairwise import cosine_similarity
cosine_similarity(M[0], M)          # similarity of document 0 to every document
```

## Limits of sparse representations

1. **No semantics**: "car" and "automobile" are two completely different columns even though they mean the same.
2. **Lost word order** and context.
3. **Huge dimensionality** (the vocabulary size).

The breakthrough: **embeddings** (next lesson), representing **each word/sentence as a dense vector** where **similar-meaning words sit close together**. That's the foundation of every modern language model.

## The classic text-classification pipeline

```python
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import LogisticRegression
clf = make_pipeline(TfidfVectorizer(), LogisticRegression(max_iter=1000))
clf.fit(train_texts, train_labels)
clf.predict(["free money now"])
```

It's still the **baseline** to try before big models: fast, cheap, interpretable (inspect the coefficients to see which words push toward which class).
