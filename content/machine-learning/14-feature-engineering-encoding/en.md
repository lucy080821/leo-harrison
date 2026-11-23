# Features: encoding categoricals, scaling and ColumnTransformer

*"Data and features set the upper limit of machine learning; models merely try to approach it."* On tabular data, **feature engineering** often gives more than switching algorithms.

## Encoding categorical variables

| Type | How | When |
|---|---|---|
| **One-hot** | one 0/1 column per value | **unordered** categories (region, colour) |
| **Ordinal** | numbers in order (S<M<L) | **ordered** categories |
| **Target/frequency encoding** | replace with a statistic | very many values (zip codes), careful about leakage |

Don't number unordered categories 0,1,2: a linear model would read "North < Central < South".

![ColumnTransformer treats each group of columns differently](/lessons/machine-learning/14-feature-engineering-encoding-fig-en.svg)
*ColumnTransformer treats each group of columns differently*

## Scaling numbers

`StandardScaler` (subtract the mean, divide by the standard deviation) is needed for **KNN, SVM, regularised regression, neural networks, PCA**. Decision trees and forests **don't need it**.

## Features from dates and times

Month, weekday, weekend, quarter, days since the previous event. Cycles (hour 23 is close to hour 0) can be encoded with `sin/cos`.

## `ColumnTransformer` + `Pipeline`

One treatment per group of columns, bundled with the model. The biggest benefit: **fitting only on the training set** so there is no leakage, and deployment needs one object. `handle_unknown="ignore"` avoids errors on unseen categories.

## Pitfalls

- **Leakage**: fitting a scaler/encoder on all data before splitting.
- Dummy-variable trap: full k one-hot columns are collinear with an intercept (`drop="first"` if needed).
- Too many one-hot columns with a small sample causes overfitting.

## References

- scikit-learn User Guide, "Preprocessing data" and "ColumnTransformer".
- Kuhn & Johnson. *Feature Engineering and Selection* (CRC Press, 2019), free online.
