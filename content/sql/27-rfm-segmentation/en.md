# RFM customer segmentation

Not all customers are alike. **RFM** is the classic segmentation of database marketing, using three numbers derived from purchase history:

- **R (Recency)**: how long since the latest purchase (smaller is better).
- **F (Frequency)**: how many times they bought.
- **M (Monetary)**: total money spent.

## The steps

1. **Compute R, F, M** per customer (`GROUP BY user_id`): `julianday(cutoff) − julianday(MAX(purchase_date))`, `COUNT(*)`, `SUM(amount)`.
2. **Score** each metric with `NTILE(n)` (usually n = 3–5). Note R **runs the other way**: fewer days = higher score.
3. **Name the segments** from the score combinations, for example:
   - High R, high F, high M: **Champions**.
   - High R, low F: **New customers**.
   - Low R, previously high F/M: **At risk** (needs a win-back campaign).
   - Low R, F, M: **Lost**.

![RFM customer segmentation with NTILE](/lessons/sql/27-rfm-segmentation-fig-en.svg)
*RFM customer segmentation with NTILE*

## Acting on RFM

A strategy per segment: reward champions, win-back offers for "at risk", no budget for the lost. Measure results with A/B tests.

## Limitations

- It sees only **purchase behaviour**, ignoring demographics and products.
- NTILE cuts evenly by **rank**, not by true distance; you may use business-defined thresholds.
- With many tied values NTILE is **unstable**: add a tie-breaker (`ORDER BY monetary DESC, user_id`) so results are deterministic.

## References

- Hughes, A. M. (1994). *Strategic Database Marketing*.
- Fader, P., Hardie, B., Lee, K. L. (2005). RFM and CLV: using iso-value curves for customer base analysis. *Journal of Marketing Research* 42(4).
- SQLite documentation, "Window Functions" (NTILE).

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
