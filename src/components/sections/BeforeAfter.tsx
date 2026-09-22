import * as React from "react";
import { GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/site/SectionHeading";
import { HouseScene } from "@/components/site/HouseScene";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/** Chalk streaks and popped panels drawn over the "before" render. */
function WeatheringOverlay() {
  return (
    <svg viewBox="0 0 800 560" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="chalk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.34" />
          <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.06" />
        </linearGradient>
      </defs>
      {/* chalking down the wall */}
      <rect x="88" y="232" width="382" height="240" fill="url(#chalk)" />
      <rect x="476" y="300" width="240" height="172" fill="url(#chalk)" opacity="0.7" />

      {/* warped / lifted panels */}
      {[
        [130, 300, 62, 20],
        [250, 372, 78, 24],
        [330, 262, 54, 18],
        [520, 392, 88, 22],
      ].map(([x, y, w, h], i) => (
        <path
          key={i}
          d={`M${x} ${y} l${w} 6 l-4 ${h} l-${w} -4 Z`}
          fill="#8A9199"
          stroke="#5A6169"
          strokeWidth="1"
          opacity="0.85"
        />
      ))}

      {/* crack + stain */}
      <path d="M196 268 l10 40 l-8 34 l12 30" fill="none" stroke="#4A5058" strokeWidth="1.6" opacity="0.8" />
      <ellipse cx="452" cy="356" rx="26" ry="34" fill="#2E3A32" opacity="0.35" />
      <ellipse cx="150" cy="452" rx="30" ry="30" fill="#2E3A32" opacity="0.3" />

      {/* faded sheen lines */}
      {[268, 300, 332, 364, 396, 428].map((y) => (
        <path key={y} d={`M88 ${y} H470`} stroke="#000000" strokeWidth="0.8" opacity="0.12" />
      ))}
    </svg>
  );
}

export function BeforeAfter() {
  const [position, setPosition] = React.useState(52);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef(false);

  const updateFromClientX = React.useCallback((clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(98, Math.max(2, pct)));
  }, []);

  React.useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!dragging.current) return;
      updateFromClientX(event.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [updateFromClientX]);

  function onKeyDown(event: React.KeyboardEvent) {
    const step = event.shiftKey ? 10 : 4;
    if (event.key === "ArrowLeft") {
      setPosition((p) => Math.max(2, p - step));
      event.preventDefault();
    } else if (event.key === "ArrowRight") {
      setPosition((p) => Math.min(98, p + step));
      event.preventDefault();
    } else if (event.key === "Home") {
      setPosition(2);
      event.preventDefault();
    } else if (event.key === "End") {
      setPosition(98);
      event.preventDefault();
    }
  }

  return (
    <section className="relative py-24 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Before / after"
          title={
            <>
              Seventeen years of Wyoming sun, <span className="gradient-steel">reversed in a week.</span>
            </>
          }
          lead="This is a west-facing elevation on a Fox Farm home: chalked, warped vinyl over failed house wrap. Drag the handle to see the same wall in fiber cement with corrected flashing."
        />

        <Reveal delay={0.08} className="mt-12">
          <div
            ref={trackRef}
            className="neon-edge-strong hud-corners relative select-none overflow-hidden rounded-2xl"
            onPointerDown={(event) => {
              dragging.current = true;
              updateFromClientX(event.clientX);
            }}
          >
            {/* after (base layer) */}
            <HouseScene color="#4A525C" trim="#EDEFF2" texture="lap" snow={false} className="block" />
            <span className="glass-soft absolute right-4 top-4 rounded-full border border-neon/45 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-neon-soft">
              After · Fiber cement · Slate
            </span>

            {/* before (clipped layer) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
              aria-hidden="true"
            >
              <HouseScene color="#A9AFB6" trim="#D8DBDF" texture="lap" snow={false} className="block" />
              <WeatheringOverlay />
              <div className="absolute inset-0 bg-[hsl(30_25%_22%/0.22)]" />
              <span className="glass-soft absolute left-4 top-4 rounded-full border border-white/18 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Before · Chalked vinyl
              </span>
            </div>

            {/* divider + handle */}
            <div
              className="pointer-events-none absolute inset-y-0 w-px bg-neon shadow-[0_0_16px_2px_hsl(var(--neon)/0.85)]"
              style={{ left: `${position}%` }}
              aria-hidden="true"
            >
              <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-neon/80 bg-[hsl(210_55%_8%/0.92)] text-neon shadow-[0_0_28px_-4px_hsl(var(--neon)/0.95)] backdrop-blur">
                <GripVertical className="size-5" />
              </span>
            </div>

            {/* accessible control */}
            <div
              role="slider"
              tabIndex={0}
              aria-label="Reveal before or after siding"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(position)}
              aria-valuetext={`${Math.round(position)} percent existing siding`}
              onKeyDown={onKeyDown}
              className={cn(
                "absolute inset-0 cursor-ew-resize",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-0",
              )}
            />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { k: "Removed", v: "Chalked vinyl + failed wrap" },
              { k: "Installed", v: "Slate fiber cement, corrected flashing" },
              { k: "Elapsed", v: "6 working days" },
            ].map((row) => (
              <div key={row.k} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted-foreground">{row.k}</p>
                <p className="mt-1.5 text-[13.5px] font-medium">{row.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <Badge variant="outline">Keyboard: ← → · Shift for larger steps</Badge>
            <Badge variant="outline">Drag anywhere on the frame</Badge>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
