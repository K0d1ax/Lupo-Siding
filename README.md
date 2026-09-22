# Lupo Siding — Cheyenne, WY

A production-grade marketing site and lead engine for a siding, gutter and deck contractor
serving Cheyenne and Laramie County, Wyoming.

**Stack:** Vite · React 18 · TypeScript · Radix UI · Tailwind CSS · Framer Motion · Convex

---

## Why this beats the local competition

Research pass on the Cheyenne market (BBB directory, Laramie County) found the local field is
mostly roofing-first companies with "siding" tacked onto a services list, dated templates and no
lead capture beyond a phone number. `swedesroofing.com` renders as roughly 200 words of plain text.
The national players (HANSONS, DaBella) run the full playbook: promo bar, mega-nav, video
testimonials, 3-step process, guarantees, financing.

This site takes that playbook and adds the one thing nobody local has: **a climate argument that
is specific to this ZIP code.** Every competitor quotes a national price list. This site explains
what 6,086 ft of elevation, 60-inch snow years, 2,980 annual sun hours and a 106-day frost-free
season do to a wall — and turns each one into a reason to buy a better assembly.

Also included, which no local competitor has:

- **Materials Studio** — an interactive, parametric SVG elevation. Pick a cladding and a colour and
  the whole house re-renders instantly on the page.
- **Drag-to-compare before/after** over a weathered west-facing elevation.
- **Blueprint cross-sections** of the actual assemblies (WRB + flashing, gutter + ice-dam path,
  footing + thermal movement) instead of a stock photo of a truck.
- **Interactive service-area map** plotted from real coordinates, with the WY/CO and WY/NE state
  lines and honest 25/60-mile radius rings.
- **Six-step quote wizard** with server-validated submissions, lead scoring and a live owner portal.

---

## Quick start

```bash
bun install
bunx convex dev --once   # provisions/links the Convex deployment + generates types
bun dev                  # dev server
bun run typecheck        # tsc -b --noEmit
```

The Convex CLI writes `VITE_CONVEX_URL` into `.env.local` automatically. Do not edit that file by
hand; if the URL is missing the site still renders and the wizard falls back to browser storage.

---

## Owner portal

Route: `/portal`. Shows incoming quote requests, a pipeline (new → contacted → quoted → won/lost),
internal notes, search and filters. Updates push in live via Convex subscriptions.

It is protected by an **access code that is verified on the server**, so it is never shipped in the
JavaScript bundle:

```bash
bunx convex env set OWNER_ACCESS_CODE "a-long-random-string-here"
```

Set the same variable on the production Convex deployment before you hand the site over. Until it is
set, `/portal` shows the exact command to run instead of failing silently.

> The code is stored in `sessionStorage` after a successful unlock, so closing the tab locks the
> portal again. This is single-owner authorization, not multi-user auth — appropriate for one
> contractor's inbox, not for a product with staff accounts.

---

## Editing content

**Almost every string, price band, colour and FAQ answer lives in one file:**
`src/content/site.ts`

That includes business details, the three services, six siding materials, 12 colours, the Cheyenne
climate facts, process steps, guarantees, testimonials, service-area towns, brands and FAQs.

Design tokens (the colour system, glow shadows, keyframes) live in
`tailwind.config.ts` + `src/index.css` under the `High Plains Neon` block.

---

## ⚠️ Before you launch — required replacements

Everything below is realistic placeholder content. Shipping invented facts about a real business is
a legal problem, not just a quality problem.

| Where | What is fake | What to do |
| --- | --- | --- |
| `business` in `src/content/site.ts` | phone, email, street address, contractor licence number | Replace with the real details. Also update the JSON-LD block in `index.html` (it repeats the address and phone for SEO). |
| `testimonials` | all six reviews, names and neighbourhoods | **Replace with real, verified reviews with permission.** The FTC prohibits fake testimonials and Google penalises them. These are labelled as placeholders in the UI footer. |
| `stats` | 1,400 projects, 4.9★, 217 reviews | Pull from the real Google Business Profile. |
| `reviewSummary.distribution` | the star-count breakdown | Mirror the real distribution. |
| `projects` | nine jobs, towns and years | Swap in real jobs. Drop the photo path into `image` on any project and the illustration is replaced automatically. |
| `brands` | James Hardie, LP SmartSide, etc. | Confirm these are genuinely installed. If not, delete the ones you don't use. |
| `climate` closing paragraph | F3 tornado, records | Sourced from public Cheyenne climate records; re-verify before publishing. |
| `quote.insuranceClaim` copy | "we meet your adjuster at no charge" | Only keep if the business actually does this. |
| Materials table | wind/hail/lifespan/cost figures | Already footnoted as manufacturer-published test results. Confirm current spec sheets. |
| Financing | "12–144 months, OAC" | Confirm the actual lender programme or remove it. |

---

## Accessibility & performance notes

- Every interactive control is a real focusable element: the before/after slider is an ARIA slider
  with arrow-key support, the wizard is fully keyboard navigable with per-step error announcements,
  and the map pins synchronise with a focusable town list.
- All decorative motion is disabled under `prefers-reduced-motion`.
- Vendor code is split into separate chunks (`react`, `motion`, `convex`) in `vite.config.ts` so the
  hero paints without waiting on the animation or backend libraries.
- Illustrations are inline SVG rather than photographs — they stay crisp at any size and add almost
  nothing to the transfer size. Swap in real photos (see `Project.image`) for the strongest result.

---

## Project structure

```
src/
  content/site.ts          ← all editable content
  components/
    ui/                    ← Radix + shadcn-style primitives
    site/                  ← HouseScene, Blueprint, Backdrop, TiltCard, Logo
    motion/Reveal.tsx      ← scroll reveal, stagger, count-up
    layout/                ← header, footer
    sections/              ← the 13 landing-page sections
    quote/QuoteWizard.tsx  ← the six-step wizard
  convex/                  ← schema + lead pipeline functions
  lib/                     ← utils, quote data layer, Convex client
  pages/                   ← Home, Quote, Portal, NotFound
```

---

## Deploying

The build is a standard static Vite output in `dist/`, so any static host works.

- Install: `bun install`
- Build: `vite build`
- Output: `dist/`

For production you must also set `VITE_CONVEX_URL` (pointing at a **production** Convex
deployment, not the dev one) and `OWNER_ACCESS_CODE` on that deployment.
