import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { DeleteMediaButton } from "@/components/admin/DeleteMediaButton";

export default async function MediaListPage() {
  const media = await prisma.media.findMany({
    include: { category: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl">Media</h1>
          <p className="text-fg-muted text-sm mt-2">{media.length} items</p>
        </div>
        <Link href="/admin/media/new" className="admin-btn">
          + Add Media
        </Link>
      </div>

      <div className="border border-border overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="border-b border-border text-left text-[10px] tracking-[0.16em] uppercase text-fg-subtle">
              <th className="p-4 font-normal">Preview</th>
              <th className="p-4 font-normal">Title</th>
              <th className="p-4 font-normal">Category</th>
              <th className="p-4 font-normal">Type</th>
              <th className="p-4 font-normal">Flags</th>
              <th className="p-4 font-normal">Order</th>
              <th className="p-4 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {media.map((m) => (
              <tr key={m.id} className="hover:bg-bg-elevated/40">
                <td className="p-3">
                  <div className="relative w-14 h-14 bg-bg-soft overflow-hidden">
                    <Image
                      src={m.thumbPath || m.filePath}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="56px"
                      unoptimized={m.filePath.startsWith("http")}
                    />
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-fg">{m.titleEn}</p>
                  <p className="text-xs text-fg-muted">{m.titleId}</p>
                </td>
                <td className="p-4 text-fg-muted">{m.category?.nameEn || "—"}</td>
                <td className="p-4 text-fg-muted uppercase text-xs tracking-wider">{m.type}</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {m.featured && (
                      <span className="text-[9px] tracking-wider uppercase px-2 py-0.5 border border-accent/40 text-accent">
                        Featured
                      </span>
                    )}
                    {!m.published && (
                      <span className="text-[9px] tracking-wider uppercase px-2 py-0.5 border border-border text-fg-subtle">
                        Draft
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4 text-fg-muted">{m.sortOrder}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/media/${m.id}`}
                      className="text-[11px] tracking-[0.12em] uppercase text-accent hover:text-fg"
                    >
                      Edit
                    </Link>
                    <DeleteMediaButton id={m.id} />
                  </div>
                </td>
              </tr>
            ))}
            {media.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-fg-muted">
                  No media yet. Add your first piece.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
