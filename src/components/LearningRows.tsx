import Link from "next/link";
import { categories, coursesOf } from "@/content/registry";
import { getLessons } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { t } from "@/content/site";
import { getArticles } from "@/lib/articles";

/** Hai hướng học: một dòng cho mỗi hướng, ngăn cách bằng đường kẻ. */
export function LearningRows({ lang }: { lang: Locale }) {
  const lessonCount = categories.flatMap((c) => coursesOf(c.id)).reduce((n, co) => n + getLessons(co.id).length, 0);

  const phoneticsCount = getArticles("phonetics").length;
  const rows = [
    { href: `/${lang}/learning/programming`, name: t.programming[lang], desc: t.programmingDesc[lang], status: `${lessonCount} ${t.lessons[lang]}`, live: true },
    { href: `/${lang}/learning/english`, name: t.english[lang], desc: t.englishDesc[lang], status: phoneticsCount > 0 ? `${phoneticsCount} ${t.lessons[lang]}` : t.soon[lang], live: phoneticsCount > 0 },
  ];

  return (
    <ul className="mt-8 border-b border-line">
      {rows.map((r) => (
        <li key={r.href} className="border-t border-line">
          <Link href={r.href} className="group grid gap-1 py-6 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto] sm:items-baseline sm:gap-8">
            <h3 className="h-display text-xl group-hover:text-brand">{r.name}</h3>
            <p className="text-muted">{r.desc}</p>
            <p className={`text-sm ${r.live ? "font-semibold text-ok" : "text-muted"}`}>{r.status}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
