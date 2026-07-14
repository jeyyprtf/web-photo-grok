import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import sharp from "sharp";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function ensureUploadDir() {
  await mkdir(UPLOAD_DIR, { recursive: true });
}

export async function saveUploadedFile(file: File) {
  await ensureUploadDir();

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name).toLowerCase() || ".jpg";
  const isVideo = file.type.startsWith("video/") || [".mp4", ".webm", ".mov"].includes(ext);
  const id = randomUUID();

  if (isVideo) {
    const filename = `${id}${ext}`;
    const filePath = path.join(UPLOAD_DIR, filename);
    await writeFile(filePath, bytes);
    return {
      type: "video" as const,
      filePath: `/uploads/${filename}`,
      thumbPath: null as string | null,
    };
  }

  const filename = `${id}.webp`;
  const thumbName = `${id}-thumb.webp`;
  const filePath = path.join(UPLOAD_DIR, filename);
  const thumbPath = path.join(UPLOAD_DIR, thumbName);

  await sharp(bytes)
    .rotate()
    .resize({ width: 2400, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(filePath);

  await sharp(bytes)
    .rotate()
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 75 })
    .toFile(thumbPath);

  return {
    type: "photo" as const,
    filePath: `/uploads/${filename}`,
    thumbPath: `/uploads/${thumbName}`,
  };
}

export async function deleteMediaFiles(...paths: (string | null | undefined)[]) {
  for (const p of paths) {
    if (!p || p.startsWith("http")) continue;
    const full = path.join(process.cwd(), "public", p.replace(/^\//, ""));
    try {
      await unlink(full);
    } catch {
      // ignore missing
    }
  }
}

export function mediaSrc(filePath: string) {
  return filePath;
}
