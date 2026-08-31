import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/auth/requireUser";
import type { ProfileRow } from "@/types/db";

export const metadata: Metadata = { title: "Dashboard — FytCyte" };

export default async function DashboardPage() {
  const { supabase, user } = await requireUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<ProfileRow>();

  const isComplete = Boolean(profile?.bio && profile?.city);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl mb-2">Welcome, {profile?.display_name}</h1>
      <p className="text-sm text-muted-foreground mb-8 capitalize">
        {profile?.user_type} account
      </p>

      {!isComplete && (
        <div className="border border-border bg-muted px-4 py-3.5 mb-8 text-sm">
          Your profile is still bare.{" "}
          <Link href="/profile/edit" className="underline hover:text-accent">
            Complete it
          </Link>{" "}
          so collaborators can find you.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/profile/edit"
          className="border border-border p-6 transition-colors hover:border-accent"
        >
          <h2 className="font-display text-xl mb-1">Edit profile</h2>
          <p className="text-sm text-muted-foreground">
            Update your bio, location, and{" "}
            {profile?.user_type === "model" ? "modeling" : "photography"} details.
          </p>
        </Link>
        <Link
          href="/portfolio"
          className="border border-border p-6 transition-colors hover:border-accent"
        >
          <h2 className="font-display text-xl mb-1">Manage portfolio</h2>
          <p className="text-sm text-muted-foreground">
            Upload and organize your portfolio images.
          </p>
        </Link>
      </div>
    </div>
  );
}
