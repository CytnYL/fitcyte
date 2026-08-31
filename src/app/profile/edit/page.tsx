import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/requireUser";
import { ProfileForm } from "./ProfileForm";
import type { ProfileRow, ModelProfileRow, PhotographerProfileRow } from "@/types/db";

export const metadata: Metadata = { title: "Edit profile — FytCyte" };

export default async function EditProfilePage() {
  const { supabase, user } = await requireUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<ProfileRow>();

  if (!profile) {
    throw new Error("Profile not found for the current user.");
  }

  const modelDetails =
    profile.user_type === "model"
      ? (
          await supabase
            .from("model_profiles")
            .select("*")
            .eq("profile_id", user.id)
            .maybeSingle<ModelProfileRow>()
        ).data
      : null;

  const photographerDetails =
    profile.user_type === "photographer"
      ? (
          await supabase
            .from("photographer_profiles")
            .select("*")
            .eq("profile_id", user.id)
            .maybeSingle<PhotographerProfileRow>()
        ).data
      : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl mb-8">Edit profile</h1>
      <ProfileForm
        profile={profile}
        modelDetails={modelDetails}
        photographerDetails={photographerDetails}
      />
    </div>
  );
}
