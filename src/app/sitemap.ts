import type { MetadataRoute } from "next";
import { categories, courses } from "@/content/registry";
import { getLessons } from "@/lib/content";
import { locales } from "@/lib/i18n";
import { abs, languageAlternates } from "@/lib/seo";

/** Mọi trang của site, mỗi trang có đủ bản VI và EN liên kết với nhau bằng hreflang. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths: { path: string; priority: number; freq: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/projects", priority: 0.9, freq: "monthly" },
    { path: "/learning", priority: 0.8, freq: "monthly" },
    { path: "/learning/english", priority: 0.4, freq: "monthly" },
    { path: "/about", priority: 0.6, freq: "monthly" },
    { path: "/learning/programming", priority: 0.8, freq: "weekly" },
    ...categories.map((c) => ({ path: `/learning/programming/${c.id}`, priority: 0.7, freq: "monthly" as const })),
    ...courses
      .filter((c) => getLessons(c.id).length > 0)
      .flatMap((c) => [
        { path: `/learning/programming/courses/${c.id}`, priority: 0.7, freq: "weekly" as const },
        ...getLessons(c.id).map((l) => ({
          path: `/learning/programming/courses/${c.id}/${l.slug}`,
          priority: 0.5,
          freq: "monthly" as const,
        })),
      ]),
  ];

  const now = new Date();
  return paths.flatMap(({ path, priority, freq }) =>
    locales.map((lang) => ({
      url: abs(`/${lang}${path}`),
      lastModified: now,
      changeFrequency: freq,
      priority,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
