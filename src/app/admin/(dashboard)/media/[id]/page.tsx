import Link from "next/link";
import { notFound } from "next/navigation";
import { MediaForm } from "@/components/admin/MediaForm";
import { prisma } from "@/lib/prisma";

export default async function EditMediaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [media, categories] = await Promise.all([
    prisma.media.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  if (!media) notFound();

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/media"
          className="text-[11px] tracking-[0.16em] uppercase text-fg-muted hover:text-accent"
        >
          ← Media
        </Link>
        <h1 className="font-serif text-3xl md:text-4xl mt-3">Edit media</h1>
      </div>
      <MediaForm
        mode="edit"
        categories={categories.map((c) => ({ id: c.id, nameEn: c.nameEn, slug: c.slug }))}
        initial={{
          id: media.id,
          type: media.type,
          titleId: media.titleId,
          titleEn: media.titleEn,
          descriptionId: media.descriptionId,
          descriptionEn: media.descriptionEn,
          filePath: media.filePath,
          categoryId: media.categoryId,
          featured: media.featured,
          published: media.published,
          sortOrder: media.sortOrder,
          altId: media.altId,
          altEn: media.altEn,
          client: media.client || "",
          year: media.year ? String(media.year) : "",
        }}
      />
    </div>
  );
}
