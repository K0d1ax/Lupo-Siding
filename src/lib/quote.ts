/**
 * Quote wizard data layer — types, option sets, validation and draft storage.
 * The payload shape mirrors the Convex `leads.submit` mutation exactly.
 */

export type ServiceKey = "siding" | "gutters" | "decks";
export type PropertyType = "single-family" | "multi-family" | "commercial";
export type Stories = "1" | "2" | "3+";
export type HomeAge = "0-10" | "11-30" | "31-60" | "60+" | "unsure";
export type Timeline = "asap" | "30-days" | "60-90-days" | "researching";
export type PreferredContact = "phone" | "text" | "email";

export type QuotePayload = {
  name: string;
  email: string;
  phone: string;
  preferredContact: PreferredContact;
  street?: string;
  city: string;
  zip?: string;
  services: ServiceKey[];
  propertyType: PropertyType;
  stories: Stories;
  homeAge: HomeAge;
  sidingMaterial?: string;
  sidingReason?: string;
  gutterLinearFeet?: string;
  gutterIssues?: string[];
  deckSize?: string;
  deckMaterial?: string;
  deckPurpose?: string;
  timeline: Timeline;
  budget?: string;
  insuranceClaim: boolean;
  notes?: string;
  source?: string;
};

export const emptyDraft: QuotePayload = {
  name: "",
  email: "",
  phone: "",
  preferredContact: "phone",
  street: "",
  city: "Cheyenne",
  zip: "",
  services: [],
  propertyType: "single-family",
  stories: "1",
  homeAge: "unsure",
  insuranceClaim: false,
  timeline: "30-days",
};

/* ------------------------------- option sets ------------------------------ */

export const serviceOptions: { value: ServiceKey; title: string; description: string; meta: string }[] = [
  {
    value: "siding",
    title: "Siding",
    description: "Full re-clad, partial elevation, storm repair, soffit, fascia and trim.",
    meta: "3–8 days",
  },
  {
    value: "gutters",
    title: "Seamless gutters",
    description: "5\" or 6\" K-style, leaf protection, buried downspouts, heat cable.",
    meta: "1–2 days",
  },
  {
    value: "decks",
    title: "Decks",
    description: "Composite, cedar or PVC with railing, stairs, pergolas and lighting.",
    meta: "5–12 days",
  },
];

export const propertyOptions: { value: PropertyType; title: string; description: string }[] = [
  { value: "single-family", title: "Single-family home", description: "One dwelling on the lot." },
  { value: "multi-family", title: "Multi-family", description: "Duplex, townhome or apartment building." },
  { value: "commercial", title: "Commercial", description: "Retail, office, shop or agricultural building." },
];

export const storyOptions: { value: Stories; title: string }[] = [
  { value: "1", title: "One story" },
  { value: "2", title: "Two stories" },
  { value: "3+", title: "Three or more" },
];

export const homeAgeOptions: { value: HomeAge; title: string; description: string }[] = [
  { value: "0-10", title: "0–10 years", description: "Builder-grade original materials." },
  { value: "11-30", title: "11–30 years", description: "Likely original cladding, near end of life." },
  { value: "31-60", title: "31–60 years", description: "Expect to find sheathing and flashing issues." },
  { value: "60+", title: "60+ years", description: "Historic detailing — we will match the profile." },
  { value: "unsure", title: "Not sure", description: "We will date it on the walk-through." },
];

export const sidingMaterialOptions = [
  { value: "not-sure", title: "Not sure yet", description: "Help me choose — the studio above is a good start." },
  { value: "fiber-cement", title: "Fiber cement", description: "Best wind and hail performance. Our default for exposed walls." },
  { value: "engineered-wood", title: "Engineered wood", description: "Wood warmth without the rot. Excellent uplift ratings." },
  { value: "insulated-vinyl", title: "Insulated vinyl", description: "Lowest maintenance with an added thermal break." },
  { value: "vinyl", title: "Premium vinyl", description: "Lowest cost. Fine on sheltered elevations." },
  { value: "steel", title: "Steel or metal", description: "For shops, barns and modern accent walls." },
  { value: "composite", title: "Composite cladding", description: "Capped polymer with deep wood grain." },
];

export const sidingReasonOptions = [
  { value: "storm", title: "Storm or hail damage", description: "Insurance documentation included at no charge." },
  { value: "failing", title: "Old, chalked or warped", description: "Panels lifting, cracking or fading under UV." },
  { value: "remodel", title: "Full exterior remodel", description: "Siding plus windows, doors or trim in one scope." },
  { value: "curb-appeal", title: "Curb appeal or resale", description: "Refresh before listing or a big family event." },
  { value: "rot", title: "Rot or moisture behind the wall", description: "Soft spots, staining or musty interior smells." },
];

export const gutterFeetOptions = [
  { value: "under-150", title: "Under 150 ft" },
  { value: "150-250", title: "150–250 ft" },
  { value: "250-400", title: "250–400 ft" },
  { value: "400-plus", title: "400 ft or more" },
  { value: "not-sure", title: "Not sure — we will measure" },
];

export const gutterIssueOptions = [
  "Leaking at the seams",
  "Overflowing in storms",
  "Pulling away from the fascia",
  "Ice dams in winter",
  "Clogged with debris",
  "Water in the basement",
  "Downspouts need burying",
  "Just replacing worn out",
];

export const deckSizeOptions = [
  { value: "under-200", title: "Under 200 sq ft", description: "Small landing or balcony." },
  { value: "200-400", title: "200–400 sq ft", description: "Typical family deck." },
  { value: "400-600", title: "400–600 sq ft", description: "Large deck with multiple zones." },
  { value: "600-plus", title: "600 sq ft or more", description: "Entertaining deck, wraparound or multi-level." },
  { value: "not-sure", title: "Not sure", description: "We will measure on site." },
];

export const deckMaterialOptions = [
  { value: "composite", title: "Composite", description: "Best colour retention under high-altitude sun." },
  { value: "pvc", title: "Capped PVC", description: "Maximum moisture resistance, premium look." },
  { value: "wood", title: "Cedar or pressure-treated", description: "Classic look, real wood cost." },
  { value: "steel-frame", title: "Steel frame", description: "Non-combustible, straightest over time." },
  { value: "not-sure", title: "Not sure yet", description: "Walk me through the trade-offs." },
];

export const deckPurposeOptions = [
  { value: "replace", title: "Replace an existing deck", description: "Tear out and rebuild, including the frame." },
  { value: "new", title: "Build new from scratch", description: "Nothing there yet." },
  { value: "add-on", title: "Add a pergola or cover", description: "Shade structure over existing decking." },
  { value: "re-deck", title: "Re-deck over a sound frame", description: "Keep the structure, replace the boards." },
];

export const timelineOptions: { value: Timeline; title: string; description: string; meta?: string }[] = [
  { value: "asap", title: "As soon as possible", description: "Storm damage, active leak or safety concern.", meta: "Priority" },
  { value: "30-days", title: "Within 30 days", description: "Ready to book once the scope is set.", meta: "Common" },
  { value: "60-90-days", title: "60–90 days out", description: "Budgeting and planning ahead." },
  { value: "researching", title: "Just researching", description: "No timeline yet — gathering numbers." },
];

export const budgetOptions = [
  { value: "under-10", title: "Under $10,000" },
  { value: "10-25", title: "$10,000 – $25,000" },
  { value: "25-50", title: "$25,000 – $50,000" },
  { value: "50-plus", title: "$50,000 or more" },
  { value: "not-sure", title: "Not sure yet" },
];

export const contactOptions: { value: PreferredContact; title: string; description: string }[] = [
  { value: "phone", title: "Phone call", description: "Weekdays 7am–6pm, Saturdays 8am–2pm." },
  { value: "text", title: "Text message", description: "Best for photos of the damage." },
  { value: "email", title: "Email", description: "Good for insurance paperwork and attachments." },
];

/* -------------------------------- validation ------------------------------ */

export type WizardStepId = "services" | "property" | "project" | "timing" | "contact" | "review";

export const stepMeta: { id: WizardStepId; label: string; short: string }[] = [
  { id: "services", label: "What do you need?", short: "Services" },
  { id: "property", label: "About the property", short: "Property" },
  { id: "project", label: "Project details", short: "Details" },
  { id: "timing", label: "Timing and budget", short: "Timing" },
  { id: "contact", label: "How should we reach you?", short: "Contact" },
  { id: "review", label: "Check and send", short: "Review" },
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export type FieldErrors = Partial<Record<keyof QuotePayload, string>>;

/** Validates only the fields visible on the given step. */
export function validateStep(step: WizardStepId, draft: QuotePayload): FieldErrors {
  const errors: FieldErrors = {};

  if (step === "services") {
    if (draft.services.length === 0) errors.services = "Pick at least one service so we send the right crew.";
  }

  if (step === "property") {
    if (!draft.city.trim()) errors.city = "We need a city or town to route your estimate.";
    if (draft.zip && !/^\d{5}$/.test(draft.zip.trim())) errors.zip = "ZIP code should be 5 digits.";
  }

  if (step === "project") {
    if (draft.services.includes("siding") && !draft.sidingMaterial) {
      errors.sidingMaterial = "Choose a material, or pick 'Not sure yet' and we will advise.";
    }
    if (draft.services.includes("decks") && !draft.deckSize) {
      errors.deckSize = "A rough size is enough to get started.";
    }
  }

  if (step === "timing") {
    if (!draft.timeline) errors.timeline = "Let us know how soon you need us.";
  }

  if (step === "contact") {
    if (draft.name.trim().length < 2) errors.name = "Please tell us your name.";
    if (!EMAIL.test(draft.email.trim())) errors.email = "That email does not look right.";
    if (draft.phone.replace(/\D/g, "").length < 10) errors.phone = "Please enter a 10-digit phone number.";
  }

  return errors;
}

/** Full-form validation used on the final review step. */
export function validateAll(draft: QuotePayload): FieldErrors {
  const steps: WizardStepId[] = ["services", "property", "project", "timing", "contact"];
  return steps.reduce<FieldErrors>((acc, step) => ({ ...acc, ...validateStep(step, draft) }), {});
}

/** Returns the earliest step that still has a blocking error, if any. */
export function firstInvalidStep(draft: QuotePayload): WizardStepId | null {
  const order: WizardStepId[] = ["services", "property", "project", "timing", "contact"];
  return order.find((step) => Object.keys(validateStep(step, draft)).length > 0) ?? null;
}

/* ---------------------------- draft persistence --------------------------- */

const DRAFT_KEY = "lupo.quote.draft.v1";
const LEADS_KEY = "lupo.leads.v1";

/** Restores an in-progress wizard so a refresh never loses typed answers. */
export function loadDraft(): Partial<QuotePayload> | null {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Partial<QuotePayload>) : null;
  } catch {
    return null;
  }
}

export function saveDraft(draft: QuotePayload) {
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    /* storage disabled — the wizard still works in memory */
  }
}

export function clearDraft() {
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Local fallback used when no Convex deployment is configured, plus the source
 * for the owner portal's demo data.
 */
export function saveLeadLocally(payload: QuotePayload, score: number) {
  try {
    const raw = window.localStorage.getItem(LEADS_KEY);
    const rows = raw ? (JSON.parse(raw) as unknown[]) : [];
    rows.unshift({ ...payload, score, status: "new", createdAt: Date.now() });
    window.localStorage.setItem(LEADS_KEY, JSON.stringify(rows.slice(0, 100)));
  } catch {
    /* ignore */
  }
}

export function readLocalLeads() {
  try {
    const raw = window.localStorage.getItem(LEADS_KEY);
    return raw ? (JSON.parse(raw) as (QuotePayload & { score: number; status: string; createdAt: number })[]) : [];
  } catch {
    return [];
  }
}
