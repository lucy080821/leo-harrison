# Intonation and the ToBI labelling system

## What is intonation?

**Intonation** is the variation of **F0** over units larger than the word. It has many functions:

- **Grammatical**: separating questions from statements (*You're coming?* versus *You're coming.*).
- **Information / focus**: highlighting the most important word of the sentence.
- **Attitude / emotion**: surprise, doubt, certainty.
- **Discourse segmentation**: dividing speech into chunks, signalling whether it is finished or continues.

## Unlike tones

In Vietnamese, pitch **belongs to each syllable** and changes the meaning of the word (*ma, má, mà...*). In English, pitch **does not change a word's meaning** but **adds meaning to the whole utterance**. Many languages have **both** (tone at word level and intonation at sentence level): Vietnamese also has intonation, laid over its tones.

## The British school: head, nucleus, tail

The traditional description (Halliday, Crystal, O'Connor and Arnold, Roach) divides an **intonation phrase** into:

- **Head**: from the first stressed syllable up to the nucleus.
- **Nucleus**: the last stressed syllable, where the **main pitch movement** occurs.
- **Tail**: whatever follows the nucleus.

The nucleus carries the **tones**: **fall**, **rise**, **fall-rise**, **rise-fall**. For example *Where do you live?* usually has a falling nucleus on *live*, while *Do you live in Hanoi?* usually has a rising nucleus on *Hanoi*.

## The autosegmental-metrical model and ToBI

The modern approach (*autosegmental-metrical*, beginning with Pierrehumbert) treats the F0 contour as **a sequence of high (H) and low (L) targets** aligned with positions in the utterance, with **interpolation** between them. **ToBI** (*Tones and Break Indices*) is a set of conventions for labelling in this model, originally for American English (Beckman and Pierrehumbert).


![Pitch contours with ToBI labels](/phonetics/tobi-contours.svg)
*Figure 5.1. Schematic F0 contours with ToBI labels for three utterances (illustrative).*

### The main labels

| Label | Type | Meaning |
|---|---|---|
| **H\*** | pitch accent | a high peak aligned with the stressed syllable |
| **L\*** | pitch accent | a low trough aligned with the stressed syllable |
| **L+H\*** | pitch accent | a rise reaching the peak on the stressed syllable |
| **L\*+H** | pitch accent | a trough on the stressed syllable followed by a rise |
| **H-**, **L-** | phrase accent | from the last pitch accent to the edge of an intermediate phrase |
| **H%**, **L%** | boundary tone | high or low at the edge of an intonation phrase |

Full example sequences: *You live in Hanoi.* is **H\* L-L%** (a peak on *Ha-*, then falling low and ending low). The question *Do you live in Hanoi?* is typically **L\* H-H%** (a trough on *Ha-*, then rising high to the end).

### Break indices

ToBI also records the strength of the "break" between words:

| Index | Meaning |
|---|---|
| 0 | complete cohesion (clitic) |
| 1 | ordinary word boundary |
| 2 | boundary with no intonational effect |
| 3 | intermediate phrase (with H- or L-) |
| 4 | full intonation phrase (with H% or L%) |

## Variants and limits

ToBI has been extended to many languages and accents: **J-ToBI** (Japanese), **ToDI** (Dutch), **IViE** (British English). Each system must be built specially for its language, because **intonation is language-specific**: the same pitch shape can mean different things across languages and accents.

## Experiment

Record the sentences in the figure with the spectrogram tool and compare with the model F0 contours: can you see the **H\* peak** on the stressed syllable?

{{widget:spectrogram}}

## References

- Roach, P. *English Phonetics and Phonology: A Practical Course* (4th ed.). Cambridge University Press, 2009.
- Cruttenden, A. *Gimson's Pronunciation of English* (8th ed.). Routledge, 2014.
- Ladefoged, P. & Johnson, K. *A Course in Phonetics* (7th ed.). Cengage, 2015.
- Pierrehumbert, J. B. (1980). *The Phonology and Phonetics of English Intonation*. PhD thesis, MIT.
- Beckman, M. E. & Pierrehumbert, J. B. (1986). Intonational structure in Japanese and English. *Phonology Yearbook* 3, 255-309.

Further reading online:
- [ToBI](https://en.wikipedia.org/wiki/ToBI)
- [Intonation (linguistics)](https://en.wikipedia.org/wiki/Intonation_(linguistics))
