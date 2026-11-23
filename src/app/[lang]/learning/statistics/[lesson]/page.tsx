import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { LessonWorkspace } from "@/components/LessonWorkspace";
import { Markdown } from "@/components/Markdown";
import { statisticsCourse as co } from "@/content/registry";
import { t as site } from "@/content/site";
import { getEngineData, getLessonBody, getLessons } from "@/lib/content";
import { dict, isLocale, locales } from "@/lib/i18n";
import { abs, pageMeta } from "@/lib/seo";

type Params = { lang: string; lesson: string };

export function generateStaticParams() {
  return locales.flatMap((lang) => getLessons(co.id).map((l) => ({ lang, lesson: l.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang, lesson } = await params;
  if (!isLocale(lang)) return {};
  const l = getLessons(co.id).find((x) => x.slug === lesson);
  if (!l) return {};
  return pageMeta({
    lang,
    path: `/learning/statistics/${l.slug}`,
    title: `${l.title[lang]} | ${site.statistics[lang]}`,
    description: `${l.summary[lang]}. ${lang === "vi" ? "Bài học song ngữ có ví dụ thực tế, bài tập tự chấm và code chạy trực tiếp trên trình duyệt." : "A bilingual lesson with real-world examples, auto-checked exercises and code that runs live in your browser."}`,
    type: "article",
  });
}

export default async function StatisticsLessonPage({ params }: { params: Promise<Params> }) {
  const { lang, lesson } = await params;
  if (!isLocale(lang)) notFound();
  const all = getLessons(co.id);
  const idx = all.findIndex((l) => l.slug === lesson);
  if (idx < 0) notFound();
  const l = all[idx];
  const t = dict[lang];
  const base = `/${lang}/learning/statistics`;
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
              { "@type": "ListItem", position: 2, name: "Learn With Leo", item: abs(`/${lang}/learning`) },
              { "@type": "ListItem", position: 3, name: site.statistics[lang], item: abs(base) },
              { "@type": "ListItem", position: 4, name: l.title[lang], item: url },
            ],
          },
        ]}
      />
      <Breadcrumbs
        bar
        items={[{ label: "Learn With Leo", href: `/${lang}/learning` }, { label: site.statistics[lang], href: base }, { label: l.title[lang] }]}
      />
      <LessonWorkspace
        lang={lang}
        t={t}
        courseId={co.id}
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
        <Markdown source={getLessonBody(co.id, l.slug, lang)} />
      </LessonWorkspace>
    </>
  );
}
