import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Server-side auth guard for pages that require a signed-in user.
 * Uses getUser() (not getSession()) because it re-validates the token
 * against Supabase Auth instead of trusting the cookie's contents.
 */
export async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return { supabase, user };
}
