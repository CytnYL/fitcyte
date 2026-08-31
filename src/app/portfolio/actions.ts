"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/requireUser";
import { validateImageFile, portfolioCaptionSchema } from "@/lib/validation/portfolio";

export type PortfolioFormState = {
  error?: string;
};

export async function uploadPortfolioItemAction(
  _prevState: PortfolioFormState,
  formData: FormData
): Promise<PortfolioFormState> {
  const { supabase, user } = await requireUser();

  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose an image to upload." };
  }

  const fileErrors = validateImageFile(file);
  if (fileErrors.length > 0) {
    return { error: fileErrors.join(" ") };
  }

  const captionParsed = portfolioCaptionSchema.safeParse(formData.get("caption"));
  if (!captionParsed.success) {
    return { error: captionParsed.error.issues[0]?.message ?? "Invalid caption." };
  }

  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const storagePath = `${user.id}/${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("portfolio")
    .upload(storagePath, file, { contentType: file.type });

  if (uploadError) {
    return { error: uploadError.message };
  }

  const { error: insertError } = await supabase.from("portfolio_items").insert({
    profile_id: user.id,
    storage_path: storagePath,
    caption: captionParsed.data ?? null,
  });

  if (insertError) {
    // Clean up the uploaded object so a failed insert doesn't leave an
    // orphaned file behind in storage.
    await supabase.storage.from("portfolio").remove([storagePath]);
    return { error: insertError.message };
  }

  revalidatePath("/portfolio");
  return {};
}

export async function deletePortfolioItemAction(formData: FormData): Promise<void> {
  const { supabase, user } = await requireUser();

  const itemId = String(formData.get("itemId") ?? "");
  if (!itemId) return;

  const { data: item } = await supabase
    .from("portfolio_items")
    .select("storage_path, profile_id")
    .eq("id", itemId)
    .single();

  if (!item || item.profile_id !== user.id) {
    // RLS would reject the delete below anyway; this is just a friendlier
    // early exit for a request that couldn't succeed.
    return;
  }

  await supabase.from("portfolio_items").delete().eq("id", itemId);
  await supabase.storage.from("portfolio").remove([item.storage_path]);

  revalidatePath("/portfolio");
}
