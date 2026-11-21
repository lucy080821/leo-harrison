"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export function LangSwitch({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname() ?? `/${lang}`;
  const rest = pathname.replace(/^\/(vi|en)/, "");
  return (
    <div
      role="group"
      aria-label={label}
      className="flex overflow-hidden rounded-lg border border-line bg-surface text-sm font-semibold"
    >
      {(["vi", "en"] as const).map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          aria-current={l === lang ? "true" : undefined}
          className={`px-3 py-1.5 ${
            l === lang ? "bg-brand text-white" : "text-muted hover:bg-surface2"
          }`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
