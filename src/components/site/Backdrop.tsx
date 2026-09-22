import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Sine-free deterministic pseudo random so server and client (and every
 * re-render) produce the same flake layout.
 */
function flakeLayout(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const r1 = seed / 233280;
    const r2 = ((i * 4523 + 12345) % 233280) / 233280;
    return {
      left: r1 * 100,
      size: 1.1 + r2 * 2.6,
      duration: 13 + r1 * 16,
      delay: -(r2 * 24),
      opacity: 0.18 + r2 * 0.4,
    };
  });
}

/** Drifting snowfield — Cheyenne's signature weather, rendered in CSS. */
export function SnowField({ count = 34, className }: { count?: number; className?: string }) {
  const flakes = React.useMemo(() => flakeLayout(count), [count]);
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {flakes.map((flake, i) => (
        <span
          key={i}
          className="absolute top-0 rounded-full bg-white"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `snowfall ${flake.duration}s linear ${flake.delay}s infinite`,
            boxShadow: "0 0 6px rgba(255,255,255,0.65)",
          }}
        />
      ))}
    </div>
  );
}

/** Layered radial aurora + engineering grid used behind most sections. */
export function AuroraBackdrop({ grid = true, className }: { grid?: boolean; className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <div className="absolute -left-1/4 -top-1/3 size-[62rem] rounded-full bg-[radial-gradient(circle,hsl(var(--glacier)/0.16),transparent_62%)] blur-3xl" />
      <div className="absolute -right-1/4 top-1/4 size-[54rem] rounded-full bg-[radial-gradient(circle,hsl(var(--flare)/0.1),transparent_62%)] blur-3xl" />
      {grid ? (
        <div className="absolute inset-0 bg-grid-fade bg-grid opacity-60 mask-fade-b" />
      ) : null}
    </div>
  );
}

/**
 * The Front Range silhouette. Two parallax layers of the ridge line west of
 * Cheyenne, drawn as inline SVG so it stays crisp at any size.
 */
export function MountainRidge({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-x-0 bottom-0", className)} aria-hidden="true">
      <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="ridgeFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(214 34% 20%)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="hsl(220 30% 4%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ridgeNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(220 28% 9%)" />
            <stop offset="100%" stopColor="hsl(220 30% 4%)" />
          </linearGradient>
        </defs>

        {/* far ridge */}
        <path
          d="M0 208 L96 156 L168 186 L262 108 L338 162 L420 122 L512 178 L604 132 L700 182 L790 142 L880 190 L972 146 L1064 188 L1156 150 L1250 192 L1342 158 L1440 200 L1440 320 L0 320 Z"
          fill="url(#ridgeFar)"
        />
        {/* near ridge with neon rim light */}
        <path
          d="M0 258 L110 214 L196 244 L300 186 L398 232 L500 196 L610 246 L716 204 L820 252 L928 210 L1036 256 L1140 216 L1246 260 L1350 220 L1440 258 L1440 320 L0 320 Z"
          fill="url(#ridgeNear)"
        />
        <path
          d="M0 258 L110 214 L196 244 L300 186 L398 232 L500 196 L610 246 L716 204 L820 252 L928 210 L1036 256 L1140 216 L1246 260 L1350 220 L1440 258"
          fill="none"
          stroke="hsl(var(--neon) / 0.35)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
