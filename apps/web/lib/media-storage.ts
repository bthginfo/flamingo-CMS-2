import { put } from "@vercel/blob";

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/pdf"
]);

const maxUploadBytes = 10 * 1024 * 1024;

export async function uploadMediaFile(file: File, tenantSlug: string) {
  if (!allowedMimeTypes.has(file.type)) {
    throw new Error("Unsupported file type");
  }

  if (file.size > maxUploadBytes) {
    throw new Error("File exceeds maximum upload size");
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is required for media uploads");
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  const pathname = `${tenantSlug}/${Date.now()}-${safeName}`;
  const blob = await put(pathname, file, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN
  });

  return {
    url: blob.url,
    storageKey: blob.pathname,
    filename: file.name,
    mimeType: file.type,
    sizeBytes: file.size,
    type: mediaTypeFromMime(file.type)
  };
}

function mediaTypeFromMime(mimeType: string) {
  if (mimeType === "image/svg+xml") {
    return "svg" as const;
  }

  if (mimeType.startsWith("image/")) {
    return "image" as const;
  }

  if (mimeType.startsWith("video/")) {
    return "video" as const;
  }

  return "document" as const;
}
