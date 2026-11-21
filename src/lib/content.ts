import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { L10n, Locale } from "@/lib/i18n";

const ROOT = path.join(process.cwd(), "content");

export type FileLang = "html" | "css" | "javascript" | "jsx" | "python" | "sql";

export type LessonFile = {
  name: string;
  lang: FileLang;
  code: string;
  hidden?: boolean;
};

export type Check = { label: L10n; test: string };

export type Exercise = {
  id: string;
  prompt: L10n;
  hint: L10n;
  starter: LessonFile[];
  solution: LessonFile[];
  checks: Check[];
};

export type LessonMeta = {
  slug: string;
  title: L10n;
  summary: L10n;
  minutes: number;
  /** "web": mở tab Kết quả trước; "console": mở tab Console trước (chỉ dùng cho engine web) */
  preview: "web" | "console";
  /** Engine chạy code: mặc định "web" (iframe). "python" = Pyodide, "sql" = SQLite WASM */
  engine?: "web" | "python" | "sql";
  /** Môi trường chạy cho engine web: "react" (JSX), "rn" (react-native-web), "node" (mô phỏng Node) */
  runtime?: "react" | "rn" | "node";
  /** Python: tên các file dữ liệu trong content/_data/files/ được ghi vào hệ file ảo */
  data?: string[];
  /** SQL: tên bộ dữ liệu mẫu trong content/_data/sql/<tên>.sql */
  dataset?: string;
  files: LessonFile[];
  exercises: Exercise[];
};

function courseDir(courseId: string) {
  return path.join(ROOT, courseId);
}

export function getLessons(courseId: string): LessonMeta[] {
  const dir = courseDir(courseId);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(dir, slug, "lesson.json"), "utf8");
      return { slug, ...(JSON.parse(raw) as Omit<LessonMeta, "slug">) };
    });
}

export function getLesson(courseId: string, slug: string) {
  return getLessons(courseId).find((l) => l.slug === slug);
}

export function getLessonBody(courseId: string, slug: string, lang: Locale) {
  const file = path.join(courseDir(courseId), slug, `${lang}.md`);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

/** Đọc dữ liệu đi kèm bài (file CSV cho Python, script khởi tạo cho SQL). */
export function getEngineData(lesson: LessonMeta) {
  const data: Record<string, string> = {};
  for (const name of lesson.data ?? []) {
    data[name] = fs.readFileSync(path.join(ROOT, "_data", "files", name), "utf8");
  }
  const dataset = lesson.dataset
    ? fs.readFileSync(path.join(ROOT, "_data", "sql", `${lesson.dataset}.sql`), "utf8")
    : undefined;
  return { data, dataset };
}
