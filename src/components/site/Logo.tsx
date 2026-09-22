import { cn } from "@/lib/utils";

/** Neon gable mark + wordmark. */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("group/logo inline-flex items-center gap-3", className)}>
      <span className="relative grid size-11 shrink-0 place-items-center rounded-xl border border-neon/45 bg-[hsl(210_60%_10%/0.6)] shadow-[0_0_18px_-4px_hsl(var(--neon)/0.55),inset_0_1px_0_hsl(var(--neon)/0.2)] transition-shadow duration-500 group-hover/logo:shadow-neon-lg">
        <svg viewBox="0 0 32 32" className="size-6" aria-hidden="true">
          {/* roof line */}
          <path
            d="M3 17 L16 7 L29 17"
            fill="none"
            stroke="hsl(var(--neon))"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 4px hsl(var(--neon)/0.9))" }}
          />
          {/* cladding courses */}
          <path d="M7.5 20.5 H24.5" stroke="hsl(var(--glacier)/0.85)" strokeWidth="1.9" strokeLinecap="round" />
          <path d="M7.5 25 H24.5" stroke="hsl(var(--glacier)/0.5)" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      </span>

      {compact ? null : (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.12rem] font-bold tracking-tight">
            LUPO<span className="text-neon-dim"> SIDING</span>
          </span>
          <span className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.28em] text-muted-foreground/80">
            Cheyenne · Wyoming
          </span>
        </span>
      )}
    </span>
  );
}
