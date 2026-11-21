import { notFound } from "next/navigation";
import { LearningRows } from "@/components/LearningRows";
import { t } from "@/content/site";
import { isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return { title: isLocale(lang) ? t.learningTitle[lang] : "Learning" };
}

export default async function LearningPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <div className="mx-auto max-w-5xl px-4 pt-14">
      <h1 className="font-display text-5xl font-medium tracking-tight">{t.learningTitle[lang]}</h1>
      <p className="mt-3 max-w-xl text-lg text-muted">{t.learningIntro[lang]}</p>
      <LearningRows lang={lang} />
    </div>
  );
}
