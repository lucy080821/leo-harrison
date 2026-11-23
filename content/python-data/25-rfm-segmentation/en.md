# Customer segmentation with RFM

Not all customers should be treated alike. **RFM** is the classic behavioural segmentation technique in marketing:

| Letter | Meaning | Question |
|---|---|---|
| **R**ecency | days since the latest purchase | Still "warm"? |
| **F**requency | number of purchases | Buys often? |
| **M**onetary | total spend | How valuable? |

![RFM scoring splits customers into actionable segments](/lessons/python-data/25-rfm-segmentation-fig-en.svg)
*RFM scoring splits customers into actionable segments*

## Workflow

1. **Clean** (drop duplicate orders) and pick a **reference date** (last date + 1).
2. `groupby(customer).agg(...)` produces R, F, M.
3. **Score 1–4** with `pd.qcut` (quartiles). R is reversed because *small is good*.
4. Combine into **named segments** and attach actions.

## Segments and suggested actions

| Segment | Rule | Action |
|---|---|---|
| Champions | high R, F and M | reward, ask for referrals |
| At risk | used to buy a lot, gone quiet | "we miss you" campaign, offer |
| New | high R, low F | onboarding, nudge a second purchase |
| Hibernating | low R, low F | weigh the reactivation cost |

## Notes

- `qcut` fails with too many tied values: apply `rank(method="first")` first.
- Score thresholds must **fit the industry** (weekly coffee differs from furniture bought every 5 years).
- RFM describes the past; to **predict** future value use models (BG/NBD, regression).

## References

- Hughes, A. M. (1994). *Strategic Database Marketing*.
- pandas documentation, `qcut`.
- Fader & Hardie, papers on CLV models (BG/NBD).
