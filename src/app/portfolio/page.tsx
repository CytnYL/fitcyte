import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/requireUser";
import { PortfolioManager } from "./PortfolioManager";
import type { PortfolioItemRow } from "@/types/db";

export const metadata: Metadata = { title: "Portfolio — FytCyte" };

export default async function PortfolioPage() {
  const { supabase, user } = await requireUser();

  const { data: items } = await supabase
    .from("portfolio_items")
    .select("*")
    .eq("profile_id", user.id)
    .order("created_at", { ascending: false })
    .returns<PortfolioItemRow[]>();

  const itemViews = (items ?? []).map((item) => ({
    id: item.id,
    caption: item.caption,
    url: supabase.storage.from("portfolio").getPublicUrl(item.storage_path).data.publicUrl,
  }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl mb-8">Your portfolio</h1>
      <PortfolioManager items={itemViews} />
    </div>
  );
}
