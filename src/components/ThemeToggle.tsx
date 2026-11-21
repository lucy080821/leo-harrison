"use client";

import { useIsDark } from "@/lib/theme";

export function ThemeToggle({ label }: { label: string }) {
  const dark = useIsDark();

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("lexi:theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface text-fg hover:bg-surface2"
    >
      <span aria-hidden="true" suppressHydrationWarning>
        {dark ? "☀" : "☾"}
      </span>
    </button>
  );
}
