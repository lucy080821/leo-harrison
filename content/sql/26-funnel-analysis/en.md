# Funnel analysis

The path to purchase is a chain of steps: **view → add to cart → checkout → buy**. At each step we lose some users. **Funnel analysis** measures how many and **where**, so you know what to fix first.

## How to measure

- **Users reaching step k**: `COUNT(DISTINCT user_id)` of events of that step.
- **Next-step rate**: users(k+1) / users(k).
- **Overall rate**: users(k) / users(step 1).
- **Drop-off** = 1 − next-step rate.

![Conversion funnel: view → cart → checkout → purchase](/lessons/sql/26-funnel-analysis-fig-en.svg)
*Conversion funnel: view → cart → checkout → purchase*

## Two ways to compute

1. **Simple funnel** (count by event type): fast and enough for an overview, but a user may "buy" with no "cart" event if data is missing.
2. **Sequential funnel** (each step must occur **after** the previous one within a window, e.g. 7 days): more accurate; use a self-join/`EXISTS` or window functions on events.

## Segmentation

More important than the overall number is **comparison**: funnels by channel, device, country, page version. Two channels with the same number of viewers but different cart→purchase rates reveal different traffic quality.

## Reading it correctly

- The step with the **biggest drop** is not necessarily the one to fix; consider **opportunity** (users × feasible improvement).
- Beware **survivorship bias** when comparing groups that passed many steps.
- Combine with interviews/surveys: data shows **where**, not **why**.

## References

- Croll, A. & Yoskovitz, B. *Lean Analytics*, the chapters on funnels.
- Kaushik, A. *Web Analytics 2.0*.
- Google Analytics Help: "Funnel exploration".

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
