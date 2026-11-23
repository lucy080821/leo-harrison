import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { t as site } from "@/content/site";
import { notFound } from "next/navigation";
import { categories, coursesOf, getCategory } from "@/content/registry";
import { getLessons } from "@/lib/content";
import { dict, isLocale, locales } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return locales.flatMap((lang) => categories.map((c) => ({ lang, category: c.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; category: string }> }) {
  const { lang, category } = await params;
  const cat = getCategory(category);
  if (!isLocale(lang) || !cat) return {};
  return pageMeta({
    lang,
    path: `/learning/programming/${cat.id}`,
    title: `${cat.name[lang]} – ${lang === "vi" ? "học lập trình" : "learn programming"} | Learn With Leo`,
    description: cat.desc[lang],
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ lang: string; category: string }> }) {
  const { lang, category } = await params;
  if (!isLocale(lang)) notFound();
  const cat = getCategory(category);
  if (!cat) notFound();
  const t = dict[lang];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs
        items={[
          { label: "Learn With Leo", href: `/${lang}/learning` },
          { label: site.programming[lang], href: `/${lang}/learning/programming` },
          { label: cat.name[lang] },
        ]}
      />
      <h1 className="mt-3 text-3xl font-extrabold">{cat.name[lang]}</h1>
      <p className="mt-2 max-w-2xl text-muted">{cat.desc[lang]}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {coursesOf(cat.id).map((co) => {
          const n = getLessons(co.id).length;
          const ready = n > 0;
          const inner = (
            <>
              <div className="flex items-center justify-between">
                <span className="grid h-11 min-w-11 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand2 px-2 text-sm font-extrabold text-white">
                  {co.badge}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    ready ? "bg-ok/15 text-ok" : "bg-surface2 text-muted"
                  }`}
                >
                  {ready ? `${n} ${t.lessons}` : t.soon}
                </span>
              </div>
              <h2 className="mt-4 text-lg font-bold">{co.name[lang]}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">{co.desc[lang]}</p>
            </>
          );
          return ready ? (
            <Link
              key={co.id}
              href={`/${lang}/learning/programming/courses/${co.id}`}
              className="rounded-2xl border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-lg"
            >
              {inner}
            </Link>
          ) : (
            <div key={co.id} className="rounded-2xl border border-dashed border-line bg-surface/60 p-5 opacity-80">
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
