import { notFound } from "next/navigation";
import { owner, t } from "@/content/site";
import { isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return { title: isLocale(lang) ? t.aboutTitle[lang] : "About" };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <div className="mx-auto max-w-3xl px-4 pt-14">
      <h1 className="font-display text-5xl font-medium tracking-tight">{t.aboutTitle[lang]}</h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed">
        {t.aboutBody.map((para, i) => (
          <p key={i}>{para[lang]}</p>
        ))}
      </div>
      <section className="mt-14 border-t border-line pt-8">
        <h2 className="font-display text-2xl font-semibold">{t.contactTitle[lang]}</h2>
        <p className="mt-2 text-muted">{t.contactBody[lang]}</p>
        <a href={`mailto:${owner.email}`} className="font-display mt-4 inline-block break-all text-2xl text-brand underline decoration-brand2 underline-offset-4">
          {owner.email}
        </a>
      </section>
    </div>
  );
}
