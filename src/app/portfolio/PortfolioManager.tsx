"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import {
  uploadPortfolioItemAction,
  deletePortfolioItemAction,
  type PortfolioFormState,
} from "./actions";

type PortfolioItemView = {
  id: string;
  url: string;
  caption: string | null;
};

const initialState: PortfolioFormState = {};

export function PortfolioManager({ items }: { items: PortfolioItemView[] }) {
  const [state, formAction, pending] = useActionState(uploadPortfolioItemAction, initialState);

  return (
    <div className="flex flex-col gap-10">
      <form action={formAction} className="flex flex-col gap-4 border border-border p-6">
        <h2 className="font-display text-lg">Add a photo</h2>
        {state.error && (
          <p className="text-sm text-error" role="alert">
            {state.error}
          </p>
        )}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="image" className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
            Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            required
            className="text-sm"
          />
          <p className="text-xs text-muted-foreground">JPEG, PNG, or WebP. Max 5MB.</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="caption" className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
            Caption (optional)
          </label>
          <input
            id="caption"
            name="caption"
            type="text"
            maxLength={300}
            className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <Button type="submit" disabled={pending} className="self-start">
          {pending ? "Uploading…" : "Upload"}
        </Button>
      </form>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No portfolio images yet. Add your first one above.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="group relative aspect-[3/4] overflow-hidden border border-border">
              <Image
                src={item.url}
                alt={item.caption ?? "Portfolio image"}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <form
                action={deletePortfolioItemAction}
                className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <input type="hidden" name="itemId" value={item.id} />
                <button
                  type="submit"
                  className="bg-background/90 px-2 py-1 text-xs uppercase tracking-wide text-foreground hover:text-error cursor-pointer"
                >
                  Delete
                </button>
              </form>
              {item.caption && (
                <p className="absolute inset-x-0 bottom-0 bg-background/90 px-2 py-1 text-xs">
                  {item.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
