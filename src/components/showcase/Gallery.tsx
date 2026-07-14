"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MediaCard, type MediaCardData } from "./MediaCard";
import { Lightbox } from "./Lightbox";
import { cn } from "@/lib/utils";

type Category = { slug: string; name: string };

type Props = {
  items: MediaCardData[];
  categories: Category[];
  allLabel: string;
  emptyLabel: string;
  labels: {
    close: string;
    client: string;
    year: string;
    category: string;
  };
  initialFilter?: string;
};

export function Gallery({
  items,
  categories,
  allLabel,
  emptyLabel,
  labels,
  initialFilter = "all",
}: Props) {
  const [filter, setFilter] = useState(initialFilter);
  const [active, setActive] = useState<MediaCardData | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((i) => i.categorySlug === filter);
  }, [items, filter]);

  const chips = [{ slug: "all", name: allLabel }, ...categories];

  return (
    <div>
      <div
        className="flex flex-wrap gap-2 md:gap-3 mb-10 md:mb-14"
        role="tablist"
        aria-label="Filter categories"
      >
        {chips.map((chip) => (
          <button
            key={chip.slug}
            type="button"
            role="tab"
            aria-selected={filter === chip.slug}
            onClick={() => setFilter(chip.slug)}
            className={cn(
              "px-4 py-2 text-[11px] tracking-[0.18em] uppercase border transition-colors duration-300",
              filter === chip.slug
                ? "border-accent text-accent bg-accent-soft"
                : "border-border text-fg-muted hover:border-border-strong hover:text-fg",
            )}
          >
            {chip.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-fg-muted py-20 text-center"
          >
            {emptyLabel}
          </motion.p>
        ) : (
          <motion.div
            key={filter}
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5 space-y-4 md:space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className="break-inside-avoid"
                style={{ marginBottom: undefined }}
              >
                <MediaCard
                  item={item}
                  onOpen={setActive}
                  priority={i < 3}
                  aspect={
                    i % 5 === 0
                      ? "aspect-[4/5]"
                      : i % 3 === 0
                        ? "aspect-square"
                        : "aspect-[3/4]"
                  }
                />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Lightbox item={active} onClose={() => setActive(null)} labels={labels} />
    </div>
  );
}
