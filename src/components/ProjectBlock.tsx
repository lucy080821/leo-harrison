import type { Locale } from "@/lib/i18n";
import { t, type Project } from "@/content/site";

/* eslint-disable @next/next/no-img-element */
export function ProjectBlock({ p, lang, flip = false, full = false }: { p: Project; lang: Locale; flip?: boolean; full?: boolean }) {
  return (
    <article
      className={`grid items-start gap-6 border-t border-line py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-12 ${
        flip ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div>
        <div className="flex items-center gap-4">
          <img src={p.logo} alt="" width={56} height={56} className="h-14 w-14 rounded-xl border border-line object-cover" />
          <div>
            <h3 className="font-display text-3xl font-semibold tracking-tight">{p.name}</h3>
            <p className="text-sm text-muted">{p.host}</p>
          </div>
        </div>
        <p className="font-display mt-5 text-xl leading-snug">{p.tagline[lang]}</p>
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          {t.visit[lang]} {p.name}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div>
        <p className="leading-relaxed">{p.summary[lang]}</p>
        <ul className={`mt-4 space-y-2 text-[0.95rem] text-muted ${full ? "" : "md:max-w-md"}`}>
          {p.points.map((pt, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand2" aria-hidden="true" />
              <span>{pt[lang]}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
