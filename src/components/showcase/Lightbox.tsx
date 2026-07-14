"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { MediaCardData } from "./MediaCard";

type Props = {
  item: MediaCardData | null;
  onClose: () => void;
  labels: {
    close: string;
    client: string;
    year: string;
    category: string;
  };
};

export function Lightbox({ item, onClose, labels }: Props) {
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [item, onKey]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-bg/95 backdrop-blur-sm p-4 md:p-10"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 md:top-8 md:right-8 text-[11px] tracking-[0.2em] uppercase text-fg-muted hover:text-fg z-10"
            aria-label={labels.close}
          >
            {labels.close} ✕
          </button>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid w-full max-w-6xl gap-6 md:grid-cols-[1.4fr_1fr] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[60vh] bg-bg-soft overflow-hidden">
              <Image
                src={item.filePath}
                alt={item.alt || item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            </div>

            <div className="flex flex-col justify-center md:py-8 md:pl-4 overflow-y-auto">
              {item.categoryName && (
                <p className="text-[11px] tracking-[0.24em] uppercase text-accent mb-4">
                  {item.categoryName}
                </p>
              )}
              <h2 className="font-serif text-3xl md:text-4xl text-fg mb-4">{item.title}</h2>
              {item.description && (
                <p className="text-fg-muted leading-relaxed mb-8 text-pretty">
                  {item.description}
                </p>
              )}
              <dl className="space-y-3 text-sm">
                {item.client && (
                  <div className="flex gap-4 border-t border-border pt-3">
                    <dt className="text-fg-subtle tracking-[0.12em] uppercase text-[10px] w-24 shrink-0 pt-0.5">
                      {labels.client}
                    </dt>
                    <dd className="text-fg">{item.client}</dd>
                  </div>
                )}
                {item.year && (
                  <div className="flex gap-4 border-t border-border pt-3">
                    <dt className="text-fg-subtle tracking-[0.12em] uppercase text-[10px] w-24 shrink-0 pt-0.5">
                      {labels.year}
                    </dt>
                    <dd className="text-fg">{item.year}</dd>
                  </div>
                )}
                {item.categoryName && (
                  <div className="flex gap-4 border-t border-border pt-3">
                    <dt className="text-fg-subtle tracking-[0.12em] uppercase text-[10px] w-24 shrink-0 pt-0.5">
                      {labels.category}
                    </dt>
                    <dd className="text-fg">{item.categoryName}</dd>
                  </div>
                )}
              </dl>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
