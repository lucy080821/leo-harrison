import Link from "next/link";
import { SocialLinks } from "@/components/SocialLinks";
import { owner, t as site, nav } from "@/content/site";
import type { Locale } from "@/lib/i18n";

export function SiteFooter({ lang }: { lang: Locale }) {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {owner.name} ({owner.nick}). {site.rights[lang]}
        </p>
        <div className="flex flex-wrap items-center gap-5">
          {nav.map((n) => (
            <Link key={n.href} href={`/${lang}/${n.href}`} className="hover:text-fg">
              {n.label[lang]}
            </Link>
          ))}
          <a href={`mailto:${owner.email}`} className="hover:text-fg">
            {owner.email}
          </a>
          <SocialLinks compact />
        </div>
      </div>
    </footer>
  );
}
