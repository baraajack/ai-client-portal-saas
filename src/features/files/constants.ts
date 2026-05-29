import { env } from "@/env";

export const FILE_BUCKET =
  env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET

export const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "text/plain",
  "application/zip",
] as const;