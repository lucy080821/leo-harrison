import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Lexi Learn", template: "%s · Lexi Learn" },
};

export default function ProgrammingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
