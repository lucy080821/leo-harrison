# Decision trees

A **decision tree** learns a sequence of **yes/no questions** about the features, like the game "20 questions". Very **easy to understand** and usable for both classification and regression.

```text
                [ petal length ≤ 2.45 ? ]
                  /                  \
           Yes: setosa          [ petal width ≤ 1.75 ? ]
                                 /              \
                    [ ... versicolor ]      [ ... virginica ]
```

Each **internal node** is a feature test, each **leaf** is a prediction.

## How to choose the best question?

At each node the algorithm **tries every feature and every threshold**, choosing the split that produces the two **"purest"** subgroups (mostly one class). It needs an **impurity measure**.

### Gini impurity

$$
G = 1 - \sum_{c}p_c^2
$$

where $p_c$ is the proportion of class $c$ in the node. $G=0$: a **pure** node (one class). Two classes 50/50: $G=0.5$ (most mixed).

### Entropy

$$
H = -\sum_c p_c\log_2 p_c
$$

(seen in the information-theory lesson). Entropy is 0 when pure, 1 bit for two classes 50/50.

### Information gain

Choose the split that **reduces impurity the most**:

$$
\text{Gain} = I(\text{parent}) - \sum_{k\in\{\text{left},\text{right}\}}\frac{N_k}{N}\,I(\text{child}_k)
$$

($I$ is Gini or entropy.) Repeat **recursively** on each branch until nodes are pure or a limit is reached.

```python
from sklearn.tree import DecisionTreeClassifier
tree = DecisionTreeClassifier(max_depth=3, random_state=0).fit(X_train, y_train)
```

## Too deep a tree → overfitting

Without limits the tree keeps splitting until **each leaf holds a single sample**: it memorizes even the noise, 100% on train but poor on test. Control it with **hyperparameters**:

| Parameter | Effect |
|---|---|
| `max_depth` | Maximum depth |
| `min_samples_split` | Minimum samples to split a node |
| `min_samples_leaf` | Minimum samples in a leaf |
| `max_leaf_nodes` | Maximum number of leaves |
| `ccp_alpha` | **Pruning** after training |

## Regression trees

A leaf predicts the **mean** of the samples in it; splits minimize **MSE**. The prediction function is a **step function**.

## Feature importance

```python
tree.feature_importances_       # total impurity reduction each feature contributes, sums to 1
```

Shows **which features are most useful** (note: biased toward features with many distinct values).

## Printing a tree as text

```python
from sklearn.tree import export_text
print(export_text(tree, feature_names=feature_names))
```

## Strengths and weaknesses

| Strengths | Weaknesses |
|---|---|
| **Easy to interpret** (printable as rules) | **Overfits very easily** |
| No feature scaling needed | **Unstable**: small data changes can change the tree a lot |
| Handles numeric and categorical features | "Staircase" boundaries perpendicular to the axes |
| Captures **non-linear** relationships and **interactions** | Non-smooth predictions |

The biggest weakness (high variance) is **fixed by ensembles**: the next lesson (Random Forest, Gradient Boosting).
