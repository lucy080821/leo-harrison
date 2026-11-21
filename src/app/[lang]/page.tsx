import Link from "next/link";
import { notFound } from "next/navigation";
import { BilingualLine } from "@/components/BilingualLine";
import { LearningRows } from "@/components/LearningRows";
import { ProjectBlock } from "@/components/ProjectBlock";
import { SectionHead } from "@/components/SectionHead";
import { Logo } from "@/components/Logo";
import { categories, coursesOf } from "@/content/registry";
import { getLessons } from "@/lib/content";
import { heroChunks, owner, projects, stats, t } from "@/content/site";
import { isLocale } from "@/lib/i18n";

/* eslint-disable @next/next/no-img-element */
export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const lessonCount = categories.flatMap((c) => coursesOf(c.id)).reduce((n, co) => n + getLessons(co.id).length, 0);

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="pb-20 pt-12 lg:pt-20">
        <div>
          <p className="mb-5 text-2xl font-bold tracking-tight sm:text-3xl">
            {t.hello[lang]} <span className="hl">{owner.nick}</span>
          </p>
          <BilingualLine chunks={heroChunks} lang={lang} />
          <p className="mt-9 max-w-xl text-lg leading-relaxed text-muted">{t.heroSub[lang]}</p>

          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {stats.map((s, i) => (
              <div key={i}>
                <dt className="h-display text-3xl sm:text-4xl">{s.n ?? lessonCount}</dt>
                <dd className="label mt-1 max-w-[11rem]">{s.label[lang]}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={`/${lang}/projects`} className="rounded-full bg-hl px-6 py-3 font-bold text-hlfg hover:opacity-90">
              {t.seeProjects[lang]}
            </Link>
            <Link href={`/${lang}/learning`} className="rounded-full border border-line px-6 py-3 font-semibold hover:border-hl">
              {t.startLearning[lang]}
            </Link>
          </div>
        </div>

      </section>

      {/* Projects */}
      <section aria-labelledby="projects-h" className="py-10">
        <SectionHead id="projects-h" label={t.portfolio[lang]} title={t.projectsTitle[lang]} intro={t.projectsIntro[lang]} />
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-3" aria-label={t.projectsTitle[lang]}>
          {projects.map((p) => (
            <li key={p.id}>
              <a href={`#${p.id}`} className="flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pl-1.5 pr-4 text-sm font-semibold hover:border-hl">
                <img src={p.logo} alt="" className="h-7 w-7 rounded-full object-cover" />
                {p.name}
              </a>
            </li>
          ))}
          <li>
            <div className="flex h-10 items-center rounded-full border border-line bg-surface px-4 hover:border-hl">
              <Logo href={`/${lang}/learning/programming`} size="text-base" />
            </div>
          </li>
        </ul>
        <div className="mt-10 space-y-6">
          {projects.map((p, i) => (
            <ProjectBlock key={p.id} p={p} lang={lang} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* Learning */}
      <section aria-labelledby="learn-h" className="py-16">
        <SectionHead id="learn-h" label={t.learningLabel[lang]} title={t.learningTitle[lang]} intro={t.learningIntro[lang]} />
        <LearningRows lang={lang} />
      </section>

      {/* Contact */}
      <section aria-labelledby="contact-h" className="py-16 text-center">
        <p className="label">{t.contactTitle[lang]}</p>
        <h2 id="contact-h" className="h-display mt-2 text-5xl sm:text-6xl">
          {t.ctaLead[lang]} <span className="hl">{t.ctaWord[lang]}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted">{t.contactBody[lang]}</p>
        <a
          href={`mailto:${owner.email}`}
          className="mt-8 inline-block max-w-full break-all rounded-full bg-hl px-7 py-3.5 text-base font-bold text-hlfg hover:opacity-90"
        >
          {t.emailMe[lang]}: {owner.email}
        </a>
      </section>
    </div>
  );
}
