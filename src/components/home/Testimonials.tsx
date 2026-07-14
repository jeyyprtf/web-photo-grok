import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

const testimonials = {
  id: [
    {
      quote:
        "Juan tidak hanya mengambil foto — dia menangkap rasa. Hasilnya terasa mahal, tenang, dan sangat personal.",
      name: "Amelia R.",
      role: "Wedding Client",
    },
    {
      quote:
        "Direction-nya jelas, prosesnya mulus, dan visual campaign kami naik level. Tim brand kami langsung terkesan.",
      name: "Dimas K.",
      role: "Brand Manager, Lumen Co.",
    },
    {
      quote:
        "Portrait session terbaik yang pernah saya lakukan. Lighting, pose, dan editing-nya impeccable.",
      name: "Sasha M.",
      role: "Creative Director",
    },
  ],
  en: [
    {
      quote:
        "Juan doesn’t just take photos — he captures feeling. The work feels expensive, quiet, and deeply personal.",
      name: "Amelia R.",
      role: "Wedding Client",
    },
    {
      quote:
        "Clear direction, seamless process, and our campaign visuals leveled up. The brand team was instantly impressed.",
      name: "Dimas K.",
      role: "Brand Manager, Lumen Co.",
    },
    {
      quote:
        "Best portrait session I’ve ever done. The lighting, posing, and editing were impeccable.",
      name: "Sasha M.",
      role: "Creative Director",
    },
  ],
};

type Props = {
  locale: "id" | "en";
  eyebrow: string;
  title: string;
};

export function Testimonials({ locale, eyebrow, title }: Props) {
  const items = testimonials[locale];

  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <Stagger className="grid md:grid-cols-3 gap-6 md:gap-8">
          {items.map((t) => (
            <StaggerItem key={t.name}>
              <blockquote className="h-full border border-border p-8 md:p-10 bg-bg-elevated/30">
                <p className="font-serif text-xl md:text-2xl leading-snug text-fg text-pretty mb-8">
                  “{t.quote}”
                </p>
                <footer>
                  <p className="text-sm text-fg">{t.name}</p>
                  <p className="text-[11px] tracking-[0.14em] uppercase text-fg-subtle mt-1">
                    {t.role}
                  </p>
                </footer>
              </blockquote>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
