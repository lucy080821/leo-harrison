import Link from "next/link";

export type Crumb = { label: string; href?: string };

/**
 * Đường dẫn điều hướng, ví dụ: Learn With Leo › Lập trình › Frontend › HTML.
 * Mục cuối là trang hiện tại (không bấm được). Có thể dùng làm thanh mảnh phía trên bài học (bar) hoặc đặt trong nội dung.
 */
export function Breadcrumbs({ items, bar = false, className = "" }: { items: Crumb[]; bar?: boolean; className?: string }) {
  const list = (
    <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-sm text-muted">
      {items.map((c, i) => {
        const last = i === items.length - 1;
        return (
          <li key={`${c.label}-${i}`} className="flex min-w-0 items-center gap-1.5">
            {c.href && !last ? (
              <Link href={c.href} className="rounded px-0.5 hover:text-brand hover:underline">
                {c.label}
              </Link>
            ) : (
              <span aria-current={last ? "page" : undefined} className={last ? "max-w-[16rem] truncate font-medium text-fg sm:max-w-md" : ""}>
                {c.label}
              </span>
            )}
            {!last && (
              <span aria-hidden className="text-muted/60">
                ›
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
  return (
    <nav aria-label="Breadcrumb" className={bar ? `border-b border-line bg-surface/60 ${className}` : className}>
      {bar ? <div className="mx-auto flex h-9 max-w-[1600px] items-center overflow-x-auto px-4 [&>ol]:flex-nowrap [&>ol]:whitespace-nowrap">{list}</div> : list}
    </nav>
  );
}
