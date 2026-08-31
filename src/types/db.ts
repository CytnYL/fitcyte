// Hand-written types matching supabase/migrations/0001_init.sql.
// Once the schema settles, you can replace this file with output from:
//   npx supabase gen types typescript --project-id <ref> > src/types/db.ts

export type UserType = "model" | "photographer";

export type ExperienceLevel =
  | "new"
  | "some_experience"
  | "experienced"
  | "professional";

export type VerificationStatus = "self_attested" | "pending" | "verified";

export interface ProfileRow {
  id: string;
  user_type: UserType;
  display_name: string;
  bio: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  avatar_path: string | null;
  age_confirmed: boolean;
  age_confirmed_at: string | null;
  verification_status: VerificationStatus;
  created_at: string;
  updated_at: string;
}

export interface ModelProfileRow {
  profile_id: string;
  height_cm: number | null;
  experience_level: ExperienceLevel | null;
  style_tags: string[];
  updated_at: string;
}

export interface PhotographerProfileRow {
  profile_id: string;
  studio_name: string | null;
  years_experience: number | null;
  specialties: string[];
  website_url: string | null;
  updated_at: string;
}

export interface PortfolioItemRow {
  id: string;
  profile_id: string;
  storage_path: string;
  caption: string | null;
  display_order: number;
  created_at: string;
}
