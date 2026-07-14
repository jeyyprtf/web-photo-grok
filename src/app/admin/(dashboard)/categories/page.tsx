import { prisma } from "@/lib/prisma";
import { CategoryManager } from "@/components/admin/CategoryManager";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { media: true } } },
  });

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif text-3xl md:text-4xl">Categories</h1>
        <p className="text-fg-muted text-sm mt-2">Organize your showcase</p>
      </div>
      <CategoryManager
        initial={categories.map((c) => ({
          id: c.id,
          slug: c.slug,
          nameId: c.nameId,
          nameEn: c.nameEn,
          sortOrder: c.sortOrder,
          mediaCount: c._count.media,
        }))}
      />
    </div>
  );
}
