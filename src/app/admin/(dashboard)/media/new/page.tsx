import Link from "next/link";
import { MediaForm } from "@/components/admin/MediaForm";
import { prisma } from "@/lib/prisma";

export default async function NewMediaPage() {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/media"
          className="text-[11px] tracking-[0.16em] uppercase text-fg-muted hover:text-accent"
        >
          ← Media
        </Link>
        <h1 className="font-serif text-3xl md:text-4xl mt-3">Add media</h1>
      </div>
      <MediaForm
        categories={categories.map((c) => ({ id: c.id, nameEn: c.nameEn, slug: c.slug }))}
        mode="create"
      />
    </div>
  );
}
