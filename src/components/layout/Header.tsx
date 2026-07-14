"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { localizedPath, switchLocalePath } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: localizedPath(locale, "/"), label: dict.nav.home },
    { href: localizedPath(locale, "/showcase"), label: dict.nav.showcase },
    { href: localizedPath(locale, "/about"), label: dict.nav.about },
    { href: localizedPath(locale, "/contact"), label: dict.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const otherLocale: Locale = locale === "id" ? "en" : "id";
  const switchHref = switchLocalePath(pathname, otherLocale);

  function isActive(href: string) {
    if (href === localizedPath(locale, "/")) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  }

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-all duration-500",
        scrolled || open
          ? "bg-bg/80 backdrop-blur-md border-b border-border"
          : "bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-accent focus:text-bg focus:px-4 focus:py-2"
      >
        {dict.nav.skip}
      </a>

      <div className="mx-auto flex h-[var(--nav-h)] max-w-[1400px] items-center justify-between px-5 md:px-8">
        <Link
          href={localizedPath(locale, "/")}
          className="group relative z-50 font-serif text-2xl tracking-[0.2em] text-fg"
          aria-label="JUAN home"
        >
          JUAN
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
        </Link>

        <nav className="hidden md:flex items-center gap-10" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[11px] tracking-[0.22em] uppercase transition-colors duration-300",
                isActive(link.href) ? "text-accent" : "text-fg-muted hover:text-fg",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 relative z-50">
          <Link
            href={switchHref}
            onClick={() => {
              document.cookie = `NEXT_LOCALE=${otherLocale};path=/;max-age=31536000`;
            }}
            className="text-[11px] tracking-[0.18em] uppercase text-fg-muted hover:text-accent transition-colors"
            aria-label={`Switch to ${otherLocale === "id" ? "Indonesian" : "English"}`}
          >
            {otherLocale.toUpperCase()}
          </Link>

          <button
            type="button"
            className="md:hidden flex flex-col justify-center gap-1.5 w-10 h-10"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span
              className={cn(
                "block h-px w-6 bg-fg transition-transform duration-300 origin-center",
                open && "translate-y-[3.5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-px w-6 bg-fg transition-transform duration-300 origin-center",
                open && "-translate-y-[3.5px] -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 z-40 bg-bg md:hidden"
          >
            <nav
              className="flex h-full flex-col items-center justify-center gap-8"
              aria-label="Mobile"
            >
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "font-serif text-4xl tracking-wide",
                      isActive(link.href) ? "text-accent" : "text-fg",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
