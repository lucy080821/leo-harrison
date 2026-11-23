import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { t as site } from "@/content/site";
import { CourseProgress, LessonStatus } from "@/components/LessonStatus";
import { JsonLd } from "@/components/JsonLd";
import { englishCourses, phoneticsModules, quizText } from "@/content/english";
import { getArticles } from "@/lib/articles";
import { isLocale, locales } from "@/lib/i18n";
import { abs, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const course = englishCourses[0];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMeta({
    lang,
    path: "/learning/english/phonetics",
    title: lang === "vi" ? "Ngữ âm học tiếng Anh: Anh-Anh và Anh-Mỹ, IPA, trọng âm, ngữ điệu | Leo" : "English Phonetics: British and American, IPA, stress, intonation | Leo",
    description: course.desc[lang],
  });
}

export default async function PhoneticsCourse({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = quizText[lang];
  const lessons = getArticles("phonetics");
  const base = `/${lang}/learning/english/phonetics`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: course.name[lang],
          description: course.desc[lang],
          inLanguage: lang,
          url: abs(base),
          provider: { "@type": "Person", name: "Tạ Hoàng Anh Tuấn", url: abs(`/${lang}`) },
          isAccessibleForFree: true,
        }}
      />
      <Breadcrumbs
        items={[
          { label: "Lexi Learn", href: `/${lang}/learning` },
          { label: site.english[lang], href: `/${lang}/learning/english` },
          { label: course.name[lang] },
        ]}
      />
      <h1 className="h-display mt-3 text-4xl">{course.name[lang]}</h1>
      <p className="mt-3 text-lg leading-relaxed text-muted">{course.desc[lang]}</p>
      <CourseProgress course="phonetics" lessons={lessons.map((l) => l.slug)} label={t.progress} />

      {phoneticsModules.map((m) => {
        const items = lessons.filter((l) => l.module === m.id);
        if (items.length === 0) return null;
        return (
          <section key={m.id} className="mt-10" aria-labelledby={`h-${m.id}`}>
            <h2 id={`h-${m.id}`} className="h-display text-2xl">
              {m.title[lang]}
            </h2>
            <p className="mt-1 text-muted">{m.desc[lang]}</p>
            <ol className="mt-4 border-b border-line">
              {items.map((l) => (
                <li key={l.slug} className="border-t border-line">
                  <Link href={`${base}/${l.slug}`} className="group flex items-center gap-4 py-4">
                    <LessonStatus course="phonetics" lesson={l.slug} label={t.done} />
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold group-hover:text-brand">
                        {l.kind === "practice" ? `${t.practice}: ` : ""}
                        {l.title[lang]}
                      </span>
                      <span className="block text-sm text-muted">{l.summary[lang]}</span>
                    </span>
                    <span className="shrink-0 text-sm text-muted">
                      {l.minutes} {t.minutes}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
