import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleLesson } from "@/components/ArticleLesson";
import { JsonLd } from "@/components/JsonLd";
import { Markdown } from "@/components/Markdown";
import { Widget } from "@/components/phonetics/Widget";
import { t as site } from "@/content/site";
import { englishCourses, phoneticsModules } from "@/content/english";
import { getArticleBody, getArticles } from "@/lib/articles";
import { isLocale, locales } from "@/lib/i18n";
import { abs, pageMeta } from "@/lib/seo";

type Params = { lang: string; lesson: string };
const course = englishCourses[0];

export function generateStaticParams() {
  return locales.flatMap((lang) => getArticles("phonetics").map((l) => ({ lang, lesson: l.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang, lesson } = await params;
  const l = getArticles("phonetics").find((x) => x.slug === lesson);
  if (!isLocale(lang) || !l) return {};
  return pageMeta({
    lang,
    path: `/learning/english/phonetics/${l.slug}`,
    title: `${l.title[lang]} | ${course.name[lang]}`,
    description: `${l.summary[lang]}. ${lang === "vi" ? "Bài viết song ngữ về ngữ âm học tiếng Anh, có bài tập nhẹ nhàng." : "A bilingual article on English phonetics with gentle practice questions."}`,
    type: "article",
  });
}

export default async function PhoneticsLesson({ params }: { params: Promise<Params> }) {
  const { lang, lesson } = await params;
  if (!isLocale(lang)) notFound();
  const all = getArticles("phonetics");
  const idx = all.findIndex((l) => l.slug === lesson);
  if (idx < 0) notFound();
  const l = all[idx];
  const base = `/${lang}/learning/english/phonetics`;
  const mod = phoneticsModules.find((m) => m.id === l.module);
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
            isAccessibleForFree: true,
            isPartOf: { "@type": "Course", name: course.name[lang], url: abs(base) },
            author: { "@type": "Person", name: "Tạ Hoàng Anh Tuấn", url: abs(`/${lang}`) },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Leo", item: abs(`/${lang}`) },
              { "@type": "ListItem", position: 2, name: site.english[lang], item: abs(`/${lang}/learning/english`) },
              { "@type": "ListItem", position: 3, name: course.name[lang], item: abs(base) },
              { "@type": "ListItem", position: 4, name: l.title[lang], item: url },
            ],
          },
        ]}
      />
      <ArticleLesson
        lang={lang}
        courseId="phonetics"
        slug={l.slug}
        quiz={l.quiz}
        isPractice={l.kind === "practice"}
        backHref={base}
        crumbs={[
          { label: "Learn With Leo", href: `/${lang}/learning` },
          { label: site.english[lang], href: `/${lang}/learning/english` },
          { label: course.name[lang], href: base },
          { label: l.title[lang] },
        ]}
        prevHref={idx > 0 ? `${base}/${all[idx - 1].slug}` : undefined}
        nextHref={idx < all.length - 1 ? `${base}/${all[idx + 1].slug}` : undefined}
        moduleTitle={mod?.title[lang] ?? ""}
        title={l.title[lang]}
        minutes={l.minutes}
      >
        {/* Tiêu đề đã có trong khung bài, nên bỏ dòng "# ..." đầu file Markdown để không lặp.
            Dòng {{widget:ten}} trong Markdown được thay bằng công cụ tương tác. */}
        {getArticleBody("phonetics", l.slug, lang)
          .replace(/^#\s.*\n+/, "")
          .split(/^\{\{widget:([a-z0-9-]+)\}\}\s*$/m)
          .map((part, i) => (i % 2 === 1 ? <Widget key={i} name={part} /> : part.trim() ? <Markdown key={i} source={part} /> : null))}
      </ArticleLesson>
    </>
  );
}
