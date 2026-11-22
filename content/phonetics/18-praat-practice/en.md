# Hands-on with Praat

**Praat** (developed by Paul Boersma and David Weenink) is the standard free software for speech analysis, available from its official website (see References). This lesson is a set of **do-it-yourself tasks**: no scoring, each task just needs you to see the phenomenon.

If you don't have Praat installed, you can do much of it with the **live spectrogram tool** below (spectrogram and F0 only, no cursor measurement).

{{widget:spectrogram}}

## Preparation

1. Record in a **quiet** place, microphone about 10 to 15 cm from the mouth, and **don't speak too loudly** to avoid clipping.
2. Save the file at a **sampling rate of 22 kHz or higher** (commonly 44.1 kHz).
3. In Praat: open the file (*Open > Read from file*), select it and click **View & Edit**.

![The Praat window layout: waveform, spectrogram, F0 and formant tracks](/lessons/phonetics/18-praat-practice-fig-en.svg)
*The Praat window layout: waveform, spectrogram, F0 and formant tracks*

## Task 1: Measure the formants of three vowels

1. Record yourself saying *beet*, *father*, *boot* (or equivalent words).
2. Turn on the spectrogram (**Spectrum > Show spectrogram**). Defaults: view range 0 to 5000 Hz, window 0.005 s (wideband), dynamic range 50 dB.
3. Place the cursor in the **middle** of the steady part of the vowel. Turn on **Formant > Show formants** to see the red dots, or use **Formant > Formant listing** to read F1, F2, F3.
4. **Compare** with the Peterson and Barney table. Are your numbers different? If you are a woman or have a different voice, your formants may be **higher** (see the vowel lesson).

## Task 2: Measure VOT

1. Record yourself saying *pie*, *buy*, *tie*, *die* several times.
2. Zoom into the area around the initial consonant, showing the **waveform and spectrogram** together.
3. Place one cursor at the **release burst** and one at **where the vowel starts vibrating regularly**. The distance is the VOT. (Read the cursor time at the top of the window, or through the **Query** menu.)
4. Measure at least **5 times per word** and compare the mean between /p t/ and /b d/.

## Task 3: The F0 contour of a question and a statement

1. Record *You live in Hanoi.* and *You live in Hanoi?*
2. Turn on **Pitch > Show pitch**. Set the F0 range **to suit your voice** (men usually lower than women).
3. Compare the **shape of the F0 line** at the end of the two sentences.

## Task 4: Wideband and narrowband

1. Record yourself holding *aaaa* with **gradually changing** pitch.
2. Change the **window length** to 0.005 s and then 0.03 s (*Spectrum > Spectrogram settings*).
3. With a 0.005 s window notice the **formants** and the vertical striations. With 0.03 s notice the **harmonics** as horizontal lines curving with F0.

## Tips

- Save the settings you like for next time.
- Always state the **conditions** when reporting measurements: view range, window length, speaker, word measured.
- Numbers do not replace **listening back**: always listen to judge whether a measurement is plausible.

## References

- Boersma, P. & Weenink, D. *Praat: doing phonetics by computer*: https://www.fon.hum.uva.nl/praat/
- Praat manual, spectrogram settings: https://www.fon.hum.uva.nl/praat/manual/Intro_3_2__Configuring_the_spectrogram.html
- Johnson, K. *Acoustic and Auditory Phonetics* (3rd ed.). Wiley-Blackwell, 2012.
- MIT OpenCourseWare 24.915 Linguistic Phonetics (2015): https://ocw.mit.edu/courses/24-915-linguistic-phonetics-fall-2015/

Further reading online:
- [Praat manual: Intro](https://www.fon.hum.uva.nl/praat/manual/Intro.html)
