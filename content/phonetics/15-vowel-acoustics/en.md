# The acoustics of vowels

## F1 and F2 relate to articulation

Recall from the source-filter lesson: formants are determined by the **shape of the vocal tract**. Two basic relations (described by Ladefoged and many others):

- **F1** relates to **height**: **open** vowels (low tongue) have **high** F1; **close** vowels have **low** F1.
- **F2** relates to **backness**: **front** vowels have **high** F2; **back** vowels have **low** F2.
- **Lip rounding** **lowers** formants (F1 and F2 of back vowels, F2 and F3 of front vowels), because rounding lengthens the tube.

These are **statistical** tendencies, not one-to-one relations: tongue position and formants do not correspond point for point.

## Benchmark data: Peterson and Barney (1952)

A classic study measuring formants of American English vowels. Below are the **mean values for male speakers** (Hz), taken from a widely reproduced summary table (Cook 1999):

| Vowel | Example | F1 | F2 | F3 |
|---|---|---|---|---|
| `/i/` | beet | 270 | 2290 | 3010 |
| `/ɪ/` | bit | 390 | 1990 | 2550 |
| `/ɛ/` | bet | 530 | 1840 | 2480 |
| `/æ/` | bat | 660 | 1720 | 2410 |
| `/ɑ/` | father | 730 | 1090 | 2440 |
| `/ɔ/` | bought | 570 | 840 | 2410 |
| `/ʊ/` | book | 440 | 1020 | 2240 |
| `/u/` | boot | 300 | 870 | 2240 |
| `/ʌ/` | but | 640 | 1190 | 2390 |
| `/ɝ/` | bird | 490 | 1350 | 1690 |

From the table you see: F1 rises from `/i/` (270) to `/ɑ/` (730), F2 falls from `/i/` (2290) to `/u/` (870), and **F3 of `/ɝ/` is unusually low** (1690).


![Vowel space F1-F2](/phonetics/vowel-space-pb.svg)
*Figure 3.5. F1-F2 chart of male speech (Peterson and Barney 1952). The axes are reversed to resemble the IPA vowel chart.*

When F2 (horizontal, reversed) and F1 (vertical, reversed) are plotted, the vowels arrange themselves very much like the **IPA vowel chart**. That is why phoneticians use the F1-F2 chart as a "map" of vowels with measurable units. (Catford also uses the difference **F2 − F1** to correspond to backness.)


![Synthetic vowel spectrograms](/phonetics/vowel-spectrograms.png)
*Figure 3.6. Wideband spectrograms of three synthetic vowels [i a u]: the red marks are F1, F2, F3.*

## Differences between speakers

The data above are **male voices**. Women and children have shorter tracts so their formants are **higher** for the same vowel. Hillenbrand and colleagues (1995) repeated the Peterson and Barney experiment with speakers from the northern Midwest of the United States and showed variation across speakers but also some differences in mean values. Therefore:

- **Do not compare** male and female measurements directly.
- To study many speakers, you need **speaker normalisation**, for example converting to the Bark scale or normalising per speaker.

A vowel also has no fixed value: formants **change during the vowel**, so measurements are usually taken at the **midpoint** or at several points (20%, 50%, 80% of the duration, as in Hillenbrand).

## Experiment

The tool below is the synthesiser from the previous lesson. Press the vowels in the table in turn and check your impression: `i` (low F1, high F2) sounds "small, bright"; `u` (low F1, low F2) sounds "dark, round"; `ɑ` (high F1) sounds "open".

{{widget:vowel-lab}}

## References

- Peterson, G. E. & Barney, H. L. (1952). Control methods used in a study of the vowels. *Journal of the Acoustical Society of America* 24, 175-184.
- Hillenbrand, J. et al. (1995). Acoustic characteristics of American English vowels. *Journal of the Acoustical Society of America* 97, 3099-3111. doi:10.1121/1.411872
- Ladefoged, P. & Johnson, K. *A Course in Phonetics* (7th ed.). Cengage, 2015.
- Catford, J. C. *A Practical Introduction to Phonetics* (2nd ed.). Oxford University Press, 2001.
- Johnson, K. *Acoustic and Auditory Phonetics* (3rd ed.). Wiley-Blackwell, 2012.

Further reading online:
- [Peterson & Barney male vowel table (Princeton, from Cook 1999)](https://www.cs.princeton.edu/courses/archive/spr99/cs325/formants.html)
- [Formant](https://en.wikipedia.org/wiki/Formant)
