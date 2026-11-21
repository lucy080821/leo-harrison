# The source-filter model and formants

## The main idea

Speech can be seen as two **separable** parts:

- The **source**: produces the raw sound, usually vocal fold vibration or frication noise.
- The **filter**: the supralaryngeal tract, which **shapes** the spectrum of the source.

This idea was spelled out for vowels by Chiba and Kajiyama (1942) and **systematised by Gunnar Fant** in *Acoustic Theory of Speech Production* (1960). It is an **approximation**, but an extremely useful one. It corresponds to the distinction between **phonation** (source) and **articulation** (filter) from module 2.


![Source-filter model](/phonetics/source-filter.svg)
*Figure 3.3. The source-filter model: harmonics of the source (left), the vocal tract filter (middle) and the result (right).*

## The source

- **Voiced source**: the vocal folds vibrate, producing a train of air pulses. Its spectrum consists of **harmonics** at F0, 2F0, 3F0... with energy **falling** as frequency rises, roughly **−12 dB per octave** (spectral tilt).
- **Noise source**: air through a narrow gap creates turbulence (as in `/s/`, `/ʃ/`), a continuous spectrum without harmonics.
- **F0** determines **pitch**, not which vowel it is.

## The filter: formants

The mouth-throat cavity is a **resonating tube**. It **amplifies** the harmonics near its **resonant frequencies** and weakens the others. Each resonance peak is called a **formant** (**F1, F2, F3**... from low to high). **A formant is a broad spectral peak caused by a resonance of the vocal tract.** The shape of the tract (tongue position, lips) determines the formant frequencies, so each vowel has its own formant "signature".

## A worked example: a simple tube

Treat /ə/ as a **uniform tube** closed at the glottis and open at the lips, of length **L = 17.5 cm**, with the speed of sound **c ≈ 35,000 cm/s**. The resonances are:

**Fₙ = (2n − 1) · c / (4L)**

| n | Formula | Result |
|---|---|---|
| 1 | c/(4L) = 35000/70 | **500 Hz** |
| 2 | 3·c/(4L) | **1500 Hz** |
| 3 | 5·c/(4L) | **2500 Hz** |

That is the approximate F1, F2, F3 of a neutral vowel. When the shape of the tube changes (lowering the tongue, rounding the lips) these values shift.

## Two consequences

1. **F0 and formants are independent**: you can say the same vowel [a] at many pitches and the formants stay about the same; only the density of harmonics changes.
2. **Vocal tract length**: people with a shorter tract (such as women and children) have **higher** formants, so the same vowel has different measurements across speaker groups (see the next lessons).

## An experiment tool

The tool below is a **vowel synthesiser** using exactly this model: the source is a train of harmonics, the filter is three formants. **Drag the dot** on the F1-F2 chart (or use the sliders) and hear the vowel change, while the right-hand graph shows the source harmonics being shaped by the filter envelope. Press **▶ Play** to listen (keep the volume moderate).

{{widget:vowel-lab}}

Try this: press the symbols `i`, `ɑ`, `u` in turn and hear the difference; then keep F1 and F2 fixed and drag F0 up and down to hear pitch change while the vowel stays the same.

## References

- Fant, G. *Acoustic Theory of Speech Production*. Mouton, 1960 (2nd ed. 1970).
- Stevens, K. N. *Acoustic Phonetics*. MIT Press, 1999.
- Johnson, K. *Acoustic and Auditory Phonetics* (3rd ed.). Wiley-Blackwell, 2012.
- Ladefoged, P. & Johnson, K. *A Course in Phonetics* (7th ed.). Cengage, 2015.
- Titze, I. R. (1989). Physiologic and acoustic differences between male and female voices. *Journal of the Acoustical Society of America* 85, 1699-1707.
- Baken, R. J. & Orlikoff, R. F. *Clinical Measurement of Speech and Voice* (2nd ed.). Singular, 2000.

Further reading online:
- [Formant](https://en.wikipedia.org/wiki/Formant)
- [Source-filter model](https://en.wikipedia.org/wiki/Source%E2%80%93filter_model)
