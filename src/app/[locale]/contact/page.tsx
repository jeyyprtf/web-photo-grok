import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact/ContactForm";

export const dynamic = "force-dynamic";
import { Reveal } from "@/components/motion/Reveal";
import { getDictionary } from "@/lib/dictionary";
import { getPackages, localizePackage } from "@/lib/data";
import { isLocale, type Locale } from "@/lib/i18n";
import { absoluteUrl, formatPrice } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw);
  return {
    title: dict.contact.title,
    description: dict.contact.subtitle,
    alternates: {
      canonical: absoluteUrl(`/${raw}/contact`),
      languages: {
        id: absoluteUrl("/id/contact"),
        en: absoluteUrl("/en/contact"),
      },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const packages = (await getPackages()).map((p) => localizePackage(p, locale));

  return (
    <div className="pt-32 pb-24 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="mb-14 md:mb-20 max-w-2xl">
          <Reveal>
            <p className="text-[11px] tracking-[0.28em] uppercase text-accent mb-4">
              {dict.contact.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-serif text-5xl md:text-7xl text-fg leading-[1.05]">
              {dict.contact.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-fg-muted text-lg text-pretty">{dict.contact.subtitle}</p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20">
          <Reveal className="lg:col-span-7" delay={0.05}>
            <ContactForm labels={dict.contact.form} types={dict.contact.types} />
          </Reveal>

          <Reveal className="lg:col-span-5 space-y-12" delay={0.12}>
            <div>
              <h2 className="text-[11px] tracking-[0.22em] uppercase text-fg-subtle mb-6">
                {dict.contact.sideTitle}
              </h2>
              <dl className="space-y-5">
                <div>
                  <dt className="text-[10px] tracking-[0.18em] uppercase text-fg-subtle mb-1">
                    {dict.contact.response}
                  </dt>
                  <dd className="text-fg">{dict.contact.responseValue}</dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-[0.18em] uppercase text-fg-subtle mb-1">
                    {dict.contact.location}
                  </dt>
                  <dd className="text-fg">{dict.contact.locationValue}</dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-[0.18em] uppercase text-fg-subtle mb-1">
                    {dict.contact.emailLabel}
                  </dt>
                  <dd>
                    <a
                      href="mailto:hello@juan.studio"
                      className="text-fg hover:text-accent transition-colors"
                    >
                      hello@juan.studio
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-[11px] tracking-[0.22em] uppercase text-fg-subtle mb-6">
                {dict.contact.packagesTitle}
              </h2>
              <ul className="space-y-4">
                {packages.map((pkg) => (
                  <li
                    key={pkg.id}
                    className="border border-border p-5 hover:border-accent/30 transition-colors"
                  >
                    <div className="flex justify-between items-baseline gap-4 mb-2">
                      <span className="font-serif text-xl">{pkg.name}</span>
                    </div>
                    <p className="text-sm text-accent">
                      {formatPrice(pkg.priceMin, pkg.priceMax, pkg.currency, locale)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
