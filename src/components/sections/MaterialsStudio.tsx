import * as React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Minus, Snowflake, SwatchBook, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NeonPanel } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SectionHeading } from "@/components/site/SectionHeading";
import { HouseScene, type SidingTexture } from "@/components/site/HouseScene";
import { Reveal } from "@/components/motion/Reveal";
import { materials, sidingColors } from "@/content/site";
import { cn } from "@/lib/utils";

/** Which panel profile best represents each material family. */
const textureFor: Record<string, SidingTexture> = {
  "fiber-cement": "lap",
  "engineered-wood": "vertical",
  "insulated-vinyl": "lap",
  vinyl: "lap",
  steel: "metal",
  composite: "shake",
};

export function MaterialsStudio() {
  const [materialId, setMaterialId] = React.useState(materials[0].id);
  const [color, setColor] = React.useState(materials[0].swatch);
  const [snow, setSnow] = React.useState(true);

  const material = materials.find((m) => m.id === materialId) ?? materials[0];
  const texture = textureFor[material.id] ?? "lap";
  const activeSwatch = sidingColors.find((s) => s.hex.toLowerCase() === color.toLowerCase()) ?? sidingColors[0];

  function chooseMaterial(id: string) {
    const next = materials.find((m) => m.id === id);
    setMaterialId(id);
    if (next) setColor(next.swatch);
  }

  return (
    <section id="materials" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-neon/25 to-transparent" />
      </div>

      <div className="container">
        <SectionHeading
          eyebrow="Materials studio"
          title={
            <>
              Design your wall <span className="gradient-flare">before anyone knocks.</span>
            </>
          }
          lead="Pick a cladding and a colour. This is the same elevation drawing we build your proposal from — so you can see how a profile reads on a gable instead of guessing from a 2-inch chip."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          {/* ---------------- live elevation ---------------- */}
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <NeonPanel strong className="overflow-hidden p-0">
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${material.id}-${color}-${snow}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <HouseScene
                      color={color}
                      trim={activeSwatch.trim}
                      texture={texture}
                      snow={snow}
                      className="block"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-0">
                  <span className="glass-soft absolute left-4 top-4 rounded-full border border-neon/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-neon-soft">
                    {activeSwatch.name} · {texture}
                  </span>
                  <span className="glass-soft absolute right-4 top-4 rounded-full border border-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {material.family}
                  </span>
                </div>
              </div>

              {/* controls */}
              <div className="border-t border-white/[0.08] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    <SwatchBook className="size-3.5 text-neon-soft" /> Colour · {sidingColors.length} local favourites
                  </p>
                  <button
                    type="button"
                    onClick={() => setSnow((v) => !v)}
                    aria-pressed={snow}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-300",
                      snow
                        ? "border-neon/50 bg-neon/10 text-neon-soft"
                        : "border-white/12 bg-white/[0.03] text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Snowflake className="size-3.5" /> Snow load
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  {sidingColors.map((swatch) => {
                    const active = swatch.hex.toLowerCase() === color.toLowerCase();
                    return (
                      <Tooltip key={swatch.name}>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            onClick={() => setColor(swatch.hex)}
                            aria-label={swatch.name}
                            aria-pressed={active}
                            className={cn(
                              "size-10 rounded-xl border transition-all duration-300",
                              active
                                ? "scale-110 border-neon shadow-[0_0_0_2px_hsl(var(--neon)/0.4),0_0_22px_-4px_hsl(var(--neon)/0.9)]"
                                : "border-white/15 hover:scale-105 hover:border-white/40",
                            )}
                            style={{ background: swatch.hex }}
                          />
                        </TooltipTrigger>
                        <TooltipContent>{swatch.name}</TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            </NeonPanel>
          </Reveal>

          {/* ---------------- material picker + spec ---------------- */}
          <div className="flex flex-col gap-6">
            <Reveal delay={0.08}>
              <div className="flex flex-col gap-2.5" role="radiogroup" aria-label="Siding material">
                {materials.map((m) => {
                  const active = m.id === materialId;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => chooseMaterial(m.id)}
                      className={cn(
                        "group relative flex items-center gap-4 rounded-2xl border p-3.5 text-left transition-all duration-300",
                        active
                          ? "border-neon/70 bg-[hsl(200_60%_12%/0.5)] shadow-neon"
                          : "border-white/10 bg-white/[0.02] hover:-translate-y-0.5 hover:border-neon/35 hover:bg-white/[0.045]",
                      )}
                    >
                      <span
                        className="size-11 shrink-0 rounded-xl border border-white/15"
                        style={{ background: m.swatch }}
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                          <span className="font-display text-[1rem] font-semibold">{m.name}</span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                            {m.cost}
                          </span>
                        </span>
                        <span className="mt-0.5 block text-[12.5px] text-muted-foreground">{m.short}</span>
                      </span>
                      <span
                        className={cn(
                          "grid size-6 shrink-0 place-items-center rounded-full border transition-all duration-300",
                          active ? "border-neon bg-neon" : "border-white/20",
                        )}
                        aria-hidden="true"
                      >
                        <Check
                          className={cn("size-3.5 text-[hsl(220_30%_5%)] transition-transform", active ? "scale-100" : "scale-0")}
                          strokeWidth={3.5}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {/* spec panel */}
            <Reveal delay={0.14}>
              <NeonPanel className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold">{material.name}</h3>
                  <Badge variant="glacier">{material.family}</Badge>
                </div>

                <p className="mt-3 text-[0.93rem] leading-relaxed text-muted-foreground">{material.blurb}</p>

                <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.05] sm:grid-cols-3">
                  {[
                    { k: "Wind rating", v: material.wind },
                    { k: "Hail", v: material.hail },
                    { k: "Warranty", v: material.warranty },
                    { k: "Service life", v: material.lifespan },
                    { k: "Upkeep", v: material.upkeep },
                    { k: "Cost band", v: material.cost },
                  ].map((row) => (
                    <div key={row.k} className="bg-[hsl(220_28%_5%/0.8)] p-3.5">
                      <dt className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">
                        {row.k}
                      </dt>
                      <dd className="mt-1.5 text-[13px] font-medium leading-snug">{row.v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="eyebrow">Strengths</p>
                    <ul className="mt-3 space-y-2">
                      {material.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2 text-[13px] leading-snug">
                          <Check className="mt-0.5 size-3.5 shrink-0 text-neon-soft" strokeWidth={3} />
                          <span className="text-muted-foreground">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="eyebrow">Trade-offs</p>
                    <ul className="mt-3 space-y-2">
                      {material.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2 text-[13px] leading-snug">
                          <Minus className="mt-0.5 size-3.5 shrink-0 text-flare-soft" strokeWidth={3} />
                          <span className="text-muted-foreground">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-3 rounded-xl border border-flare/25 bg-flare/[0.06] p-4">
                  <X className="mt-0.5 size-4 shrink-0 rotate-45 text-flare-soft" />
                  <p className="text-[12.5px] leading-relaxed text-muted-foreground">
                    <span className="font-medium text-foreground">Honest limit: {material.bestFor}.</span> We will tell
                    you when a cheaper panel is genuinely the right call for your elevation — and when it is not.
                  </p>
                </div>
              </NeonPanel>
            </Reveal>

            <Reveal delay={0.2}>
              <Button asChild size="lg" className="w-full">
                <Link to="/quote">
                  Price this wall spec <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>

        {/* ---------------- comparison table ---------------- */}
        <Reveal delay={0.1} className="mt-16">
          <div className="neon-edge hud-corners overflow-hidden rounded-2xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[52rem] border-collapse text-left">
                <caption className="sr-only">Comparison of siding materials available in Cheyenne, Wyoming</caption>
                <thead>
                  <tr className="bg-white/[0.04]">
                    {["Material", "Wind tested to", "Hail", "Service life", "Upkeep", "Installed cost"].map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="border-b border-white/[0.09] px-5 py-4 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {materials.map((m) => (
                    <tr
                      key={m.id}
                      className={cn(
                        "transition-colors hover:bg-white/[0.035]",
                        m.id === materialId && "bg-neon/[0.05]",
                      )}
                    >
                      <th scope="row" className="border-b border-white/[0.06] px-5 py-4">
                        <span className="flex items-center gap-3">
                          <span className="size-4 shrink-0 rounded border border-white/20" style={{ background: m.swatch }} />
                          <span className="font-display text-[0.95rem] font-semibold">{m.name}</span>
                        </span>
                      </th>
                      <td className="border-b border-white/[0.06] px-5 py-4 text-[13px] text-muted-foreground">
                        {m.wind}
                      </td>
                      <td className="border-b border-white/[0.06] px-5 py-4 text-[13px] text-muted-foreground">
                        {m.hail}
                      </td>
                      <td className="border-b border-white/[0.06] px-5 py-4 text-[13px] text-muted-foreground">
                        {m.lifespan}
                      </td>
                      <td className="border-b border-white/[0.06] px-5 py-4 text-[13px] text-muted-foreground">
                        {m.upkeep}
                      </td>
                      <td className="border-b border-white/[0.06] px-5 py-4 font-mono text-[12.5px] text-neon-soft">
                        {m.cost}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t border-white/[0.08] bg-white/[0.02] px-5 py-3.5 text-[11.5px] text-muted-foreground/80">
              Ratings are manufacturer-published test results. Your installed performance depends on the fastening
              schedule and substrate condition we verify during your free walk-through.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
