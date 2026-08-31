import { z } from "zod";

/**
 * HTML forms send every field as a string, including empty ones. This turns
 * "" into undefined *before* the number check runs, so an empty optional
 * field doesn't fail validation as "not a number".
 */
function optionalInt(min: number, max: number) {
  return z.preprocess(
    (value) => (value === "" || value === null || value === undefined ? undefined : value),
    z.coerce
      .number()
      .int()
      .min(min, `Must be ${min} or more.`)
      .max(max, `Must be ${max} or less.`)
      .optional()
  );
}

function optionalTrimmedString(maxLength: number) {
  return z.preprocess(
    (value) => (value === "" || value === null || value === undefined ? undefined : value),
    z.string().trim().max(maxLength).optional()
  );
}

export const profileCommonSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Display name must be at least 2 characters.")
    .max(60, "Display name must be 60 characters or fewer."),
  bio: optionalTrimmedString(1000),
  city: optionalTrimmedString(100),
  region: optionalTrimmedString(100),
  country: optionalTrimmedString(100),
});

export type ProfileCommonInput = z.infer<typeof profileCommonSchema>;

export const experienceLevelSchema = z.enum([
  "new",
  "some_experience",
  "experienced",
  "professional",
]);

/** Comma-separated tag input, e.g. "editorial, streetwear, portrait". */
function tagList(maxTags: number) {
  return z.preprocess((value) => {
    if (typeof value !== "string") return value;
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    return tags.slice(0, maxTags);
  }, z.array(z.string().min(1).max(30)).max(maxTags));
}

export const modelDetailsSchema = z.object({
  heightCm: optionalInt(100, 230),
  experienceLevel: z.preprocess(
    (value) => (value === "" ? undefined : value),
    experienceLevelSchema.optional()
  ),
  styleTags: tagList(10),
});

export type ModelDetailsInput = z.infer<typeof modelDetailsSchema>;

export const photographerDetailsSchema = z.object({
  studioName: optionalTrimmedString(100),
  yearsExperience: optionalInt(0, 80),
  specialties: tagList(10),
  websiteUrl: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.url("Enter a valid URL, e.g. https://example.com").optional()
  ),
});

export type PhotographerDetailsInput = z.infer<typeof photographerDetailsSchema>;
