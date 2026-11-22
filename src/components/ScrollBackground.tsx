"use client";

import { useEffect, useRef } from "react";

/**
 * Nền cố định phía sau trang: các quầng sáng, vòng quỹ đạo và vệt sáng di chuyển theo vị trí cuộn.
 * Chỉ cập nhật hai biến CSS (--sp: tiến độ 0–1, --sy: số px đã cuộn) nên rất nhẹ; tắt hoàn toàn khi giảm chuyển động.
 */
export function ScrollBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      el.style.setProperty("--sp", Math.min(1, window.scrollY / max).toFixed(4));
      el.style.setProperty("--sy", String(Math.round(window.scrollY)));
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
  }, []);

  return (
    <div ref={ref} className="sbg" aria-hidden>
      <div className="sbg-dots" />
      <div className="sbg-orb sbg-o1" />
      <div className="sbg-orb sbg-o2" />
      <div className="sbg-orb sbg-o3" />
      <div className="sbg-ring" />
      <div className="sbg-line sbg-l1" />
      <div className="sbg-line sbg-l2" />
      <div className="sbg-line sbg-l3" />
    </div>
  );
}
