import { notFound } from "next/navigation";
import { SocialLinks } from "@/components/SocialLinks";
import { owner, t, seo } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const m = seo.about;
  return pageMeta({ lang, path: "/about", title: m.title[lang], description: m.description[lang] });
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <div className="mx-auto max-w-3xl px-4 pt-14">
      <h1 className="h-display text-4xl sm:text-5xl">{t.aboutTitle[lang]}</h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed">
        {t.aboutBody.map((para, i) => (
          <p key={i}>{para[lang]}</p>
        ))}
      </div>
      <section className="mt-14 border-t border-line pt-8">
        <h2 className="h-display text-2xl">{t.contactTitle[lang]}</h2>
        <p className="mt-2 text-muted">{t.contactBody[lang]}</p>
        <a href={`mailto:${owner.email}`} className="link-quiet mt-4 inline-block break-all text-xl font-semibold sm:text-2xl">
          {owner.email}
        </a>
        <SocialLinks className="mt-6" />
      </section>
    </div>
  );
}
