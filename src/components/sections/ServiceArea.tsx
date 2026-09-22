import * as React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NeonPanel } from "@/components/ui/card";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/** Real coordinates, projected onto a fixed bounding box of the region. */
const pins = [
  { town: "Cheyenne", lat: 41.1403, lon: -104.8202, core: true, hq: true },
  { town: "Ranchettes", lat: 41.22, lon: -104.75, core: true },
  { town: "Fox Farm", lat: 41.1, lon: -104.9, core: true },
  { town: "South Greeley", lat: 41.09, lon: -104.8, core: true },
  { town: "Pine Bluffs", lat: 41.18, lon: -104.07, core: true },
  { town: "Burns", lat: 41.19, lon: -104.36, core: true },
  { town: "Carpenter", lat: 41.05, lon: -104.3, core: true },
  { town: "Albin", lat: 41.42, lon: -104.1, core: true },
  { town: "Egbert", lat: 41.17, lon: -104.3, core: true },
  { town: "Hillsdale", lat: 41.21, lon: -104.48, core: true },
  { town: "Laramie", lat: 41.31, lon: -105.59, core: false },
  { town: "Torrington", lat: 42.06, lon: -104.18, core: false },
  { town: "Wheatland", lat: 42.05, lon: -104.95, core: false },
  { town: "Wellington, CO", lat: 40.7, lon: -105.0, core: false },
  { town: "Fort Collins, CO", lat: 40.58, lon: -105.08, core: false },
] as const;

const LON_MIN = -105.8;
const LON_MAX = -103.95;
const LAT_MIN = 40.45;
const LAT_MAX = 42.2;

/** px per degree in each axis for a 600 x 500 viewBox */
const PX_PER_LON = 600 / (LON_MAX - LON_MIN);
const PX_PER_LAT = 500 / (LAT_MAX - LAT_MIN);

function project(lat: number, lon: number) {
  return {
    x: (lon - LON_MIN) * PX_PER_LON,
    y: (LAT_MAX - lat) * PX_PER_LAT,
  };
}

/** 1 degree of latitude is ~69 statute miles; longitude is scaled by cos(lat). */
const MILES_PER_LAT = 69;
const MILES_PER_LON = 69 * Math.cos((41.14 * Math.PI) / 180);

function radiusEllipse(miles: number) {
  return { rx: (miles / MILES_PER_LON) * PX_PER_LON, ry: (miles / MILES_PER_LAT) * PX_PER_LAT };
}

const hq = project(41.1403, -104.8202);
const wyCoLine = project(41.0, -104.9).y;
const wyNeLine = project(41.5, -104.053).x;

export function ServiceArea() {
  const [active, setActive] = React.useState<string>("Cheyenne");
  const coreCount = pins.filter((p) => p.core).length;

  return (
    <section id="area" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Service area"
          title={
            <>
              Based in Cheyenne. <span className="gradient-steel">Working the whole corner of the state.</span>
            </>
          }
          lead="Laramie County every day of the week, plus the northern Colorado corridor and the Goshen and Platte county towns we already serve. If your address is outside the outer ring, call anyway — we will tell you honestly whether we can do it well."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
          {/* map */}
          <Reveal>
            <NeonPanel strong className="overflow-hidden p-4 sm:p-5">
              <svg
                viewBox="0 0 600 500"
                className="h-auto w-full"
                role="img"
                aria-label="Map of Lupo Siding's service area across Laramie County, southeast Wyoming and northern Colorado"
              >
                <defs>
                  <radialGradient id="areaGlow" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="hsl(var(--glacier) / 0.16)" />
                    <stop offset="100%" stopColor="hsl(var(--glacier) / 0)" />
                  </radialGradient>
                </defs>

                <rect width="600" height="500" fill="hsl(220 30% 5%)" />
                <rect width="600" height="500" fill="url(#areaGlow)" />

                {/* survey grid */}
                <g opacity="0.45">
                  {[100, 200, 300, 400, 500].map((x) => (
                    <path key={`v${x}`} d={`M${x} 0 V500`} stroke="hsl(210 40% 92% / 0.045)" />
                  ))}
                  {[100, 200, 300, 400].map((y) => (
                    <path key={`h${y}`} d={`M0 ${y} H600`} stroke="hsl(210 40% 92% / 0.045)" />
                  ))}
                </g>

                {/* radius rings */}
                {[25, 60].map((miles) => {
                  const { rx, ry } = radiusEllipse(miles);
                  return (
                    <g key={miles}>
                      <ellipse
                        cx={hq.x}
                        cy={hq.y}
                        rx={rx}
                        ry={ry}
                        fill="none"
                        stroke="hsl(var(--glacier) / 0.35)"
                        strokeDasharray="6 7"
                      />
                      <text
                        x={hq.x + rx * 0.72}
                        y={hq.y - ry * 0.72}
                        fill="hsl(var(--glacier) / 0.7)"
                        fontSize="10"
                        fontFamily="JetBrains Mono, monospace"
                        letterSpacing="1"
                      >
                        {miles} MI
                      </text>
                    </g>
                  );
                })}

                {/* state lines */}
                <path d={`M0 ${wyCoLine} H600`} stroke="hsl(var(--flare) / 0.45)" strokeWidth="1.4" strokeDasharray="10 6" />
                <text
                  x="12"
                  y={wyCoLine - 9}
                  fill="hsl(var(--flare-soft) / 0.85)"
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                  letterSpacing="1.6"
                >
                  WYOMING / COLORADO
                </text>

                <path d={`M${wyNeLine} 0 V500`} stroke="hsl(var(--flare) / 0.45)" strokeWidth="1.4" strokeDasharray="10 6" />
                <text
                  x={wyNeLine - 10}
                  y="470"
                  fill="hsl(var(--flare-soft) / 0.85)"
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                  letterSpacing="1.6"
                  textAnchor="end"
                >
                  WY / NE
                </text>

                {/* links from HQ */}
                {pins
                  .filter((p) => !("hq" in p && p.hq))
                  .map((p) => {
                    const { x, y } = project(p.lat, p.lon);
                    return (
                      <line
                        key={`l-${p.town}`}
                        x1={hq.x}
                        y1={hq.y}
                        x2={x}
                        y2={y}
                        stroke="hsl(var(--neon) / 0.14)"
                        strokeWidth="1"
                      />
                    );
                  })}

                {/* pins */}
                {pins.map((p, i) => {
                  const { x, y } = project(p.lat, p.lon);
                  const isHq = "hq" in p && p.hq;
                  const isActive = active === p.town;

                  return (
                    <g key={p.town} onMouseEnter={() => setActive(p.town)} className="cursor-pointer">
                      {(isHq || isActive) && (
                        <circle
                          cx={x}
                          cy={y}
                          r="7"
                          fill="none"
                          stroke={isHq ? "hsl(var(--neon))" : "hsl(var(--glacier))"}
                          strokeWidth="1.4"
                          className="animate-pulse-ring"
                          style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${i * 0.12}s` }}
                        />
                      )}
                      <motion.circle
                        cx={x}
                        cy={y}
                        animate={{ r: isActive ? 7 : isHq ? 6 : p.core ? 4 : 3.2 }}
                        transition={{ duration: 0.25 }}
                        fill={isHq ? "hsl(var(--neon))" : p.core ? "hsl(var(--neon) / 0.75)" : "hsl(var(--glacier) / 0.7)"}
                        style={{ filter: "drop-shadow(0 0 6px hsl(var(--neon) / 0.8))" }}
                      />
                      <text
                        x={x + 11}
                        y={y + 3.5}
                        fill={isActive || isHq ? "hsl(var(--neon) / 0.95)" : "hsl(210 18% 58%)"}
                        fontSize={isActive || isHq ? "12" : "10.5"}
                        fontFamily="JetBrains Mono, monospace"
                        letterSpacing="0.6"
                      >
                        {p.town}
                      </text>
                    </g>
                  );
                })}

                {/* compass */}
                <g transform="translate(548 44)" opacity="0.8">
                  <circle r="20" fill="none" stroke="hsl(210 40% 92% / 0.16)" />
                  <path d="M0 -15 L4 0 L0 15 L-4 0 Z" fill="hsl(var(--neon) / 0.65)" />
                  <text y="-24" textAnchor="middle" fill="hsl(var(--neon) / 0.8)" fontSize="9" fontFamily="JetBrains Mono, monospace">
                    N
                  </text>
                </g>
              </svg>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.08] px-2 pt-4">
                <span className="flex items-center gap-2 text-[11.5px] text-muted-foreground">
                  <span className="size-2 rounded-full bg-neon shadow-[0_0_6px_hsl(var(--neon))]" /> Core coverage ·{" "}
                  {coreCount} communities
                </span>
                <span className="flex items-center gap-2 text-[11.5px] text-muted-foreground">
                  <span className="size-2 rounded-full bg-glacier/70" /> Extended coverage
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
                  Hover a pin to focus
                </span>
              </div>
            </NeonPanel>
          </Reveal>

          {/* town list */}
          <div className="flex flex-col gap-5">
            <Reveal delay={0.06}>
              <div className="flex items-center gap-3">
                <Badge variant="neon">
                  <Navigation className="size-3" /> {pins.length} towns served
                </Badge>
                <Badge variant="outline">No trip charges</Badge>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {pins.map((p) => {
                  const isActive = active === p.town;
                  return (
                    <li key={p.town}>
                      <button
                        type="button"
                        onMouseEnter={() => setActive(p.town)}
                        onFocus={() => setActive(p.town)}
                        onClick={() => setActive(p.town)}
                        className={cn(
                          "flex w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-3 text-left transition-all duration-300",
                          isActive
                            ? "border-neon/60 bg-neon/[0.07] shadow-[0_0_24px_-10px_hsl(var(--neon)/0.9)]"
                            : "border-white/[0.08] bg-white/[0.02] hover:border-white/20",
                        )}
                      >
                        <span className="flex items-center gap-2.5">
                          <MapPin className={cn("size-3.5", p.core ? "text-neon-soft" : "text-glacier-soft")} />
                          <span className="font-display text-[0.92rem] font-medium">{p.town}</span>
                        </span>
                        <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">
                          {p.core ? "Core" : "Extended"}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="neon-edge rounded-2xl bg-[hsl(220_28%_6%/0.7)] p-5">
                <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">Outside the rings?</span> We still take calls from the
                  eastern plains and the Colorado Front Range. Larger projects travel further — ask and we will give you a
                  straight answer.
                </p>
                <Button asChild variant="outline" className="mt-4 w-full">
                  <Link to="/quote">
                    Check my address <ArrowRight />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
