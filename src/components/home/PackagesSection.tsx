import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { formatPrice } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";

type Pkg = {
  id: string;
  name: string;
  description: string;
  priceMin: number;
  priceMax: number;
  currency: string;
  features: string[];
};

type Props = {
  locale: Locale;
  eyebrow: string;
  title: string;
  cta: string;
  packages: Pkg[];
  startingLabel: string;
};

export function PackagesSection({
  locale,
  eyebrow,
  title,
  cta,
  packages,
  startingLabel,
}: Props) {
  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} />

        <Stagger className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
          {packages.map((pkg, i) => (
            <StaggerItem key={pkg.id}>
              <article className="group h-full border border-border bg-bg-elevated/40 p-7 md:p-8 hover:border-accent/40 transition-colors duration-500 flex flex-col">
                <div className="flex items-baseline justify-between mb-6">
                  <h3 className="font-serif text-2xl text-fg">{pkg.name}</h3>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-fg-subtle">
                    0{i + 1}
                  </span>
                </div>
                <p className="text-sm text-fg-muted leading-relaxed mb-6 flex-grow">
                  {pkg.description}
                </p>
                <p className="text-[10px] tracking-[0.18em] uppercase text-fg-subtle mb-2">
                  {startingLabel}
                </p>
                <p className="text-accent text-sm mb-6 font-medium">
                  {formatPrice(pkg.priceMin, pkg.priceMax, pkg.currency, locale)}
                </p>
                <ul className="space-y-2.5 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="text-sm text-fg-muted flex gap-2">
                      <span className="text-accent mt-1.5 shrink-0">·</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-12" delay={0.1}>
          <MagneticButton href={localizedPath(locale, "/contact")} variant="outline">
            {cta}
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
