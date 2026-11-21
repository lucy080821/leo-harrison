# Sound waves: frequency, amplitude and spectrum

This module moves from **how sounds are made** to **the sound that arrives**. We need a few physics ideas, and we keep them at an "enough to understand" level with numerical examples.

## What is sound?

Sound is **pressure oscillation** travelling through the air. A microphone measures pressure over time and gives a **waveform**: time on the horizontal axis, pressure (amplitude) on the vertical.

## Sine waves: two parameters


![Sine waves](/phonetics/sine-freq-amp.svg)
*Figure 3.2. Frequency and amplitude of sine waves.*

- **Frequency** (unit **Hz** = cycles per second): heard as **pitch**.
- The **period** T is the time of one cycle: **T = 1/f**. A 100 Hz wave has a period of 0.01 s = 10 ms.
- **Amplitude**: the size of the oscillation, heard as **loudness**.

## Periodic and aperiodic waves


![Periodic and aperiodic waves](/phonetics/wave-types.svg)
*Figure 3.1. A periodic wave (top) and an aperiodic wave (bottom).*

- **Periodic**: the pattern repeats. Vowels and voiced consonants are periodic because the vocal folds vibrate regularly.
- **Aperiodic**: no repetition, like the noise of `/s/` or the burst of `/t/`.

## Complex waves and harmonics

A complex periodic wave can be seen as the **sum of many sine waves** whose frequencies are **integer multiples** of the fundamental frequency (Fourier's idea). With F0 = 120 Hz the **harmonics** are 120, 240, 360, 480 Hz and so on. Showing energy against frequency is called a **spectrum**.

## The decibel (dB) scale

The ear has a huge range, so we use a **logarithmic** scale. Level in **dB**:

- Based on pressure amplitude: **dB = 20·log10(A/A0)**.
- Doubling the amplitude is about **+6 dB**. A factor of 10 is **+20 dB**.

dB is a **ratio** to a reference level, so you must always say what the reference is (for example dB SPL for sound pressure).

## Digital sound

Computers store sound by **sampling** the pressure many times per second. The higher the **sampling rate**, the higher the frequencies that can be captured: the highest frequency is **half** the sampling rate (the **Nyquist frequency**). For example 16 kHz sampling captures up to 8 kHz, and 44.1 kHz up to about 22 kHz. Speech has much energy from a few hundred Hz to a few kHz; for analysis record at 22 kHz or above and **avoid clipping** from recording too loudly.

## Try it

In the next lesson on the **spectrogram** you will see these harmonics on screen with a narrowband spectrogram.

## References

- Johnson, K. *Acoustic and Auditory Phonetics* (3rd ed.). Wiley-Blackwell, 2012.
- Ladefoged, P. & Johnson, K. *A Course in Phonetics* (7th ed.). Cengage, 2015.
- Stevens, K. N. *Acoustic Phonetics*. MIT Press, 1999.
- MIT OpenCourseWare 24.915 Linguistic Phonetics (2015): https://ocw.mit.edu/courses/24-915-linguistic-phonetics-fall-2015/
