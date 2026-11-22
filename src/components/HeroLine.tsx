"use client";

import { useEffect, useState } from "react";
import type { L10n, Locale } from "@/lib/i18n";

/**
 * Câu mở đầu gõ như máy chữ, chỉ bằng ngôn ngữ đang chọn.
 * Bố cục không bao giờ nhảy: bản đầy đủ nằm sẵn (vô hình) để giữ chỗ, còn chữ đang gõ được xếp chồng lên đúng
 * vị trí đó nên cách xuống dòng luôn giống hệt. Con trỏ có chiều rộng 0 để không làm đổi dòng.
 * Người dùng giảm chuyển động thấy câu hiện đủ ngay.
 */
export function HeroLine({ line, lang }: { line: L10n; lang: Locale; srPrefix?: string }) {
  return <Typewriter key={lang} text={line[lang]} lang={lang} />;
}

function Typewriter({ text, lang }: { text: string; lang: Locale }) {
  const [n, setN] = useState(0);
  const [caret, setCaret] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => {
        setN(text.length);
        setCaret(false);
      }, 0);
      return () => clearTimeout(id);
    }
    if (n < text.length) {
      const id = setTimeout(() => setN(n + 1), n === 0 ? 500 : 38);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setCaret(false), 2200);
    return () => clearTimeout(id);
  }, [n, text]);

  return (
    <p className="h-display text-[2rem] sm:text-5xl" lang={lang}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="relative block">
        <span className="invisible block">{text}</span>
        <span className="absolute inset-0 block">
          {text.slice(0, n)}
          {caret && <span className="tw-caret" />}
        </span>
      </span>
    </p>
  );
}
