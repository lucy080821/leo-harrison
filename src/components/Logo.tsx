import Link from "next/link";

const TEXT = "Lexi Learn";

/** Logo chữ "Lexi Learn" gợn sóng: mỗi chữ cái nhấp nhô lệch pha như sóng nước. */
export function Logo({ href, size = "text-2xl" }: { href: string; size?: string }) {
  return (
    <Link href={href} aria-label="Lexi Learn" className="inline-flex flex-col leading-none">
      <span className={`font-extrabold tracking-tight ${size}`} aria-hidden="true">
        {TEXT.split("").map((ch, i) => (
          <span
            key={i}
            className="logo-letter"
            style={{ animationDelay: `${i * 0.12}s`, whiteSpace: "pre" }}
          >
            {ch}
          </span>
        ))}
      </span>
      <svg
        viewBox="0 0 120 8"
        className="mt-1 h-2 w-full text-brand2"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 4 Q 7.5 -2 15 4 T 30 4 T 45 4 T 60 4 T 75 4 T 90 4 T 105 4 T 120 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </Link>
  );
}
