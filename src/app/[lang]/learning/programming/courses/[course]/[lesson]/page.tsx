import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { courses, getCategory, getCourse } from "@/content/registry";
import { t as site } from "@/content/site";
import { getEngineData, getLessonBody, getLessons } from "@/lib/content";
import { LessonWorkspace } from "@/components/LessonWorkspace";
import { Markdown } from "@/components/Markdown";
import { dict, isLocale, locales } from "@/lib/i18n";
import { abs, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

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
  const co = getCourse(course);
  if (!l || !co) return {};
  return pageMeta({
    lang,
    path: `/learning/programming/courses/${course}/${l.slug}`,
    title: `${l.title[lang]} | ${co.name[lang]} – Lexi Learn`,
    description: `${l.summary[lang]}. ${lang === "vi" ? "Bài học song ngữ có bài tập tự chấm, code chạy trực tiếp trên trình duyệt." : "A bilingual lesson with auto-checked exercises; code runs live in your browser."}`,
    type: "article",
  });
}

export default async function LessonPage({ params }: { params: Promise<Params> }) {
  const { lang, course, lesson } = await params;
  if (!isLocale(lang) || !getCourse(course)) notFound();

  const all = getLessons(course);
  const idx = all.findIndex((l) => l.slug === lesson);
  if (idx < 0) notFound();
  const l = all[idx];
  const t = dict[lang];
  const base = `/${lang}/learning/programming/courses/${course}`;

  const co = getCourse(course)!;
  const cat = getCategory(co.category)!;
  const url = abs(`${base}/${l.slug}`);
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: l.title[lang],
            description: l.summary[lang],
            inLanguage: lang,
            url,
            timeRequired: `PT${l.minutes}M`,
            learningResourceType: "Interactive lesson",
            isAccessibleForFree: true,
            isPartOf: { "@type": "Course", name: co.name[lang], url: abs(base) },
            author: { "@type": "Person", name: "Tạ Hoàng Anh Tuấn", url: abs(`/${lang}`) },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Leo", item: abs(`/${lang}`) },
              { "@type": "ListItem", position: 2, name: "Lexi Learn", item: abs(`/${lang}/learning`) },
              { "@type": "ListItem", position: 3, name: site.programming[lang], item: abs(`/${lang}/learning/programming`) },
              { "@type": "ListItem", position: 4, name: cat.name[lang], item: abs(`/${lang}/learning/programming/${cat.id}`) },
              { "@type": "ListItem", position: 5, name: co.name[lang], item: abs(base) },
              { "@type": "ListItem", position: 6, name: l.title[lang], item: url },
            ],
          },
        ]}
      />
      <Breadcrumbs
        bar
        items={[
          { label: "Lexi Learn", href: `/${lang}/learning` },
          { label: site.programming[lang], href: `/${lang}/learning/programming` },
          { label: cat.name[lang], href: `/${lang}/learning/programming/${cat.id}` },
          { label: co.name[lang], href: base },
          { label: l.title[lang] },
        ]}
      />
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
    </>
  );
}
