"use client";

import { useEffect, useState } from "react";
import type { L10n, Locale } from "@/lib/i18n";

type Step = { phase: "main" | "sub" | "done"; n: number };

/**
 * Câu mở đầu được gõ như máy chữ: ngôn ngữ đang chọn trước (chữ lớn), rồi bản dịch (chữ nhỏ).
 * Phần chữ chưa gõ vẫn nằm trong trang nhưng trong suốt, nên bố cục không bị nhảy.
 * Người dùng giảm chuyển động sẽ thấy câu hiện đủ ngay.
 */
export function HeroLine({ line, lang, srPrefix }: { line: L10n; lang: Locale; srPrefix: string }) {
  const other: Locale = lang === "vi" ? "en" : "vi";
  const main = line[lang];
  const sub = line[other];
  return <Typewriter key={lang} main={main} sub={sub} lang={lang} other={other} srPrefix={srPrefix} />;
}

function Typewriter({ main, sub, lang, other, srPrefix }: { main: string; sub: string; lang: Locale; other: Locale; srPrefix: string }) {
  const [step, setStep] = useState<Step>({ phase: "main", n: 0 });
  const [caretOn, setCaretOn] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => {
        setStep({ phase: "done", n: 0 });
        setCaretOn(false);
      }, 0);
      return () => clearTimeout(id);
    }
    if (step.phase === "done") {
      const id = setTimeout(() => setCaretOn(false), 2200);
      return () => clearTimeout(id);
    }
    const text = step.phase === "main" ? main : sub;
    let next: Step;
    let delay = step.phase === "main" ? 42 : 20;
    if (step.n < text.length) {
      next = { ...step, n: step.n + 1 };
      if (step.n === 0) delay = step.phase === "main" ? 450 : 250;
    } else if (step.phase === "main") {
      next = { phase: "sub", n: 0 };
      delay = 300;
    } else {
      next = { phase: "done", n: 0 };
      delay = 0;
    }
    const id = setTimeout(() => setStep(next), delay);
    return () => clearTimeout(id);
  }, [step, main, sub]);

  const mainN = step.phase === "main" ? step.n : main.length;
  const subN = step.phase === "main" ? 0 : step.phase === "sub" ? step.n : sub.length;
  const caret = caretOn ? <span className="tw-caret" aria-hidden="true" /> : null;

  return (
    <>
      <h1 className="h-display text-[2rem] sm:text-5xl">
        <span className="sr-only">{srPrefix} {main}</span>
        <span aria-hidden="true" lang={lang}>
          {main.slice(0, mainN)}
          {step.phase === "main" && caret}
          <span className="tw-rest">{main.slice(mainN)}</span>
        </span>
      </h1>
      <p className="mt-4 text-lg text-muted sm:text-xl" lang={other} aria-hidden="true">
        {sub.slice(0, subN)}
        {step.phase === "sub" && caret}
        {step.phase === "done" && caret}
        <span className="tw-rest">{sub.slice(subN)}</span>
      </p>
      <noscript>
        <style>{".tw-rest{opacity:1!important}"}</style>
      </noscript>
    </>
  );
}
