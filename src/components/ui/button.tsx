import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight transition-all duration-300 disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:translate-y-px",
  {
    variants: {
      variant: {
        /** Bright white "neon tube" button — the primary CTA everywhere. */
        neon: "bg-neon text-[hsl(220_30%_5%)] shadow-neon hover:shadow-neon-lg hover:brightness-[1.06] hover:-translate-y-0.5",
        /** Outlined glass button with a living white edge. */
        outline:
          "glass-soft text-foreground shadow-[0_0_0_1px_hsl(var(--neon)/0.34),0_0_26px_-14px_hsl(var(--glacier)/0.6)] hover:shadow-[0_0_0_1px_hsl(var(--neon)/0.72),0_0_34px_-10px_hsl(var(--glacier)/0.7)] hover:-translate-y-0.5",
        /** Warm flare accent for secondary emphasis. */
        flare:
          "bg-gradient-to-b from-flare-soft to-flare text-[hsl(30_45%_8%)] shadow-neon-flare hover:brightness-[1.06] hover:-translate-y-0.5",
        ghost: "text-muted-foreground hover:bg-white/[0.06] hover:text-foreground",
        subtle: "bg-white/[0.07] text-foreground hover:bg-white/[0.12]",
        link: "text-neon-soft underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm [&_svg]:size-4",
        md: "h-11 px-6 text-[0.95rem] [&_svg]:size-[1.05rem]",
        lg: "h-14 px-8 text-base [&_svg]:size-5",
        icon: "size-11 [&_svg]:size-5",
      },
    },
    defaultVariants: { variant: "neon", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
