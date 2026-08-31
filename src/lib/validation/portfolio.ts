import { z } from "zod";

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

export const portfolioCaptionSchema = z.preprocess(
  (value) => (value === "" || value === null || value === undefined ? undefined : value),
  z.string().trim().max(300, "Caption must be 300 characters or fewer.").optional()
);

/**
 * Client- and server-side image checks. Storage bucket policies (see
 * supabase/migrations/0002_storage.sql) enforce the same limits again at the
 * database level, since a request can always bypass client-side JS.
 */
export function validateImageFile(file: File): string[] {
  const errors: string[] = [];
  if (!ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number])) {
    errors.push("Only JPEG, PNG, or WebP images are allowed.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    errors.push("Image must be smaller than 5MB.");
  }
  return errors;
}
