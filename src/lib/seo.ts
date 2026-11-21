import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";

/** Địa chỉ gốc của website. Đặt NEXT_PUBLIC_SITE_URL khi deploy (ví dụ https://ten-mien-cua-ban.com). */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const siteName = "Leo · Tạ Hoàng Anh Tuấn";

export function abs(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Đường dẫn của một trang ở từng ngôn ngữ, dùng cho hreflang và sitemap. */
export function languageAlternates(path: string) {
  const out: Record<string, string> = {};
  for (const l of locales) out[l] = abs(`/${l}${path}`);
  out["x-default"] = abs(`/vi${path}`);
  return out;
}

type PageMetaInput = {
  lang: Locale;
  /** Đường dẫn sau tiền tố ngôn ngữ, bắt đầu bằng "/" (để trống cho trang chủ). */
  path: string;
  /** Tiêu đề đầy đủ của thẻ <title> (không qua template). */
  title: string;
  description: string;
  type?: "website" | "article";
  noindex?: boolean;
};

/** Metadata chuẩn cho một trang: title, description, canonical, hreflang, Open Graph, Twitter. */
export function pageMeta({ lang, path, title, description, type = "website", noindex }: PageMetaInput): Metadata {
  const url = abs(`/${lang}${path}`);
  const image = abs(`/og-${lang}.png`);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName,
      locale: lang === "vi" ? "vi_VN" : "en_US",
      alternateLocale: lang === "vi" ? ["en_US"] : ["vi_VN"],
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
