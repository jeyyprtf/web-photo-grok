import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/home/Hero";

export const dynamic = "force-dynamic";
import { SelectedWorks } from "@/components/home/SelectedWorks";
import { PackagesSection } from "@/components/home/PackagesSection";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";
import { getDictionary } from "@/lib/dictionary";
import {
  getFeaturedMedia,
  getPackages,
  localizeMedia,
  localizePackage,
} from "@/lib/data";
import { isLocale, type Locale } from "@/lib/i18n";
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
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    alternates: {
      canonical: absoluteUrl(`/${raw}`),
      languages: { id: absoluteUrl("/id"), en: absoluteUrl("/en") },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: raw === "id" ? "id_ID" : "en_US",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  const [featured, packages] = await Promise.all([getFeaturedMedia(6), getPackages()]);

  const items = featured.map((m) => {
    const loc = localizeMedia(m, locale);
    return {
      id: m.id,
      title: loc.title,
      description: loc.description,
      alt: loc.alt,
      filePath: m.filePath,
      type: m.type,
      categoryName: loc.categoryName,
      categorySlug: m.category?.slug ?? null,
      client: m.client,
      year: m.year,
    };
  });

  const pkgs = packages.map((p) => localizePackage(p, locale));
  const heroImage =
    featured[0]?.filePath ||
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=2000&q=80";
  const aboutImage =
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Photographer",
    name: "Juan",
    url: absoluteUrl(`/${locale}`),
    description: dict.meta.description,
    image: heroImage,
    jobTitle: "Photographer & Filmmaker",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressCountry: "ID",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero
        locale={locale}
        eyebrow={dict.hero.eyebrow}
        title={dict.hero.title}
        subtitle={dict.hero.subtitle}
        ctaPrimary={dict.hero.ctaPrimary}
        ctaSecondary={dict.hero.ctaSecondary}
        scroll={dict.hero.scroll}
        imageSrc={heroImage}
      />
      <SelectedWorks
        locale={locale}
        eyebrow={dict.home.selectedEyebrow}
        title={dict.home.selectedTitle}
        cta={dict.home.selectedCta}
        items={items}
        labels={{
          close: dict.showcase.close,
          client: dict.showcase.client,
          year: dict.showcase.year,
          category: dict.showcase.category,
        }}
      />
      <PackagesSection
        locale={locale}
        eyebrow={dict.home.servicesEyebrow}
        title={dict.home.servicesTitle}
        cta={dict.home.servicesCta}
        packages={pkgs}
        startingLabel={dict.packages.starting}
      />
      <AboutTeaser
        locale={locale}
        eyebrow={dict.home.aboutEyebrow}
        title={dict.home.aboutTitle}
        body={dict.home.aboutBody}
        cta={dict.home.aboutCta}
        imageSrc={aboutImage}
      />
      <Testimonials
        locale={locale}
        eyebrow={dict.home.testimonialsEyebrow}
        title={dict.home.testimonialsTitle}
      />
      <FinalCTA
        locale={locale}
        title={dict.home.ctaTitle}
        body={dict.home.ctaBody}
        button={dict.home.ctaButton}
      />
    </>
  );
}
