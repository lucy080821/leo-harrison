import type { Locale } from "@/lib/i18n";
import { t, type Project } from "@/content/site";
import { LaptopFrame } from "@/components/Mockups";

/* eslint-disable @next/next/no-img-element */
export function ProjectBlock({ p, lang, flip = false }: { p: Project; lang: Locale; flip?: boolean }) {
  return (
    <article
      id={p.id}
      className="scroll-mt-24 grid items-center gap-8 rounded-3xl border border-line bg-surface p-6 sm:p-8 md:grid-cols-2 md:gap-12"
    >
      <div className={flip ? "md:order-2" : ""}>
        <div className="flex items-center gap-4">
          <img src={p.logo} alt="" width={52} height={52} className="h-[52px] w-[52px] rounded-xl border border-line object-cover" />
          <div>
            <h3 className="h-display text-3xl">{p.name}</h3>
            <p className="label">{p.host}</p>
          </div>
        </div>
        <p className="mt-5 text-xl font-semibold leading-snug tracking-tight">{p.tagline[lang]}</p>
        <p className="mt-3 leading-relaxed text-muted">{p.summary[lang]}</p>
        <ul className="mt-4 space-y-2 text-[0.95rem]">
          {p.points.map((pt, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-hl" aria-hidden="true" />
              <span>{pt[lang]}</span>
            </li>
          ))}
        </ul>
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-hl px-5 py-2.5 text-sm font-bold text-hlfg hover:opacity-90"
        >
          {t.openProduct[lang]} {p.name}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className={flip ? "md:order-1" : ""}>
        <LaptopFrame src={p.shot} alt={`${p.name}: ${p.tagline[lang]}`} />
      </div>
    </article>
  );
}
