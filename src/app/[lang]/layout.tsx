import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/500.css";
import "@fontsource/be-vietnam-pro/600.css";
import "@fontsource/be-vietnam-pro/700.css";
import "@fontsource-variable/newsreader/index.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { owner } from "@/content/site";
import { ThemeScript } from "@/components/ThemeScript";
import { isLocale, locales } from "@/lib/i18n";


export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const description =
    lang === "vi"
      ? "Tạ Hoàng Anh Tuấn (Leo): Lucy Tutor, Cerno, và nơi học lập trình Lexi Learn."
      : "Tạ Hoàng Anh Tuấn (Leo): Lucy Tutor, Cerno, and the Lexi Learn programming course.";
  return { title: { default: `${owner.nick} · ${owner.name}`, template: `%s · ${owner.nick}` }, description };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} suppressHydrationWarning className="antialiased">
      <head>
        <ThemeScript />
      </head>
      <body suppressHydrationWarning className="min-h-screen bg-bg font-sans text-fg">
        <SiteHeader lang={lang} />
        <main>{children}</main>
        <SiteFooter lang={lang} />
      </body>
    </html>
  );
}
