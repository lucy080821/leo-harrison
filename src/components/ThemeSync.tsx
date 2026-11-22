"use client";

import { useLayoutEffect } from "react";

/**
 * Giữ nguyên giao diện sáng/tối khi đổi ngôn ngữ.
 * Đổi /vi ↔ /en làm layout vẽ lại thẻ <html> và xoá class "dark" (script ở <head> chỉ chạy khi tải trang đầy đủ).
 * Mỗi lần ngôn ngữ đổi, áp lại lựa chọn đã lưu (hoặc theo hệ thống nếu chưa chọn).
 */
export function ThemeSync({ lang }: { lang: string }) {
  useLayoutEffect(() => {
    try {
      const s = localStorage.getItem("lexi:theme");
      const dark = s ? s === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", dark);
    } catch {}
  }, [lang]);
  return null;
}
