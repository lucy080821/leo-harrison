# The ear and hearing

After articulation and acoustics we reach the last link of the speech chain: **auditory phonetics**, that is, how the ear and brain **receive** sound.

## Three parts of the ear

| Part | Main structures | Role |
|---|---|---|
| **Outer ear** | pinna, ear canal, eardrum | collects and guides sound to the eardrum |
| **Middle ear** | three small bones (malleus, incus, stapes) | transmit and amplify vibration to the inner ear |
| **Inner ear** | the **cochlea** | converts mechanical vibration into neural signals |

## The cochlea and frequency analysis

Inside the cochlea is the **basilar membrane**. Different frequencies make it vibrate most strongly at **different places**: **high** frequencies near the base, **low** frequencies near the apex. This is called **tonotopy**. **Hair cells** on the membrane turn movement into neural impulses sent to the brain. In other words the ear performs a form of spectral analysis **right at the start**, very much like the spectrograms we drew.

## The range of hearing

A healthy young person hears about **20 Hz to 20,000 Hz**; speech concentrates energy between a few hundred Hz and a few kHz, and the ear is most sensitive at about **1 to 4 kHz**, exactly the region carrying much consonant information.

## Loudness and dB SPL

**Loudness** is perception, while **intensity level** is a measurement. Sound level is usually given in **dB SPL** (*sound pressure level*), with a very small reference pressure (**20 µPa**), close to the **hearing threshold** at about 1 kHz. There is also the **phon** scale: two sounds with the same phon value **sound equally loud** even at different frequencies (because the ear is not equally sensitive at all frequencies).

## Perceiving pitch: mel and Bark scales

The ear does **not** hear pitch linearly in Hz. From 100 to 200 Hz sounds like a big interval, while from 5000 to 5100 Hz sounds almost the same. So researchers use **perceptual** scales:

- **Mel**: a common formula is **mel = 2595 · log₁₀(1 + f/700)**.
- **Bark** (and the **ERB** scale): divide the frequency range into "bands" that the ear treats as a unit (critical bands). An approximation by Traunmüller (1990): **Bark = 26.81·f/(1960 + f) − 0.53**.


![Mel and Bark scales](/phonetics/hearing-scales.svg)
*Figure 4.1. The mel and Bark scales: perceived pitch rises more slowly as Hz increases.*

When formants are converted to Bark, male and female vowels come **closer together**, so these scales are often used for **speaker normalisation** (see the vowel lesson).

## Masking

A loud sound at one frequency can make a quiet sound at a neighbouring frequency **inaudible**: this is **masking**. It is why speech is hard to hear in noise, and it underlies audio compression (such as MP3).

## Remember

The ear is not a passive microphone: it **processes** the signal (frequency analysis, compression of dynamic range, sensitivity to rapid changes). So a purely **acoustic** (physical) view always needs the **auditory** view as a complement.

## References

- Johnson, K. *Acoustic and Auditory Phonetics* (3rd ed.). Wiley-Blackwell, 2012.
- Ladefoged, P. & Johnson, K. *A Course in Phonetics* (7th ed.). Cengage, 2015.
- Stevens, K. N. *Acoustic Phonetics*. MIT Press, 1999.
- Traunmüller, H. (1990). Analytical expressions for the tonotopic sensory scale. *Journal of the Acoustical Society of America* 88, 97-100.
