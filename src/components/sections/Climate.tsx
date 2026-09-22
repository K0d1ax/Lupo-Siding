import * as React from "react";
import { motion } from "framer-motion";
import { CalendarClock, Mountain, Snowflake, Sun, Thermometer, Wind } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { NeonPanel } from "@/components/ui/card";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { climate } from "@/content/site";

const icons: Record<string, React.ReactNode> = {
  mountain: <Mountain className="size-5" />,
  snow: <Snowflake className="size-5" />,
  sun: <Sun className="size-5" />,
  thermometer: <Thermometer className="size-5" />,
  wind: <Wind className="size-5" />,
  calendar: <CalendarClock className="size-5" />,
};

/** Compass showing where the load actually comes from on the Cheyenne ridge. */
function WindRose() {
  const directions = [
    { angle: -90, label: "N", weight: 0.55 },
    { angle: -45, label: "NE", weight: 0.38 },
    { angle: 0, label: "E", weight: 0.32 },
    { angle: 45, label: "SE", weight: 0.36 },
    { angle: 90, label: "S", weight: 0.52 },
    { angle: 135, label: "SW", weight: 0.68 },
    { angle: 180, label: "W", weight: 0.95 },
    { angle: 225, label: "NW", weight: 0.88 },
  ];

  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" role="img" aria-label="Wind rose showing prevailing westerly and north-westerly wind loading in Cheyenne">
      <defs>
        <radialGradient id="roseCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--glacier) / 0.28)" />
          <stop offset="100%" stopColor="hsl(var(--glacier) / 0)" />
        </radialGradient>
        <linearGradient id="roseSweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(var(--neon) / 0)" />
          <stop offset="100%" stopColor="hsl(var(--neon) / 0.5)" />
        </linearGradient>
      </defs>

      <circle cx="160" cy="160" r="128" fill="url(#roseCore)" />

      {[42, 74, 106, 128].map((r) => (
        <circle key={r} cx="160" cy="160" r={r} fill="none" stroke="hsl(210 40% 92% / 0.1)" strokeDasharray="3 6" />
      ))}

      {/* direction spokes */}
      {directions.map((d) => {
        const rad = (d.angle * Math.PI) / 180;
        const x = 160 + Math.cos(rad) * 130;
        const y = 160 + Math.sin(rad) * 130;
        return <line key={d.label} x1="160" y1="160" x2={x} y2={y} stroke="hsl(210 40% 92% / 0.08)" />;
      })}

      {/* loading wedges */}
      {directions.map((d, i) => {
        const half = 22;
        const rad1 = ((d.angle - half) * Math.PI) / 180;
        const rad2 = ((d.angle + half) * Math.PI) / 180;
        const len = 24 + d.weight * 100;
        const x1 = 160 + Math.cos(rad1) * len;
        const y1 = 160 + Math.sin(rad1) * len;
        const x2 = 160 + Math.cos(rad2) * len;
        const y2 = 160 + Math.sin(rad2) * len;
        const dominant = d.weight > 0.8;
        return (
          <motion.path
            key={d.label}
            d={`M160 160 L${x1} ${y1} A${len} ${len} 0 0 1 ${x2} ${y2} Z`}
            fill={dominant ? "hsl(var(--neon) / 0.24)" : "hsl(var(--glacier) / 0.14)"}
            stroke={dominant ? "hsl(var(--neon) / 0.7)" : "hsl(var(--glacier) / 0.3)"}
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0.75 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "160px 160px" }}
          />
        );
      })}

      {/* rotating sweep */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "160px 160px" }}
      >
        <path d="M160 160 L288 138 A130 130 0 0 1 288 182 Z" fill="url(#roseSweep)" opacity="0.55" />
      </motion.g>

      <circle cx="160" cy="160" r="7" fill="hsl(var(--neon))" />
      <circle cx="160" cy="160" r="15" fill="none" stroke="hsl(var(--neon) / 0.5)" />

      {directions.map((d) => {
        const rad = (d.angle * Math.PI) / 180;
        const x = 160 + Math.cos(rad) * 148;
        const y = 160 + Math.sin(rad) * 148;
        return (
          <text
            key={d.label}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={d.weight > 0.8 ? "hsl(var(--neon) / 0.95)" : "hsl(210 18% 55%)"}
            fontSize="11"
            fontFamily="JetBrains Mono, monospace"
            letterSpacing="1"
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}

function FactValue({ value, unit }: { value: string; unit: string }) {
  const numeric = Number(value.replace(/[^0-9.-]/g, ""));
  const isNumeric = value.match(/^-?[\d,.]+$/) !== null;

  return (
    <span className="font-display text-[2.1rem] font-semibold leading-none">
      {isNumeric && !Number.isNaN(numeric) ? (
        <CountUp to={numeric} suffix={unit ? ` ${unit}` : ""} />
      ) : (
        <>
          {value}
          {unit ? <span className="ml-1 text-[1.1rem] text-neon-dim">{unit}</span> : null}
        </>
      )}
    </span>
  );
}

export function Climate() {
  return (
    <section id="climate" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="container">
        <SectionHeading eyebrow={climate.eyebrow} title={climate.heading} lead={climate.intro} />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.4fr] lg:gap-10">
          {/* wind rose */}
          <Reveal>
            <NeonPanel strong className="flex h-full flex-col p-6">
              <Badge variant="neon">
                <Wind className="size-3" /> Measured load
              </Badge>
              <h3 className="mt-4 font-display text-lg font-semibold">Prevailing wind rose</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                Chinook-driven westerlies dominate the Cheyenne ridge. West and north-west elevations take the highest
                uplift, which is why our fastening schedule changes wall to wall instead of staying on one detail.
              </p>

              <div className="mt-4 flex-1">
                <WindRose />
              </div>

              <dl className="mt-4 space-y-2 border-t border-white/[0.08] pt-4">
                {[
                  { k: "Peak design gust", v: "60–70 mph" },
                  { k: "F3 tornado", v: "July 16, 1979" },
                  { k: "Snowfall range", v: "13.1″ – 121.5″" },
                ].map((row) => (
                  <div key={row.k} className="flex items-baseline justify-between gap-4">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{row.k}</dt>
                    <dd className="font-display text-[0.92rem] font-semibold text-neon-soft">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </NeonPanel>
          </Reveal>

          {/* facts */}
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {climate.facts.map((fact) => (
              <StaggerItem key={fact.label}>
                <NeonPanel className="h-full p-5 transition-transform duration-500 hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-neon/30 bg-neon/[0.07] text-neon-soft">
                      {icons[fact.icon] ?? <Wind className="size-5" />}
                    </span>
                    <span className="text-right neon-text">
                      <FactValue value={fact.value} unit={fact.unit} />
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-[0.98rem] font-semibold">{fact.label}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{fact.detail}</p>
                </NeonPanel>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1} className="mt-12">
          <div className="neon-edge hud-corners relative overflow-hidden rounded-2xl bg-[hsl(220_28%_6%/0.7)] p-7 sm:p-9">
            <div
              className="pointer-events-none absolute -right-20 -top-24 size-96 rounded-full bg-[radial-gradient(circle,hsl(var(--flare)/0.14),transparent_65%)] blur-3xl"
              aria-hidden="true"
            />
            <p className="relative max-w-4xl font-display text-[clamp(1.05rem,2.1vw,1.42rem)] font-medium leading-snug">
              <span className="text-flare-soft">"</span>
              {climate.closing}
              <span className="text-flare-soft">"</span>
            </p>
            <p className="relative mt-4 font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
              — Local climate record, applied to every proposal we write
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
