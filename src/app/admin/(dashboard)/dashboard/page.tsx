import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const [mediaCount, featuredCount, inquiryCount, categoryCount, recentInquiries] =
    await Promise.all([
      prisma.media.count(),
      prisma.media.count({ where: { featured: true } }),
      prisma.inquiry.count({ where: { status: "new" } }),
      prisma.category.count(),
      prisma.inquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  const cards = [
    { label: "Total Media", value: mediaCount, href: "/admin/media" },
    { label: "Featured", value: featuredCount, href: "/admin/media" },
    { label: "New Inquiries", value: inquiryCount, href: "/admin/inquiries" },
    { label: "Categories", value: categoryCount, href: "/admin/categories" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl">Dashboard</h1>
          <p className="text-fg-muted text-sm mt-2">Manage your studio showcase</p>
        </div>
        <Link href="/admin/media/new" className="admin-btn">
          + Add Media
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="border border-border p-6 hover:border-accent/40 transition-colors bg-bg-elevated/30"
          >
            <p className="font-serif text-3xl text-accent mb-2">{c.value}</p>
            <p className="text-[11px] tracking-[0.16em] uppercase text-fg-subtle">{c.label}</p>
          </Link>
        ))}
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-fg-subtle">
            Recent inquiries
          </h2>
          <Link href="/admin/inquiries" className="text-sm text-accent hover:text-fg">
            View all
          </Link>
        </div>
        <div className="border border-border divide-y divide-border">
          {recentInquiries.length === 0 && (
            <p className="p-6 text-fg-muted text-sm">No inquiries yet.</p>
          )}
          {recentInquiries.map((inq) => (
            <div key={inq.id} className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="text-fg font-medium">{inq.name}</p>
                <p className="text-sm text-fg-muted">{inq.email}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] tracking-[0.14em] uppercase text-fg-subtle">
                  {inq.status}
                </p>
                <p className="text-xs text-fg-muted">
                  {new Date(inq.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
