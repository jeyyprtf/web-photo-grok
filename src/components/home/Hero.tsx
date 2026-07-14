"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";

type Props = {
  locale: Locale;
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  scroll: string;
  imageSrc: string;
};

export function Hero({
  locale,
  eyebrow,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  scroll,
  imageSrc,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/50 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full mx-auto max-w-[1400px] px-5 md:px-8 pb-20 md:pb-28 pt-32">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[11px] tracking-[0.3em] uppercase text-accent mb-6"
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] text-fg max-w-4xl text-balance"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.9 }}
          className="mt-6 md:mt-8 max-w-xl text-fg-muted text-base md:text-lg leading-relaxed text-pretty"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href={localizedPath(locale, "/showcase")}>
            {ctaPrimary}
          </MagneticButton>
          <MagneticButton href={localizedPath(locale, "/contact")} variant="outline">
            {ctaSecondary}
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 right-5 md:right-8 hidden sm:flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-fg-subtle rotate-90 origin-center mb-6">
          {scroll}
        </span>
        <span className="block w-px h-12 bg-gradient-to-b from-accent to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
