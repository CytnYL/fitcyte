import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/SignOutButton";

export async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="relative z-10 mx-auto w-full max-w-[1140px] px-6 pt-7 sm:px-10">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <Link href="/" className="flex items-center gap-2.5">
          <span
            className="block h-[26px] w-[26px] shrink-0"
            style={{
              background:
                "conic-gradient(from 45deg, var(--lime), var(--aqua), var(--sky), var(--lime))",
              clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              boxShadow:
                "inset -3px -3px 6px rgba(0,0,0,0.2), 0 2px 8px rgba(77,232,201,0.4)",
            }}
          />
          <span className="font-display text-xl font-extrabold tracking-tight">
            FytCyte
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[13px] text-muted-foreground">
          {user ? (
            <>
              <Link href="/dashboard" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link href="/portfolio" className="hover:text-foreground">
                Portfolio
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-foreground">
                Log in
              </Link>
              <Link href="/signup">
                <button className="nav-cta px-5 py-2.5 text-[13.5px] font-bold whitespace-nowrap">
                  Sign up
                </button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
