import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";

type Props = {
  locale: Locale;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  imageSrc: string;
};

export function AboutTeaser({ locale, eyebrow, title, body, cta, imageSrc }: Props) {
  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <Reveal className="relative aspect-[4/5] overflow-hidden bg-bg-soft order-2 md:order-1">
          <div className="img-reveal absolute inset-0">
            <Image
              src={imageSrc}
              alt="Juan"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Reveal>

        <div className="order-1 md:order-2">
          <SectionHeading eyebrow={eyebrow} title={title} className="mb-6" />
          <Reveal delay={0.1}>
            <p className="text-fg-muted text-lg leading-relaxed text-pretty mb-10 max-w-md">
              {body}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <MagneticButton href={localizedPath(locale, "/about")} variant="outline">
              {cta}
            </MagneticButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
