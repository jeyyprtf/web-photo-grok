import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { getDictionary } from "@/lib/dictionary";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw);
  return {
    title: dict.about.title,
    description: dict.about.lead,
    alternates: {
      canonical: absoluteUrl(`/${raw}/about`),
      languages: {
        id: absoluteUrl("/id/about"),
        en: absoluteUrl("/en/about"),
      },
    },
  };
}

const stats = [
  { key: "projects" as const, value: "180+" },
  { key: "years" as const, value: "8" },
  { key: "clients" as const, value: "120+" },
  { key: "frames" as const, value: "40K+" },
];

const timeline = {
  id: [
    { year: "2017", text: "Mulai mengambil foto secara profesional di Jakarta." },
    { year: "2019", text: "Ekspansi ke film wedding & editorial fashion." },
    { year: "2022", text: "Membangun studio production untuk brand campaign." },
    { year: "2025", text: "Fokus pada visual sinematik lintas medium." },
  ],
  en: [
    { year: "2017", text: "Began professional photography in Jakarta." },
    { year: "2019", text: "Expanded into wedding film & fashion editorial." },
    { year: "2022", text: "Built a production studio for brand campaigns." },
    { year: "2025", text: "Focused on cinematic visuals across mediums." },
  ],
};

const gear = ["Sony A7R V", "Sony FX3", "Sigma Art primes", "Godox lighting", "DJI RS 4"];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const events = timeline[locale];

  return (
    <div className="pt-32 pb-24 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end mb-20 md:mb-28">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-[11px] tracking-[0.28em] uppercase text-accent mb-4">
                {dict.about.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-serif text-6xl md:text-8xl text-fg leading-none">
                {dict.about.title}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-[11px] tracking-[0.22em] uppercase text-fg-subtle">
                {dict.about.role}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 text-xl md:text-2xl text-fg-muted font-serif leading-snug max-w-xl text-pretty">
                {dict.about.lead}
              </p>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-5 relative aspect-[4/5] overflow-hidden bg-bg-soft" delay={0.1}>
            <div className="img-reveal absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80"
                alt="Juan"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-24 md:mb-32">
          <div>
            <Reveal>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">{dict.about.storyTitle}</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-fg-muted leading-relaxed mb-5 text-pretty">{dict.about.storyP1}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-fg-muted leading-relaxed text-pretty">{dict.about.storyP2}</p>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">
                {dict.about.philosophyTitle}
              </h2>
            </Reveal>
            <ul className="space-y-4">
              {dict.about.philosophy.map((item, i) => (
                <Reveal key={item} delay={0.05 * i}>
                  <li className="flex gap-4 items-start border-b border-border pb-4">
                    <span className="text-accent text-[11px] tracking-[0.15em] mt-1">
                      0{i + 1}
                    </span>
                    <span className="text-fg text-lg font-serif">{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-24 md:mb-32">
          {stats.map((s) => (
            <StaggerItem key={s.key}>
              <div className="border border-border p-6 md:p-8 bg-bg-elevated/30">
                <p className="font-serif text-4xl md:text-5xl text-accent mb-2">{s.value}</p>
                <p className="text-[11px] tracking-[0.18em] uppercase text-fg-subtle">
                  {dict.about.stats[s.key]}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-24">
          <div>
            <Reveal>
              <h2 className="font-serif text-3xl md:text-4xl mb-8">{dict.about.timelineTitle}</h2>
            </Reveal>
            <ol className="space-y-6">
              {events.map((e, i) => (
                <Reveal key={e.year} delay={0.05 * i}>
                  <li className="grid grid-cols-[4rem_1fr] gap-4">
                    <span className="text-accent text-sm tracking-wider">{e.year}</span>
                    <span className="text-fg-muted leading-relaxed">{e.text}</span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
          <div>
            <Reveal>
              <h2 className="font-serif text-3xl md:text-4xl mb-8">{dict.about.gearTitle}</h2>
            </Reveal>
            <ul className="space-y-3">
              {gear.map((g, i) => (
                <Reveal key={g} delay={0.04 * i}>
                  <li className="text-fg-muted border-b border-border pb-3 flex justify-between">
                    <span>{g}</span>
                    <span className="text-fg-subtle text-xs">✦</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        <Reveal className="text-center pt-8">
          <MagneticButton href={localizedPath(locale, "/contact")}>
            {dict.about.cta}
          </MagneticButton>
        </Reveal>
      </div>
    </div>
  );
}
