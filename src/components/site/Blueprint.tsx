import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Technical cross-sections used in the Services section.
 * Drawing the real assembly is the fastest way to prove expertise — these are
 * the details competitors never put on a web page.
 */

const labelStyle = {
  fill: "hsl(var(--neon) / 0.82)",
  fontSize: 9,
  fontFamily: "JetBrains Mono, monospace",
  letterSpacing: 1.1,
} as const;

const noteStyle = {
  fill: "hsl(210 18% 60%)",
  fontSize: 9,
  fontFamily: "JetBrains Mono, monospace",
  letterSpacing: 0.6,
} as const;

function Frame({ children, className, title }: { children: React.ReactNode; className?: string; title: string }) {
  return (
    <svg viewBox="0 0 420 300" className={cn("h-full w-full", className)} role="img" aria-label={title}>
      <rect width="420" height="300" fill="hsl(220 30% 5%)" />
      <g opacity="0.5">
        <path d="M0 0 H420 M0 60 H420 M0 120 H420 M0 180 H420 M0 240 H420" stroke="hsl(210 40% 92% / 0.05)" />
        <path d="M60 0 V300 M120 0 V300 M180 0 V300 M240 0 V300 M300 0 V300 M360 0 V300" stroke="hsl(210 40% 92% / 0.05)" />
      </g>
      {children}
    </svg>
  );
}

/** ------------------------------------------------------------------ SIDING */
export function SidingWallSection({ className }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const lap = `lap-${uid}`;
  const cladding = `clad-${uid}`;

  return (
    <Frame className={className} title="Wall cross-section showing sheathing, water-resistive barrier, flashing and cladding">
      <defs>
        <pattern id={lap} width="8" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(90)">
          <rect width="8" height="9" fill="#6C747E" />
          <rect width="8" height="2" fill="#FFFFFF" opacity="0.12" />
          <rect y="7" width="8" height="2" fill="#000000" opacity="0.3" />
        </pattern>
        <linearGradient id={cladding} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8D97A3" />
          <stop offset="100%" stopColor="#5A626C" />
        </linearGradient>
      </defs>

      {/* assembly layers, outside on the right */}
      <rect x="120" y="70" width="46" height="170" fill="#1B222B" />
      <rect x="166" y="70" width="18" height="170" fill="#202A34" />
      <rect x="184" y="70" width="16" height="170" fill="#2A3540" />
      <rect x="200" y="70" width="8" height="170" fill="#3B4753" />

      {/* studs */}
      {[130, 152].map((x) => (
        <rect key={x} x={x} y="70" width="7" height="170" fill="#26303A" />
      ))}

      {/* cladding with lap profile */}
      <rect x="208" y="70" width="26" height="170" fill={`url(#${cladding})`} />
      <rect x="208" y="70" width="26" height="170" fill={`url(#${lap})`} />

      {/* flashing detail at bottom */}
      <path d="M204 240 H240 L240 250 H198 Z" fill="hsl(var(--flare) / 0.5)" />

      {/* WRB overlap highlight */}
      <rect x="184" y="70" width="16" height="4" fill="hsl(var(--glacier) / 0.55)" />

      {/* ground */}
      <path d="M90 252 H330" stroke="hsl(210 40% 92% / 0.18)" />
      <path d="M90 252 H330" stroke="hsl(var(--neon) / 0.2)" strokeDasharray="4 6" />

      {/* leaders */}
      <g>
        <path d="M143 88 H78" stroke="hsl(var(--neon) / 0.35)" />
        <text x="76" y="91" textAnchor="end" style={labelStyle}>
          STUD CAVITY
        </text>

        <path d="M175 118 H78" stroke="hsl(var(--neon) / 0.35)" />
        <text x="76" y="121" textAnchor="end" style={labelStyle}>
          SHEATHING
        </text>

        <path d="M192 148 H78" stroke="hsl(var(--glacier) / 0.5)" />
        <text x="76" y="151" textAnchor="end" style={{ ...labelStyle, fill: "hsl(var(--glacier) / 0.9)" }}>
          WRB
        </text>

        <path d="M221 178 H262" stroke="hsl(var(--neon) / 0.35)" />
        <text x="266" y="181" style={labelStyle}>
          RIGID CLADDING
        </text>

        <path d="M222 240 H262" stroke="hsl(var(--flare) / 0.6)" />
        <text x="266" y="243" style={{ ...labelStyle, fill: "hsl(var(--flare-soft) / 0.95)" }}>
          FLASHING
        </text>
      </g>

      <text x="210" y="284" textAnchor="middle" style={noteStyle}>
        DETAIL 01 · LAP + WRB + KICK-OUT
      </text>
    </Frame>
  );
}

/** ----------------------------------------------------------------- GUTTERS */
export function GutterSection({ className }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const water = `water-${uid}`;

  return (
    <Frame className={className} title="Roof edge cross-section showing drip edge, K-style seamless gutter, hidden hanger and downspout">
      <defs>
        <linearGradient id={water} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--glacier) / 0.75)" />
          <stop offset="100%" stopColor="hsl(var(--glacier) / 0.2)" />
        </linearGradient>
      </defs>

      {/* roof slope */}
      <path d="M60 74 L300 132 L300 150 L60 92 Z" fill="#2C3641" />
      <path d="M60 74 L300 132" stroke="hsl(var(--neon) / 0.45)" strokeWidth="1.4" />
      <path d="M64 96 L292 152" stroke="#F4F8FB" strokeWidth="5" opacity="0.55" strokeLinecap="round" />

      {/* drip edge */}
      <path d="M300 132 L300 150 L316 154 L316 150" fill="none" stroke="hsl(var(--flare) / 0.85)" strokeWidth="3" />

      {/* fascia */}
      <rect x="316" y="146" width="16" height="96" fill="#333E49" />
      <rect x="316" y="146" width="3" height="96" fill="#FFFFFF" opacity="0.1" />

      {/* K-style seamless gutter profile */}
      <path
        d="M300 162 H352 V176 Q352 200 330 206 L318 208 V196 H306 V208 L300 206 Z"
        fill="#20282F"
        stroke="hsl(var(--neon) / 0.75)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* standing water */}
      <path d="M304 190 H348 V176 L304 176 Z" fill={`url(#${water})`} opacity="0.85" />

      {/* hidden hanger */}
      <path d="M328 146 V162" stroke="hsl(var(--glacier) / 0.85)" strokeWidth="2.4" />
      <rect x="322" y="158" width="12" height="6" rx="2" fill="hsl(var(--glacier) / 0.9)" />

      {/* downspout */}
      <rect x="334" y="208" width="18" height="62" fill="#1D252D" stroke="hsl(var(--neon) / 0.4)" strokeWidth="1.2" />
      {[222, 240, 258].map((y) => (
        <path key={y} d={`M336 ${y} H350`} stroke="hsl(var(--neon) / 0.22)" strokeWidth="1" />
      ))}

      {/* rain */}
      {[
        [110, 210],
        [150, 224],
        [196, 206],
        [246, 218],
        [286, 232],
      ].map(([x, y], i) => (
        <path
          key={i}
          d={`M${x} ${y} l-6 18`}
          stroke="hsl(var(--glacier) / 0.5)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ))}

      {/* leaders */}
      <g>
        <path d="M310 140 H250" stroke="hsl(var(--flare) / 0.5)" />
        <text x="246" y="143" textAnchor="end" style={{ ...labelStyle, fill: "hsl(var(--flare-soft) / 0.95)" }}>
          DRIP EDGE
        </text>

        <path d="M290 186 H222" stroke="hsl(var(--neon) / 0.35)" />
        <text x="218" y="189" textAnchor="end" style={labelStyle}>
          6" SEAMLESS
        </text>

        <path d="M332 152 H246" stroke="hsl(var(--glacier) / 0.5)" />
        <text x="242" y="155" textAnchor="end" style={{ ...labelStyle, fill: "hsl(var(--glacier) / 0.9)" }}>
          HIDDEN HANGER
        </text>

        <path d="M356 240 H392" stroke="hsl(var(--neon) / 0.35)" />
        <text x="392" y="243" textAnchor="end" style={labelStyle}>
          DRAIN
        </text>
      </g>

      <text x="210" y="284" textAnchor="middle" style={noteStyle}>
        DETAIL 02 · GUTTER + ICE-DAM PATH
      </text>
    </Frame>
  );
}

/** ------------------------------------------------------------------- DECKS */
export function DeckFramingSection({ className }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const board = `board-${uid}`;

  return (
    <Frame className={className} title="Deck cross-section showing footing below frost depth, standoff hardware, beam, joists and composite boards">
      <defs>
        <linearGradient id={board} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8A6A4B" />
          <stop offset="100%" stopColor="#5F4730" />
        </linearGradient>
      </defs>

      {/* grade line */}
      <path d="M40 244 H380" stroke="hsl(210 40% 92% / 0.2)" />
      {/* frost depth */}
      <path d="M40 292 H380" stroke="hsl(var(--glacier) / 0.5)" strokeDasharray="7 6" />
      <text x="46" y="287" style={{ ...labelStyle, fill: "hsl(var(--glacier) / 0.9)" }}>
        LOCAL FROST DEPTH
      </text>

      {/* footing */}
      <path d="M150 296 H232 V276 H150 Z" fill="#2B333C" />
      <path d="M150 296 H232" stroke="hsl(var(--neon) / 0.5)" strokeWidth="1.4" />

      {/* post */}
      <rect x="178" y="176" width="26" height="100" fill="#3A444F" />
      <rect x="178" y="176" width="4" height="100" fill="#FFFFFF" opacity="0.09" />

      {/* standoff hardware */}
      <rect x="172" y="270" width="38" height="8" rx="2" fill="hsl(var(--flare) / 0.75)" />

      {/* beam */}
      <rect x="96" y="164" width="292" height="16" fill="#4A5460" />
      <rect x="96" y="164" width="292" height="3" fill="#FFFFFF" opacity="0.12" />

      {/* joists seen in section */}
      {[120, 176, 232, 288, 344].map((x) => (
        <rect key={x} x={x} y="150" width="14" height="16" fill="#39434E" />
      ))}
      {/* joist hangers */}
      {[120, 232, 344].map((x) => (
        <rect key={x} x={x - 2} y="150" width="18" height="4" rx="1.5" fill="hsl(var(--glacier) / 0.85)" />
      ))}

      {/* decking */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={108 + i * 62} y="138" width="52" height="11" rx="1.5" fill={`url(#${board})`} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={108 + i * 62} y="138" width="52" height="2" fill="#FFFFFF" opacity="0.14" />
      ))}

      {/* railing post + cable */}
      <rect x="356" y="60" width="12" height="80" fill="#3A444F" />
      {[84, 104, 124].map((y) => (
        <path key={y} d={`M356 ${y} H108`} stroke="hsl(var(--neon) / 0.32)" strokeWidth="1.2" />
      ))}
      <rect x="96" y="52" width="286" height="12" rx="3" fill="#4A5460" />
      <rect x="96" y="52" width="286" height="2.5" fill="hsl(var(--neon) / 0.4)" />

      {/* leaders */}
      <g>
        <path d="M232 40 H268" stroke="hsl(var(--neon) / 0.35)" />
        <text x="272" y="43" style={labelStyle}>
          CABLE RAIL
        </text>

        <path d="M134 132 H92" stroke="hsl(var(--neon) / 0.35)" />
        <text x="88" y="135" textAnchor="end" style={labelStyle}>
          BOARD
        </text>

        <path d="M126 156 H92" stroke="hsl(var(--glacier) / 0.5)" />
        <text x="88" y="159" textAnchor="end" style={{ ...labelStyle, fill: "hsl(var(--glacier) / 0.9)" }}>
          HANGER
        </text>

        <path d="M191 200 H240" stroke="hsl(var(--neon) / 0.35)" />
        <text x="244" y="203" style={labelStyle}>
          POST
        </text>

        <path d="M191 274 H240" stroke="hsl(var(--flare) / 0.6)" />
        <text x="244" y="277" style={{ ...labelStyle, fill: "hsl(var(--flare-soft) / 0.95)" }}>
          STANDOFF SHOES
        </text>
      </g>

      <text x="210" y="24" textAnchor="middle" style={noteStyle}>
        DETAIL 03 · FOOTING + THERMAL MOVEMENT
      </text>
    </Frame>
  );
}
