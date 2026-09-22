import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] transition-colors",
  {
    variants: {
      variant: {
        neon: "border-neon/35 bg-neon/10 text-neon-soft",
        outline: "border-white/12 bg-white/[0.04] text-muted-foreground",
        flare: "border-flare/40 bg-flare/12 text-flare-soft",
        glacier: "border-glacier/40 bg-glacier/12 text-glacier-soft",
        copper: "border-copper/40 bg-copper/12 text-copper-soft",
        solid: "border-transparent bg-neon text-[hsl(220_30%_5%)]",
      },
    },
    defaultVariants: { variant: "outline" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
