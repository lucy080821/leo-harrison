# Spectrum and spectrogram

## From waveform to spectrum

A waveform shows pressure over **time** but it is hard to see which **frequencies** carry energy. A **spectrum** shows the reverse: at a **moment**, how energy is distributed across frequency. The mathematical tool is the **Fourier transform** (the FFT on computers).

## The spectrogram

A **spectrogram** stacks many successive spectra:

- Horizontal axis: **time**.
- Vertical axis: **frequency** (usually 0 to 5000 Hz for speech).
- Darkness or colour: the **energy** at that time and frequency (darker means stronger).

A spectrogram lets you **see** speech: vowels appear as horizontal bands, frication as a "fuzzy" area at high frequencies, the silent closure of a stop as a white gap.

## Wideband and narrowband

A spectrogram is computed with a sliding time **window** over the signal. The window length creates an unavoidable **trade-off**:

- **Short window** (about **5 ms**): accurate in time, less accurate in frequency. This gives a **wideband** spectrogram, bandwidth about **260 Hz**. We see **formants** as dark bands and **glottal pulses** as vertical striations.
- **Long window** (about **30 ms**): accurate in frequency, less accurate in time. This gives a **narrowband** spectrogram, bandwidth about **43 Hz**. We see each **harmonic** of F0 as a horizontal line, and the path of F0 through their curvature.

These values are the defaults of the **Praat** software (view range 0 to 5000 Hz, dynamic range 50 dB).


![Broadband and narrowband spectrograms](/phonetics/broad-vs-narrow.png)
*Figure 3.4. The same vowel with falling F0: wideband (5 ms, left) shows formants; narrowband (30 ms, right) shows individual harmonics.*

## Quick reading guide

| What you see | Meaning |
|---|---|
| Dark horizontal bands (wideband) | formants of a vowel or vowel-like sound |
| Regular vertical striations (wideband) | glottal pulses: a **voiced** sound |
| Stacked horizontal lines (narrowband) | harmonics; the spacing between lines = F0 |
| A "grey noise" area above 3000 Hz | frication like `/s/` |
| A white gap then a short dark smear | a stop: closure then release (burst) |
| A low dark bar near the bottom | voicing during closure (e.g. `/b/`, nasals) |

## An experiment tool: the live spectrogram

The tool below draws a spectrogram **live from your microphone** or from an **audio file** you choose (including a recording of a model voice). Pick **wideband** or **narrowband** to compare. The blue line below is **F0**. The sound **never leaves your browser**.

{{widget:spectrogram}}

Suggestions:
1. Say *aaaa* then *eeee*, *oooo* in wideband and watch the formant bands move.
2. Switch to narrowband and say *aaaa* with rising and falling pitch to see the harmonic lines curve with F0.
3. Say *sssss* then *zzzzz*: `/z/` adds vertical striations (from vocal fold vibration) on top of the noise.

## References

- Johnson, K. *Acoustic and Auditory Phonetics* (3rd ed.). Wiley-Blackwell, 2012.
- Ladefoged, P. & Johnson, K. *A Course in Phonetics* (7th ed.). Cengage, 2015.
- Stevens, K. N. *Acoustic Phonetics*. MIT Press, 1999.
- Praat manual, spectrogram settings: https://www.fon.hum.uva.nl/praat/manual/Intro_3_2__Configuring_the_spectrogram.html

Further reading online:
- [Spectrogram](https://en.wikipedia.org/wiki/Spectrogram)
- [Praat: viewing a spectrogram](https://www.fon.hum.uva.nl/praat/manual/Intro_3_1__Viewing_a_spectrogram.html)
