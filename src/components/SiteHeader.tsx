"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { LangSwitch } from "@/components/LangSwitch";
import { ThemeToggle } from "@/components/ThemeToggle";
import { dict, type Locale } from "@/lib/i18n";
import { nav, owner } from "@/content/site";

export function SiteHeader({ lang }: { lang: Locale }) {
  const t = dict[lang];
  const path = usePathname() ?? "";
  const inLexi = path.startsWith(`/${lang}/learning/programming`);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-x-4 px-4 py-2">
        <div className="flex items-center gap-4">
          {inLexi ? (
            <Logo href={`/${lang}/learning/programming`} />
          ) : (
            <Link href={`/${lang}`} className="text-xl font-bold tracking-tight" aria-label={`${owner.name} (${owner.nick})`}>
              {owner.nick}
            </Link>
          )}
          {inLexi && (
            <Link href={`/${lang}`} className="hidden text-sm text-muted hover:text-brand sm:inline">
              {owner.nick}
            </Link>
          )}
        </div>

        <nav aria-label="Main" className="order-3 flex w-full gap-6 pb-1 text-[0.95rem] sm:order-none sm:w-auto sm:pb-0">
          {nav.map((n) => {
            const href = `/${lang}/${n.href}`;
            const active = path === href || path.startsWith(`${href}/`);
            return (
              <Link
                key={n.href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`border-b-2 py-1 ${active ? "border-brand font-semibold text-fg" : "border-transparent text-muted hover:text-fg"}`}
              >
                {n.label[lang]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitch lang={lang} label={t.language} />
          <ThemeToggle label={t.theme} />
        </div>
      </div>
    </header>
  );
}
