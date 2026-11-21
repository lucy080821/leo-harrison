import type { L10n, Locale } from "@/lib/i18n";

/**
 * Câu chia thành cụm, mỗi cụm hiện ngôn ngữ đang chọn ở trên (chữ lớn)
 * và ngôn ngữ còn lại ở dưới (chữ nhỏ), thẳng hàng như giáo trình học ngoại ngữ.
 */
export function BilingualLine({ chunks, lang }: { chunks: L10n[]; lang: Locale }) {
  const other: Locale = lang === "vi" ? "en" : "vi";
  return (
    <h1 className="h-display flex flex-wrap gap-x-[0.4em] gap-y-[0.55em] text-[2.5rem] sm:text-6xl lg:text-[3.5rem]">
      {chunks.map((c, i) => (
        <span key={i} className="chunk" style={{ animationDelay: `${0.12 + i * 0.16}s` }}>
          <span lang={lang}>{c[lang]}</span>
          <span lang={other} className="chunk-gloss">
            {c[other]}
          </span>
        </span>
      ))}
    </h1>
  );
}
