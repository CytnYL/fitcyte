"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { TextField, SelectField } from "@/components/ui/Field";
import { signUpAction, type SignUpFormState } from "./actions";

const initialState: SignUpFormState = {};

export function SignUpForm() {
  const [state, formAction, pending] = useActionState(signUpAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {state.error && (
        <p className="text-sm text-error" role="alert">
          {state.error}
        </p>
      )}

      <TextField
        id="email"
        name="email"
        type="email"
        label="Email"
        required
        autoComplete="email"
        defaultValue={state.values?.email}
        error={state.fieldErrors?.email}
      />

      <TextField
        id="displayName"
        name="displayName"
        type="text"
        label="Display name"
        required
        defaultValue={state.values?.displayName}
        error={state.fieldErrors?.displayName}
        hint="Shown publicly on your profile."
      />

      <SelectField
        id="userType"
        name="userType"
        label="I am a…"
        required
        defaultValue={state.values?.userType ?? ""}
        error={state.fieldErrors?.userType}
      >
        <option value="" disabled>
          Select one
        </option>
        <option value="model">Model</option>
        <option value="photographer">Photographer</option>
      </SelectField>

      <TextField
        id="password"
        name="password"
        type="password"
        label="Password"
        required
        autoComplete="new-password"
        error={state.fieldErrors?.password}
        hint="At least 8 characters."
      />

      <TextField
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label="Confirm password"
        required
        autoComplete="new-password"
        error={state.fieldErrors?.confirmPassword}
      />

      <div className="flex flex-col gap-1.5 border border-border bg-muted px-4 py-3.5">
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="ageConfirmed"
            required
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
          />
          <span>
            I confirm that I am <strong>18 years of age or older</strong>. FytCyte
            is an 18+ platform.
          </span>
        </label>
        {state.fieldErrors?.ageConfirmed && (
          <p className="text-xs text-error" role="alert">
            {state.fieldErrors.ageConfirmed}
          </p>
        )}
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Creating account…" : "Create account"}
      </Button>

      <p className="text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="underline hover:text-accent">
          Log in
        </Link>
      </p>
    </form>
  );
}
