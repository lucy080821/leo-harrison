# Recommender basics: cosine similarity and collaborative filtering

"People who bought A also bought B": recommendations of products, films and songs drive much of the revenue/watch time at Amazon, Netflix and Spotify. The core is **collaborative filtering**: learning from the behaviour of many people.

## Data: the user × item matrix

Rows are users, columns are items; a cell is an **interaction** (bought = 1, or a rating, or a view count). The matrix is usually **very sparse** (each person touches only a few items).

![Cosine similarity between items based on shared buyers](/lessons/machine-learning/23-recommender-basics-fig-en.svg)
*Cosine similarity between items based on shared buyers*

## Cosine similarity

Two items are alike if **the same users** interact with them:

`cos(a, b) = a·b / (‖a‖ ‖b‖)`, in [0, 1] for non-negative data. It uses angle rather than distance so it is **not swayed by popularity**.

## Two directions

| Approach | Idea | Traits |
|---|---|---|
| **Item-based** | suggest items like those you used | stable, easy to explain, fast to serve |
| **User-based** | find people like you, take what they liked | sensitive to changing tastes |
| **Matrix factorisation** (SVD, ALS) | learn latent vectors for users and items | strong on sparse data, scales well |
| **Content-based** | use item attributes | solves cold start |

## Practical problems

- **Cold start**: new users/items lack history ⇒ use content, popularity, ask preferences.
- **Popularity bias**: recommending only bestsellers; add diversity and exploration.
- **Implicit feedback** (views, clicks) instead of star ratings: there is no explicit "dislike".

## Evaluation

Hide part of the interactions and test whether the model recommends them back: **precision@k, recall@k, NDCG, MAP**. Split **by time**, as in forecasting. Ultimately decide with an **A/B test** on a business metric.

## References

- Koren, Bell, Volinsky (2009). Matrix factorization techniques for recommender systems. *IEEE Computer* 42(8).
- Sarwar et al. (2001). Item-based collaborative filtering recommendation algorithms. *WWW*.
- Aggarwal, C. *Recommender Systems: The Textbook* (Springer).
