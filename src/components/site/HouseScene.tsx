import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type SidingTexture = "lap" | "vertical" | "shake" | "metal";

/**
 * A parametric front elevation of the kind of home we install on.
 * Drives the interactive Materials Studio — change the colour or texture and
 * the whole render updates instantly.
 */
export function HouseScene({
  color,
  trim,
  texture = "lap",
  snow = false,
  className,
}: {
  color: string;
  trim: string;
  texture?: SidingTexture;
  snow?: boolean;
  className?: string;
}) {
  const rawId = React.useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const reduce = useReducedMotion();

  const sidingPattern = `siding-${uid}`;
  const shadeGradient = `shade-${uid}`;
  const glassGradient = `glass-${uid}`;
  const skyGradient = `sky-${uid}`;
  const roofGradient = `roof-${uid}`;

  const roofEdgeHighlight = "M56 222 L274 122 L492 222";

  return (
    <svg
      viewBox="0 0 800 560"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Illustration of a home with the selected siding colour and profile applied"
    >
      <defs>
        <linearGradient id={skyGradient} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(214 44% 12%)" />
          <stop offset="55%" stopColor="hsl(216 34% 8%)" />
          <stop offset="100%" stopColor="hsl(220 30% 5%)" />
        </linearGradient>

        <linearGradient id={roofGradient} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A424E" />
          <stop offset="100%" stopColor="#1B2028" />
        </linearGradient>

        {/* Vertical light fall-off gives the flat elevation real volume */}
        <linearGradient id={shadeGradient} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.16" />
          <stop offset="42%" stopColor="#FFFFFF" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.34" />
        </linearGradient>

        <linearGradient id={glassGradient} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8FC7E8" stopOpacity="0.42" />
          <stop offset="46%" stopColor="#26313D" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#131A22" />
        </linearGradient>

        {/* --- siding textures --- */}
        {texture === "lap" ? (
          <pattern id={sidingPattern} width="14" height="13" patternUnits="userSpaceOnUse">
            <rect width="14" height="13" fill={color} />
            <rect y="0" width="14" height="2" fill="#FFFFFF" opacity="0.1" />
            <rect y="10.6" width="14" height="2.4" fill="#000000" opacity="0.24" />
          </pattern>
        ) : null}

        {texture === "vertical" ? (
          <pattern id={sidingPattern} width="30" height="10" patternUnits="userSpaceOnUse">
            <rect width="30" height="10" fill={color} />
            <rect width="4.5" height="10" fill="#000000" opacity="0.22" />
            <rect x="4.5" width="1.6" height="10" fill="#FFFFFF" opacity="0.14" />
          </pattern>
        ) : null}

        {texture === "shake" ? (
          <pattern id={sidingPattern} width="38" height="22" patternUnits="userSpaceOnUse">
            <rect width="38" height="22" fill={color} />
            <rect y="0" width="18" height="10.4" rx="1" fill="#FFFFFF" opacity="0.09" />
            <rect x="19" y="0" width="19" height="10.4" rx="1" fill="#000000" opacity="0.16" />
            <rect y="11" width="19" height="10.4" rx="1" fill="#000000" opacity="0.16" />
            <rect x="19" y="11" width="19" height="10.4" rx="1" fill="#FFFFFF" opacity="0.07" />
          </pattern>
        ) : null}

        {texture === "metal" ? (
          <pattern id={sidingPattern} width="34" height="10" patternUnits="userSpaceOnUse">
            <rect width="34" height="10" fill={color} />
            <rect width="6" height="10" fill="#FFFFFF" opacity="0.22" />
            <rect x="6" width="1.8" height="10" fill="#000000" opacity="0.3" />
          </pattern>
        ) : null}
      </defs>

      {/* ---------- sky ---------- */}
      <rect width="800" height="560" fill={`url(#${skyGradient})`} />
      <circle cx="642" cy="112" r="86" fill="hsl(var(--flare)/0.1)" />
      <circle cx="642" cy="112" r="34" fill="hsl(var(--flare-soft)/0.2)" />
      <circle cx="642" cy="112" r="15" fill="hsl(var(--flare-soft)/0.55)" />

      {/* distant ridge */}
      <path
        d="M0 372 L92 320 L182 352 L286 292 L392 340 L498 300 L606 348 L716 306 L800 344 L800 560 L0 560 Z"
        fill="hsl(216 30% 11%)"
        opacity="0.85"
      />
      <path
        d="M0 372 L92 320 L182 352 L286 292 L392 340 L498 300 L606 348 L716 306 L800 344"
        fill="none"
        stroke="hsl(var(--neon)/0.16)"
        strokeWidth="1.2"
      />

      {/* ---------- ground ---------- */}
      <rect y="486" width="800" height="74" fill="#0D1117" />
      <rect y="486" width="800" height="1.6" fill="hsl(var(--neon)/0.28)" />

      {/* walkway + landscaping bed */}
      <path d="M300 486 L262 560 L342 560 L340 486 Z" fill="#161C24" />
      <rect x="60" y="474" width="640" height="14" rx="2" fill="#0A0E13" />

      <g opacity="0.95">
        {/* ---------- main volume ---------- */}
        <polygon points="80,224 274,124 468,224" fill={`url(#${sidingPattern})`} />
        <rect x="80" y="224" width="388" height="250" fill={`url(#${sidingPattern})`} />
        <polygon points="80,224 274,124 468,224" fill={`url(#${shadeGradient})`} />
        <rect x="80" y="224" width="388" height="250" fill={`url(#${shadeGradient})`} />

        {/* ---------- garage volume ---------- */}
        <rect x="468" y="296" width="252" height="178" fill={`url(#${sidingPattern})`} />
        <rect x="468" y="296" width="252" height="178" fill={`url(#${shadeGradient})`} />
        <rect x="452" y="296" width="16" height="178" fill="#000000" opacity="0.3" />

        {/* ---------- roof ---------- */}
        <path d="M56 234 L274 134 L492 234" fill="none" stroke={`url(#${roofGradient})`} strokeWidth="26" strokeLinejoin="miter" />
        <path d="M444 306 L748 280" fill="none" stroke={`url(#${roofGradient})`} strokeWidth="18" strokeLinecap="round" />

        {/* neon rim light along both roof edges */}
        <motion.path
          d={roofEdgeHighlight}
          fill="none"
          stroke="hsl(var(--neon)/0.9)"
          strokeWidth="1.6"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 6px hsl(var(--neon)/0.65))" }}
        />
        <path
          d="M444 294 L748 268"
          fill="none"
          stroke="hsl(var(--neon)/0.5)"
          strokeWidth="1.3"
          strokeLinecap="round"
        />

        {snow ? (
          <>
            <path
              d="M56 222 L274 122 L492 222"
              fill="none"
              stroke="#F4F8FB"
              strokeWidth="9"
              strokeLinejoin="round"
              opacity="0.92"
            />
            <path d="M444 294 L748 268" fill="none" stroke="#F4F8FB" strokeWidth="7" strokeLinecap="round" opacity="0.9" />
          </>
        ) : null}

        {/* ---------- corner trim boards ---------- */}
        <rect x="80" y="224" width="7" height="250" fill={trim} />
        <rect x="461" y="224" width="7" height="250" fill={trim} />

        {/* ---------- upper windows ---------- */}
        {[112, 236].map((x) => (
          <g key={x}>
            <rect x={x - 5} y="247" width="102" height="114" rx="3" fill={trim} />
            <rect x={x} y="252" width="92" height="104" rx="2" fill={`url(#${glassGradient})`} />
            <rect x={x} y="252" width="92" height="12" fill="#FFFFFF" opacity="0.16" />
            <line x1={x + 46} y1="252" x2={x + 46} y2="356" stroke={trim} strokeWidth="5" />
            <rect x={x - 8} y="358" width="108" height="7" rx="2" fill={trim} />
            {/* warm interior light */}
            <rect x={x + 4} y="300" width="38" height="52" fill="hsl(var(--flare)/0.16)" />
          </g>
        ))}

        {/* ---------- front door ---------- */}
        <rect x="364" y="342" width="100" height="132" rx="3" fill={trim} />
        <rect x="372" y="350" width="84" height="116" rx="2" fill="#20303C" />
        <rect x="372" y="350" width="84" height="10" fill="hsl(var(--glacier)/0.4)" />
        <circle cx="444" cy="412" r="4.5" fill="hsl(var(--neon)/0.9)" />
        <rect x="356" y="334" width="116" height="10" rx="3" fill={trim} />
        {/* porch light glow */}
        <circle cx="484" cy="330" r="26" fill="hsl(var(--flare)/0.18)" />
        <circle cx="484" cy="330" r="7" fill="hsl(var(--flare-soft)/0.85)" />

        {/* ---------- garage door ---------- */}
        <rect x="500" y="336" width="192" height="138" rx="3" fill={trim} />
        <rect x="507" y="343" width="178" height="124" rx="2" fill="#252E38" />
        {[0, 1, 2, 3].map((row) => (
          <g key={row}>
            <rect x="507" y={343 + row * 31} width="178" height="27" fill="#2C3742" />
            <rect x="507" y={343 + row * 31} width="178" height="2" fill="#FFFFFF" opacity="0.1" />
          </g>
        ))}
        {[1, 2, 3].map((col) => (
          <rect key={col} x={507 + col * 44.5} y="343" width="2" height="124" fill="#000000" opacity="0.22" />
        ))}

        {/* ---------- foundation ---------- */}
        <rect x="72" y="472" width="656" height="12" fill="#0B0F14" />
      </g>

      {/* ---------- foreground shrubs ---------- */}
      <g opacity="0.9">
        <ellipse cx="130" cy="478" rx="46" ry="20" fill="#15201C" />
        <ellipse cx="130" cy="470" rx="30" ry="24" fill="#1B2A24" />
        <ellipse cx="700" cy="480" rx="38" ry="17" fill="#15201C" />
        <ellipse cx="700" cy="472" rx="25" ry="21" fill="#1B2A24" />
      </g>

      {/* ---------- measurement HUD ---------- */}
      <g opacity="0.75">
        <line x1="80" y1="518" x2="468" y2="518" stroke="hsl(var(--neon)/0.35)" strokeWidth="1" strokeDasharray="5 5" />
        <line x1="80" y1="510" x2="80" y2="526" stroke="hsl(var(--neon)/0.5)" strokeWidth="1" />
        <line x1="468" y1="510" x2="468" y2="526" stroke="hsl(var(--neon)/0.5)" strokeWidth="1" />
        <text
          x="274"
          y="510"
          textAnchor="middle"
          fill="hsl(var(--neon)/0.75)"
          fontSize="11"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="1.5"
        >
          FIELD-MEASURED ELEVATION
        </text>
      </g>
    </svg>
  );
}
