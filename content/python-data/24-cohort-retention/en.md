# Cohort analysis and user retention

An overall average hides trends. A **cohort** is a group of users sharing a starting trait (usually signup month). Comparing cohorts shows whether the product is **getting better or worse**.

## Three steps

1. **Assign the cohort**: each user's signup month (`dt.to_period("M")`).
2. **Compute age**: months from signup to each event (month 0, 1, 2…).
3. **Count distinct users** active by (cohort, age), then **divide by cohort size**.

![A retention matrix by signup-month cohort](/lessons/python-data/24-cohort-retention-fig-en.svg)
*A retention matrix by signup-month cohort*

## Reading the retention matrix

- Row = cohort, column = month k; cell = % of people still active.
- **Column 0 near 100%** (active in the signup month). A curve that drops and then **flattens** signals loyal users.
- Compare **the same column across rows**: do newer cohorts retain better than older ones? That is the effect of product improvements.

## Data caveats

- Events for users **missing from the users table** (orphans) break the join: remove and report them.
- The latest cohorts lack observation time: **don't** compare cells that haven't aged enough.
- Define "active" clearly (any event, or only valuable ones?).

## References

- pandas documentation, `Period`, `groupby`, `unstack`.
- Croll & Yoskovitz. *Lean Analytics*, the retention chapter.
- Learn With Leo's SQL course, cohort analysis lesson (the same method in SQL).
