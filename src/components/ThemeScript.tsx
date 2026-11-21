"use client";

// Đặt class dark trước khi trang hiển thị để không bị nháy màu.
// Chỉ vẽ thẻ <script> ở phía server: React 19 cảnh báo nếu gặp thẻ này khi vẽ trên client.
const code = `(function(){try{var s=localStorage.getItem('lexi:theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){}})()`;

export function ThemeScript() {
  if (typeof window !== "undefined") return null;
  return <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: code }} />;
}
