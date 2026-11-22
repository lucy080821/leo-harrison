import { notFound } from "next/navigation";
import { SocialLinks } from "@/components/SocialLinks";
import { experience, owner, skills, t, seo } from "@/content/site";
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
        <h2 className="h-display text-2xl">{t.experienceTitle[lang]}</h2>
        <ol className="mt-6 space-y-8 border-l border-line pl-6">
          {experience.map((j) => (
            <li key={`${j.company}-${j.from}`} className="relative">
              <span className="absolute -left-[1.85rem] top-2 h-2.5 w-2.5 rounded-full bg-brand" aria-hidden />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-lg font-semibold">{j.company}</h3>
                <p className="text-sm text-muted">
                  {j.from} – {j.to[lang]}
                </p>
              </div>
              <p className="font-medium text-brand">{j.role[lang]}</p>
              {j.about && <p className="mt-1 text-sm text-muted">{j.about[lang]}</p>}
              <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
                {j.points.map((pt, i) => (
                  <li key={i}>{pt[lang]}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <h3 className="mt-10 text-lg font-semibold">{t.skillsTitle[lang]}</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {skills.map((k) => (
            <li key={k} className="rounded-full border border-line bg-surface px-3 py-1 text-sm">
              {k}
            </li>
          ))}
        </ul>
      </section>
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
