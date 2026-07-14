"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Cat = {
  id: string;
  slug: string;
  nameId: string;
  nameEn: string;
  sortOrder: number;
  mediaCount: number;
};

export function CategoryManager({ initial }: { initial: Cat[] }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function create(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nameEn: form.get("nameEn"),
          nameId: form.get("nameId"),
          slug: form.get("slug"),
          sortOrder: Number(form.get("sortOrder") || 0),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed");
        setLoading(false);
        return;
      }
      e.currentTarget.reset();
      router.refresh();
    } catch {
      setError("Failed");
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this category?")) return;
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="border border-border divide-y divide-border">
        {initial.map((c) => (
          <div key={c.id} className="p-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-fg">{c.nameEn}</p>
              <p className="text-xs text-fg-muted">
                {c.nameId} · /{c.slug} · {c.mediaCount} media
              </p>
            </div>
            <button
              type="button"
              onClick={() => remove(c.id)}
              className="text-[11px] uppercase tracking-wider text-danger/80 hover:text-danger"
            >
              Delete
            </button>
          </div>
        ))}
        {initial.length === 0 && (
          <p className="p-6 text-fg-muted text-sm">No categories yet.</p>
        )}
      </div>

      <form onSubmit={create} className="border border-border p-6 space-y-4 h-fit">
        <h2 className="text-[11px] tracking-[0.18em] uppercase text-fg-subtle mb-2">
          Add category
        </h2>
        <div>
          <label className="admin-label">Name EN</label>
          <input name="nameEn" required className="admin-input" />
        </div>
        <div>
          <label className="admin-label">Name ID</label>
          <input name="nameId" required className="admin-input" />
        </div>
        <div>
          <label className="admin-label">Slug</label>
          <input name="slug" required className="admin-input" placeholder="portrait" />
        </div>
        <div>
          <label className="admin-label">Sort order</label>
          <input name="sortOrder" type="number" className="admin-input" defaultValue={0} />
        </div>
        {error && <p className="text-danger text-sm">{error}</p>}
        <button type="submit" className="admin-btn" disabled={loading}>
          {loading ? "Adding…" : "Add category"}
        </button>
      </form>
    </div>
  );
}
