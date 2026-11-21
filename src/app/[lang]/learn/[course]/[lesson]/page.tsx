import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { courses, getCourse } from "@/content/registry";
import { getEngineData, getLessonBody, getLessons } from "@/lib/content";
import { LessonWorkspace } from "@/components/LessonWorkspace";
import { Markdown } from "@/components/Markdown";
import { dict, isLocale, locales } from "@/lib/i18n";

type Params = { lang: string; course: string; lesson: string };

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    courses.flatMap((c) => getLessons(c.id).map((l) => ({ lang, course: c.id, lesson: l.slug }))),
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang, course, lesson } = await params;
  if (!isLocale(lang)) return {};
  const l = getLessons(course).find((x) => x.slug === lesson);
  return l ? { title: l.title[lang] } : {};
}

export default async function LessonPage({ params }: { params: Promise<Params> }) {
  const { lang, course, lesson } = await params;
  if (!isLocale(lang) || !getCourse(course)) notFound();

  const all = getLessons(course);
  const idx = all.findIndex((l) => l.slug === lesson);
  if (idx < 0) notFound();
  const l = all[idx];
  const t = dict[lang];
  const base = `/${lang}/learn/${course}`;

  return (
    <LessonWorkspace
      lang={lang}
      t={t}
      courseId={course}
      slug={l.slug}
      files={l.files}
      preview={l.preview}
      engine={l.engine ?? "web"}
      runtime={l.runtime}
      engineData={getEngineData(l)}
      exercises={l.exercises}
      prevHref={idx > 0 ? `${base}/${all[idx - 1].slug}` : base}
      nextHref={idx < all.length - 1 ? `${base}/${all[idx + 1].slug}` : undefined}
    >
      <Markdown source={getLessonBody(course, l.slug, lang)} />
    </LessonWorkspace>
  );
}
