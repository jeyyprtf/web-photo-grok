import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const categories = [
  { slug: "portrait", nameId: "Portrait", nameEn: "Portrait", sortOrder: 1 },
  { slug: "wedding", nameId: "Wedding", nameEn: "Wedding", sortOrder: 2 },
  { slug: "fashion", nameId: "Fashion", nameEn: "Fashion", sortOrder: 3 },
  { slug: "commercial", nameId: "Commercial", nameEn: "Commercial", sortOrder: 4 },
  { slug: "landscape", nameId: "Landscape", nameEn: "Landscape", sortOrder: 5 },
  { slug: "video", nameId: "Video", nameEn: "Video", sortOrder: 6 },
];

// High-quality Unsplash images (stable source IDs)
const mediaSeed = [
  {
    type: "photo",
    titleId: "Senja di Balkon",
    titleEn: "Balcony at Dusk",
    descriptionId: "Portrait intim dengan cahaya golden hour yang lembut.",
    descriptionEn: "Intimate portrait bathed in soft golden hour light.",
    filePath: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&q=80",
    category: "portrait",
    featured: true,
    sortOrder: 1,
    client: "Private",
    year: 2025,
    altId: "Portrait wanita di golden hour",
    altEn: "Woman portrait at golden hour",
  },
  {
    type: "photo",
    titleId: "Quiet Strength",
    titleEn: "Quiet Strength",
    descriptionId: "Portrait studio monokrom yang menonjolkan karakter.",
    descriptionEn: "Monochrome studio portrait that reveals character.",
    filePath: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1600&q=80",
    category: "portrait",
    featured: true,
    sortOrder: 2,
    year: 2024,
    altId: "Portrait pria monokrom",
    altEn: "Monochrome male portrait",
  },
  {
    type: "photo",
    titleId: "Ikatan Abadi",
    titleEn: "Eternal Bond",
    descriptionId: "Momen sunyi di antara perayaan pernikahan.",
    descriptionEn: "A quiet moment between wedding celebrations.",
    filePath: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80",
    category: "wedding",
    featured: true,
    sortOrder: 3,
    client: "A & R",
    year: 2025,
    altId: "Pasangan pengantin",
    altEn: "Wedding couple",
  },
  {
    type: "photo",
    titleId: "First Dance",
    titleEn: "First Dance",
    descriptionId: "Gerak dan emosi di lantai dansa.",
    descriptionEn: "Movement and emotion on the dance floor.",
    filePath: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1600&q=80",
    category: "wedding",
    featured: false,
    sortOrder: 4,
    year: 2024,
    altId: "Tarian pengantin",
    altEn: "Wedding dance",
  },
  {
    type: "photo",
    titleId: "Silk & Shadow",
    titleEn: "Silk & Shadow",
    descriptionId: "Editorial fashion dengan kontras dramatis.",
    descriptionEn: "Fashion editorial with dramatic contrast.",
    filePath: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80",
    category: "fashion",
    featured: true,
    sortOrder: 5,
    client: "Maison Noir",
    year: 2025,
    altId: "Model fashion editorial",
    altEn: "Fashion editorial model",
  },
  {
    type: "photo",
    titleId: "Urban Edge",
    titleEn: "Urban Edge",
    descriptionId: "Street fashion di tengah arsitektur kota.",
    descriptionEn: "Street fashion against urban architecture.",
    filePath: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=80",
    category: "fashion",
    featured: false,
    sortOrder: 6,
    year: 2024,
    altId: "Fashion di jalan kota",
    altEn: "Urban street fashion",
  },
  {
    type: "photo",
    titleId: "Brand Presence",
    titleEn: "Brand Presence",
    descriptionId: "Visual campaign untuk brand lifestyle.",
    descriptionEn: "Visual campaign for a lifestyle brand.",
    filePath: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80",
    category: "commercial",
    featured: true,
    sortOrder: 7,
    client: "Lumen Co.",
    year: 2025,
    altId: "Commercial lifestyle",
    altEn: "Lifestyle commercial",
  },
  {
    type: "photo",
    titleId: "Crafted Object",
    titleEn: "Crafted Object",
    descriptionId: "Product still life dengan pencahayaan studio.",
    descriptionEn: "Product still life with studio lighting.",
    filePath: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&q=80",
    category: "commercial",
    featured: false,
    sortOrder: 8,
    year: 2024,
    altId: "Fotografi produk",
    altEn: "Product photography",
  },
  {
    type: "photo",
    titleId: "Horizon Line",
    titleEn: "Horizon Line",
    descriptionId: "Landscape minimal di tepi dunia.",
    descriptionEn: "Minimal landscape at the edge of the world.",
    filePath: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
    category: "landscape",
    featured: true,
    sortOrder: 9,
    year: 2023,
    altId: "Pegunungan dan kabut",
    altEn: "Mountains and mist",
  },
  {
    type: "photo",
    titleId: "Ocean Breath",
    titleEn: "Ocean Breath",
    descriptionId: "Laut yang tenang di pagi buta.",
    descriptionEn: "A quiet ocean at first light.",
    filePath: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1600&q=80",
    category: "landscape",
    featured: false,
    sortOrder: 10,
    year: 2024,
    altId: "Pantai minimal",
    altEn: "Minimal beachscape",
  },
  {
    type: "video",
    titleId: "Motion Study 01",
    titleEn: "Motion Study 01",
    descriptionId: "Eksplorasi gerak dan tempo sinematik.",
    descriptionEn: "An exploration of motion and cinematic tempo.",
    filePath: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=80",
    category: "video",
    featured: true,
    sortOrder: 11,
    client: "Studio Reel",
    year: 2025,
    altId: "Still dari film sinematik",
    altEn: "Still from cinematic film",
  },
  {
    type: "photo",
    titleId: "Soft Gaze",
    titleEn: "Soft Gaze",
    descriptionId: "Portrait natural light yang hangat.",
    descriptionEn: "Warm natural light portrait.",
    filePath: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1600&q=80",
    category: "portrait",
    featured: false,
    sortOrder: 12,
    year: 2025,
    altId: "Portrait natural light",
    altEn: "Natural light portrait",
  },
];

const packages = [
  {
    nameId: "Essential",
    nameEn: "Essential",
    descriptionId: "Sesi portrait 1–2 jam, ideal untuk personal branding atau hadiah.",
    descriptionEn: "1–2 hour portrait session, ideal for personal branding or gifts.",
    priceMin: 2500000,
    priceMax: 4000000,
    featuresId: JSON.stringify([
      "1–2 jam shooting",
      "1 lokasi",
      "20 foto edit premium",
      "Online gallery",
      "1 revision minor",
    ]),
    featuresEn: JSON.stringify([
      "1–2 hour shoot",
      "1 location",
      "20 premium edits",
      "Online gallery",
      "1 minor revision",
    ]),
    sortOrder: 1,
  },
  {
    nameId: "Signature",
    nameEn: "Signature",
    descriptionId: "Half-day session untuk prewedding, fashion, atau storytelling visual.",
    descriptionEn: "Half-day session for prewedding, fashion, or visual storytelling.",
    priceMin: 5000000,
    priceMax: 8000000,
    featuresId: JSON.stringify([
      "4–5 jam shooting",
      "Hingga 2 lokasi",
      "50 foto edit premium",
      "Moodboard & direction",
      "Priority delivery",
    ]),
    featuresEn: JSON.stringify([
      "4–5 hour shoot",
      "Up to 2 locations",
      "50 premium edits",
      "Moodboard & direction",
      "Priority delivery",
    ]),
    sortOrder: 2,
  },
  {
    nameId: "Cinematic",
    nameEn: "Cinematic",
    descriptionId: "Wedding full day + highlight film sinematik.",
    descriptionEn: "Full-day wedding coverage + cinematic highlight film.",
    priceMin: 10000000,
    priceMax: 18000000,
    featuresId: JSON.stringify([
      "Full day coverage",
      "2 fotografer",
      "Highlight film 3–5 menit",
      "100+ foto edit",
      "Same-day teaser (opsional)",
    ]),
    featuresEn: JSON.stringify([
      "Full day coverage",
      "2 photographers",
      "3–5 min highlight film",
      "100+ edited photos",
      "Same-day teaser (optional)",
    ]),
    sortOrder: 3,
  },
  {
    nameId: "Campaign",
    nameEn: "Campaign",
    descriptionId: "Produksi commercial / brand campaign end-to-end.",
    descriptionEn: "End-to-end commercial / brand campaign production.",
    priceMin: 20000000,
    priceMax: 45000000,
    featuresId: JSON.stringify([
      "Creative direction",
      "Photo + video package",
      "Multi-location",
      "Usage rights discussion",
      "Dedicated production day(s)",
    ]),
    featuresEn: JSON.stringify([
      "Creative direction",
      "Photo + video package",
      "Multi-location",
      "Usage rights discussion",
      "Dedicated production day(s)",
    ]),
    sortOrder: 4,
  },
];

async function main() {
  await prisma.inquiry.deleteMany();
  await prisma.media.deleteMany();
  await prisma.package.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.siteSetting.deleteMany();

  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "juanadmin123", 12);
  await prisma.user.create({
    data: {
      email: process.env.ADMIN_EMAIL || "admin@juan.studio",
      name: "Juan",
      passwordHash,
    },
  });

  for (const cat of categories) {
    await prisma.category.create({ data: cat });
  }

  const allCats = await prisma.category.findMany();
  const catMap = Object.fromEntries(allCats.map((c) => [c.slug, c.id]));

  for (const item of mediaSeed) {
    await prisma.media.create({
      data: {
        type: item.type,
        titleId: item.titleId,
        titleEn: item.titleEn,
        descriptionId: item.descriptionId,
        descriptionEn: item.descriptionEn,
        filePath: item.filePath,
        thumbPath: item.filePath,
        categoryId: catMap[item.category],
        featured: item.featured,
        sortOrder: item.sortOrder,
        altId: item.altId,
        altEn: item.altEn,
        client: item.client,
        year: item.year,
        published: true,
      },
    });
  }

  for (const pkg of packages) {
    await prisma.package.create({ data: pkg });
  }

  await prisma.siteSetting.createMany({
    data: [
      { key: "email", value: "hello@juan.studio" },
      { key: "instagram", value: "https://instagram.com" },
      { key: "location", value: "Jakarta, Indonesia" },
    ],
  });

  console.log("Seed complete ✓");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
