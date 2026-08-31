import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Log in — FytCyte" };

export default function LoginPage() {
  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Log in</h1>
      <LoginForm />
    </div>
  );
}
