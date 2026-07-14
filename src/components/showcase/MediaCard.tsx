"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type MediaCardData = {
  id: string;
  title: string;
  description: string;
  alt: string;
  filePath: string;
  type: string;
  categoryName: string | null;
  categorySlug?: string | null;
  client?: string | null;
  year?: number | null;
};

type Props = {
  item: MediaCardData;
  onOpen: (item: MediaCardData) => void;
  className?: string;
  priority?: boolean;
  aspect?: string;
};

export function MediaCard({ item, onOpen, className, priority, aspect = "aspect-[3/4]" }: Props) {
  return (
    <motion.button
      type="button"
      layout
      onClick={() => onOpen(item)}
      className={cn(
        "group relative w-full text-left overflow-hidden bg-bg-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent",
        aspect,
        className,
      )}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute inset-0 img-reveal">
        <Image
          src={item.filePath}
          alt={item.alt || item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={priority}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500" />

      <div className="absolute inset-x-0 bottom-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 transition-all duration-500">
        {item.categoryName && (
          <p className="text-[10px] tracking-[0.22em] uppercase text-accent mb-2">
            {item.categoryName}
          </p>
        )}
        <h3 className="font-serif text-xl text-fg">{item.title}</h3>
        {item.type === "video" && (
          <span className="mt-2 inline-block text-[10px] tracking-[0.2em] uppercase text-fg-muted">
            Film
          </span>
        )}
      </div>
    </motion.button>
  );
}
