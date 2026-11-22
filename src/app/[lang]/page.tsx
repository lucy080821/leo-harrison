import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroBackground } from "@/components/HeroBackground";
import { HeroLine } from "@/components/HeroLine";
import { JsonLd } from "@/components/JsonLd";
import { CountUp } from "@/components/CountUp";
import { Experience } from "@/components/Experience";
import { LearningRows } from "@/components/LearningRows";
import { ProjectBlock } from "@/components/ProjectBlock";
import { Reveal } from "@/components/Reveal";
import { ScrollBackground } from "@/components/ScrollBackground";
import { SocialLinks } from "@/components/SocialLinks";
import { categories, coursesOf } from "@/content/registry";
import {
  experience,
  heroLine,
  owner,
  projects,
  seo,
  skillGroups,
  t,
} from "@/content/site";
import { getArticles } from "@/lib/articles";
import { getLessons } from "@/lib/content";
import { isLocale, locales } from "@/lib/i18n";
import { abs, pageMeta, siteName } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const m = seo.home;
  return pageMeta({
    lang,
    path: "",
    title: m.title[lang],
    description: m.description[lang],
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const sameAs = [
    owner.github,
    owner.facebook,
    ...projects.flatMap((p) => p.channels?.map((c) => c.url) ?? []),
  ];
  const lessonCount =
    categories
      .flatMap((c) => coursesOf(c.id))
      .reduce((n, co) => n + getLessons(co.id).length, 0) +
    getArticles("phonetics").length;
  const current = experience[0];
  const stats = [
    { n: 2014, label: t.statSince[lang], plain: true },
    { n: experience.length, label: t.statJobs[lang] },
    { n: projects.length, label: t.statProjects[lang] },
    { n: lessonCount, label: t.statLessons[lang] },
  ];
  const anchors = [
    { id: "about", label: t.aboutTitle[lang] },
    { id: "experience", label: t.experienceTitle[lang] },
    { id: "skills", label: t.skillsTitle[lang] },
    { id: "projects", label: t.projectsTitle[lang] },
    { id: "learning", label: t.learningTitle[lang] },
    { id: "contact", label: t.contactTitle[lang] },
  ];

  return (
    <div className="relative isolate overflow-x-clip">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            url: abs(`/${lang}`),
            inLanguage: lang,
            mainEntity: {
              "@type": "Person",
              name: owner.name,
              alternateName: owner.nick,
              url: abs(`/${lang}`),
              email: owner.email,
              image: abs("/leo.webp"),
              jobTitle: "Data Analyst",
              description: t.objective[lang],
              worksFor: { "@type": "Organization", name: current.company },
              sameAs,
              knowsLanguage: ["vi", "en"],
              knowsAbout: [
                "Data analysis",
                "SQL",
                "Python",
                "Power BI",
                "Data visualization",
                "Modern Trade sales",
                "English language learning",
                "Web development",
              ],
              owns: projects
                .filter((p) => !p.channels)
                .map((p) => ({ "@type": "WebSite", name: p.name, url: p.url })),
            },
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
      <ScrollBackground />
      <HeroBackground />
      <div className="mx-auto max-w-5xl px-4">
        <header className="pb-12 pt-10 sm:pt-16">
          <div className="grid items-center gap-x-10 gap-y-6 md:grid-cols-[minmax(0,1fr)_auto]">
            <div className="order-2 md:order-1">
              <p className="mb-3 text-lg text-muted">
                {t.hello[lang]}{" "}
                <span className="marker font-semibold text-fg">
                  {owner.nick}
                </span>
              </p>
              <h1 className="h-display text-4xl sm:text-6xl">{owner.name}</h1>
              <p className="mt-2 text-xl font-semibold text-brand sm:text-2xl">
                {t.heroRole[lang]}
              </p>
              <div className="mt-5 text-lg">
                <HeroLine
                  line={heroLine}
                  lang={lang}
                  srPrefix={`${owner.nick}, ${owner.name}:`}
                />
              </div>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed">
                {t.heroSummary[lang]}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href={`mailto:${owner.email}`} className="btn-primary">
                  {t.contactCv[lang]}
                </a>
                <a href="#experience" className="link-quiet font-semibold">
                  {t.experienceTitle[lang]} ↓
                </a>
                <Link
                  href={`/${lang}/learning/programming`}
                  className="link-quiet font-semibold"
                >
                  {t.startLearning[lang]} →
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative h-32 w-32 sm:h-44 sm:w-44 md:h-60 md:w-60">
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-brandsoft via-surface2 to-brandsoft ring-1 ring-line"
                  aria-hidden
                />
                <div
                  className="absolute -right-1 top-3 h-8 w-8 rounded-full bg-marker opacity-80 md:h-10 md:w-10"
                  aria-hidden
                />
                <Image
                  src="/leo.webp"
                  alt={`${owner.name} (${owner.nick})`}
                  width={640}
                  height={640}
                  priority
                  sizes="(min-width: 768px) 240px, 176px"
                  className="relative h-full w-full rounded-full object-cover object-top"
                />
              </div>
            </div>
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-line py-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="order-2 text-sm text-muted">{s.label}</dt>
                <dd className="h-display text-3xl text-brand sm:text-4xl">
                  {s.plain ? (
                    s.n
                  ) : (
                    <CountUp to={s.n} suffix={s.n > 50 ? "+" : ""} />
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <nav aria-label="CV" className="mt-6 flex flex-wrap gap-2 text-sm">
            {anchors.map((a) => (
              <a
                key={a.id}
                href={`#${a.id}`}
                className="rounded-full border border-line bg-surface px-3 py-1 hover:border-brand hover:text-brand"
              >
                {a.label}
              </a>
            ))}
          </nav>
        </header>

        <section id="about" aria-labelledby="about-h" className="py-12">
          <Reveal>
            <h2 id="about-h" className="h-display sec-h text-3xl">
              {t.objectiveTitle[lang]}
            </h2>
            <p className="mt-4 max-w-3xl text-xl leading-relaxed">
              {t.objective[lang]}
            </p>
          </Reveal>
        </section>

        <section id="experience" aria-labelledby="exp-h" className="py-12">
          <Reveal>
            <h2 id="exp-h" className="h-display sec-h text-3xl">
              {t.experienceTitle[lang]}
            </h2>
          </Reveal>
          <Experience lang={lang} />
        </section>

        <section id="skills" aria-labelledby="skills-h" className="py-12">
          <Reveal>
            <h2 id="skills-h" className="h-display sec-h text-3xl">
              {t.skillsTitle[lang]}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {skillGroups.map((g, i) => (
              <Reveal
                key={g.items[0]}
                delay={i * 90}
                variant={i % 2 ? "right" : "left"}
              >
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                  {g.name[lang]}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((k) => (
                    <li
                      key={k}
                      className="rounded-full border border-line bg-surface px-3 py-1 text-sm"
                    >
                      {k}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="projects" aria-labelledby="projects-h" className="py-12">
          <Reveal>
            <h2 id="projects-h" className="h-display sec-h text-3xl">
              {t.projectsTitle[lang]}
            </h2>
            <p className="mt-2 text-muted">{t.projectsIntro[lang]}</p>
          </Reveal>
          <div className="mt-8">
            {projects.map((p, i) => (
              <Reveal key={p.id} variant={i % 2 ? "right" : "left"}>
                <ProjectBlock p={p} lang={lang} eager={i === 0} />
              </Reveal>
            ))}
          </div>
        </section>

        <section id="learning" aria-labelledby="learn-h" className="py-12">
          <Reveal>
            <h2 id="learn-h" className="h-display sec-h text-3xl">
              {t.learningTitle[lang]}
            </h2>
            <p className="mt-2 max-w-xl text-muted">{t.learningIntro[lang]}</p>
            <LearningRows lang={lang} />
          </Reveal>
        </section>

        <section
          id="contact"
          aria-labelledby="contact-h"
          className="py-12 pb-20"
        >
          <Reveal>
            <h2 id="contact-h" className="h-display sec-h text-3xl">
              {t.contactTitle[lang]}
            </h2>
            <p className="mt-2 max-w-xl text-muted">{t.contactBody[lang]}</p>
            <a
              href={`mailto:${owner.email}`}
              className="link-quiet mt-5 inline-block break-all text-xl font-semibold sm:text-2xl"
            >
              {owner.email}
            </a>
            <SocialLinks className="mt-5" />
          </Reveal>
        </section>
      </div>
    </div>
  );
}
