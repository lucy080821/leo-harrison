import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { notFound } from "next/navigation";
import { englishCourses, phoneticsModules } from "@/content/english";
import { seo, t } from "@/content/site";
import { getArticles } from "@/lib/articles";
import { isLocale, locales } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const m = seo.english;
  return pageMeta({ lang, path: "/learning/english", title: m.title[lang], description: m.description[lang] });
}

export default async function EnglishPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const n = getArticles("phonetics").length;
  const mods = phoneticsModules.length;

  return (
    <div className="mx-auto max-w-3xl px-4 pt-14">
      <Breadcrumbs items={[{ label: "Learn With Leo", href: `/${lang}/learning` }, { label: t.english[lang] }]} />
      <h1 className="h-display mt-4 text-4xl sm:text-5xl">{t.englishPageTitle[lang]}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{t.englishPageBody[lang]}</p>

      <ul className="mt-8 border-b border-line">
        {englishCourses.map((c) => (
          <li key={c.id} className="border-t border-line">
            <Link href={`/${lang}/learning/english/${c.id}`} className="group block py-6">
              <h2 className="h-display text-2xl group-hover:text-brand">{c.name[lang]}</h2>
              <p className="mt-2 text-muted">{c.desc[lang]}</p>
              <p className="mt-3 text-sm font-semibold text-ok">
                {mods} {lang === "vi" ? "module" : "modules"} · {n} {t.lessons[lang]}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
