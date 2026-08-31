"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signUpSchema } from "@/lib/validation/auth";

export type SignUpFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  values?: { email?: string; displayName?: string; userType?: string };
};

export async function signUpAction(
  _prevState: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const raw = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
    displayName: String(formData.get("displayName") ?? ""),
    userType: String(formData.get("userType") ?? ""),
    // Checkboxes only appear in FormData when checked, and then as "on".
    ageConfirmed: formData.get("ageConfirmed") === "on",
  };

  const parsed = signUpSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      fieldErrors,
      values: { email: raw.email, displayName: raw.displayName, userType: raw.userType },
    };
  }

  const { email, password, displayName, userType, ageConfirmed } = parsed.data;
  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${siteUrl}/auth/callback`,
      // Read by the handle_new_user() Postgres trigger (see
      // supabase/migrations/0001_init.sql) to create the profiles row.
      // That trigger's CHECK constraint rejects the whole signup if
      // age_confirmed isn't true — this isn't just a client-side gate.
      data: {
        display_name: displayName,
        user_type: userType,
        age_confirmed: ageConfirmed,
      },
    },
  });

  if (error) {
    return { error: error.message, values: { email, displayName, userType } };
  }

  redirect("/signup/check-email");
}
