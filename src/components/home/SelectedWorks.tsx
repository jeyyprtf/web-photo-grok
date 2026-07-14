"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MediaCard, type MediaCardData } from "@/components/showcase/MediaCard";
import { Lightbox } from "@/components/showcase/Lightbox";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";

type Props = {
  locale: Locale;
  eyebrow: string;
  title: string;
  cta: string;
  items: MediaCardData[];
  labels: {
    close: string;
    client: string;
    year: string;
    category: string;
  };
};

export function SelectedWorks({ locale, eyebrow, title, cta, items, labels }: Props) {
  const [active, setActive] = useState<MediaCardData | null>(null);

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-4">
          <SectionHeading eyebrow={eyebrow} title={title} className="mb-0" />
          <MagneticButton href={localizedPath(locale, "/showcase")} variant="ghost" className="self-start md:self-auto">
            {cta} →
          </MagneticButton>
        </div>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mt-12">
          {items.map((item, i) => (
            <StaggerItem
              key={item.id}
              className={i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}
            >
              <MediaCard
                item={item}
                onOpen={setActive}
                priority={i < 2}
                aspect={i === 0 ? "aspect-[4/5] sm:aspect-auto sm:h-full sm:min-h-[520px]" : "aspect-[3/4]"}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <Lightbox item={active} onClose={() => setActive(null)} labels={labels} />
    </section>
  );
}
