"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { TextField, TextAreaField, SelectField } from "@/components/ui/Field";
import { updateProfileAction, type ProfileFormState } from "./actions";
import type { ProfileRow, ModelProfileRow, PhotographerProfileRow } from "@/types/db";

const initialState: ProfileFormState = {};

export function ProfileForm({
  profile,
  modelDetails,
  photographerDetails,
}: {
  profile: ProfileRow;
  modelDetails: ModelProfileRow | null;
  photographerDetails: PhotographerProfileRow | null;
}) {
  const [state, formAction, pending] = useActionState(updateProfileAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      {state.error && (
        <p className="text-sm text-error" role="alert">
          {state.error}
        </p>
      )}
      {state.success && <p className="text-sm text-accent">Profile saved.</p>}

      <fieldset className="flex flex-col gap-5">
        <legend className="font-display text-lg mb-1">About you</legend>
        <TextField
          id="displayName"
          name="displayName"
          label="Display name"
          required
          defaultValue={profile.display_name}
          error={state.fieldErrors?.displayName}
        />
        <TextAreaField
          id="bio"
          name="bio"
          label="Bio"
          defaultValue={profile.bio ?? ""}
          error={state.fieldErrors?.bio}
          hint="Up to 1000 characters."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <TextField id="city" name="city" label="City" defaultValue={profile.city ?? ""} error={state.fieldErrors?.city} />
          <TextField id="region" name="region" label="Region / state" defaultValue={profile.region ?? ""} error={state.fieldErrors?.region} />
          <TextField id="country" name="country" label="Country" defaultValue={profile.country ?? ""} error={state.fieldErrors?.country} />
        </div>
        <p className="text-xs text-muted-foreground -mt-2">
          General location only. Exact shoot addresses are never shown here —
          those are shared privately with accepted collaborators in a later
          phase.
        </p>
      </fieldset>

      {profile.user_type === "model" ? (
        <fieldset className="flex flex-col gap-5">
          <legend className="font-display text-lg mb-1">Modeling details</legend>
          <TextField
            id="heightCm"
            name="heightCm"
            type="number"
            label="Height (cm)"
            defaultValue={modelDetails?.height_cm ?? ""}
            error={state.fieldErrors?.heightCm}
          />
          <SelectField
            id="experienceLevel"
            name="experienceLevel"
            label="Experience level"
            defaultValue={modelDetails?.experience_level ?? ""}
            error={state.fieldErrors?.experienceLevel}
          >
            <option value="">Prefer not to say</option>
            <option value="new">New to modeling</option>
            <option value="some_experience">Some experience</option>
            <option value="experienced">Experienced</option>
            <option value="professional">Professional</option>
          </SelectField>
          <TextField
            id="styleTags"
            name="styleTags"
            label="Styles"
            defaultValue={modelDetails?.style_tags?.join(", ") ?? ""}
            error={state.fieldErrors?.styleTags}
            hint="Comma-separated, e.g. editorial, streetwear, portrait."
          />
        </fieldset>
      ) : (
        <fieldset className="flex flex-col gap-5">
          <legend className="font-display text-lg mb-1">Photography details</legend>
          <TextField
            id="studioName"
            name="studioName"
            label="Studio name"
            defaultValue={photographerDetails?.studio_name ?? ""}
            error={state.fieldErrors?.studioName}
          />
          <TextField
            id="yearsExperience"
            name="yearsExperience"
            type="number"
            label="Years of experience"
            defaultValue={photographerDetails?.years_experience ?? ""}
            error={state.fieldErrors?.yearsExperience}
          />
          <TextField
            id="specialties"
            name="specialties"
            label="Specialties"
            defaultValue={photographerDetails?.specialties?.join(", ") ?? ""}
            error={state.fieldErrors?.specialties}
            hint="Comma-separated, e.g. editorial, product, portrait."
          />
          <TextField
            id="websiteUrl"
            name="websiteUrl"
            type="url"
            label="Website"
            defaultValue={photographerDetails?.website_url ?? ""}
            error={state.fieldErrors?.websiteUrl}
          />
        </fieldset>
      )}

      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Saving…" : "Save profile"}
      </Button>
    </form>
  );
}
