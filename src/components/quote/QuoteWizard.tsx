import * as React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  Hammer,
  Layers,
  Loader2,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
  Waves,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NeonPanel } from "@/components/ui/card";
import { Field, Input, Label, Textarea } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Choice, ChoiceGroup, MultiChoiceCard } from "@/components/ui/choice";
import { business, serviceAreas, stats } from "@/content/site";
import {
  budgetOptions,
  clearDraft,
  contactOptions,
  deckMaterialOptions,
  deckPurposeOptions,
  deckSizeOptions,
  emptyDraft,
  firstInvalidStep,
  gutterFeetOptions,
  gutterIssueOptions,
  homeAgeOptions,
  loadDraft,
  propertyOptions,
  saveDraft,
  serviceOptions,
  sidingMaterialOptions,
  sidingReasonOptions,
  stepMeta,
  storyOptions,
  timelineOptions,
  validateAll,
  validateStep,
  type FieldErrors,
  type QuotePayload,
  type ServiceKey,
  type WizardStepId,
} from "@/lib/quote";
import { cn, telHref } from "@/lib/utils";

const serviceIcons: Record<ServiceKey, React.ReactNode> = {
  siding: <Layers className="size-5" />,
  gutters: <Waves className="size-5" />,
  decks: <Hammer className="size-5" />,
};

const townNames: string[] = serviceAreas.map((a) => a.town);
const OTHER_TOWN = "__other__";

function toPayload(draft: QuotePayload): QuotePayload {
  const optional = (value: string | undefined) => {
    const trimmed = value?.trim();
    return trimmed ? trimmed : undefined;
  };
  return {
    ...draft,
    name: draft.name.trim(),
    email: draft.email.trim().toLowerCase(),
    phone: draft.phone.trim(),
    city: draft.city.trim() || "Cheyenne",
    street: optional(draft.street),
    zip: optional(draft.zip),
    notes: optional(draft.notes),
    budget: optional(draft.budget),
    gutterLinearFeet: optional(draft.gutterLinearFeet),
    deckMaterial: optional(draft.deckMaterial),
    deckPurpose: optional(draft.deckPurpose),
    sidingMaterial: optional(draft.sidingMaterial),
    sidingReason: optional(draft.sidingReason),
    deckSize: optional(draft.deckSize),
    gutterIssues: draft.gutterIssues?.length ? draft.gutterIssues : undefined,
    source: "website-quote-wizard",
  };
}

export function QuoteWizard({ onSubmit }: { onSubmit: (payload: QuotePayload) => Promise<void> }) {
  const [stepIndex, setStepIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const [draft, setDraft] = React.useState<QuotePayload>(() => ({ ...emptyDraft, ...(loadDraft() ?? {}) }));
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState(false);
  const [customTown, setCustomTown] = React.useState(false);

  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const step = stepMeta[stepIndex];
  const isLast = stepIndex === stepMeta.length - 1;

  React.useEffect(() => {
    saveDraft(draft);
  }, [draft]);

  React.useEffect(() => {
    headingRef.current?.focus();
  }, [stepIndex]);

  React.useEffect(() => {
    if (!townNames.includes(draft.city)) setCustomTown(true);
  }, [draft.city]);

  function patch<K extends keyof QuotePayload>(key: K, value: QuotePayload[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  }

  function toggleService(value: ServiceKey, checked: boolean) {
    setDraft((prev) => ({
      ...prev,
      services: checked ? [...prev.services, value] : prev.services.filter((s) => s !== value),
    }));
    setErrors((prev) => ({ ...prev, services: undefined }));
  }

  function toggleGutterIssue(issue: string, checked: boolean) {
    setDraft((prev) => {
      const current = prev.gutterIssues ?? [];
      return { ...prev, gutterIssues: checked ? [...current, issue] : current.filter((i) => i !== issue) };
    });
  }

  function goNext() {
    const stepErrors = validateStep(step.id, draft);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setDirection(1);
    setStepIndex((i) => Math.min(i + 1, stepMeta.length - 1));
  }

  function goBack() {
    setErrors({});
    setDirection(-1);
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function jumpTo(id: WizardStepId) {
    const target = stepMeta.findIndex((s) => s.id === id);
    if (target < 0 || target > stepIndex) return;
    setDirection(target < stepIndex ? -1 : 1);
    setStepIndex(target);
  }

  async function handleSubmit() {
    const allErrors = validateAll(draft);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      const bad = firstInvalidStep(draft);
      if (bad) {
        setDirection(-1);
        setStepIndex(stepMeta.findIndex((s) => s.id === bad));
      }
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      await onSubmit(toPayload(draft));
      clearDraft();
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong sending that. Please call us and we will take it down over the phone.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  /* ------------------------------- success ------------------------------- */
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <NeonPanel strong className="p-7 sm:p-10">
          <span className="grid size-14 place-items-center rounded-2xl border border-neon/50 bg-neon/[0.1] text-neon shadow-[0_0_34px_-8px_hsl(var(--neon)/0.9)]">
            <CheckCircle2 className="size-7" />
          </span>

          <h1 className="mt-6 font-display text-[clamp(1.7rem,3.6vw,2.4rem)] font-bold leading-tight">
            Got it, {draft.name.split(" ")[0] || "neighbour"}. <span className="gradient-flare">We are on it.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-muted-foreground">
            Your request is logged with our Cheyenne office. A real person — usually the same person who will run your
            walk-through — reaches out within one business day to lock in a time.
          </p>

          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { n: "1", t: "We call you", d: "Within one business day, using the contact method you picked." },
              { n: "2", t: "Free walk-through", d: "45–60 minutes on site, measuring every elevation." },
              { n: "3", t: "Written price", d: "Line-item, fixed, back to you within 48 hours." },
            ].map((item) => (
              <li key={item.n} className="rounded-2xl border border-white/[0.09] bg-white/[0.02] p-4">
                <span className="font-mono text-[11px] tracking-[0.24em] text-neon-dim">{item.n}</span>
                <p className="mt-2 font-display text-[0.98rem] font-semibold">{item.t}</p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">{item.d}</p>
              </li>
            ))}
          </ol>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={telHref(business.phone)}>
                <Phone /> Call now instead — {business.phone}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/">Back to the site</Link>
            </Button>
          </div>

          <p className="mt-7 flex items-start gap-2.5 text-[12.5px] leading-relaxed text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-neon-soft" />
            We do not sell or share your details, and you will get one follow-up. If the timing is wrong, just say so
            and we will close the file.
          </p>
        </NeonPanel>
      </motion.div>
    );
  }

  /* -------------------------------- wizard -------------------------------- */
  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
      <div>
        {/* progress */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
              Step {stepIndex + 1} of {stepMeta.length} · {step.short}
            </p>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-neon-dim">
              {Math.round(((stepIndex + 1) / stepMeta.length) * 100)}% complete
            </p>
          </div>

          <Progress value={((stepIndex + 1) / stepMeta.length) * 100} />

          <ol className="hidden flex-wrap items-center gap-x-1.5 gap-y-2 sm:flex">
            {stepMeta.map((meta, i) => {
              const done = i < stepIndex;
              const current = i === stepIndex;
              return (
                <li key={meta.id}>
                  <button
                    type="button"
                    onClick={() => jumpTo(meta.id)}
                    disabled={i > stepIndex}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11.5px] transition-all duration-300",
                      current
                        ? "border-neon/70 bg-neon/[0.1] text-neon-soft"
                        : done
                          ? "border-white/15 bg-white/[0.04] text-muted-foreground hover:border-neon/40 hover:text-foreground"
                          : "border-white/[0.07] bg-white/[0.015] text-muted-foreground/50",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-4 place-items-center rounded-full text-[9px]",
                        done ? "bg-neon text-[hsl(220_30%_5%)]" : current ? "bg-neon/25" : "bg-white/[0.08]",
                      )}
                    >
                      {done ? <Check className="size-2.5" strokeWidth={4} /> : i + 1}
                    </span>
                    {meta.short}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* step body */}
        <NeonPanel className="mt-6 p-6 sm:p-8">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 26 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -26 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1
                ref={headingRef}
                tabIndex={-1}
                className="font-display text-[clamp(1.35rem,2.7vw,1.85rem)] font-semibold leading-tight focus:outline-none"
              >
                {step.label}
              </h1>

              <div className="mt-6">
                {/* ---------------------------- 1. services ---------------------------- */}
                {step.id === "services" ? (
                  <div className="flex flex-col gap-5">
                    <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                      Tick everything you want priced. Bundling trades into one visit is where most homeowners save the
                      most — we are already on site with the ladder up.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-3" role="group" aria-label="Services">
                      {serviceOptions.map((option) => (
                        <MultiChoiceCard
                          key={option.value}
                          checked={draft.services.includes(option.value)}
                          onCheckedChange={(checked) => toggleService(option.value, checked)}
                          title={option.title}
                          description={option.description}
                          meta={option.meta}
                          icon={serviceIcons[option.value]}
                        />
                      ))}
                    </div>
                    {errors.services ? (
                      <p className="text-[13px] font-medium text-destructive-foreground/90" role="alert">
                        {errors.services}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                {/* ---------------------------- 2. property ---------------------------- */}
                {step.id === "property" ? (
                  <div className="flex flex-col gap-7">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Street address" htmlFor="street" hint="Optional — helps us pull county records.">
                        <Input
                          id="street"
                          autoComplete="street-address"
                          placeholder="4218 Ridge Rd"
                          value={draft.street ?? ""}
                          onChange={(e) => patch("street", e.target.value)}
                        />
                      </Field>

                      <Field label="ZIP code" htmlFor="zip" error={errors.zip}>
                        <Input
                          id="zip"
                          inputMode="numeric"
                          autoComplete="postal-code"
                          placeholder="82001"
                          maxLength={5}
                          value={draft.zip ?? ""}
                          onChange={(e) => patch("zip", e.target.value.replace(/\D/g, ""))}
                        />
                      </Field>
                    </div>

                    <Field label="City or town" error={errors.city}>
                      <Select
                        value={customTown ? OTHER_TOWN : draft.city}
                        onValueChange={(value) => {
                          if (value === OTHER_TOWN) {
                            setCustomTown(true);
                            patch("city", "");
                          } else {
                            setCustomTown(false);
                            patch("city", value);
                          }
                        }}
                      >
                        <SelectTrigger aria-label="City or town">
                          <SelectValue placeholder="Choose your town" />
                        </SelectTrigger>
                        <SelectContent>
                          {townNames.map((town) => (
                            <SelectItem key={town} value={town}>
                              {town}
                            </SelectItem>
                          ))}
                          <SelectItem value={OTHER_TOWN}>Somewhere else…</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>

                    {customTown ? (
                      <Field label="Tell us where" htmlFor="city-custom">
                        <Input
                          id="city-custom"
                          placeholder="Grover, CO"
                          value={draft.city}
                          onChange={(e) => patch("city", e.target.value)}
                        />
                      </Field>
                    ) : null}

                    <div>
                      <Label>Property type</Label>
                      <ChoiceGroup
                        value={draft.propertyType}
                        onValueChange={(v) => patch("propertyType", v as QuotePayload["propertyType"])}
                        columns={3}
                        className="mt-3"
                        aria-label="Property type"
                      >
                        {propertyOptions.map((option) => (
                          <Choice
                            key={option.value}
                            value={option.value}
                            title={option.title}
                            description={option.description}
                            icon={<Building2 className="size-5" />}
                          />
                        ))}
                      </ChoiceGroup>
                    </div>

                    <div>
                      <Label>How many stories?</Label>
                      <ChoiceGroup
                        value={draft.stories}
                        onValueChange={(v) => patch("stories", v as QuotePayload["stories"])}
                        columns={3}
                        className="mt-3"
                        aria-label="Number of stories"
                      >
                        {storyOptions.map((option) => (
                          <Choice key={option.value} value={option.value} title={option.title} />
                        ))}
                      </ChoiceGroup>
                    </div>

                    <div>
                      <Label>How old is the home?</Label>
                      <ChoiceGroup
                        value={draft.homeAge}
                        onValueChange={(v) => patch("homeAge", v as QuotePayload["homeAge"])}
                        columns={2}
                        className="mt-3"
                        aria-label="Age of home"
                      >
                        {homeAgeOptions.map((option) => (
                          <Choice
                            key={option.value}
                            value={option.value}
                            title={option.title}
                            description={option.description}
                          />
                        ))}
                      </ChoiceGroup>
                    </div>
                  </div>
                ) : null}

                {/* ---------------------------- 3. project ---------------------------- */}
                {step.id === "project" ? (
                  <div className="flex flex-col gap-8">
                    {draft.services.includes("siding") ? (
                      <div className="flex flex-col gap-6">
                        <h2 className="flex items-center gap-2.5 font-display text-[1.05rem] font-semibold">
                          <Layers className="size-4 text-glacier-soft" /> Siding
                        </h2>

                        <div>
                          <Label>Material you are considering</Label>
                          <ChoiceGroup
                            value={draft.sidingMaterial ?? ""}
                            onValueChange={(v) => patch("sidingMaterial", v)}
                            columns={2}
                            className="mt-3"
                            aria-label="Siding material"
                          >
                            {sidingMaterialOptions.map((option) => (
                              <Choice
                                key={option.value}
                                value={option.value}
                                title={option.title}
                                description={option.description}
                              />
                            ))}
                          </ChoiceGroup>
                          {errors.sidingMaterial ? (
                            <p className="mt-2 text-[13px] font-medium text-destructive-foreground/90" role="alert">
                              {errors.sidingMaterial}
                            </p>
                          ) : null}
                        </div>

                        <div>
                          <Label>Why now?</Label>
                          <ChoiceGroup
                            value={draft.sidingReason ?? ""}
                            onValueChange={(v) => patch("sidingReason", v)}
                            columns={2}
                            className="mt-3"
                            aria-label="Reason for siding project"
                          >
                            {sidingReasonOptions.map((option) => (
                              <Choice
                                key={option.value}
                                value={option.value}
                                title={option.title}
                                description={option.description}
                              />
                            ))}
                          </ChoiceGroup>
                        </div>
                      </div>
                    ) : null}

                    {draft.services.includes("gutters") ? (
                      <div className="flex flex-col gap-6">
                        <h2 className="flex items-center gap-2.5 font-display text-[1.05rem] font-semibold">
                          <Waves className="size-4 text-flare-soft" /> Gutters
                        </h2>

                        <div>
                          <Label>Roughly how much gutter does the house have?</Label>
                          <ChoiceGroup
                            value={draft.gutterLinearFeet ?? ""}
                            onValueChange={(v) => patch("gutterLinearFeet", v)}
                            columns={3}
                            className="mt-3"
                            aria-label="Gutter linear footage"
                          >
                            {gutterFeetOptions.map((option) => (
                              <Choice key={option.value} value={option.value} title={option.title} />
                            ))}
                          </ChoiceGroup>
                        </div>

                        <div>
                          <Label>What is going wrong? (all that apply)</Label>
                          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                            {gutterIssueOptions.map((issue) => (
                              <MultiChoiceCard
                                key={issue}
                                checked={(draft.gutterIssues ?? []).includes(issue)}
                                onCheckedChange={(checked) => toggleGutterIssue(issue, checked)}
                                title={issue}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {draft.services.includes("decks") ? (
                      <div className="flex flex-col gap-6">
                        <h2 className="flex items-center gap-2.5 font-display text-[1.05rem] font-semibold">
                          <Hammer className="size-4 text-copper-soft" /> Decks
                        </h2>

                        <div>
                          <Label>Approximate deck size</Label>
                          <ChoiceGroup
                            value={draft.deckSize ?? ""}
                            onValueChange={(v) => patch("deckSize", v)}
                            columns={2}
                            className="mt-3"
                            aria-label="Deck size"
                          >
                            {deckSizeOptions.map((option) => (
                              <Choice
                                key={option.value}
                                value={option.value}
                                title={option.title}
                                description={option.description}
                              />
                            ))}
                          </ChoiceGroup>
                          {errors.deckSize ? (
                            <p className="mt-2 text-[13px] font-medium text-destructive-foreground/90" role="alert">
                              {errors.deckSize}
                            </p>
                          ) : null}
                        </div>

                        <div>
                          <Label>Decking material interest</Label>
                          <ChoiceGroup
                            value={draft.deckMaterial ?? ""}
                            onValueChange={(v) => patch("deckMaterial", v)}
                            columns={2}
                            className="mt-3"
                            aria-label="Deck material"
                          >
                            {deckMaterialOptions.map((option) => (
                              <Choice
                                key={option.value}
                                value={option.value}
                                title={option.title}
                                description={option.description}
                              />
                            ))}
                          </ChoiceGroup>
                        </div>

                        <div>
                          <Label>What is the goal?</Label>
                          <ChoiceGroup
                            value={draft.deckPurpose ?? ""}
                            onValueChange={(v) => patch("deckPurpose", v)}
                            columns={2}
                            className="mt-3"
                            aria-label="Deck purpose"
                          >
                            {deckPurposeOptions.map((option) => (
                              <Choice
                                key={option.value}
                                value={option.value}
                                title={option.title}
                                description={option.description}
                              />
                            ))}
                          </ChoiceGroup>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {/* ---------------------------- 4. timing ---------------------------- */}
                {step.id === "timing" ? (
                  <div className="flex flex-col gap-7">
                    <div>
                      <Label>How soon do you need us?</Label>
                      <ChoiceGroup
                        value={draft.timeline}
                        onValueChange={(v) => patch("timeline", v as QuotePayload["timeline"])}
                        columns={2}
                        className="mt-3"
                        aria-label="Timeline"
                      >
                        {timelineOptions.map((option) => (
                          <Choice
                            key={option.value}
                            value={option.value}
                            title={option.title}
                            description={option.description}
                            meta={option.meta}
                            icon={<Clock className="size-5" />}
                          />
                        ))}
                      </ChoiceGroup>
                      {errors.timeline ? (
                        <p className="mt-2 text-[13px] font-medium text-destructive-foreground/90" role="alert">
                          {errors.timeline}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <Label>Budget range you have in mind</Label>
                      <ChoiceGroup
                        value={draft.budget ?? ""}
                        onValueChange={(v) => patch("budget", v)}
                        columns={3}
                        className="mt-3"
                        aria-label="Budget range"
                      >
                        {budgetOptions.map((option) => (
                          <Choice key={option.value} value={option.value} title={option.title} />
                        ))}
                      </ChoiceGroup>
                      <p className="mt-2.5 text-[12.5px] text-muted-foreground/80">
                        Honest answer, not a trap. It tells us which materials to bring samples of instead of wasting your
                        evening.
                      </p>
                    </div>

                    <div className="flex items-start justify-between gap-5 rounded-2xl border border-white/[0.09] bg-white/[0.02] p-4">
                      <div>
                        <Label htmlFor="insurance" className="normal-case tracking-normal">
                          <span className="font-display text-[0.98rem] font-semibold text-foreground">
                            This may be an insurance claim
                          </span>
                        </Label>
                        <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">
                          We document hail and wind damage with photos and spec sheets, and meet your adjuster on site at
                          no charge.
                        </p>
                      </div>
                      <Switch
                        id="insurance"
                        checked={draft.insuranceClaim}
                        onCheckedChange={(v) => patch("insuranceClaim", v)}
                      />
                    </div>

                    <Field
                      label="Anything else we should know?"
                      htmlFor="notes"
                      hint="Rot you have spotted, a picky HOA, gate codes, dogs in the yard — all useful."
                    >
                      <Textarea
                        id="notes"
                        placeholder="Water stains on the ceiling below the front window after the last storm…"
                        value={draft.notes ?? ""}
                        onChange={(e) => patch("notes", e.target.value)}
                      />
                    </Field>
                  </div>
                ) : null}

                {/* ---------------------------- 5. contact ---------------------------- */}
                {step.id === "contact" ? (
                  <div className="flex flex-col gap-7">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Full name" htmlFor="name" error={errors.name}>
                        <Input
                          id="name"
                          autoComplete="name"
                          placeholder="Marcus Duran"
                          value={draft.name}
                          onChange={(e) => patch("name", e.target.value)}
                        />
                      </Field>

                      <Field label="Phone" htmlFor="phone" error={errors.phone}>
                        <Input
                          id="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="(307) 555-0142"
                          value={draft.phone}
                          onChange={(e) => patch("phone", e.target.value)}
                        />
                      </Field>
                    </div>

                    <Field label="Email" htmlFor="email" error={errors.email}>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={draft.email}
                        onChange={(e) => patch("email", e.target.value)}
                      />
                    </Field>

                    <div>
                      <Label>Best way to reach you</Label>
                      <ChoiceGroup
                        value={draft.preferredContact}
                        onValueChange={(v) => patch("preferredContact", v as QuotePayload["preferredContact"])}
                        columns={3}
                        className="mt-3"
                        aria-label="Preferred contact method"
                      >
                        {contactOptions.map((option) => (
                          <Choice
                            key={option.value}
                            value={option.value}
                            title={option.title}
                            description={option.description}
                            icon={<Phone className="size-5" />}
                          />
                        ))}
                      </ChoiceGroup>
                    </div>
                  </div>
                ) : null}

                {/* ---------------------------- 6. review ---------------------------- */}
                {step.id === "review" ? (
                  <div className="flex flex-col gap-6">
                    <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                      One last look. Use the edit buttons to jump back to any step — nothing sends until you press the
                      button below.
                    </p>

                    {[
                      {
                        id: "services" as WizardStepId,
                        title: "Services",
                        rows: [
                          {
                            k: "Requested",
                            v: draft.services.map((s) => serviceOptions.find((o) => o.value === s)?.title ?? s).join(", "),
                          },
                        ],
                      },
                      {
                        id: "property" as WizardStepId,
                        title: "Property",
                        rows: [
                          {
                            k: "Address",
                            v: [draft.street, draft.city, draft.zip].filter(Boolean).join(", ") || draft.city,
                          },
                          {
                            k: "Type",
                            v: propertyOptions.find((o) => o.value === draft.propertyType)?.title ?? draft.propertyType,
                          },
                          { k: "Stories", v: storyOptions.find((o) => o.value === draft.stories)?.title ?? draft.stories },
                          { k: "Age", v: homeAgeOptions.find((o) => o.value === draft.homeAge)?.title ?? draft.homeAge },
                        ],
                      },
                      {
                        id: "project" as WizardStepId,
                        title: "Project details",
                        rows: [
                          draft.sidingMaterial
                            ? {
                                k: "Siding material",
                                v:
                                  sidingMaterialOptions.find((o) => o.value === draft.sidingMaterial)?.title ??
                                  draft.sidingMaterial,
                              }
                            : null,
                          draft.sidingReason
                            ? {
                                k: "Reason",
                                v:
                                  sidingReasonOptions.find((o) => o.value === draft.sidingReason)?.title ??
                                  draft.sidingReason,
                              }
                            : null,
                          draft.gutterLinearFeet
                            ? {
                                k: "Gutter length",
                                v:
                                  gutterFeetOptions.find((o) => o.value === draft.gutterLinearFeet)?.title ??
                                  draft.gutterLinearFeet,
                              }
                            : null,
                          draft.gutterIssues?.length ? { k: "Gutter issues", v: draft.gutterIssues.join(", ") } : null,
                          draft.deckSize
                            ? {
                                k: "Deck size",
                                v: deckSizeOptions.find((o) => o.value === draft.deckSize)?.title ?? draft.deckSize,
                              }
                            : null,
                          draft.deckMaterial
                            ? {
                                k: "Decking",
                                v:
                                  deckMaterialOptions.find((o) => o.value === draft.deckMaterial)?.title ??
                                  draft.deckMaterial,
                              }
                            : null,
                        ].filter((row): row is { k: string; v: string } => row !== null),
                      },
                      {
                        id: "timing" as WizardStepId,
                        title: "Timing & budget",
                        rows: [
                          {
                            k: "Timeline",
                            v: timelineOptions.find((o) => o.value === draft.timeline)?.title ?? draft.timeline,
                          },
                          draft.budget
                            ? { k: "Budget", v: budgetOptions.find((o) => o.value === draft.budget)?.title ?? draft.budget }
                            : { k: "Budget", v: "Not specified" },
                          { k: "Insurance claim", v: draft.insuranceClaim ? "Likely yes" : "No" },
                          draft.notes ? { k: "Notes", v: draft.notes } : null,
                        ].filter((row): row is { k: string; v: string } => row !== null),
                      },
                      {
                        id: "contact" as WizardStepId,
                        title: "Contact",
                        rows: [
                          { k: "Name", v: draft.name || "—" },
                          { k: "Phone", v: draft.phone || "—" },
                          { k: "Email", v: draft.email || "—" },
                          {
                            k: "Preferred",
                            v: contactOptions.find((o) => o.value === draft.preferredContact)?.title ?? draft.preferredContact,
                          },
                        ],
                      },
                    ].map((group) => (
                      <div key={group.title} className="rounded-2xl border border-white/[0.09] bg-white/[0.02] p-5">
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="font-display text-[1rem] font-semibold">{group.title}</h3>
                          <button
                            type="button"
                            onClick={() => jumpTo(group.id)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-neon/45 hover:text-neon-soft"
                          >
                            <Pencil className="size-3" /> Edit
                          </button>
                        </div>
                        <dl className="mt-4 space-y-2.5">
                          {group.rows.map((row) => (
                            <div key={row.k} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                                {row.k}
                              </dt>
                              <dd className="max-w-xl text-right text-[13.5px] text-foreground/90">{row.v}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    ))}

                    {submitError ? (
                      <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-[13.5px]" role="alert">
                        {submitError}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* nav */}
          <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
            <Button type="button" variant="ghost" onClick={goBack} disabled={stepIndex === 0}>
              <ArrowLeft /> Back
            </Button>

            {isLast ? (
              <Button type="button" size="lg" onClick={handleSubmit} disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send my request <Sparkles />
                  </>
                )}
              </Button>
            ) : (
              <Button type="button" size="lg" onClick={goNext}>
                Continue <ArrowRight />
              </Button>
            )}
          </div>
        </NeonPanel>
      </div>

      {/* summary rail */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <NeonPanel className="p-6">
          <Badge variant="neon">
            <Sparkles className="size-3" /> Your request
          </Badge>

          <dl className="mt-5 space-y-3.5">
            {[
              {
                k: "Services",
                v: draft.services.length
                  ? draft.services.map((s) => serviceOptions.find((o) => o.value === s)?.title ?? s).join(" · ")
                  : "Not chosen yet",
              },
              { k: "Location", v: draft.city || "Cheyenne, WY" },
              { k: "Property", v: propertyOptions.find((o) => o.value === draft.propertyType)?.title ?? "—" },
              {
                k: "Timeline",
                v: timelineOptions.find((o) => o.value === draft.timeline)?.title ?? "—",
              },
            ].map((row) => (
              <div key={row.k} className="flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-3">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{row.k}</dt>
                <dd className="text-right text-[13px] font-medium text-foreground/90">{row.v}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-6 space-y-3">
            {[
              { icon: <MapPin className="size-3.5" />, label: "Free on-site measurement" },
              { icon: <Wallet className="size-3.5" />, label: "Fixed written price in 48 hrs" },
              { icon: <ShieldCheck className="size-3.5" />, label: `${stats.warrantyYears}-year workmanship guarantee` },
              { icon: <User className="size-3.5" />, label: "One follow-up. No call centre." },
            ].map((item) => (
              <li key={item.label} className="flex items-center gap-2.5 text-[12.5px] text-muted-foreground">
                <span className="text-neon-soft">{item.icon}</span>
                {item.label}
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl border border-flare/25 bg-flare/[0.06] p-4">
            <p className="text-[12.5px] leading-relaxed text-muted-foreground">
              Storm damage right now? Skip the form —{" "}
              <a href={telHref(business.phone)} className="font-medium text-flare-soft underline-offset-2 hover:underline">
                call {business.phone}
              </a>
              . We answer hail and wind calls seven days a week.
            </p>
          </div>
        </NeonPanel>
      </aside>
    </div>
  );
}
