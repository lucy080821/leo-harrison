import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Learn With Leo", template: "%s | Learn With Leo" },
};

export default function ProgrammingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
