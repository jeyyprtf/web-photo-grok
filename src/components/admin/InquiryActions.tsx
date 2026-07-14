"use client";

import { useRouter } from "next/navigation";

export function InquiryActions({ id, status }: { id: string; status: string }) {
  const router = useRouter();

  async function setStatus(next: string) {
    await fetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    router.refresh();
  }

  async function remove() {
    if (!confirm("Delete this inquiry?")) return;
    await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {status !== "read" && (
        <button
          type="button"
          onClick={() => setStatus("read")}
          className="text-[11px] tracking-[0.12em] uppercase text-fg-muted hover:text-accent"
        >
          Mark read
        </button>
      )}
      {status !== "archived" && (
        <button
          type="button"
          onClick={() => setStatus("archived")}
          className="text-[11px] tracking-[0.12em] uppercase text-fg-muted hover:text-accent"
        >
          Archive
        </button>
      )}
      <button
        type="button"
        onClick={remove}
        className="text-[11px] tracking-[0.12em] uppercase text-danger/80 hover:text-danger"
      >
        Delete
      </button>
    </div>
  );
}
