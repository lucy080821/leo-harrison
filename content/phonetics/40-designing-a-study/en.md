# Designing a small phonetic study

This lesson connects with the **methods** part of university courses (MIT 24.915 and UNC LING 520 both include experimental design and statistics). The goal: you can run a **very small** but **rigorous** study.

## 1. The research question

Choose a **specific, measurable** question, small enough to answer. For example:

- Does the VOT of word-initial English /t/ for a Vietnamese learner **differ** from the VOT of /d/?
- **How far apart** are F1 of /ɪ/ and /iː/ in a group of learners?
- **How do** the vowel durations in *bat* and *bad* differ?

![The workflow of a small phonetic study](/lessons/phonetics/40-designing-a-study-fig-en.svg)
*The workflow of a small phonetic study*

## 2. The hypothesis

A prediction that can be **wrong**. For example: "The VOT of /t/ is at least 30 ms longer than that of /d/." The hypothesis tells you **what to measure** and **what to compare**.

## 3. Participants and ethics

- A **small but clearly stated** number (for example 5 people).
- Obtain **informed consent**, explain the purpose, allow withdrawal, protect identity.
- Record necessary information (age, gender, first language, region).

## 4. Target words and carrier phrase

- Choose target words with **the same conditions** except the factor being compared (for example *tie* and *die*, same vowel).
- Put them in a **carrier phrase** such as "Say ___ again." so stress and context are alike.
- **Repeat** many times (for example 5 to 10 times per word) and **randomise** the order.

## 5. Recording

- A **quiet** room, microphone about 10 to 15 cm away, **no clipping**.
- Sampling rate **22 kHz or higher**, saved uncompressed (WAV).
- Note the equipment and conditions.

## 6. Annotation and measurement

In Praat use a **TextGrid** to mark landmarks (release burst, vowel onset, vowel midpoint). **The measurement rules must be written down** first (for example: VOT from the burst to the first regular vibration cycle) and applied **consistently**. If possible, have a second person re-measure part of the data to check reliability.

## 7. Analysis

With small data:

- Compute **means**, **standard deviations** and **ranges**; draw **plots** (box or dot).
- Be careful with **statistical tests** on small samples; you may only report **descriptives** and state the limits.
- Look at **each person** and not only the overall mean.

## 8. Reporting

State: the question, hypothesis, participants, target words, **how you measured** (possibly with spectrogram figures), results (with **units**) and **limitations**. Don't over-conclude from a few people.

## Example: VOT of /t/ in Vietnamese learners

A sample design (no result given, so you can measure it yourself):

| Element | Choice |
|---|---|
| Question | How does the VOT of word-initial /t/ differ from that of /d/ in Vietnamese learners? |
| Target words | *tie, tea, two, die, deep, do* |
| Carrier phrase | "Say ___ again." |
| Repetitions | 5 per word |
| Measure | VOT (ms) in Praat |
| Comparison | mean VOT of /t/ and /d/ for each person |

A further question you might ask: is the learners' /t/ VOT closer to Vietnamese `/tʰ/` or to the aspirated English /t/? Vietnamese has an unaspirated `/t/` and an aspirated `/tʰ/` (see the Vietnamese lesson), so this is an interesting question.

## References

- Johnson, K. *Acoustic and Auditory Phonetics* (3rd ed.). Wiley-Blackwell, 2012.
- MIT OpenCourseWare 24.915 Linguistic Phonetics (2015): https://ocw.mit.edu/courses/24-915-linguistic-phonetics-fall-2015/
- Boersma, P. & Weenink, D. *Praat: doing phonetics by computer*: https://www.fon.hum.uva.nl/praat/
- Lisker, L. & Abramson, A. S. (1964). A cross-language study of voicing in initial stops: acoustical measurements. *Word* 20, 384-422.
- Cho, T. & Ladefoged, P. (1999). Variation and universals in VOT: evidence from 18 languages. *Journal of Phonetics* 27, 207-229.
- Abramson, A. S. & Whalen, D. H. (2017). Voice Onset Time (VOT) at 50: theoretical and practical issues in measuring voicing distinctions. *Journal of Phonetics* 63, 75-86.
- Boersma, P. & Weenink, D. Praat manual, TextGrids and annotation: https://www.fon.hum.uva.nl/praat/manual/Intro.html
