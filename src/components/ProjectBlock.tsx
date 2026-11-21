import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { t, type Project } from "@/content/site";

function Logo({ p }: { p: Project }) {
  if (p.logo) {
    return <Image src={p.logo} alt="" width={40} height={40} className="h-10 w-10 rounded-lg object-cover" />;
  }
  return (
    <span className="grid h-10 w-10 place-items-center rounded-lg bg-surface2 text-sm font-bold text-brand" aria-hidden="true">
      {p.name.split(" ").map((w) => w[0]).join("").slice(0, 3)}
    </span>
  );
}

/** Thay cho ảnh chụp màn hình khi dự án là kênh nội dung: số liệu và địa chỉ trên từng nền tảng. */
function ChannelPanel({ p, lang }: { p: Project; lang: Locale }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-6">
      {p.channelStats && (
        <>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
            {p.channelStats.items.map((it, i) => (
              <div key={i}>
                <dt className="text-3xl font-bold tracking-tight">{it.n[lang]}</dt>
                <dd className="mt-1 text-sm text-muted">{it.label[lang]}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-muted">
            {t.statsAsOf[lang]} {p.channelStats.asOf}
          </p>
        </>
      )}
      <ul className="mt-5 space-y-2 border-t border-line pt-5 text-sm">
        {p.channels?.map((c) => (
          <li key={c.name} className="flex flex-wrap items-baseline justify-between gap-2">
            <a href={c.url} target="_blank" rel="noopener noreferrer" className="link-quiet font-semibold">
              {c.name}
            </a>
            <span className="break-all text-muted">{c.handle}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProjectBlock({ p, lang, eager = false }: { p: Project; lang: Locale; eager?: boolean }) {
  return (
    <article id={p.id} className="grid scroll-mt-24 items-start gap-8 border-t border-line py-12 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:gap-12">
      <div>
        <div className="flex items-center gap-3">
          <Logo p={p} />
          <div>
            <h3 className="h-display text-2xl">{p.name}</h3>
            <p className="text-sm text-muted">{p.host}</p>
          </div>
        </div>
        <p className="mt-5 text-lg font-semibold leading-snug">{p.tagline[lang]}</p>
        <p className="mt-3 leading-relaxed text-muted">{p.summary[lang]}</p>
        <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[0.95rem] marker:text-brand">
          {p.points.map((pt, i) => (
            <li key={i}>{pt[lang]}</li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          {p.channels ? (
            p.channels.map((c, i) =>
              i === 0 ? (
                <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
                  {c.name} ↗
                </a>
              ) : (
                <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="link-quiet text-sm font-semibold">
                  {c.name} ↗
                </a>
              ),
            )
          ) : (
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
              {t.openProduct[lang]} {p.name} ↗
            </a>
          )}
          {p.links?.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="link-quiet text-sm font-semibold">
              {l.label[lang]} ↗
            </a>
          ))}
        </div>
      </div>
      <div>
        {p.shot ? (
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg border border-line shadow-sm">
            <Image
              src={p.shot}
              alt={`${p.name}: ${p.tagline[lang]}`}
              width={1100}
              height={687}
              sizes="(min-width: 768px) 40vw, 92vw"
              loading={eager ? "eager" : "lazy"}
              className="h-auto w-full"
            />
          </a>
        ) : (
          <ChannelPanel p={p} lang={lang} />
        )}
      </div>
    </article>
  );
}
