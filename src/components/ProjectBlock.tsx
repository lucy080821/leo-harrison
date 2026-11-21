import type { Locale } from "@/lib/i18n";
import { t, type Project } from "@/content/site";
import { LaptopFrame } from "@/components/Mockups";

function Monogram({ name }: { name: string }) {
  const letters = name.split(" ").map((w) => w[0]).join("").slice(0, 3);
  return (
    <span className="grid h-[52px] w-[52px] place-items-center rounded-xl border border-line bg-surface2 font-bold text-label" aria-hidden="true">
      {letters}
    </span>
  );
}

/** Thay cho ảnh chụp màn hình khi dự án là kênh nội dung: tên kênh và địa chỉ trên từng nền tảng. */
function ChannelPanel({ p }: { p: Project }) {
  return (
    <div className="rounded-2xl border border-line bg-bg p-6 sm:p-8">
      <p className="h-display text-3xl sm:text-4xl">{p.name}</p>
      <ul className="mt-6 space-y-3">
        {p.channels?.map((c) => (
          <li key={c.name}>
            <a href={c.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 rounded-xl border border-line bg-surface px-4 py-3 hover:border-hl">
              <span className="font-semibold">{c.name}</span>
              <span className="label break-all text-right">{c.handle}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
export function ProjectBlock({ p, lang, flip = false }: { p: Project; lang: Locale; flip?: boolean }) {
  return (
    <article
      id={p.id}
      className="scroll-mt-24 grid items-center gap-8 rounded-3xl border border-line bg-surface p-6 sm:p-8 md:grid-cols-2 md:gap-12"
    >
      <div className={flip ? "md:order-2" : ""}>
        <div className="flex items-center gap-4">
          {p.logo ? (
            <img src={p.logo} alt="" width={52} height={52} className="h-[52px] w-[52px] rounded-xl border border-line object-cover" />
          ) : (
            <Monogram name={p.name} />
          )}
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
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {p.channels ? (
            p.channels.map((c) => (
              <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-hl px-5 py-2.5 text-sm font-bold text-hlfg hover:opacity-90">
                {c.name}
                <span aria-hidden="true">↗</span>
              </a>
            ))
          ) : (
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-hl px-5 py-2.5 text-sm font-bold text-hlfg hover:opacity-90">
              {t.openProduct[lang]} {p.name}
              <span aria-hidden="true">↗</span>
            </a>
          )}
          {p.links?.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-semibold hover:border-hl">
              {l.label[lang]}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
      <div className={flip ? "md:order-1" : ""}>
        {p.shot ? <LaptopFrame src={p.shot} alt={`${p.name}: ${p.tagline[lang]}`} /> : <ChannelPanel p={p} />}
      </div>
    </article>
  );
}
