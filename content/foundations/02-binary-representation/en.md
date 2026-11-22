# Binary and data representation

## Bits and bytes

A computer stores everything in components with two stable states. We write those states as `0` and `1`. A **bit** (*binary digit*) is one such digit; a **byte** is a group of 8 bits, able to represent 2⁸ = 256 values (0–255). The word *bit* was used by Claude Shannon in his 1948 paper on information theory.

![One byte of 8 bits with place values 128 to 1](/lessons/foundations/02-binary-representation-bits-en.svg)
*The number 13 = 00001101 in binary: add the places holding a 1.*

## Binary (base 2)

Decimal uses 10 digits, and each place is a power of **10**. Binary uses 2 digits, and each place is a power of **2**:

`1101₂ = 1·2³ + 1·2² + 0·2¹ + 1·2⁰ = 8 + 4 + 0 + 1 = 13`

In general, n unsigned bits represent 2ⁿ values, from 0 to 2ⁿ − 1. With 8 bits the largest value is `11111111₂ = 255`.

## Representing text

Letters are just numbers under a **character encoding**:

- **ASCII** (1963, 7 bits, 128 characters): `A = 65`, `a = 97`, `0` = 48.
- **Unicode**: a universal catalogue giving every character a **code point**, e.g. `é` is U+00E9. Unicode does not say how characters become bytes; an **encoding** does.
- **UTF-8**: encodes Unicode into 1–4 bytes, backward-compatible with ASCII (ASCII characters take one byte). Vietnamese accented letters typically take 2 or 3 bytes.

> This is why a Vietnamese text and an English text with the same number of characters can have different file sizes.

## Real numbers and limits

Integers can be exact, but real numbers are stored using the **IEEE 754** floating-point standard and are mostly approximations. For example `0.1 + 0.2` in Python gives `0.30000000000000004`, because 0.1 has no finite binary expansion (just as 1/3 has no finite decimal expansion).

## References

- Shannon, C. E. (1948). A Mathematical Theory of Communication. *Bell System Technical Journal* 27.
- Harvard CS50, week 0: binary, ASCII, Unicode.
- Unicode Consortium. *The Unicode Standard*, and RFC 3629 (UTF-8).
- IEEE 754-2019. *Standard for Floating-Point Arithmetic*.
- Goldberg, D. (1991). What Every Computer Scientist Should Know About Floating-Point Arithmetic. *ACM Computing Surveys* 23(1).
