import { prisma } from "./prisma";
import type { Locale } from "./i18n";

export async function getCategories() {
  return prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getFeaturedMedia(limit = 8) {
  return prisma.media.findMany({
    where: { published: true, featured: true },
    include: { category: true },
    orderBy: { sortOrder: "asc" },
    take: limit,
  });
}

export async function getPublishedMedia(categorySlug?: string) {
  return prisma.media.findMany({
    where: {
      published: true,
      ...(categorySlug
        ? { category: { slug: categorySlug } }
        : {}),
    },
    include: { category: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function getPackages() {
  return prisma.package.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getMediaById(id: string) {
  return prisma.media.findUnique({
    where: { id },
    include: { category: true },
  });
}

export function localizeMedia<
  T extends {
    titleId: string;
    titleEn: string;
    descriptionId: string;
    descriptionEn: string;
    altId: string;
    altEn: string;
    category?: { nameId: string; nameEn: string; slug: string } | null;
  },
>(item: T, locale: Locale) {
  return {
    ...item,
    title: locale === "id" ? item.titleId : item.titleEn,
    description: locale === "id" ? item.descriptionId : item.descriptionEn,
    alt: locale === "id" ? item.altId || item.titleId : item.altEn || item.titleEn,
    categoryName: item.category
      ? locale === "id"
        ? item.category.nameId
        : item.category.nameEn
      : null,
  };
}

export function localizePackage<
  T extends {
    nameId: string;
    nameEn: string;
    descriptionId: string;
    descriptionEn: string;
    featuresId: string;
    featuresEn: string;
  },
>(item: T, locale: Locale) {
  const featuresRaw = locale === "id" ? item.featuresId : item.featuresEn;
  let features: string[] = [];
  try {
    features = JSON.parse(featuresRaw);
  } catch {
    features = [];
  }
  return {
    ...item,
    name: locale === "id" ? item.nameId : item.nameEn,
    description: locale === "id" ? item.descriptionId : item.descriptionEn,
    features,
  };
}

export function localizeCategory<
  T extends { nameId: string; nameEn: string },
>(item: T, locale: Locale) {
  return {
    ...item,
    name: locale === "id" ? item.nameId : item.nameEn,
  };
}
