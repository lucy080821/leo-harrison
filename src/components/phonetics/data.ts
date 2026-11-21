/** Giá trị formant trung bình của giọng nam, theo Peterson & Barney (1952), Hz.
 *  Nguồn số liệu: bảng "Nominal male vowel speech sounds and first three formant frequencies"
 *  (P. R. Cook, 1999), xem https://www.cs.princeton.edu/courses/archive/spr99/cs325/formants.html */
export type VowelPoint = { ipa: string; word: string; f1: number; f2: number; f3: number };

export const VOWELS: VowelPoint[] = [
  { ipa: "i", word: "beet", f1: 270, f2: 2290, f3: 3010 },
  { ipa: "ɪ", word: "bit", f1: 390, f2: 1990, f3: 2550 },
  { ipa: "ɛ", word: "bet", f1: 530, f2: 1840, f3: 2480 },
  { ipa: "æ", word: "bat", f1: 660, f2: 1720, f3: 2410 },
  { ipa: "ɑ", word: "father", f1: 730, f2: 1090, f3: 2440 },
  { ipa: "ɔ", word: "bought", f1: 570, f2: 840, f3: 2410 },
  { ipa: "ʊ", word: "book", f1: 440, f2: 1020, f3: 2240 },
  { ipa: "u", word: "boot", f1: 300, f2: 870, f3: 2240 },
  { ipa: "ʌ", word: "but", f1: 640, f2: 1190, f3: 2390 },
  { ipa: "ɝ", word: "bird", f1: 490, f2: 1350, f3: 1690 },
];
