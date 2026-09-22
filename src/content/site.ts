/**
 * LUPO SIDING — content layer
 * ---------------------------------------------------------------------------
 * Every string the site renders lives here so the owner can update copy,
 * pricing bands, service areas and colours without touching a component.
 *
 * ⚠️  REVIEW BEFORE LAUNCH: values marked `placeholder` are realistic but
 *     invented. Replace with the real business details (see README).
 */

export const business = {
  name: "Lupo Siding",
  legalName: "Lupo Siding LLC",
  tagline: "Built for the Wyoming wind.",
  /** placeholder */ phone: "(307) 555-0142",
  /** placeholder */ email: "hello@luposiding.com",
  city: "Cheyenne",
  state: "WY",
  /** placeholder */ street: "1200 E Lincolnway",
  zip: "82001",
  /** placeholder */ license: "WY Contractor Lic. #LC-00000",
  founded: 2009,
  hours: [
    { days: "Monday – Friday", time: "7:00 AM – 6:00 PM" },
    { days: "Saturday", time: "8:00 AM – 2:00 PM" },
    { days: "Sunday", time: "Closed — storm emergencies answered" },
  ],
  emergencyNote: "Storm damage? We answer hail and wind calls 7 days a week.",
} as const;

export const stats = {
  yearsInBusiness: new Date().getFullYear() - business.founded,
  /** placeholder */ projectsCompleted: 1400,
  /** placeholder */ rating: 4.9,
  /** placeholder */ reviewCount: 217,
  /** placeholder */ warrantyYears: 30,
} as const;

/* -------------------------------------------------------------------------- */
/*  SERVICES                                                                   */
/* -------------------------------------------------------------------------- */

export type ServiceId = "siding" | "gutters" | "decks";

export type Service = {
  id: ServiceId;
  name: string;
  kicker: string;
  headline: string;
  blurb: string;
  bullets: string[];
  priceFrom: string;
  timeline: string;
  accent: "flare" | "glacier" | "copper";
  icon: "siding" | "gutter" | "deck";
};

export const services: Service[] = [
  {
    id: "siding",
    name: "Siding",
    kicker: "01 / Envelope",
    headline: "A wall that shrugs off 70 mph gusts",
    blurb:
      "At 6,086 feet, Cheyenne siding takes more abuse than almost anywhere in the country — UV that chalks cheap vinyl, freeze-thaw that pries open seams, and hail that arrives sideways. We install cladding engineered for it and fasten it to a wind-load standard written for this ZIP code, not a national average.",
    bullets: [
      "Fiber cement, engineered wood, insulated vinyl & steel",
      "Board & batten, lap, shake and vertical panel profiles",
      "WRB + house-wrap replacement and flashing correction",
      "Window & door wrap, soffit, fascia and custom trim",
      "Wind-load fastening per elevation and exposure category",
      "Hail-rated panels with Class 4 impact options",
    ],
    priceFrom: "$9.50 / sq ft installed",
    timeline: "3–8 days typical",
    accent: "glacier",
    icon: "siding",
  },
  {
    id: "gutters",
    name: "Gutters",
    kicker: "02 / Water",
    headline: "Move 60 inches of snowmelt away from the foundation",
    blurb:
      "Cheyenne gets 60 inches of snow and almost all of it melts in a hurry. Undersized gutters dump that water at your footing, where expansive clay soil does expensive things to a basement wall. We roll seamless K-style and half-round on site at the exact length your roof needs.",
    bullets: [
      '5" and 6" seamless aluminum, rolled on your driveway',
      "Half-round, box and commercial profiles",
      "Micro-mesh and stainless leaf protection",
      "Oversized downspouts with buried drainage runs",
      "Heat cable, snow guards and ice-dam detailing",
      "Hidden hangers screwed to fascia — never nailed",
    ],
    priceFrom: "$8.40 / linear ft installed",
    timeline: "1–2 days typical",
    accent: "flare",
    icon: "gutter",
  },
  {
    id: "decks",
    name: "Decks",
    kicker: "03 / Living",
    headline: "A deck that survives a hundred-degree swing",
    blurb:
      "Record 100°F summers and −38°F winters move structural lumber an alarming amount. We build on engineered footings set below the frost line, space every fastener for expansion, and finish with composites that hold their colour under 2,980 hours of high-altitude sun each year.",
    bullets: [
      "Composite, capped PVC, cedar and pressure-treated builds",
      "Footings engineered below the local frost depth",
      "Aluminum, steel cable and composite railing systems",
      "Pergolas, privacy walls, benches and built-in lighting",
      "Stairs, landings and grade-level transitions",
      "Structural retrofit and re-decking over sound frames",
    ],
    priceFrom: "$34 / sq ft installed",
    timeline: "5–12 days typical",
    accent: "copper",
    icon: "deck",
  },
];

/* -------------------------------------------------------------------------- */
/*  SIDING MATERIALS — powers the interactive Materials Studio                 */
/* -------------------------------------------------------------------------- */

export type Material = {
  id: string;
  name: string;
  short: string;
  family: "Fiber Cement" | "Engineered Wood" | "Vinyl" | "Metal" | "Composite";
  blurb: string;
  wind: string;
  hail: string;
  warranty: string;
  lifespan: string;
  cost: string;
  upkeep: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  /** Illustrative panel colour shown in the house preview. */
  swatch: string;
};

export const materials: Material[] = [
  {
    id: "fiber-cement",
    name: "Fiber Cement",
    short: "Hardie®-class plank",
    family: "Fiber Cement",
    blurb:
      "Cement, sand and cellulose pressed into a board that ignores UV, rot and insects. The default choice for exposed Cheyenne elevations and the material we install most.",
    wind: "Up to 150 mph tested",
    hail: "Class 3–4 panels available",
    warranty: "30 yr non-prorated",
    lifespan: "40–50 yrs",
    cost: "$$$",
    upkeep: "Repaint every 12–15 yrs",
    bestFor: "Windward walls, hail alleys, forever homes",
    pros: ["Will not warp, rot or feed insects", "Dimensionally stable in freeze-thaw", "Premium architectural depth"],
    cons: ["Heaviest to install", "Needs repainting on a schedule", "Higher material cost"],
    swatch: "#8C97A3",
  },
  {
    id: "engineered-wood",
    name: "Engineered Wood",
    short: "LP® SmartSide®-class",
    family: "Engineered Wood",
    blurb:
      "Wood strands bonded with resin and a zinc borate treatment — the warmth of real wood with none of the rot, and it takes a fastener in a high-wind event better than vinyl.",
    wind: "Up to 200 mph tested",
    hail: "Impact-resistant surface",
    warranty: "30 yr prorated",
    lifespan: "30–40 yrs",
    cost: "$$",
    upkeep: "Repaint every 10–12 yrs",
    bestFor: "Board & batten, sheds, garages, value builds",
    pros: ["Outstanding wind uplift ratings", "Takes paint beautifully", "Warm, natural texture"],
    cons: ["Requires diligent caulking at joints", "Less hail-tolerant than fiber cement"],
    swatch: "#A87C55",
  },
  {
    id: "insulated-vinyl",
    name: "Insulated Vinyl",
    short: "Foam-backed panel",
    family: "Vinyl",
    blurb:
      "Contoured foam bonded behind the panel. The extra R-value matters here — it lifts the wall's thermal break at the exact point where Cheyenne's wind strips heat away.",
    wind: "Up to 130 mph tested",
    hail: "Impact-modified grades",
    warranty: "Lifetime limited",
    lifespan: "25–35 yrs",
    cost: "$$",
    upkeep: "Wash occasionally",
    bestFor: "Budget-conscious R-value gains, rentals",
    pros: ["Lowest maintenance of any option", "Adds R-2 to R-5 per wall", "Great colour-fastness"],
    cons: ["Can crack in extreme cold if struck", "Thinner visual profile"],
    swatch: "#C9CFD6",
  },
  {
    id: "vinyl",
    name: "Premium Vinyl",
    short: ".044+ grade",
    family: "Vinyl",
    blurb:
      "Thicker-gauge, dark-colour-capable vinyl. Cheaper than it was a decade ago and genuinely fine on sheltered elevations — we will tell you honestly where it is and is not worth it.",
    wind: "110–130 mph tested",
    hail: "Standard",
    warranty: "Lifetime limited",
    lifespan: "20–30 yrs",
    cost: "$",
    upkeep: "Wash occasionally",
    bestFor: "Sheltered walls, tight budgets, quick turnarounds",
    pros: ["Lowest installed cost", "Never needs painting", "Fast to install"],
    cons: ["Expands and contracts noticeably", "Chalks and fades under high UV", "Cracks in deep cold on impact"],
    swatch: "#E4E7EA",
  },
  {
    id: "steel",
    name: "Steel & Metal",
    short: "24–26 ga standing seam",
    family: "Metal",
    blurb:
      "Steel siding and accent panels for barns, shops and modern accents. Hail simply bounces. The most bulletproof surface available and it sheds snow on its own.",
    wind: "Up to 140 mph",
    hail: "Class 4",
    warranty: "40 yr finish",
    lifespan: "50+ yrs",
    cost: "$$$",
    upkeep: "Essentially none",
    bestFor: "Shops, barns, accent walls, ag buildings",
    pros: ["Effectively indestructible", "Sheds snow and hail", "Modern architectural look"],
    cons: ["Dents from large impacts", "Louder in heavy weather", "Higher cost per square"],
    swatch: "#6E7681",
  },
  {
    id: "composite",
    name: "Composite Cladding",
    short: "Capped polymer",
    family: "Composite",
    blurb:
      "Capped composite boards with realistic wood grain, immune to moisture and insects, engineered for exactly this climate band. Best-in-class colour retention.",
    wind: "Up to 125 mph",
    hail: "Impact-resistant",
    warranty: "25 yr",
    lifespan: "30–40 yrs",
    cost: "$$$",
    upkeep: "Rinse as needed",
    bestFor: "Design-forward builds, timber-look accents",
    pros: ["Deep, convincing wood grain", "No painting, ever", "Excellent colour stability"],
    cons: ["Premium price", "Fewer local installers"],
    swatch: "#7A5C43",
  },
];

/* -------------------------------------------------------------------------- */
/*  COLOURS — feeds the live house preview                                     */
/* -------------------------------------------------------------------------- */

export type Swatch = { name: string; hex: string; trim: string };

export const sidingColors: Swatch[] = [
  { name: "Arctic White", hex: "#EFF1F2", trim: "#23272E" },
  { name: "Frosted Pewter", hex: "#C8CDD2", trim: "#2B3038" },
  { name: "Iron Gray", hex: "#6C747E", trim: "#F2F4F6" },
  { name: "Slate", hex: "#4A525C", trim: "#EDEFF2" },
  { name: "Midnight Blue", hex: "#2C3A4F", trim: "#EFF2F5" },
  { name: "Deep Ocean", hex: "#1F3A46", trim: "#E9EFF2" },
  { name: "Mountain Sage", hex: "#8A9A85", trim: "#F1F4F0" },
  { name: "Canyon Clay", hex: "#A9705A", trim: "#F5EFE9" },
  { name: "Timber Bark", hex: "#6B5641", trim: "#F0EAE2" },
  { name: "Navajo Beige", hex: "#D9CBB2", trim: "#2E2A24" },
  { name: "Cobble Stone", hex: "#9A9086", trim: "#F4F1EC" },
  { name: "Black Onyx", hex: "#26292E", trim: "#E9EBEE" },
];

/* -------------------------------------------------------------------------- */
/*  CHEYENNE CLIMATE — the local-expertise differentiator                      */
/* -------------------------------------------------------------------------- */

export const climate = {
  eyebrow: "Why Cheyenne is not Denver",
  heading: "Your siding fails differently at 6,086 feet",
  intro:
    "Most siding companies quote you a national price list and install it the same way they would in Missouri. Here is what actually happens to a wall in Laramie County — and why we detail every job around it.",
  facts: [
    {
      value: "6,086",
      unit: "ft",
      label: "Elevation",
      detail: "Thin air passes roughly 20% more UV than at sea level. It chalks vinyl and fades cheap paint years early.",
      icon: "mountain",
    },
    {
      value: "60",
      unit: "in",
      label: "Average snowfall",
      detail: "Averages as high as 121.5 inches in a season. Snow load, ice damming and snowmelt volume drive gutter sizing.",
      icon: "snow",
    },
    {
      value: "2,980",
      unit: "hrs",
      label: "Sunshine per year",
      detail: "About 67% of all possible daylight. Relentless UV is the single biggest killer of budget siding here.",
      icon: "sun",
    },
    {
      value: "106",
      unit: "days",
      label: "Frost-free season",
      detail: "Freezing temperatures run roughly September 29 to May 14. Boards and caulk joints cycle hundreds of times.",
      icon: "thermometer",
    },
    {
      value: "−38°",
      unit: "F",
      label: "Record low",
      detail: "Against a 100°F record high. That 138-degree swing makes vinyl brittle and moves structural lumber.",
      icon: "wind",
    },
    {
      value: "Sept 29",
      unit: "",
      label: "First hard frost",
      detail: "Caulk, paint and adhesive need the warm window. We schedule exterior sealing around it, not into it.",
      icon: "calendar",
    },
  ],
  closing:
    "An F3 tornado — the deadliest in Wyoming history — hit Cheyenne on July 16, 1979. Ninety-nine years of weather records say the same thing: this is a wind and hail market, and it is not a place to guess.",
} as const;

/* -------------------------------------------------------------------------- */
/*  PROCESS                                                                    */
/* -------------------------------------------------------------------------- */

export const processSteps = [
  {
    step: "01",
    name: "Free walk-through",
    duration: "45–60 min on site",
    body: "We measure every elevation, photograph existing damage, check flashing and sheathing, and record the exposure direction of each wall. No pressure, no same-day-only pricing games.",
  },
  {
    step: "02",
    name: "Written scope & fixed price",
    duration: "Within 48 hrs",
    body: "A line-item proposal: material, profile, colour, wind-load fastening schedule, removal and disposal, trim details, and a price that does not move unless the scope changes.",
  },
  {
    step: "03",
    name: "Material & colour selection",
    duration: "1 visit or over email",
    body: "Full-size samples in daylight on your actual wall, so Iron Gray on a west-facing elevation looks like Iron Gray and not a chip on a phone screen.",
  },
  {
    step: "04",
    name: "Installation",
    duration: "3–12 days typical",
    body: "Our own crew, not a rotating subcontractor roster. Daily site cleanup, magnetic nail sweep, and photo updates sent to you every evening.",
  },
  {
    step: "05",
    name: "Final walk & warranty",
    duration: "Day of completion",
    body: "We walk it together, fix anything you flag on the spot, hand over material specs, and register your manufacturer warranty plus our written workmanship guarantee.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  GUARANTEES / TRUST                                                         */
/* -------------------------------------------------------------------------- */

export const guarantees = [
  {
    title: "Written workmanship guarantee",
    term: `${stats.warrantyYears}-year`,
    body: "If a panel lifts, a seam opens or a gutter pulls away because of how we installed it, we return and make it right. In writing, on the invoice, transferable if you sell.",
    icon: "shield",
  },
  {
    title: "Fixed-price proposals",
    term: "No change orders",
    body: "The number on the proposal is the number on the invoice. Surprises from hidden rot or bad flashing get photographed and approved by you before anyone touches them.",
    icon: "receipt",
  },
  {
    title: "Licensed, bonded, insured",
    term: "Fully covered",
    body: "Wyoming contractor licence, general liability, and workers' comp on every crew member. Certificates sent to you before the first panel comes off.",
    icon: "badge",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  TESTIMONIALS  (⚠️ placeholder — replace with real reviews)                  */
/* -------------------------------------------------------------------------- */

export const testimonials = [
  {
    quote:
      "We lost a whole gable of vinyl in a May windstorm. Lupo had it wrapped in fiber cement in four days and it has not moved since. They even caught a flashing mistake the original builder made.",
    name: "Marcus D.",
    location: "Ranchettes, Cheyenne",
    service: "Siding",
    rating: 5,
  },
  {
    quote:
      "Our basement took on water every spring for nine years. New 6-inch seamless gutters and buried downspouts, and this April it was the first dry one. I wish I had called them a decade ago.",
    name: "Kayla R.",
    location: "Sun Valley, Cheyenne",
    service: "Gutters",
    rating: 5,
  },
  {
    quote:
      "Composite deck, cable railing, built-in lighting. They set the footings properly below frost and it has not heaved once through two winters. The finish work is genuinely furniture-grade.",
    name: "Tom & Sherry B.",
    location: "Pine Bluffs",
    service: "Decks",
    rating: 5,
  },
  {
    quote:
      "Three bids. Lupo was not the cheapest, but they were the only ones who talked about wind-load fastening and showed me the manufacturer spec sheets. That told me everything.",
    name: "Dana W.",
    location: "South Greeley",
    service: "Siding",
    rating: 5,
  },
  {
    quote:
      "Hail came through and insurance wanted to patch it. Lupo documented the whole elevation with photos, wrote up what the adjuster missed, and we got the full replacement approved.",
    name: "Reuben A.",
    location: "Cheyenne, 82009",
    service: "Insurance claim",
    rating: 5,
  },
  {
    quote:
      "Sixteen panels of siding, new soffit and fascia, and a deck repair I asked about on day one. Cleanest construction site I have ever had at my house. Nails swept up every night.",
    name: "Carol M.",
    location: "Fox Farm, Cheyenne",
    service: "Siding + Decks",
    rating: 5,
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  SERVICE AREA                                                               */
/* -------------------------------------------------------------------------- */

export const serviceAreas = [
  { town: "Cheyenne", note: "Home base — 82001–82010", core: true },
  { town: "Ranchettes", note: "Windward ridge builds", core: true },
  { town: "Fox Farm", note: "Hail alley", core: true },
  { town: "South Greeley", note: "", core: true },
  { town: "Pine Bluffs", note: "Eastern Laramie County", core: true },
  { town: "Burns", note: "", core: true },
  { town: "Carpenter", note: "", core: true },
  { town: "Albin", note: "", core: true },
  { town: "Egbert", note: "", core: true },
  { town: "Hillsdale", note: "", core: true },
  { town: "Laramie", note: "Albany County", core: false },
  { town: "Torrington", note: "Goshen County", core: false },
  { town: "Wheatland", note: "Platte County", core: false },
  { town: "Wellington, CO", note: "Northern Colorado", core: false },
  { town: "Fort Collins, CO", note: "Northern Colorado", core: false },
] as const;

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export const faqs = [
  {
    q: "How much does new siding cost in Cheyenne?",
    a: "Most single-family homes in Laramie County land between $14,000 and $34,000 installed, depending on square footage, how much trim and soffit is involved, and the material you choose. Fiber cement averages roughly $9.50–$14 per square foot installed; insulated vinyl runs less. Your written proposal breaks it down line by line so you can see exactly where the money goes.",
  },
  {
    q: "What siding actually holds up to Cheyenne wind and hail?",
    a: "Fiber cement and engineered wood, in that order, followed by steel for outbuildings. They hold fasteners in tension far better than vinyl and they do not go brittle in a −20°F cold snap. The material matters less than the fastening schedule and the water-resistive barrier behind it, which is why we spec both per elevation.",
  },
  {
    q: "Will my homeowners insurance cover wind or hail damage to siding?",
    a: "Usually yes, and often more than the first adjuster writes. We document every damaged elevation and elevation exposure, produce the manufacturer spec sheets and impact ratings, and meet your adjuster on site at no charge. We have gotten full replacements approved that started as patch quotes.",
  },
  {
    q: "How long does a siding project take?",
    a: "Three to eight working days for a typical single-family home, plus a day for the final walk. Decks run five to twelve days. Seamless gutters are usually one to two days. Weather in Cheyenne moves fast, so we build a weather day into every schedule rather than pretending it will not happen.",
  },
  {
    q: "Do you remove the old siding?",
    a: "In most cases yes — full tear-off down to the sheathing lets us inspect and repair rot, replace the water-resistive barrier properly, and correct flashing. Where a sound existing substrate can accept an overlay, we will tell you and price both so you can choose.",
  },
  {
    q: "What are seamless gutters and why does size matter here?",
    a: "Seamless gutters are formed from a single coil of aluminum on your driveway, so there are no joints to leak. Size matters because Cheyenne averages 60 inches of snow that melts quickly. A 6-inch K-style with oversized downspouts moves roughly 40% more water than a 5-inch, which keeps snowmelt away from your footing and your basement wall.",
  },
  {
    q: "Do I need gutter guards in Wyoming?",
    a: "They help with the cottonwood and pine debris that clogs open gutters, but they are not a substitute for pitch and sizing. We recommend micro-mesh on most homes here, and heat cable plus snow guards on north-facing runs where ice dams build.",
  },
  {
    q: "Can you build a deck that survives the freeze-thaw cycle?",
    a: "Yes, and the footings are the whole ballgame. We set piers below the local frost depth on engineered footings, use standoff hardware so no wood touches soil or concrete, and space fasteners for thermal movement. Do those three things and a deck here easily outlives its warranty.",
  },
  {
    q: "Do you offer financing?",
    a: "We work with third-party home-improvement lenders on approved credit, with terms from 12 to 144 months. Ask on your walk-through and we will include payment options alongside the proposal so you can compare against a cash price.",
  },
  {
    q: "Are you licensed and insured in Wyoming?",
    a: "Yes. We carry a Wyoming contractor licence, general liability coverage and workers' compensation for every crew member. We send certificates of insurance before work begins — you should never have to ask twice for those.",
  },
  {
    q: "How far do you travel from Cheyenne?",
    a: "Laramie County daily, including Pine Bluffs, Burns, Carpenter, Albin and the Ranchettes. We also work regularly in Laramie, Torrington, Wheatland, and across the state line in Wellington and Fort Collins.",
  },
  {
    q: "What should I have ready for a quote?",
    a: "Nothing formal. The address, roughly when the house was built, and an idea of what is bothering you is plenty for the walk-through. If you have photos of damage, insurance paperwork, or a previous quote, bring it — it shortens the conversation.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  BRANDS WE INSTALL  (⚠️ confirm before launch)                              */
/* -------------------------------------------------------------------------- */

export const brands = [
  "James Hardie®",
  "LP® SmartSide®",
  "Mastic®",
  "Ply Gem®",
  "CertainTeed®",
  "Trex®",
  "TimberTech®",
  "Owens Corning®",
  "Amerimax®",
  "LeafFilter®",
  "Simpson Strong-Tie®",
  "Tyvek®",
] as const;

/* -------------------------------------------------------------------------- */
/*  PROJECTS  (⚠️ placeholder — swap in real jobs + photos)                     */
/* -------------------------------------------------------------------------- */

export type Project = {
  title: string;
  town: string;
  service: ServiceId;
  year: number;
  scope: string;
  detail: string;
  /** Hex used by the illustrated thumbnail when no photo is supplied. */
  color: string;
  trim: string;
  texture: "lap" | "vertical" | "shake" | "metal";
  /** Drop a real photo path here and the illustration is replaced automatically. */
  image?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Full re-clad after hail",
    town: "Fox Farm, Cheyenne",
    service: "siding",
    year: 2026,
    scope: "Fiber cement · full tear-off · corrected flashing",
    detail:
      "Hail-bruised vinyl on three elevations, with the original builder's wrap lapped the wrong way at every penetration. Full tear-off, new WRB, new flashing, Class 3 panels.",
    color: "#4A525C",
    trim: "#EDEFF2",
    texture: "lap",
    featured: true,
  },
  {
    title: "Windward gable rebuild",
    town: "Ranchettes",
    service: "siding",
    year: 2025,
    scope: "Fiber cement · engineered fastening schedule",
    detail:
      "A west-facing gable lost panels twice in three years. We mapped exposure per wall and doubled the fastening schedule on the windward face.",
    color: "#2C3A4F",
    trim: "#EFF2F5",
    texture: "vertical",
    featured: true,
  },
  {
    title: "Board & batten barn",
    town: "Burns",
    service: "siding",
    year: 2025,
    scope: "Engineered wood · steel wainscot · soffit",
    detail:
      "Engineered wood board & batten above a steel wainscot band, so the lower wall shrugs off every rock the mower throws.",
    color: "#6B5641",
    trim: "#F0EAE2",
    texture: "vertical",
  },
  {
    title: "Six-inch seamless retrofit",
    town: "Sun Valley, Cheyenne",
    service: "gutters",
    year: 2026,
    scope: "1,180 linear ft · buried drainage · leaf guard",
    detail:
      "Nine years of spring seepage traced to undersized 5-inch gutters. Replaced with 6-inch seamless, oversized downspouts and buried runs to daylight.",
    color: "#6E7681",
    trim: "#F2F4F6",
    texture: "metal",
    featured: true,
  },
  {
    title: "Ice-dam correction",
    town: "Pine Bluffs",
    service: "gutters",
    year: 2025,
    scope: "Heat cable · snow guards · north-run re-pitch",
    detail:
      "Re-pitched a north-facing run, added heat cable and snow guards, and stopped a recurring ice dam that had been rotting the fascia for years.",
    color: "#1F3A46",
    trim: "#E9EFF2",
    texture: "metal",
  },
  {
    title: "Commercial soffit & fascia",
    town: "Dell Range Blvd, Cheyenne",
    service: "gutters",
    year: 2024,
    scope: "Box gutter · commercial downspouts · steel fascia",
    detail:
      "Box gutters and commercial downspouts across a 14,000 sq ft retail fascia, worked around tenant hours.",
    color: "#9A9086",
    trim: "#F4F1EC",
    texture: "metal",
  },
  {
    title: "Composite + cable railing",
    town: "Pine Bluffs",
    service: "decks",
    year: 2025,
    scope: "520 sq ft · frost-depth footings · built-in lighting",
    detail:
      "Capped composite over engineered footings set below frost depth, with steel cable railing and low-voltage lighting in the fascia band.",
    color: "#8A6A4B",
    trim: "#F0E8DC",
    texture: "shake",
    featured: true,
  },
  {
    title: "Cedar privacy deck",
    town: "South Greeley",
    service: "decks",
    year: 2024,
    scope: "380 sq ft · pergola · privacy wall",
    detail:
      "Cedar deck with a slatted pergola and a privacy wall, detailed so the boards can move through a 138-degree annual swing without cupping.",
    color: "#A87C55",
    trim: "#F5EFE9",
    texture: "vertical",
  },
  {
    title: "Re-deck over sound frame",
    town: "Cheyenne, 82009",
    service: "decks",
    year: 2026,
    scope: "Grade-level landing · composite boards · stair rebuild",
    detail:
      "The frame was sound, the boards were not. We salvaged the structure, replaced hardware, and re-decked with composite plus a rebuilt stair.",
    color: "#5F6B78",
    trim: "#EDEFF2",
    texture: "shake",
  },
];

/* -------------------------------------------------------------------------- */
/*  REVIEW SUMMARY                                                             */
/* -------------------------------------------------------------------------- */

export const reviewSummary = {
  average: stats.rating,
  total: stats.reviewCount,
  /** placeholder — mirror your real Google review distribution */
  distribution: [
    { stars: 5, count: 194 },
    { stars: 4, count: 17 },
    { stars: 3, count: 4 },
    { stars: 2, count: 1 },
    { stars: 1, count: 1 },
  ],
  highlights: ["On time", "Clean site", "Clear pricing", "Great communication", "Quality workmanship"],
} as const;

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Materials", href: "#materials" },
  { label: "Why Cheyenne", href: "#climate" },
  { label: "Our Work", href: "#work" },
  { label: "Reviews", href: "#reviews" },
  { label: "Service Area", href: "#area" },
  { label: "FAQ", href: "#faq" },
] as const;
