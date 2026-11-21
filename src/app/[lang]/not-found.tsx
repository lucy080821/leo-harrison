import type { Metadata } from "next";

export const metadata: Metadata = { title: "404", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-5xl font-bold text-brand">404</h1>
      <p className="mt-3 text-muted">Not found · Không tìm thấy trang</p>
    </div>
  );
}
