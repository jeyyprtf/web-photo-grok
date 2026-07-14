import { prisma } from "@/lib/prisma";
import { InquiryActions } from "@/components/admin/InquiryActions";

export default async function InquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif text-3xl md:text-4xl">Inquiries</h1>
        <p className="text-fg-muted text-sm mt-2">{inquiries.length} total</p>
      </div>

      <div className="space-y-4">
        {inquiries.length === 0 && (
          <p className="text-fg-muted border border-border p-8 text-center">
            No inquiries yet.
          </p>
        )}
        {inquiries.map((inq) => (
          <article
            key={inq.id}
            className="border border-border p-6 bg-bg-elevated/20"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg text-fg">{inq.name}</h2>
                <a
                  href={`mailto:${inq.email}`}
                  className="text-sm text-accent hover:text-fg"
                >
                  {inq.email}
                </a>
                {inq.phone && (
                  <p className="text-sm text-fg-muted mt-1">{inq.phone}</p>
                )}
              </div>
              <div className="text-right">
                <span className="text-[10px] tracking-[0.16em] uppercase text-fg-subtle border border-border px-2 py-1">
                  {inq.status}
                </span>
                <p className="text-xs text-fg-muted mt-2">
                  {new Date(inq.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <dl className="grid sm:grid-cols-3 gap-3 text-sm mb-4">
              {inq.projectType && (
                <div>
                  <dt className="text-[10px] tracking-wider uppercase text-fg-subtle">
                    Type
                  </dt>
                  <dd className="text-fg-muted">{inq.projectType}</dd>
                </div>
              )}
              {inq.date && (
                <div>
                  <dt className="text-[10px] tracking-wider uppercase text-fg-subtle">
                    Date
                  </dt>
                  <dd className="text-fg-muted">{inq.date}</dd>
                </div>
              )}
              {inq.budget && (
                <div>
                  <dt className="text-[10px] tracking-wider uppercase text-fg-subtle">
                    Budget
                  </dt>
                  <dd className="text-fg-muted">{inq.budget}</dd>
                </div>
              )}
            </dl>
            <p className="text-fg-muted leading-relaxed whitespace-pre-wrap border-t border-border pt-4">
              {inq.message}
            </p>
            <InquiryActions id={inq.id} status={inq.status} />
          </article>
        ))}
      </div>
    </div>
  );
}
