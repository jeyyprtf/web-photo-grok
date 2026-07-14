import Link from "next/link";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ locale, dict }: Props) {
  const year = new Date().getFullYear();
  const links = [
    { href: localizedPath(locale, "/showcase"), label: dict.nav.showcase },
    { href: localizedPath(locale, "/about"), label: dict.nav.about },
    { href: localizedPath(locale, "/contact"), label: dict.nav.contact },
  ];

  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-serif text-3xl tracking-[0.2em] mb-4">JUAN</p>
            <p className="text-fg-muted text-sm leading-relaxed max-w-xs">
              {dict.footer.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-center">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[11px] tracking-[0.2em] uppercase text-fg-muted hover:text-accent transition-colors w-fit"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="md:text-right flex flex-col gap-3 md:items-end">
            <a
              href="mailto:hello@juan.studio"
              className="text-sm text-fg-muted hover:text-accent transition-colors"
            >
              hello@juan.studio
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.2em] uppercase text-fg-muted hover:text-accent transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-4 text-[11px] tracking-[0.12em] uppercase text-fg-subtle">
          <p>
            © {year} Juan. {dict.footer.rights}
          </p>
          <Link href="/admin" className="hover:text-fg-muted transition-colors">
            {dict.footer.admin}
          </Link>
        </div>
      </div>
    </footer>
  );
}
