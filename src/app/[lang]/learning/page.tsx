import { notFound } from "next/navigation";
import { LearningRows } from "@/components/LearningRows";
import { t, seo } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const m = seo.learning;
  return pageMeta({ lang, path: "/learning", title: m.title[lang], description: m.description[lang] });
}

export default async function LearningPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <div className="mx-auto max-w-5xl px-4 pt-14">
      <h1 className="h-display text-4xl sm:text-5xl">{t.learningTitle[lang]}</h1>
      <p className="mt-3 max-w-xl text-lg text-muted">{t.learningIntro[lang]}</p>
      <LearningRows lang={lang} />
    </div>
  );
}
