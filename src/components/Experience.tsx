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
    if (!ol || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
    <ol ref={olRef} className={`tl mt-8 space-y-9 pl-8 ${dyn ? "tl-dyn" : ""}`}>
      <span className="tl-line" aria-hidden>
        <i />
      </span>
      {experience.map((j, i) => (
        <li
          key={`${j.company}-${j.from}`}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className={`tl-item relative ${i < active ? "tl-on" : "tl-off"} ${dyn && i === active - 1 ? "tl-now" : ""}`}
        >
          <span
            className={`tl-dot absolute -left-[2.45rem] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-bg ${i === 0 ? "bg-brand" : "bg-brand/80"}`}
            aria-hidden
          />
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
            <h3 className="text-xl font-semibold">{j.company}</h3>
            <time className="text-sm tabular-nums text-muted">
              {j.from} – {j.to[lang]}
            </time>
          </div>
          <p className="font-medium text-brand">{j.role[lang]}</p>
          {j.about && <p className="mt-1 text-sm text-muted">{j.about[lang]}</p>}
          <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-muted marker:text-brand-2">
            {j.points.map((pt, k) => (
              <li key={k}>{pt[lang]}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
