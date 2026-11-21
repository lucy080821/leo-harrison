import Link from "next/link";
import { notFound } from "next/navigation";
import { BilingualLine } from "@/components/BilingualLine";
import { ProjectBlock } from "@/components/ProjectBlock";
import { LearningRows } from "@/components/LearningRows";
import { heroChunks, owner, projects, t } from "@/content/site";
import { isLocale } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4">
      <section className="pb-16 pt-14 sm:pt-20">
        <p className="mb-6 text-muted">
          {t.hello[lang]} <span className="font-semibold text-fg">{owner.name}</span> ({owner.nick})
        </p>
        <BilingualLine chunks={heroChunks} lang={lang} />
        <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted">{t.heroSub[lang]}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/${lang}/projects`} className="rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:opacity-90">
            {t.seeProjects[lang]}
          </Link>
          <Link href={`/${lang}/learning`} className="rounded-lg border border-line bg-surface px-5 py-2.5 font-semibold hover:bg-surface2">
            {t.startLearning[lang]}
          </Link>
        </div>
      </section>

      <section aria-labelledby="projects-h" className="pb-6">
        <h2 id="projects-h" className="font-display text-3xl font-semibold tracking-tight">
          {t.projectsTitle[lang]}
        </h2>
        <p className="mt-2 text-muted">{t.projectsIntro[lang]}</p>
        <div className="mt-8">
          {projects.map((p, i) => (
            <ProjectBlock key={p.id} p={p} lang={lang} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      <section aria-labelledby="learn-h" className="pt-10">
        <h2 id="learn-h" className="font-display text-3xl font-semibold tracking-tight">
          {t.learningTitle[lang]}
        </h2>
        <p className="mt-2 max-w-xl text-muted">{t.learningIntro[lang]}</p>
        <LearningRows lang={lang} />
      </section>

      <section aria-labelledby="contact-h" className="mt-20 border-t border-line pt-10">
        <h2 id="contact-h" className="font-display text-3xl font-semibold tracking-tight">
          {t.contactTitle[lang]}
        </h2>
        <p className="mt-2 max-w-xl text-muted">{t.contactBody[lang]}</p>
        <a href={`mailto:${owner.email}`} className="font-display mt-5 inline-block break-all text-2xl text-brand underline decoration-brand2 underline-offset-4 sm:text-3xl">
          {owner.email}
        </a>
      </section>
    </div>
  );
}
