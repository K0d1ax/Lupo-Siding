import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Lupo Siding data model.
 *
 * `leads` is the quote-request pipeline produced by the multi-step wizard on
 * /quote. Everything else the marketing site renders is static content, so it
 * lives in src/content rather than the database.
 */
export default defineSchema({
  leads: defineTable({
    /* ---- contact ---- */
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    preferredContact: v.union(v.literal("phone"), v.literal("text"), v.literal("email")),

    /* ---- location ---- */
    street: v.optional(v.string()),
    city: v.string(),
    zip: v.optional(v.string()),

    /* ---- scope of work ---- */
    services: v.array(v.union(v.literal("siding"), v.literal("gutters"), v.literal("decks"))),
    propertyType: v.union(v.literal("single-family"), v.literal("multi-family"), v.literal("commercial")),
    stories: v.union(v.literal("1"), v.literal("2"), v.literal("3+")),
    homeAge: v.union(v.literal("0-10"), v.literal("11-30"), v.literal("31-60"), v.literal("60+"), v.literal("unsure")),

    /* ---- service detail (all optional, depends on selection) ---- */
    sidingMaterial: v.optional(v.string()),
    sidingReason: v.optional(v.string()),
    gutterLinearFeet: v.optional(v.string()),
    gutterIssues: v.optional(v.array(v.string())),
    deckSize: v.optional(v.string()),
    deckMaterial: v.optional(v.string()),
    deckPurpose: v.optional(v.string()),

    /* ---- budget & timing ---- */
    timeline: v.union(v.literal("asap"), v.literal("30-days"), v.literal("60-90-days"), v.literal("researching")),
    budget: v.optional(v.string()),
    insuranceClaim: v.boolean(),
    notes: v.optional(v.string()),

    /* ---- pipeline ---- */
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("quoted"),
      v.literal("won"),
      v.literal("lost"),
    ),
    /** Rough lead score used to sort the owner portal. */
    score: v.number(),
    source: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_createdAt", ["createdAt"])
    .index("by_status", ["status"])
    .index("by_score", ["score"]),

  /** Simple owner-side notes attached to a lead. */
  leadNotes: defineTable({
    leadId: v.id("leads"),
    body: v.string(),
    createdAt: v.number(),
  }).index("by_lead", ["leadId", "createdAt"]),
});
