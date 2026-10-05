# FytCyte Dev Log

Running log of what changed, why, and what's next. One entry per work session.

---

## 2026-08-31 — Theme pass + Phase 2 planning

- Applied a full visual reskin to the landing page and shared UI (header,
  buttons, form fields) based on a mockup provided (`FitCyte_Theme_Mockup_v12`):
  dark background, lime/aqua/violet/hotpink accent palette, Baloo 2 + JetBrains
  Mono + Quicksand fonts, glassmorphism panels, decorative animations
  (orbs, confetti, camera-flash burst, marquee ticker).
  - Theme lives entirely in CSS variables (`src/app/globals.css`), so it's a
    contained swap if the direction or app name changes later.
  - Fixed a mobile bug where the "Portfolio of the Week" runner cards
    collapsed to zero height below the desktop breakpoint.
  - Fixed the site header wrapping badly at narrow widths.
- Verified visually in-browser at desktop, 1280px, and 390px (mobile) widths.
- Committed Phase 1 + the theme pass in one commit (`19aac0c`).
- Scoped **Phase 2**: shoot listings, collaboration requests (accept/decline
  gates exact-location visibility), persistent messaging between accepted
  collaborators (no disappearing messages — safety requirement), and
  lightweight safety reporting. Map (OpenStreetMap) and the AI Shoot
  Assistant pushed to Phase 3+ since both depend on listings existing first.

**Next**: start Phase 2 — schema for `shoot_listings` / `collaboration_requests`
/ `messages`, then the create-listing flow.

---

## 2026-08-30 — Phase 1: Foundation

- Installed Node.js (wasn't present on the machine).
- Scaffolded Next.js 16 (App Router, TypeScript, Tailwind v4, Turbopack) —
  noted Next 16 renamed `middleware.ts` → `proxy.ts`.
- Designed and migrated the database schema (`supabase/migrations/`):
  `profiles`, `model_profiles`, `photographer_profiles`, `portfolio_items`,
  with Row Level Security throughout.
- Auth: Supabase email/password signup + login, session refresh via
  `src/proxy.ts`, email-confirmation callback route.
- **18+ gate**: enforced client-side (required checkbox) *and* server-side —
  `profiles.age_confirmed` has a `CHECK` constraint, and the trigger that
  creates a profile runs in the same transaction as account creation, so an
  unconfirmed signup can't produce an account at all.
- Profile create/edit (common fields + model-specific / photographer-specific
  detail tables) and portfolio image upload/delete via Supabase Storage,
  validated client + server + storage bucket policy.
- Fixed `.gitignore` (`.env*` was also excluding `.env.example`, which
  should be committed).
- Supabase key system had moved to publishable/secret keys since original
  planning — updated env var names and setup instructions to match.
- Live-tested the full flow (signup → email confirm → profile edit →
  portfolio upload) with a real Supabase project; verified data via REST.
- Type-check, lint, and production build all pass.

**Next**: theme direction (done next session — see above).
