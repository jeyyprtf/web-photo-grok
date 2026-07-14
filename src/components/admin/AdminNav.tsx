"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/inquiries", label: "Inquiries" },
];

export function AdminNav({ name }: { name: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="border-b border-border sticky top-0 z-30 bg-bg/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link href="/admin/dashboard" className="font-serif text-xl tracking-[0.15em]">
            JUAN
          </Link>
          <nav className="hidden sm:flex items-center gap-5" aria-label="Admin">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-[11px] tracking-[0.16em] uppercase transition-colors",
                  pathname.startsWith(l.href) ? "text-accent" : "text-fg-muted hover:text-fg",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-fg-muted hidden sm:inline">{name}</span>
          <Link
            href="/id"
            className="text-[11px] tracking-[0.14em] uppercase text-fg-subtle hover:text-fg"
          >
            Site
          </Link>
          <button
            type="button"
            onClick={logout}
            className="text-[11px] tracking-[0.14em] uppercase text-fg-muted hover:text-accent"
          >
            Logout
          </button>
        </div>
      </div>
      <nav className="sm:hidden flex gap-4 px-5 pb-3 overflow-x-auto" aria-label="Admin mobile">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "text-[10px] tracking-[0.14em] uppercase whitespace-nowrap",
              pathname.startsWith(l.href) ? "text-accent" : "text-fg-muted",
            )}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
