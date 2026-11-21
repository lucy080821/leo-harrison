import { Logo } from "@/components/Logo";
import { LangSwitch } from "@/components/LangSwitch";
import { ThemeToggle } from "@/components/ThemeToggle";
import { dict, type Locale } from "@/lib/i18n";

export function Header({ lang }: { lang: Locale }) {
  const t = dict[lang];
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Logo href={`/${lang}`} />
        <div className="flex items-center gap-2">
          <LangSwitch lang={lang} label={t.language} />
          <ThemeToggle label={t.theme} />
        </div>
      </div>
    </header>
  );
}
