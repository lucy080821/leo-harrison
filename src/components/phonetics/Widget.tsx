"use client";

import { LiveSpectrogram } from "@/components/phonetics/LiveSpectrogram";
import { VowelLab } from "@/components/phonetics/VowelLab";

/** Công cụ tương tác nhúng trong bài viết bằng dòng {{widget:ten}} trong file Markdown. */
export function Widget({ name }: { name: string }) {
  if (name === "vowel-lab") return <VowelLab />;
  if (name === "spectrogram") return <LiveSpectrogram />;
  return null;
}
