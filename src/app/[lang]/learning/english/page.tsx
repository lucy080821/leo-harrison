import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, t, seo } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { isLocale, locales } from "@/lib/i18n";

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
  const lucy = projects[0];
  return (
    <div className="mx-auto max-w-3xl px-4 pt-14">
      <Link href={`/${lang}/learning`} className="text-sm text-muted hover:text-brand">
        ← {t.backToLearning[lang]}
      </Link>
      <h1 className="h-display mt-4 text-5xl">{t.englishPageTitle[lang]}</h1>
      <p className="mt-2 text-sm font-semibold text-muted">{t.soon[lang]}</p>
      <p className="mt-6 text-lg leading-relaxed">{t.englishPageBody[lang]}</p>
      <p className="mt-6 text-muted">
        {t.englishPageNow[lang]}{" "}
        <a href={lucy.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-4">
          {lucy.name} ↗
        </a>
      </p>
    </div>
  );
}
