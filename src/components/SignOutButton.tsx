import { signOutAction } from "@/lib/auth/actions";

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button type="submit" className="cursor-pointer hover:text-foreground">
        Sign out
      </button>
    </form>
  );
}
