"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Category = { id: string; nameEn: string; slug: string };

type MediaData = {
  id?: string;
  type: string;
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  filePath?: string;
  categoryId: string | null;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  altId: string;
  altEn: string;
  client: string;
  year: string;
};

type Props = {
  categories: Category[];
  initial?: Partial<MediaData>;
  mode: "create" | "edit";
};

export function MediaForm({ categories, initial, mode }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(initial?.filePath || "");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);

    try {
      const url =
        mode === "create" ? "/api/admin/media" : `/api/admin/media/${initial?.id}`;
      const method = mode === "create" ? "POST" : "PUT";
      const res = await fetch(url, { method, body: form });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Save failed");
        setLoading(false);
        return;
      }
      router.push("/admin/media");
      router.refresh();
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 max-w-3xl" encType="multipart/form-data">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="admin-label" htmlFor="titleEn">
            Title (EN)
          </label>
          <input
            id="titleEn"
            name="titleEn"
            required
            className="admin-input"
            defaultValue={initial?.titleEn || ""}
          />
        </div>
        <div>
          <label className="admin-label" htmlFor="titleId">
            Title (ID)
          </label>
          <input
            id="titleId"
            name="titleId"
            required
            className="admin-input"
            defaultValue={initial?.titleId || ""}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="admin-label" htmlFor="descriptionEn">
            Description (EN)
          </label>
          <textarea
            id="descriptionEn"
            name="descriptionEn"
            rows={4}
            className="admin-input"
            defaultValue={initial?.descriptionEn || ""}
          />
        </div>
        <div>
          <label className="admin-label" htmlFor="descriptionId">
            Description (ID)
          </label>
          <textarea
            id="descriptionId"
            name="descriptionId"
            rows={4}
            className="admin-input"
            defaultValue={initial?.descriptionId || ""}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="admin-label" htmlFor="altEn">
            Alt text (EN)
          </label>
          <input
            id="altEn"
            name="altEn"
            className="admin-input"
            defaultValue={initial?.altEn || ""}
          />
        </div>
        <div>
          <label className="admin-label" htmlFor="altId">
            Alt text (ID)
          </label>
          <input
            id="altId"
            name="altId"
            className="admin-input"
            defaultValue={initial?.altId || ""}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <div>
          <label className="admin-label" htmlFor="categoryId">
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            className="admin-input"
            defaultValue={initial?.categoryId || ""}
          >
            <option value="">—</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nameEn}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="admin-label" htmlFor="type">
            Type
          </label>
          <select
            id="type"
            name="type"
            className="admin-input"
            defaultValue={initial?.type || "photo"}
          >
            <option value="photo">Photo</option>
            <option value="video">Video</option>
          </select>
        </div>
        <div>
          <label className="admin-label" htmlFor="sortOrder">
            Sort order
          </label>
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            className="admin-input"
            defaultValue={initial?.sortOrder ?? 0}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="admin-label" htmlFor="client">
            Client
          </label>
          <input
            id="client"
            name="client"
            className="admin-input"
            defaultValue={initial?.client || ""}
          />
        </div>
        <div>
          <label className="admin-label" htmlFor="year">
            Year
          </label>
          <input
            id="year"
            name="year"
            type="number"
            className="admin-input"
            defaultValue={initial?.year || ""}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-fg-muted cursor-pointer">
          <input
            type="checkbox"
            name="featured"
            value="1"
            defaultChecked={initial?.featured}
            className="accent-[var(--accent)]"
          />
          Featured on home
        </label>
        <label className="flex items-center gap-2 text-sm text-fg-muted cursor-pointer">
          <input
            type="checkbox"
            name="published"
            value="1"
            defaultChecked={initial?.published !== false}
            className="accent-[var(--accent)]"
          />
          Published
        </label>
      </div>

      <div>
        <label className="admin-label" htmlFor="file">
          {mode === "create" ? "Upload file" : "Replace file (optional)"}
        </label>
        <input
          id="file"
          name="file"
          type="file"
          accept="image/*,video/*"
          required={mode === "create"}
          className="admin-input file:mr-4 file:border-0 file:bg-fg file:text-bg file:px-3 file:py-1 file:text-xs file:uppercase file:tracking-wider"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f && f.type.startsWith("image/")) {
              setPreview(URL.createObjectURL(f));
            }
          }}
        />
        <p className="mt-2 text-xs text-fg-subtle">
          Images are auto-converted to WebP. Videos stored as-is. Max ~20MB.
        </p>
      </div>

      {preview && (
        <div className="relative w-full max-w-sm aspect-[3/4] bg-bg-soft overflow-hidden border border-border">
          <Image src={preview} alt="Preview" fill className="object-cover" unoptimized />
        </div>
      )}

      {error && (
        <p className="text-danger text-sm" role="alert">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button type="submit" className="admin-btn" disabled={loading}>
          {loading ? "Saving…" : mode === "create" ? "Create" : "Save changes"}
        </button>
        <button
          type="button"
          className="admin-btn admin-btn-ghost"
          onClick={() => router.push("/admin/media")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
