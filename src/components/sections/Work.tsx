import * as React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Camera, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { projects, type Project, type ServiceId } from "@/content/site";
import { cn } from "@/lib/utils";

type Filter = "all" | ServiceId;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "siding", label: "Siding" },
  { id: "gutters", label: "Gutters" },
  { id: "decks", label: "Decks" },
];

/** Lightweight illustrated thumbnail used until a real job photo is supplied. */
function ProjectThumb({ project }: { project: Project }) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const patternId = `pt-${uid}`;
  const skyId = `ps-${uid}`;

  const texture = project.texture;
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" role="img" aria-label={`${project.title} in ${project.town}`}>
      <defs>
        <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(214 40% 12%)" />
          <stop offset="100%" stopColor="hsl(220 30% 6%)" />
        </linearGradient>
        <pattern id={patternId} width={texture === "lap" ? 12 : 18} height={texture === "lap" ? 11 : 9} patternUnits="userSpaceOnUse">
          <rect width={texture === "lap" ? 12 : 18} height={texture === "lap" ? 11 : 9} fill={project.color} />
          {texture === "lap" ? (
            <>
              <rect width="12" height="1.6" fill="#FFFFFF" opacity="0.12" />
              <rect y="9" width="12" height="2" fill="#000000" opacity="0.26" />
            </>
          ) : (
            <>
              <rect width="3.4" height="9" fill="#000000" opacity="0.24" />
              <rect x="3.4" width="1.2" height="9" fill="#FFFFFF" opacity="0.14" />
            </>
          )}
        </pattern>
      </defs>

      <rect width="400" height="260" fill={`url(#${skyId})`} />
      <circle cx="322" cy="52" r="30" fill="hsl(var(--flare)/0.16)" />
      <circle cx="322" cy="52" r="12" fill="hsl(var(--flare-soft)/0.4)" />

      {/* ridge */}
      <path d="M0 168 L58 138 L112 158 L182 120 L250 152 L318 126 L400 156 L400 260 L0 260 Z" fill="hsl(216 28% 10%)" />
      <path
        d="M0 168 L58 138 L112 158 L182 120 L250 152 L318 126 L400 156"
        fill="none"
        stroke="hsl(var(--neon)/0.16)"
        strokeWidth="1"
      />

      {/* house */}
      <polygon points="52,108 148,60 244,108" fill={`url(#${patternId})`} />
      <rect x="52" y="108" width="192" height="104" fill={`url(#${patternId})`} />
      <rect x="244" y="146" width="112" height="66" fill={`url(#${patternId})`} />

      <path d="M40 114 L148 68 L256 114" fill="none" stroke="#232B34" strokeWidth="13" strokeLinejoin="miter" />
      <path d="M232 152 L368 138" fill="none" stroke="#232B34" strokeWidth="10" strokeLinecap="round" />
      <path d="M40 106 L148 60 L256 106" fill="none" stroke="hsl(var(--neon)/0.55)" strokeWidth="1.2" />

      {/* windows + door */}
      <rect x="76" y="130" width="46" height="30" rx="1.5" fill="#26313D" stroke={project.trim} strokeWidth="2.5" />
      <rect x="140" y="130" width="46" height="30" rx="1.5" fill="#26313D" stroke={project.trim} strokeWidth="2.5" />
      <rect x="82" y="136" width="14" height="18" fill="hsl(var(--flare)/0.22)" />
      <rect x="196" y="160" width="34" height="52" rx="1.5" fill="#1D2630" stroke={project.trim} strokeWidth="2.5" />
      <rect x="254" y="158" width="92" height="54" rx="1.5" fill="#2A343F" stroke={project.trim} strokeWidth="2.5" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M254 ${174 + i * 13} H346`} stroke="#000000" strokeWidth="1.6" opacity="0.3" />
      ))}

      <rect y="212" width="400" height="48" fill="#0C1016" />
      <rect y="212" width="400" height="1.2" fill="hsl(var(--neon)/0.24)" />
      <ellipse cx="86" cy="210" rx="26" ry="10" fill="#16211C" />
      <ellipse cx="340" cy="212" rx="22" ry="9" fill="#16211C" />
    </svg>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group glass neon-edge relative flex flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-neon-lg">
      <span className="neon-trace" aria-hidden="true" />

      <div className="relative aspect-[400/260] overflow-hidden border-b border-white/[0.08]">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} — ${project.town}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]">
            <ProjectThumb project={project} />
          </div>
        )}

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <Badge variant={project.service === "siding" ? "glacier" : project.service === "gutters" ? "flare" : "copper"}>
            {project.service}
          </Badge>
          {project.featured ? <Badge variant="neon">Featured</Badge> : null}
        </div>

        {project.image ? null : (
          <span
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-[hsl(220_30%_4%/0.7)] px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground backdrop-blur"
            title="Placeholder illustration — drop a real job photo into src/content/site.ts"
          >
            <Camera className="size-3" /> Photo slot
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          <MapPin className="size-3 text-neon-soft" />
          {project.town}
          <span className="text-white/15">/</span>
          {project.year}
        </div>

        <h3 className="mt-3 font-display text-[1.08rem] font-semibold leading-snug">{project.title}</h3>
        <p className="mt-2 text-[12.5px] leading-relaxed text-neon-dim">{project.scope}</p>
        <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">{project.detail}</p>
      </div>
    </article>
  );
}

export function Work() {
  const [filter, setFilter] = React.useState<Filter>("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.service === filter);

  return (
    <section id="work" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Recent work"
          title={
            <>
              Jobs we can drive you past<span className="text-neon-dim">.</span>
            </>
          }
          lead="Every project below ran in Laramie County within the last two seasons. Ask us for the street — most of our customers are happy to show off the work."
        />

        <Reveal delay={0.06} className="mt-10">
          {/*
           * Same clip as the review carousel: `overflow-x-auto` forces `overflow-y: auto`,
           * so this box clips at its padding edge on every side and would slice the ring +
           * halo off the active chip. Padding gives the glow room; the negative margins
           * cancel it so the first chip stays flush with the container edge.
           */}
          <div
            className="no-scrollbar -mx-2 -my-3 flex gap-2 overflow-x-auto px-2 py-3"
            role="tablist"
            aria-label="Filter projects"
          >
            {filters.map((f) => {
              const active = f.id === filter;
              const count = f.id === "all" ? projects.length : projects.filter((p) => p.service === f.id).length;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[13.5px] font-medium transition-all duration-300",
                    active
                      ? "border-neon/70 bg-neon text-[hsl(220_30%_5%)] shadow-neon"
                      : "border-white/12 bg-white/[0.03] text-muted-foreground hover:border-white/25 hover:text-foreground",
                  )}
                >
                  {f.label}
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 font-mono text-[9.5px]",
                      active ? "bg-[hsl(220_30%_5%/0.15)]" : "bg-white/[0.06]",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.08} className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-white/[0.09] bg-white/[0.02] p-6">
            <p className="max-w-lg text-[0.94rem] leading-relaxed text-muted-foreground">
              Want the full portfolio with addresses and material specs? Ask on your walk-through and we will send the
              complete job list for your neighbourhood.
            </p>
            <Button asChild variant="outline" className="shrink-0">
              <Link to="/quote">
                Request the project list <ArrowRight />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
