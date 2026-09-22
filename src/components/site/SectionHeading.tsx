import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-5", align === "center" && "items-center text-center", className)}>
      {eyebrow ? (
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-gradient-to-r from-transparent to-neon/70" aria-hidden="true" />
            {eyebrow}
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={0.06}>
        <h2 className="max-w-4xl font-display text-[clamp(1.9rem,4.4vw,3.35rem)] font-semibold leading-[1.06]">
          {title}
        </h2>
      </Reveal>

      {lead ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "max-w-2xl text-[1.02rem] leading-relaxed text-muted-foreground sm:text-[1.06rem]",
              align === "center" && "mx-auto",
            )}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}

      {children}
    </div>
  );
}
