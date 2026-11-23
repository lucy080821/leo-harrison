import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { CourseProgress, LessonStatus } from "@/components/LessonStatus";
import { statisticsCourse as co } from "@/content/registry";
import { t as site } from "@/content/site";
import { getLessons } from "@/lib/content";
import { dict, isLocale, locales } from "@/lib/i18n";
import { abs, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const n = getLessons(co.id).length;
  return pageMeta({
    lang,
    path: "/learning/statistics",
    title: `${co.name[lang]} | ${lang === "vi" ? "Toán và Thống kê" : "Math and Statistics"}`,
    description: `${co.desc[lang]} ${n} ${lang === "vi" ? "bài học có bài tập tự chấm." : "lessons with auto-checked exercises."}`,
  });
}

export default async function StatisticsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dict[lang];
  const lessons = getLessons(co.id);
  const base = `/${lang}/learning/statistics`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: co.name[lang],
          description: co.desc[lang],
          inLanguage: lang,
          url: abs(base),
          provider: { "@type": "Person", name: "Tạ Hoàng Anh Tuấn", url: abs(`/${lang}`) },
          isAccessibleForFree: true,
        }}
      />
      <Link href={`/${lang}/learning`} className="text-sm text-muted hover:text-brand">
        ← {site.learningTitle[lang]}
      </Link>
      <h1 className="h-display mt-3 text-3xl sm:text-4xl">{site.statistics[lang]}</h1>
      <p className="mt-2 text-lg text-muted">{co.desc[lang]}</p>

      <CourseProgress course={co.id} lessons={lessons.map((l) => l.slug)} label={t.progress} />
      <h2 className="mb-3 mt-8 text-lg font-bold">{t.lessonList}</h2>
      <ol className="space-y-3">
        {lessons.map((l, i) => (
          <li key={l.slug}>
            <Link
              href={`${base}/${l.slug}`}
              className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition hover:border-brand hover:shadow"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brandsoft text-sm font-bold text-brand">{i + 1}</span>
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
    </div>
  );
}
