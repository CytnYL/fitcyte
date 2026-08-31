import type { Metadata } from "next";

export const metadata: Metadata = { title: "Check your email — FytCyte" };

export default function CheckEmailPage() {
  return (
    <div>
      <h1 className="font-display text-3xl mb-2">Check your email</h1>
      <p className="text-sm text-muted-foreground">
        We sent a confirmation link to your inbox. Click it to activate your
        account, then come back and log in.
      </p>
    </div>
  );
}
