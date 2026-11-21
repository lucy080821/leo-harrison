import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { L10n, Locale } from "@/lib/i18n";

const ROOT = path.join(process.cwd(), "content");

export type QuizItem =
  | { id: string; type: "choice"; q: L10n; options: L10n[]; answer: number; explain: L10n }
  | { id: string; type: "text"; q: L10n; answers: string[]; ipa?: boolean; explain: L10n };

export type ArticleMeta = {
  slug: string;
  title: L10n;
  summary: L10n;
  minutes: number;
  module: string;
  kind: "lesson" | "practice";
  quiz: QuizItem[];
};

/** Đọc các bài dạng bài viết (có lesson.json với "quiz") của một khoá, sắp theo tên thư mục. */
export function getArticles(courseId: string): ArticleMeta[] {
  const dir = path.join(ROOT, courseId);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(dir, slug, "lesson.json"), "utf8");
      return { slug, ...(JSON.parse(raw) as Omit<ArticleMeta, "slug">) };
    });
}

export function getArticleBody(courseId: string, slug: string, lang: Locale) {
  const file = path.join(ROOT, courseId, slug, `${lang}.md`);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}
