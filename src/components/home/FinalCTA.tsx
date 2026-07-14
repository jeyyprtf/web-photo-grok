import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";

type Props = {
  locale: Locale;
  title: string;
  body: string;
  button: string;
};

export function FinalCTA({ locale, title, body, button }: Props) {
  return (
    <section className="py-28 md:py-40 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-[900px] px-5 md:px-8 text-center">
        <Reveal>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-fg text-balance leading-[1.05]">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-fg-muted text-lg max-w-lg mx-auto text-pretty">
            {body}
          </p>
        </Reveal>
        <Reveal delay={0.18} className="mt-10">
          <MagneticButton href={localizedPath(locale, "/contact")}>
            {button}
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
