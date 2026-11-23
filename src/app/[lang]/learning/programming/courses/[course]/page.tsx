import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { t as site } from "@/content/site";
import { notFound } from "next/navigation";
import { courses, getCategory, getCourse } from "@/content/registry";
import { getLessons } from "@/lib/content";
import { CourseProgress, LessonStatus } from "@/components/LessonStatus";
import { dict, isLocale, locales } from "@/lib/i18n";
import { abs, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return locales.flatMap((lang) => courses.map((c) => ({ lang, course: c.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; course: string }> }) {
  const { lang, course } = await params;
  const co = getCourse(course);
  if (!isLocale(lang) || !co) return {};
  const n = getLessons(co.id).length;
  return pageMeta({
    lang,
    path: `/learning/programming/courses/${co.id}`,
    title: `${lang === "vi" ? "Học" : "Learn"} ${co.name[lang]} ${lang === "vi" ? "từ cơ bản" : "from scratch"} | Lexi Learn`,
    description: `${co.desc[lang]} ${n > 0 ? `${n} ${lang === "vi" ? "bài học có bài tập tự chấm." : "lessons with auto-checked exercises."}` : ""}`.trim(),
  });
}

export default async function CoursePage({ params }: { params: Promise<{ lang: string; course: string }> }) {
  const { lang, course } = await params;
  if (!isLocale(lang)) notFound();
  const co = getCourse(course);
  if (!co) notFound();
  const t = dict[lang];
  const lessons = getLessons(co.id);
  const cat = getCategory(co.category)!;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: co.name[lang],
          description: co.desc[lang],
          inLanguage: lang,
          url: abs(`/${lang}/learning/programming/courses/${co.id}`),
          provider: { "@type": "Person", name: "Tạ Hoàng Anh Tuấn", url: abs(`/${lang}`) },
          isAccessibleForFree: true,
        }}
      />
      <Breadcrumbs
        items={[
          { label: "Lexi Learn", href: `/${lang}/learning` },
          { label: site.programming[lang], href: `/${lang}/learning/programming` },
          { label: cat.name[lang], href: `/${lang}/learning/programming/${cat.id}` },
          { label: co.name[lang] },
        ]}
      />
      <h1 className="mt-3 text-3xl font-extrabold">{co.name[lang]}</h1>
      <p className="mt-2 text-muted">{co.desc[lang]}</p>

      {lessons.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-line bg-surface p-6 text-muted">{t.comingSoonBody}</p>
      ) : (
        <>
          <CourseProgress course={co.id} lessons={lessons.map((l) => l.slug)} label={t.progress} />
          <h2 className="mb-3 mt-8 text-lg font-bold">{t.lessonList}</h2>
          <ol className="space-y-3">
            {lessons.map((l, i) => (
              <li key={l.slug}>
                <Link
                  href={`/${lang}/learning/programming/courses/${co.id}/${l.slug}`}
                  className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition hover:border-brand hover:shadow"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brandsoft text-sm font-bold text-brand">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{l.title[lang]}</span>
                    <span className="block text-sm text-muted">
                      {l.summary[lang]} · {l.minutes} {t.minutes}
                    </span>
                  </span>
                  <LessonStatus course={co.id} lesson={l.slug} label={t.done} />
                </Link>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
