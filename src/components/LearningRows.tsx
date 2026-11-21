import Link from "next/link";
import { categories, coursesOf } from "@/content/registry";
import { getLessons } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { t } from "@/content/site";

const icons = {
  code: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a8 8 0 0 1-11.7 7.1L3 21l1.9-6.3A8 8 0 1 1 21 12Z" />
    </svg>
  ),
};

/** Hai thẻ danh mục học: mục chưa có nội dung được làm mờ như phần "Services" trong bản tham khảo. */
export function LearningRows({ lang }: { lang: Locale }) {
  const lessonCount = categories.flatMap((c) => coursesOf(c.id)).reduce((n, co) => n + getLessons(co.id).length, 0);

  const cards = [
    { href: `/${lang}/learning/programming`, icon: icons.code, name: t.programming[lang], desc: t.programmingDesc[lang], status: `${lessonCount} ${t.lessons[lang]}`, live: true },
    { href: `/${lang}/learning/english`, icon: icons.chat, name: t.english[lang], desc: t.englishDesc[lang], status: t.soon[lang], live: false },
  ];

  return (
    <ul className="mt-10 grid gap-5 md:grid-cols-2">
      {cards.map((c) => (
        <li key={c.href}>
          <Link
            href={c.href}
            className={`group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition hover:border-hl ${c.live ? "" : "opacity-65"}`}
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface2 text-label">{c.icon}</span>
            <span className="h-display mt-5 text-2xl">{c.name}</span>
            <span className="mt-2 flex-1 leading-relaxed text-muted">{c.desc}</span>
            <span className="label mt-5">{c.status}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
