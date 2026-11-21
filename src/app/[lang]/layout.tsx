import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/Header";
import { ThemeScript } from "@/components/ThemeScript";
import { dict, isLocale, locales } from "@/lib/i18n";


export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: { default: "Lexi Learn", template: "%s · Lexi Learn" }, description: dict[lang].tagline };
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
        <Header lang={lang} />
        <main>{children}</main>
      </body>
    </html>
  );
}
