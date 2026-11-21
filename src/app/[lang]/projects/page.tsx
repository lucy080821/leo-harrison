import { notFound } from "next/navigation";
import { ProjectBlock } from "@/components/ProjectBlock";
import { projects, t } from "@/content/site";
import { isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return { title: isLocale(lang) ? t.projectsTitle[lang] : "Projects" };
}

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <div className="mx-auto max-w-5xl px-4 pt-14">
      <h1 className="font-display text-5xl font-medium tracking-tight">{t.projectsTitle[lang]}</h1>
      <p className="mt-3 max-w-xl text-lg text-muted">{t.projectsIntro[lang]}</p>
      <div className="mt-10">
        {projects.map((p, i) => (
          <ProjectBlock key={p.id} p={p} lang={lang} flip={i % 2 === 1} full />
        ))}
      </div>
    </div>
  );
}
