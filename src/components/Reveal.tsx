"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Hiện dần khi cuộn tới. Nội dung luôn có sẵn trong HTML (tốt cho SEO, và không bị ẩn khi tắt JS);
 * chỉ sau khi trang chạy trên trình duyệt, các khối nằm dưới màn hình mới được làm mờ rồi hiện ra khi tới gần.
 * Người chọn giảm chuyển động không thấy hiệu ứng.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "li" | "section" | "article";
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<"ssr" | "hidden" | "shown">("ssr");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92) return; // đã nằm trong màn hình: giữ nguyên, không nhấp nháy
    const t = setTimeout(() => setState("hidden"), 0);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, []);

  const cls = `${className} ${state === "hidden" ? "reveal-hidden" : state === "shown" ? "reveal-shown" : ""}`;
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={cls} style={state !== "ssr" ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}
