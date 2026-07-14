import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/showcase/Gallery";

export const dynamic = "force-dynamic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { getDictionary } from "@/lib/dictionary";
import {
  getCategories,
  getPublishedMedia,
  localizeCategory,
  localizeMedia,
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
    title: dict.showcase.title,
    description: dict.showcase.subtitle,
    alternates: {
      canonical: absoluteUrl(`/${raw}/showcase`),
      languages: {
        id: absoluteUrl("/id/showcase"),
        en: absoluteUrl("/en/showcase"),
      },
    },
  };
}

export default async function ShowcasePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  const [media, categories] = await Promise.all([getPublishedMedia(), getCategories()]);

  const items = media.map((m) => {
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

  const cats = categories.map((c) => localizeCategory(c, locale));

  return (
    <div className="pt-32 pb-24 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={dict.showcase.eyebrow}
            title={dict.showcase.title}
            subtitle={dict.showcase.subtitle}
          />
        </Reveal>
        <Gallery
          items={items}
          categories={cats.map((c) => ({ slug: c.slug, name: c.name }))}
          allLabel={dict.showcase.all}
          emptyLabel={dict.showcase.empty}
          labels={{
            close: dict.showcase.close,
            client: dict.showcase.client,
            year: dict.showcase.year,
            category: dict.showcase.category,
          }}
        />
      </div>
    </div>
  );
}
