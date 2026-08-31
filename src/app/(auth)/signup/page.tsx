import type { Metadata } from "next";
import { SignUpForm } from "./SignUpForm";

export const metadata: Metadata = { title: "Sign up — FytCyte" };

export default function SignUpPage() {
  return (
    <div>
      <h1 className="font-display text-3xl mb-2">Create your account</h1>
      <p className="text-sm text-muted-foreground mb-8">
        FytCyte is a portfolio-building platform for models and photographers,
        18 and older.
      </p>
      <SignUpForm />
    </div>
  );
}
