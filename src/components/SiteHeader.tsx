"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { LangSwitch } from "@/components/LangSwitch";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { headerNav, headerQuote, owner } from "@/content/site";
import { dict, type Locale } from "@/lib/i18n";

export function SiteHeader({ lang }: { lang: Locale }) {
  const t = dict[lang];
  const path = (usePathname() ?? "").replace(/\/$/, "");
  const home = path === `/${lang}`;
  const inLexi = path.startsWith(`/${lang}/learning/programming`);

  const [spy, setSpy] = useState<string | null>(null); // mục đang xem trên trang chủ
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Mục đang sáng: trang riêng theo đường dẫn, mục trên trang chủ theo vị trí cuộn.
  const activeId = (() => {
    for (const n of headerNav) {
      if ((path === `/${lang}/${n.target}` || path.startsWith(`/${lang}/${n.target}/`))) return n.id;
    }
    if (path.startsWith(`/${lang}/about`)) return "about";
    return home ? spy : null;
  })();

  // Mục nào đang ở vùng đọc (khoảng 40% chiều cao màn hình tính từ trên xuống) thì sáng lên; chỉ trên trang chủ.
  useEffect(() => {
    if (!home) return;
    const ids = headerNav.filter((n) => n.kind === "hash").map((n) => n.target);
    let raf = 0;
    const compute = () => {
      raf = 0;
      const els = ids.map((id) => document.getElementById(id));
      let cur: string | null = null;
      els.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) cur = ids[i];
      });
      if (window.scrollY < 120) cur = null;
      else if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) cur = ids[ids.length - 1];
      setSpy(cur);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [home]);

  // Thanh tiến độ cuộn và bóng đổ khi cuộn.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      barRef.current?.style.setProperty("--p", Math.min(1, window.scrollY / max).toFixed(4));
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [path]);

  // Viên thuốc trượt dưới mục đang sáng.
  const movePill = useCallback(() => {
    const pill = pillRef.current;
    const list = listRef.current;
    if (!pill || !list) return;
    const el = activeId ? linkRefs.current[activeId] : null;
    if (!el) {
      pill.style.opacity = "0";
      return;
    }
    pill.style.opacity = "1";
    const li = el.parentElement as HTMLElement; // li nằm trực tiếp trong ul (relative)
    pill.style.width = `${li.offsetWidth}px`;
    pill.style.transform = `translateX(${li.offsetLeft}px)`;
  }, [activeId]);
  useLayoutEffect(movePill, [movePill, lang]);
  useEffect(() => {
    window.addEventListener("resize", movePill);
    return () => window.removeEventListener("resize", movePill);
  }, [movePill]);

  // Đóng menu di động khi đổi trang, bấm Esc hoặc khi màn hình đủ rộng.
  useEffect(() => {
    const t0 = setTimeout(() => setOpen(false), 0);
    return () => clearTimeout(t0);
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const hrefOf = (n: (typeof headerNav)[number]) => (n.kind === "page" ? `/${lang}/${n.target}` : `/${lang}#${n.target}`);

  const items = headerNav.map((n) => ({ ...n, href: hrefOf(n), active: activeId === n.id }));

  return (
    <header
      className={`sticky top-0 z-30 border-b backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled || open ? "border-line bg-bg/90 shadow-[0_6px_24px_-14px_rgba(11,37,64,.35)]" : "border-transparent bg-bg/55"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <div className="flex min-w-0 items-center gap-3">
          {inLexi ? (
            <>
              <Logo href={`/${lang}/learning/programming`} />
              <Link href={`/${lang}`} className="hidden text-sm text-muted hover:text-brand sm:inline">
                {owner.nick}
              </Link>
            </>
          ) : (
            <Link href={`/${lang}`} className="group flex items-center gap-2.5" aria-label={`${owner.name} (${owner.nick})`}>
              <span className="relative block h-9 w-9 shrink-0 overflow-hidden rounded-full bg-brandsoft ring-1 ring-line transition group-hover:ring-brand">
                <Image src="/leo-portrait.webp" alt="" width={72} height={72} className="h-full w-full object-cover object-top" />
              </span>
              <span className="leading-tight">
                <span className="block text-base font-bold tracking-tight">{owner.nick}</span>
                <span className="hidden max-w-[15rem] truncate text-[0.72rem] italic text-muted lg:block xl:max-w-none" title={`${headerQuote[lang]} — La La Land`}>
                  {headerQuote[lang]}
                </span>
              </span>
            </Link>
          )}
        </div>

        <nav aria-label="Main" className="hidden md:block">
          <ul ref={listRef} className="relative flex items-center gap-0.5 rounded-full border border-line bg-surface/70 p-1 text-sm">
            <span
              ref={pillRef}
              aria-hidden
              className="absolute left-0 top-1 h-[calc(100%-0.5rem)] rounded-full bg-brand opacity-0 shadow-sm transition-[transform,width,opacity] duration-300 ease-out"
            />
            {items.map((n) => (
              <li key={n.id} className="relative">
                <Link
                  href={n.href}
                  ref={(el) => {
                    linkRefs.current[n.id] = el;
                  }}
                  aria-current={n.active ? (n.kind === "page" ? "page" : "location") : undefined}
                  className={`block whitespace-nowrap rounded-full px-3.5 py-1.5 font-medium transition-colors ${
                    n.active ? "text-onbrand" : "text-muted hover:text-fg"
                  }`}
                >
                  {n.label[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitch lang={lang} label={t.language} />
          <ThemeToggle label={t.theme} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? (lang === "vi" ? "Đóng menu" : "Close menu") : lang === "vi" ? "Mở menu" : "Open menu"}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface text-fg hover:bg-surface2 md:hidden"
          >
            <span className="relative block h-3.5 w-4" aria-hidden>
              <span className={`absolute left-0 h-0.5 w-4 rounded bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-4 rounded bg-current transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 h-0.5 w-4 rounded bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Mobile" className="min-h-0">
          <ul className="mx-auto max-w-6xl space-y-1 px-4 pb-4 pt-1">
            {items.map((n) => (
              <li key={n.id}>
                <Link
                  href={n.href}
                  onClick={() => setOpen(false)}
                  aria-current={n.active ? "true" : undefined}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    n.active ? "bg-brand text-onbrand" : "bg-surface/70 text-fg hover:bg-surface2"
                  }`}
                >
                  {n.label[lang]}
                  <span aria-hidden className="opacity-60">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div ref={barRef} className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-[2px] overflow-hidden" aria-hidden style={{ ["--p" as string]: 0 }}>
        <div className="h-full origin-left bg-gradient-to-r from-brand to-brand2" style={{ transform: "scaleX(var(--p))" }} />
      </div>
    </header>
  );
}
