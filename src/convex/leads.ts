import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

const leadStatus = v.union(
  v.literal("new"),
  v.literal("contacted"),
  v.literal("quoted"),
  v.literal("won"),
  v.literal("lost"),
);

/**
 * Owner authorisation for the portal.
 *
 * The access code lives only in the Convex deployment environment
 * (`OWNER_ACCESS_CODE`) and is compared server-side, so it is never shipped to
 * the browser bundle. Set it with:
 *   bunx convex env set OWNER_ACCESS_CODE "your-long-random-code"
 */
function assertOwner(code: string) {
  const expected = process.env.OWNER_ACCESS_CODE;
  if (!expected) {
    throw new Error(
      "OWNER_ACCESS_CODE is not set on this Convex deployment. Run: bunx convex env set OWNER_ACCESS_CODE \"your-code\"",
    );
  }
  const a = code.trim();
  // Constant-time-ish comparison so the check does not leak length or prefix.
  let mismatch = a.length === expected.length ? 0 : 1;
  const max = Math.max(a.length, expected.length);
  for (let i = 0; i < max; i += 1) {
    mismatch |= (a.charCodeAt(i) || 0) ^ (expected.charCodeAt(i) || 0);
  }
  if (mismatch !== 0) throw new Error("That access code is not right.");
}

/**
 * Manual spam heuristics. Everything here runs server-side so a tampered client
 * cannot bypass it. Real traffic is low volume, so a lightweight filter beats a
 * CAPTCHA on conversion rate.
 */
function looksLikeSpam(name: string, email: string, notes: string) {
  if (/(https?:\/\/|www\.)/i.test(name)) return true;
  if (/(https?:\/\/|www\.|\.ru\b|\.cn\b)/i.test(email) && !EMAIL.test(email)) return true;
  if ((notes.match(/https?:\/\//gi) ?? []).length >= 3) return true;
  const letters = name.replace(/[^a-z]/gi, "");
  if (letters.length < 2) return true;
  if (name.length > 120 || notes.length > 4000) return true;
  return false;
}

/**
 * Heuristic 0-100 score so the owner can sort by the jobs most likely to close.
 * Fast timelines, larger scopes and insurance work all signal intent.
 */
function scoreLead(args: {
  services: string[];
  timeline: string;
  insuranceClaim: boolean;
  budget?: string;
  preferredContact: string;
}) {
  let score = 30;
  score += Math.min(args.services.length, 3) * 12;
  if (args.timeline === "asap") score += 20;
  else if (args.timeline === "30-days") score += 14;
  else if (args.timeline === "60-90-days") score += 6;
  if (args.insuranceClaim) score += 10;
  if (args.budget && args.budget !== "not-sure") score += 8;
  if (args.preferredContact === "phone") score += 4;
  return Math.max(0, Math.min(100, score));
}

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    preferredContact: v.union(v.literal("phone"), v.literal("text"), v.literal("email")),
    street: v.optional(v.string()),
    city: v.string(),
    zip: v.optional(v.string()),
    services: v.array(v.union(v.literal("siding"), v.literal("gutters"), v.literal("decks"))),
    propertyType: v.union(v.literal("single-family"), v.literal("multi-family"), v.literal("commercial")),
    stories: v.union(v.literal("1"), v.literal("2"), v.literal("3+")),
    homeAge: v.union(v.literal("0-10"), v.literal("11-30"), v.literal("31-60"), v.literal("60+"), v.literal("unsure")),
    sidingMaterial: v.optional(v.string()),
    sidingReason: v.optional(v.string()),
    gutterLinearFeet: v.optional(v.string()),
    gutterIssues: v.optional(v.array(v.string())),
    deckSize: v.optional(v.string()),
    deckMaterial: v.optional(v.string()),
    deckPurpose: v.optional(v.string()),
    timeline: v.union(v.literal("asap"), v.literal("30-days"), v.literal("60-90-days"), v.literal("researching")),
    budget: v.optional(v.string()),
    insuranceClaim: v.boolean(),
    notes: v.optional(v.string()),
    source: v.optional(v.string()),
  },
  returns: v.object({ leadId: v.id("leads"), score: v.number() }),
  handler: async (ctx: MutationCtx, args) => {
    const name = args.name.trim();
    const email = args.email.trim().toLowerCase();
    const phone = args.phone.replace(/\D/g, "");
    const notes = (args.notes ?? "").trim();

    if (name.length < 2) throw new Error("Please enter your full name.");
    if (!EMAIL.test(email)) throw new Error("Please enter a valid email address.");
    if (phone.length < 10) throw new Error("Please enter a valid 10-digit phone number.");
    if (args.services.length === 0) throw new Error("Select at least one service.");
    if (looksLikeSpam(name, email, notes)) throw new Error("This submission was flagged. Please call us instead.");

    const now = Date.now();
    const score = scoreLead({
      services: args.services,
      timeline: args.timeline,
      insuranceClaim: args.insuranceClaim,
      budget: args.budget,
      preferredContact: args.preferredContact,
    });

    const leadId = await ctx.db.insert("leads", {
      ...args,
      name,
      email,
      phone,
      notes: notes.length ? notes : undefined,
      street: args.street?.trim() || undefined,
      city: args.city.trim() || "Cheyenne",
      zip: args.zip?.trim() || undefined,
      status: "new",
      score,
      source: args.source ?? "website-quote-wizard",
      createdAt: now,
      updatedAt: now,
    });

    return { leadId, score };
  },
});

/* -------------------------------------------------------------------------- */
/*  OWNER PORTAL                                                               */
/* -------------------------------------------------------------------------- */

/** Returns whether the deployment has an owner code configured at all. */
export const portalStatus = query({
  args: {},
  returns: v.object({ configured: v.boolean() }),
  handler: async () => ({ configured: Boolean(process.env.OWNER_ACCESS_CODE) }),
});

/** Most recent leads, optionally filtered by pipeline stage. */
export const list = query({
  args: {
    code: v.string(),
    status: v.optional(leadStatus),
    query: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    assertOwner(args.code);

    const rows = args.status
      ? await ctx.db.query("leads").withIndex("by_status", (q) => q.eq("status", args.status!)).collect()
      : await ctx.db.query("leads").withIndex("by_createdAt").order("desc").take(200);

    const sorted = rows.sort((a, b) => b.createdAt - a.createdAt);
    const term = args.query?.trim().toLowerCase();
    const filtered = term
      ? sorted.filter((lead) =>
          [lead.name, lead.email, lead.phone, lead.city, lead.street ?? "", lead.notes ?? ""]
            .join(" ")
            .toLowerCase()
            .includes(term),
        )
      : sorted;

    return filtered.slice(0, 200);
  },
});

/** Pipeline KPIs for the dashboard header. */
export const stats = query({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    assertOwner(args.code);

    const all = await ctx.db.query("leads").withIndex("by_createdAt").order("desc").take(500);
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    const byStatus: Record<string, number> = { new: 0, contacted: 0, quoted: 0, won: 0, lost: 0 };
    let scoreSum = 0;

    for (const lead of all) {
      byStatus[lead.status] = (byStatus[lead.status] ?? 0) + 1;
      scoreSum += lead.score;
    }

    return {
      total: all.length,
      lastSevenDays: all.filter((lead) => lead.createdAt >= weekAgo).length,
      hot: all.filter((lead) => lead.score >= 75).length,
      unworked: byStatus.new,
      averageScore: all.length ? Math.round(scoreSum / all.length) : 0,
      byStatus,
    };
  },
});

/** Moves a lead through the pipeline. */
export const updateStatus = mutation({
  args: { code: v.string(), leadId: v.id("leads"), status: leadStatus },
  returns: v.null(),
  handler: async (ctx, args) => {
    assertOwner(args.code);
    await ctx.db.patch(args.leadId, { status: args.status, updatedAt: Date.now() });
    return null;
  },
});

/** Adds an internal note to a lead. */
export const addNote = mutation({
  args: { code: v.string(), leadId: v.id("leads"), body: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    assertOwner(args.code);
    const body = args.body.trim();
    if (body.length < 2) throw new Error("Note is too short.");
    await ctx.db.insert("leadNotes", { leadId: args.leadId, body, createdAt: Date.now() });
    return null;
  },
});

/** Notes attached to a single lead. */
export const notes = query({
  args: { code: v.string(), leadId: v.id("leads") },
  handler: async (ctx, args) => {
    assertOwner(args.code);
    return ctx.db
      .query("leadNotes")
      .withIndex("by_lead", (q) => q.eq("leadId", args.leadId))
      .collect();
  },
});

/** Permanently removes a lead (spam cleanup). */
export const remove = mutation({
  args: { code: v.string(), leadId: v.id("leads") },
  returns: v.null(),
  handler: async (ctx, args) => {
    assertOwner(args.code);
    const attached = await ctx.db
      .query("leadNotes")
      .withIndex("by_lead", (q) => q.eq("leadId", args.leadId))
      .collect();
    for (const note of attached) await ctx.db.delete(note._id);
    await ctx.db.delete(args.leadId);
    return null;
  },
});
