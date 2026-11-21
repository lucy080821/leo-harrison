import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, coursesOf } from "@/content/registry";
import { getLessons } from "@/lib/content";
import { dict, isLocale } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dict[lang];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="bg-gradient-to-r from-brand to-brand2 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
          {t.heroTitle}
        </h1>
        <p className="mt-4 text-lg text-muted">{t.heroDesc}</p>
      </section>

      <h2 className="mb-5 mt-14 text-xl font-bold">{t.chooseTrack}</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        {categories.map((c) => {
          const list = coursesOf(c.id);
          const ready = list.filter((co) => getLessons(co.id).length > 0).length;
          return (
            <Link
              key={c.id}
              href={`/${lang}/learning/programming/${c.id}`}
              className="group rounded-2xl border border-line bg-surface p-6 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-lg"
            >
              <h3 className="text-xl font-bold group-hover:text-brand">{c.name[lang]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.desc[lang]}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {list.map((co) => (
                  <span key={co.id} className="rounded-full bg-brandsoft px-2.5 py-0.5 text-xs font-semibold text-brand">
                    {co.name[lang]}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted">
                {ready}/{list.length} {t.coursesReady}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
