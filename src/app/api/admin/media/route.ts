import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile } from "@/lib/media";

function revalidateSite() {
  revalidatePath("/", "layout");
  revalidatePath("/id");
  revalidatePath("/en");
  revalidatePath("/id/showcase");
  revalidatePath("/en/showcase");
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const media = await prisma.media.findMany({
    include: { category: true },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(media);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const titleEn = String(form.get("titleEn") || "").trim();
    const titleId = String(form.get("titleId") || "").trim();
    if (!titleEn || !titleId) {
      return NextResponse.json({ error: "Titles are required" }, { status: 400 });
    }

    const uploaded = await saveUploadedFile(file);
    const typeOverride = String(form.get("type") || uploaded.type);
    const categoryId = String(form.get("categoryId") || "") || null;
    const yearRaw = String(form.get("year") || "");
    const year = yearRaw ? parseInt(yearRaw, 10) : null;

    const media = await prisma.media.create({
      data: {
        type: typeOverride === "video" ? "video" : uploaded.type,
        titleEn,
        titleId,
        descriptionEn: String(form.get("descriptionEn") || ""),
        descriptionId: String(form.get("descriptionId") || ""),
        altEn: String(form.get("altEn") || ""),
        altId: String(form.get("altId") || ""),
        filePath: uploaded.filePath,
        thumbPath: uploaded.thumbPath,
        categoryId,
        featured: form.get("featured") === "1",
        published: form.get("published") === "1",
        sortOrder: parseInt(String(form.get("sortOrder") || "0"), 10) || 0,
        client: String(form.get("client") || "") || null,
        year: year && !Number.isNaN(year) ? year : null,
      },
    });

    revalidateSite();
    return NextResponse.json(media);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create media" }, { status: 500 });
  }
}
