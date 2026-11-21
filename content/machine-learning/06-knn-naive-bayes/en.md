# K-nearest neighbors and Naive Bayes

The two most **intuitive** algorithms, representing two different philosophies: based on **distance** (KNN) and based on **probability** (Naive Bayes).

## K-Nearest Neighbors (KNN)

> "Tell me who your friends are and I'll tell you who you are."

To classify a new point: find the **$k$ closest training points** and **vote by majority** (classification) or **average** (regression).

```python
from sklearn.neighbors import KNeighborsClassifier
knn = KNeighborsClassifier(n_neighbors=5).fit(X_train, y_train)
```

KNN is a **"lazy" model**: it learns no parameters and just **memorizes** the data; all computation happens at prediction time.

### Distance

$$
d_2(\mathbf{a},\mathbf{b}) = \sqrt{\sum_j (a_j-b_j)^2}\ \text{(Euclidean)},\qquad
d_1(\mathbf{a},\mathbf{b}) = \sum_j \lvert a_j-b_j\rvert\ \text{(Manhattan)}
$$

### Choosing $k$

| $k$ | Effect |
|---|---|
| Small ($k=1$) | A **jagged** boundary, noise-sensitive → **overfitting** |
| Large | A **smooth** boundary, may ignore small structure → **underfitting** |

Choose $k$ by cross-validation (usually odd to avoid ties).

### You MUST scale the features

KNN relies on distance so features with a **large scale dominate** the others. For example in wine: `proline` is in the hundreds while `hue` is under 2. Without scaling, KNN essentially looks only at `proline`. With `StandardScaler` accuracy can jump from ~70% to ~95%.

### Drawbacks

- **Slow at prediction** on big data (must compare with every training point).
- **Curse of dimensionality**: in many dimensions all points are "equally far apart", so distance loses meaning.
- Memory-hungry.

## Naive Bayes

Based on **Bayes' theorem** (Math lesson): for features $\mathbf{x}=(x_1,\dots,x_d)$,

$$
P(c\mid\mathbf{x}) \propto P(c)\prod_{j=1}^{d}P(x_j\mid c)
$$

"**Naive**" because it assumes the **features are conditionally independent** given the class. The assumption is usually false, yet the algorithm **works surprisingly well**.

It predicts the class with the largest posterior probability:

$$
\hat c = \arg\max_c\Big[\log P(c) + \sum_j\log P(x_j\mid c)\Big]
$$

(Logs avoid underflow when multiplying many small probabilities.)

### Text classification (spam)

Each email is a **bag of words**: counting each word's occurrences. **Multinomial Naive Bayes**:

```python
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

vec = CountVectorizer()
nb = MultinomialNB().fit(vec.fit_transform(texts), labels)
nb.predict(vec.transform(["free money prize"]))     # ['spam']
```

Words like "free", "prize" appear a lot in spam so they push $P(\text{spam}\mid\mathbf{x})$ up.

### Laplace smoothing

A word never seen in some class gives $P=0$ and **wipes out** the whole product. Add a constant $\alpha$ (default 1) to every count:

$$
P(x_j\mid c)=\frac{\text{count}(x_j,c)+\alpha}{\text{count}(c)+\alpha\,\lvert V\rvert}
$$

### Variants

| Variant | Features |
|---|---|
| `MultinomialNB` | Word counts, frequencies |
| `BernoulliNB` | Present/absent (binary) |
| `GaussianNB` | Real numbers (assumes normality per class) |

## Comparison

| | KNN | Naive Bayes |
|---|---|---|
| Training | Almost none | **Very fast** (just counting) |
| Prediction | Slow | **Very fast** |
| Needs scaling | **Yes** | No (with counts) |
| Suited to | Medium data, few dimensions | **Text**, high dimensions, a quick baseline |
