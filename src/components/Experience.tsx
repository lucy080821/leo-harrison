"use client";

import { useEffect, useRef, useState } from "react";
import { experience } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/**
 * Dòng thời gian kinh nghiệm: đường kẻ "chạy" theo vị trí cuộn trang, các mốc sáng dần khi đường kẻ đi tới.
 * Khi chưa có JS hoặc người dùng giảm chuyển động, toàn bộ hiện sẵn và đường kẻ đầy.
 */
export function Experience({ lang }: { lang: Locale }) {
  const olRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [dyn, setDyn] = useState(false);
  const [active, setActive] = useState(experience.length);

  useEffect(() => {
    const ol = olRef.current;
    if (!ol || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = ol.getBoundingClientRect();
      const anchor = window.innerHeight * 0.62;
      const p = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
      ol.style.setProperty("--tl", p.toFixed(4));
      let n = 0;
      itemRefs.current.forEach((li) => {
        if (li && li.getBoundingClientRect().top + 14 < anchor) n++;
      });
      setActive(n);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const t = setTimeout(() => {
      setDyn(true);
      update();
    }, 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <ol
      ref={olRef}
      className={`tl mt-8 space-y-7 [--lx:0.5rem] sm:[--lx:11.25rem] ${dyn ? "tl-dyn" : ""}`}
    >
      <span className="tl-line" aria-hidden>
        <i />
      </span>
      {experience.map((j, i) => {
        const dur = duration(j.from, j.to.en, lang);
        return (
          <li
            key={`${j.company}-${j.from}`}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className={`tl-item relative pl-[calc(var(--lx)+1.9rem)] ${i < active ? "tl-on" : "tl-off"} ${dyn && i === active - 1 ? "tl-now" : ""}`}
          >
            <span
              className={`tl-dot absolute left-[calc(var(--lx)-0.45rem)] top-6 h-4 w-4 rounded-full border-[3px] border-bg ${i === 0 ? "bg-brand" : "bg-brand/80"}`}
              aria-hidden
            />
            <span
              className="tl-link absolute left-[calc(var(--lx)+0.4rem)] top-[1.85rem] h-px w-[1.1rem] bg-line"
              aria-hidden
            />

            <div className="tl-date mb-2 sm:absolute sm:left-0 sm:top-[1.05rem] sm:mb-0 sm:w-[calc(var(--lx)-1.1rem)] sm:text-right">
              <time className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold tabular-nums text-brand shadow-sm">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-brand-2"
                  aria-hidden
                />
                {j.from} – {j.to[lang]}
              </time>
              {dur && <p className="mt-1 text-xs text-muted sm:pr-1">{dur}</p>}
            </div>

            <div className="tl-card rounded-xl border border-line bg-surface/70 p-4 transition-colors hover:border-brand/60 sm:p-5">
              <h3 className="text-xl font-semibold">{j.company}</h3>
              <p className="font-medium text-brand">{j.role[lang]}</p>
              {j.about && (
                <p className="mt-1 text-sm text-muted">{j.about[lang]}</p>
              )}
              <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-muted marker:text-brand-2">
                {j.points.map((pt, k) => (
                  <li key={k}>{pt[lang]}</li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** Thời gian làm việc từ "MM/YYYY" đến "MM/YYYY" (bao gồm cả tháng đầu và cuối). Công việc đang làm không có số này. */
function duration(from: string, toEn: string, lang: Locale): string | null {
  const m = /^(\d{2})\/(\d{4})$/;
  const a = m.exec(from);
  const b = m.exec(toEn);
  if (!a || !b) return null;
  const months =
    (Number(b[2]) - Number(a[2])) * 12 + (Number(b[1]) - Number(a[1])) + 1;
  const y = Math.floor(months / 12);
  const mo = months % 12;
  const vi = lang === "vi";
  const parts: string[] = [];
  if (y) parts.push(vi ? `${y} năm` : `${y} yr${y > 1 ? "s" : ""}`);
  if (mo) parts.push(vi ? `${mo} tháng` : `${mo} mo`);
  return parts.join(" ");
}
