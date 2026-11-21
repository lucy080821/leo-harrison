"use client";

import { useEffect, useState } from "react";
import type { L10n, Locale } from "@/lib/i18n";

type Step = { i: number; phase: "main" | "gloss"; n: number };

/**
 * Câu mở đầu chia thành cụm, gõ từng ký tự như máy chữ: chữ lớn ở ngôn ngữ đang chọn,
 * rồi bản dịch nhỏ (mono) ngay bên dưới. Chữ ẩn giữ nguyên chỗ nên bố cục không nhảy.
 * Người dùng giảm chuyển động sẽ thấy câu hiện đủ ngay.
 */
function Typewriter({ chunks, lang }: { chunks: L10n[]; lang: Locale }) {
  const other: Locale = lang === "vi" ? "en" : "vi";
  const total = chunks.length;
  const [step, setStep] = useState<Step>({ i: 0, phase: "main", n: 0 });
  const [caretOn, setCaretOn] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => {
        setStep({ i: total, phase: "main", n: 0 });
        setCaretOn(false);
      }, 0);
      return () => clearTimeout(id);
    }
    if (step.i >= total) {
      const id = setTimeout(() => setCaretOn(false), 2600);
      return () => clearTimeout(id);
    }
    const c = chunks[step.i];
    const text = step.phase === "main" ? c[lang] : c[other];
    let delay = step.phase === "main" ? 48 : 22;
    let next: Step;
    if (step.n < text.length) {
      next = { ...step, n: step.n + 1 };
      if (step.n === 0) delay = step.i === 0 && step.phase === "main" ? 500 : 140;
    } else if (step.phase === "main") {
      next = { i: step.i, phase: "gloss", n: 0 };
      delay = 160;
    } else {
      next = { i: step.i + 1, phase: "main", n: 0 };
      delay = 200;
    }
    const id = setTimeout(() => setStep(next), delay);
    return () => clearTimeout(id);
  }, [step, chunks, lang, other, total]);

  const caret = <span className="tw-caret" aria-hidden="true" />;

  return (
    <span aria-hidden="true" className="flex flex-wrap gap-x-[0.4em] gap-y-[0.55em]">
      {chunks.map((c, j) => {
        const mainActive = step.i === j && step.phase === "main";
        const glossActive = step.i === j && step.phase === "gloss";
        const mainText = j < step.i || glossActive ? c[lang] : mainActive ? c[lang].slice(0, step.n) : "";
        const glossText = j < step.i ? c[other] : glossActive ? c[other].slice(0, step.n) : "";
        return (
          <span key={j} className="chunk">
            <span className="tw-slot">
              <span className="tw-ghost" lang={lang}>{c[lang]}</span>
              <span className="tw-live" lang={lang}>
                {mainText}
                {mainActive && caretOn && caret}
              </span>
            </span>
            <span className="chunk-gloss tw-slot">
              <span className="tw-ghost" lang={other}>{c[other]}</span>
              <span className="tw-live" lang={other}>
                {glossText}
                {glossActive && caretOn && caret}
              </span>
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function BilingualLine({ chunks, lang }: { chunks: L10n[]; lang: Locale }) {
  return (
    <h1 className="h-display text-[2.5rem] sm:text-6xl lg:text-7xl">
      <span className="sr-only">{chunks.map((c) => c[lang]).join(" ")}</span>
      <Typewriter key={lang} chunks={chunks} lang={lang} />
      <noscript>
        <style>{".tw-ghost{visibility:visible!important}.tw-live{display:none}"}</style>
      </noscript>
    </h1>
  );
}
