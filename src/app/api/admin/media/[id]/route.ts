import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteMediaFiles, saveUploadedFile } from "@/lib/media";

type Ctx = { params: Promise<{ id: string }> };

function revalidateSite() {
  revalidatePath("/", "layout");
  revalidatePath("/id");
  revalidatePath("/en");
  revalidatePath("/id/showcase");
  revalidatePath("/en/showcase");
}

export async function PUT(request: Request, ctx: Ctx) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;

  try {
    const existing = await prisma.media.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const form = await request.formData();
    const titleEn = String(form.get("titleEn") || "").trim();
    const titleId = String(form.get("titleId") || "").trim();
    if (!titleEn || !titleId) {
      return NextResponse.json({ error: "Titles are required" }, { status: 400 });
    }

    let filePath = existing.filePath;
    let thumbPath = existing.thumbPath;
    let type = String(form.get("type") || existing.type);

    const file = form.get("file");
    if (file instanceof File && file.size > 0) {
      const uploaded = await saveUploadedFile(file);
      await deleteMediaFiles(existing.filePath, existing.thumbPath);
      filePath = uploaded.filePath;
      thumbPath = uploaded.thumbPath;
      if (type !== "video" && type !== "photo") type = uploaded.type;
      if (uploaded.type === "video") type = "video";
    }

    const categoryId = String(form.get("categoryId") || "") || null;
    const yearRaw = String(form.get("year") || "");
    const year = yearRaw ? parseInt(yearRaw, 10) : null;

    const media = await prisma.media.update({
      where: { id },
      data: {
        type: type === "video" ? "video" : "photo",
        titleEn,
        titleId,
        descriptionEn: String(form.get("descriptionEn") || ""),
        descriptionId: String(form.get("descriptionId") || ""),
        altEn: String(form.get("altEn") || ""),
        altId: String(form.get("altId") || ""),
        filePath,
        thumbPath,
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
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;

  try {
    const existing = await prisma.media.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await prisma.media.delete({ where: { id } });
    await deleteMediaFiles(existing.filePath, existing.thumbPath);

    revalidateSite();
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
