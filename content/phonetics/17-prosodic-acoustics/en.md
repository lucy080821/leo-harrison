# Acoustics of prosody: F0, duration and intensity

Stress, intonation, rhythm and tone all appear through three acoustic quantities: **F0**, **intensity** and **duration**.

## Three quantities and their perception

| Acoustic quantity | Perception |
|---|---|
| **F0** (fundamental frequency) | **pitch** |
| **Intensity** (amplitude, dB) | **loudness** |
| **Duration** (ms) | **length** |

Note: these are **measurable** quantities, while the "perception" is the listener's response and is not linearly related (see module 4).

## F0 of the voice

Mean F0 **differs between speaker groups**: men are usually lower than women, children higher. For example the speaking F0 of adult men is often around **100 to 120 Hz** and of women around **190 to 220 Hz** (these are **approximate** values; for precise figures by age group see Titze 1989 and Baken and Orlikoff 2000). Another often-cited summary lists means of about 106 Hz (men) and 193 Hz (women) for a sustained /a/, which shows that measurements depend on the **speaking task**.

## Semitones: measuring pitch the way the ear hears it

The ear hears pitch by ratio (doubling the frequency is one octave), so when comparing pitch ranges we convert to **semitones**:

**ST = 12 · log₂(f₂ / f₁)**

| From | To | Difference |
|---|---|---|
| 100 Hz | 200 Hz | **12 ST** (one octave) |
| 100 Hz | 150 Hz | about **7 ST** |
| 200 Hz | 300 Hz | about **7 ST** |

A rise of **50 Hz** from 100 → 150 Hz is about **7 ST**, but 200 → 250 Hz is only about **3.9 ST**: equal in Hz, different in **perception**. Conversely 100 → 150 and 200 → 300 (the same ratio of 1.5) are both about 7 ST. Using semitones makes comparing men and women fairer.

## Stress in English

There is no single cue. A stressed syllable typically has a combination of:

- **Higher F0** or a pitch movement (especially when the word carries sentence focus).
- Greater **duration**.
- Greater **intensity**.
- A **clear vowel quality** instead of reduction to `/ə/`.

Among these, duration and vowel quality are often regarded as very reliable, while F0 depends on whether the word carries sentence stress.

## Pitfalls in F0 tracking

- **Octave errors**: the algorithm picks an F0 double or half the real value. Common with creaky voice or weak signals.
- **Creaky voice**: irregular vibration, which algorithms may miss.
- **Voiceless stretches**: no F0, so the pitch line breaks (this is normal).
- **Search range**: set the F0 search range (floor and ceiling) **to suit the speaker**; too wide invites errors.

## Try it with the tool

The blue line under the spectrogram in the previous lesson is F0 computed by **autocorrelation**. Say the question *Really?* and the statement *Really.* to see the F0 line rise at the end of the question and fall at the end of the statement.

{{widget:spectrogram}}

## References

- Titze, I. R. (1989). Physiologic and acoustic differences between male and female voices. *Journal of the Acoustical Society of America* 85, 1699-1707.
- Baken, R. J. & Orlikoff, R. F. *Clinical Measurement of Speech and Voice* (2nd ed.). Singular, 2000.
- Johnson, K. *Acoustic and Auditory Phonetics* (3rd ed.). Wiley-Blackwell, 2012.
- Ladefoged, P. & Johnson, K. *A Course in Phonetics* (7th ed.). Cengage, 2015.
- Roach, P. *English Phonetics and Phonology: A Practical Course* (4th ed.). Cambridge University Press, 2009.
- Cruttenden, A. *Gimson's Pronunciation of English* (8th ed.). Routledge, 2014.
