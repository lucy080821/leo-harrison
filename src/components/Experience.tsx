import { Reveal } from "@/components/Reveal";
import { experience } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/** Dòng thời gian kinh nghiệm làm việc, mỗi mục hiện dần khi cuộn tới. */
export function Experience({ lang }: { lang: Locale }) {
  return (
    <ol className="mt-8 space-y-9 border-l-2 border-line pl-7">
      {experience.map((j, i) => (
        <Reveal as="li" key={`${j.company}-${j.from}`} delay={Math.min(i, 2) * 70} className="relative">
          <span
            className={`absolute -left-[2.2rem] top-1.5 h-3 w-3 rounded-full border-2 border-bg ${i === 0 ? "bg-brand ring-4 ring-brand-soft" : "bg-brand/70"}`}
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
        </Reveal>
      ))}
    </ol>
  );
}
