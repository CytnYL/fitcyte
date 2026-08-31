"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { loginAction, type LoginFormState } from "./actions";

const initialState: LoginFormState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

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
        id="password"
        name="password"
        type="password"
        label="Password"
        required
        autoComplete="current-password"
        error={state.fieldErrors?.password}
      />

      <Button type="submit" disabled={pending}>
        {pending ? "Logging in…" : "Log in"}
      </Button>

      <p className="text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="underline hover:text-accent">
          Sign up
        </Link>
      </p>
    </form>
  );
}
