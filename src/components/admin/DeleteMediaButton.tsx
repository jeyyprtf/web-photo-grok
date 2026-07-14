"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteMediaButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    if (!confirm("Delete this media item?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("fail");
      router.refresh();
    } catch {
      alert("Failed to delete");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onDelete}
      disabled={loading}
      className="text-[11px] tracking-[0.12em] uppercase text-danger/80 hover:text-danger disabled:opacity-50"
    >
      {loading ? "…" : "Delete"}
    </button>
  );
}
