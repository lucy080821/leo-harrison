import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroBackground } from "@/components/HeroBackground";
import { HeroLine } from "@/components/HeroLine";
import { JsonLd } from "@/components/JsonLd";
import { LearningRows } from "@/components/LearningRows";
import { ProjectBlock } from "@/components/ProjectBlock";
import { SocialLinks } from "@/components/SocialLinks";
import { heroLine, owner, projects, seo, t } from "@/content/site";
import { isLocale, locales } from "@/lib/i18n";
import { abs, pageMeta, siteName } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const m = seo.home;
  return pageMeta({ lang, path: "", title: m.title[lang], description: m.description[lang] });
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const sameAs = [owner.github, owner.facebook, ...projects.flatMap((p) => p.channels?.map((c) => c.url) ?? [])];

  return (
    <div className="relative isolate overflow-x-clip">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: owner.name,
            alternateName: owner.nick,
            url: abs(`/${lang}`),
            sameAs,
            knowsAbout: ["Web development", "English language learning", "Data dashboards"],
            owns: projects.filter((p) => !p.channels).map((p) => ({ "@type": "WebSite", name: p.name, url: p.url })),
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteName,
            url: abs(`/${lang}`),
            inLanguage: lang,
            author: { "@type": "Person", name: owner.name },
          },
        ]}
      />
      <HeroBackground />
      <div className="mx-auto max-w-5xl px-4">
        <section className="pb-16 pt-14 sm:pt-20">
          <p className="mb-4 text-lg text-muted">
            {t.hello[lang]} <span className="marker font-semibold text-fg">{owner.nick}</span> ({owner.name})
          </p>
          <HeroLine line={heroLine} lang={lang} srPrefix={`${owner.nick}, ${owner.name}:`} />
          <p className="mt-8 max-w-2xl text-lg leading-relaxed">{t.heroSub[lang]}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href={`/${lang}/projects`} className="btn-primary">
              {t.seeProjects[lang]}
            </Link>
            <Link href={`/${lang}/learning/programming`} className="link-quiet font-semibold">
              {t.startLearning[lang]} →
            </Link>
          </div>
        </section>

        <section aria-labelledby="projects-h" className="py-8">
          <h2 id="projects-h" className="h-display text-3xl">
            {t.projectsTitle[lang]}
          </h2>
          <p className="mt-2 text-muted">{t.projectsIntro[lang]}</p>
          <div className="mt-8">
            {projects.map((p, i) => (
              <ProjectBlock key={p.id} p={p} lang={lang} eager={i === 0} />
            ))}
          </div>
        </section>

        <section aria-labelledby="learn-h" className="py-12">
          <h2 id="learn-h" className="h-display text-3xl">
            {t.learningTitle[lang]}
          </h2>
          <p className="mt-2 max-w-xl text-muted">{t.learningIntro[lang]}</p>
          <LearningRows lang={lang} />
        </section>

        <section aria-labelledby="contact-h" className="py-12">
          <h2 id="contact-h" className="h-display text-3xl">
            {t.contactTitle[lang]}
          </h2>
          <p className="mt-2 max-w-xl text-muted">{t.contactBody[lang]}</p>
          <a href={`mailto:${owner.email}`} className="link-quiet mt-5 inline-block break-all text-xl font-semibold sm:text-2xl">
            {owner.email}
          </a>
          <SocialLinks className="mt-5" />
        </section>
      </div>
    </div>
  );
}
