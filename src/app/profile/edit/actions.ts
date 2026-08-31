"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/requireUser";
import {
  profileCommonSchema,
  modelDetailsSchema,
  photographerDetailsSchema,
} from "@/lib/validation/profile";

export type ProfileFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  success?: boolean;
};

function collectFieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path[0]?.toString();
    if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

export async function updateProfileAction(
  _prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const { supabase, user } = await requireUser();

  // user_type comes from the database, never from the submitted form — a
  // client can't switch which table it writes to by tampering with a field.
  const { data: profile } = await supabase
    .from("profiles")
    .select("user_type")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return { error: "Could not load your profile. Try refreshing the page." };
  }

  const commonParsed = profileCommonSchema.safeParse({
    displayName: String(formData.get("displayName") ?? ""),
    bio: String(formData.get("bio") ?? ""),
    city: String(formData.get("city") ?? ""),
    region: String(formData.get("region") ?? ""),
    country: String(formData.get("country") ?? ""),
  });

  let fieldErrors: Record<string, string> = commonParsed.success
    ? {}
    : collectFieldErrors(commonParsed.error.issues);

  if (profile.user_type === "model") {
    const detailsParsed = modelDetailsSchema.safeParse({
      heightCm: String(formData.get("heightCm") ?? ""),
      experienceLevel: String(formData.get("experienceLevel") ?? ""),
      styleTags: String(formData.get("styleTags") ?? ""),
    });

    if (!detailsParsed.success) {
      fieldErrors = { ...fieldErrors, ...collectFieldErrors(detailsParsed.error.issues) };
    }
    if (!commonParsed.success || !detailsParsed.success) {
      return { fieldErrors };
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        display_name: commonParsed.data.displayName,
        bio: commonParsed.data.bio ?? null,
        city: commonParsed.data.city ?? null,
        region: commonParsed.data.region ?? null,
        country: commonParsed.data.country ?? null,
      })
      .eq("id", user.id);
    if (profileError) return { error: profileError.message };

    const { error: detailsError } = await supabase.from("model_profiles").upsert({
      profile_id: user.id,
      height_cm: detailsParsed.data.heightCm ?? null,
      experience_level: detailsParsed.data.experienceLevel ?? null,
      style_tags: detailsParsed.data.styleTags,
    });
    if (detailsError) return { error: detailsError.message };
  } else {
    const detailsParsed = photographerDetailsSchema.safeParse({
      studioName: String(formData.get("studioName") ?? ""),
      yearsExperience: String(formData.get("yearsExperience") ?? ""),
      specialties: String(formData.get("specialties") ?? ""),
      websiteUrl: String(formData.get("websiteUrl") ?? ""),
    });

    if (!detailsParsed.success) {
      fieldErrors = { ...fieldErrors, ...collectFieldErrors(detailsParsed.error.issues) };
    }
    if (!commonParsed.success || !detailsParsed.success) {
      return { fieldErrors };
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        display_name: commonParsed.data.displayName,
        bio: commonParsed.data.bio ?? null,
        city: commonParsed.data.city ?? null,
        region: commonParsed.data.region ?? null,
        country: commonParsed.data.country ?? null,
      })
      .eq("id", user.id);
    if (profileError) return { error: profileError.message };

    const { error: detailsError } = await supabase.from("photographer_profiles").upsert({
      profile_id: user.id,
      studio_name: detailsParsed.data.studioName ?? null,
      years_experience: detailsParsed.data.yearsExperience ?? null,
      specialties: detailsParsed.data.specialties,
      website_url: detailsParsed.data.websiteUrl ?? null,
    });
    if (detailsError) return { error: detailsError.message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/profile/edit");
  revalidatePath("/portfolio");

  return { success: true };
}
