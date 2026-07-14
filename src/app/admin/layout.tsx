import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · JUAN Studio",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-bg text-fg">{children}</div>;
}
