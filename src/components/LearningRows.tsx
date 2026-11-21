import Link from "next/link";
import { categories, coursesOf } from "@/content/registry";
import { getLessons } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { t } from "@/content/site";

export function LearningRows({ lang }: { lang: Locale }) {
  const lessonCount = categories
    .flatMap((c) => coursesOf(c.id))
    .reduce((n, co) => n + getLessons(co.id).length, 0);

  const rows = [
    {
      href: `/${lang}/learning/programming`,
      name: t.programming[lang],
      desc: t.programmingDesc[lang],
      status: `${lessonCount} ${t.lessons[lang]}`,
      live: true,
    },
    {
      href: `/${lang}/learning/english`,
      name: t.english[lang],
      desc: t.englishDesc[lang],
      status: t.soon[lang],
      live: false,
    },
  ];

  return (
    <ul className="mt-8 border-b border-line">
      {rows.map((r) => (
        <li key={r.href} className="border-t border-line">
          <Link
            href={r.href}
            className="group grid gap-2 py-6 sm:grid-cols-[minmax(0,18rem)_minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
          >
            <span className="font-display text-2xl font-semibold group-hover:text-brand">{r.name}</span>
            <span className="text-muted">{r.desc}</span>
            <span className={`text-sm font-semibold ${r.live ? "text-ok" : "text-muted"}`}>{r.status}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
