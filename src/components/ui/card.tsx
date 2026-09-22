import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("glass neon-edge hud-corners group relative rounded-2xl", className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex flex-col gap-3 p-6 sm:p-7", className)} {...props} />,
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("font-display text-xl font-semibold leading-snug", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm leading-relaxed text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0 sm:p-7 sm:pt-0", className)} {...props} />,
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-3 p-6 pt-0 sm:p-7 sm:pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

/**
 * NeonPanel — the signature surface of this design system.
 * A frosted granite slab wrapped in a travelling white-neon border trace.
 */
export const NeonPanel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { strong?: boolean; trace?: boolean }
>(({ className, strong, trace = true, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "glass group relative overflow-hidden rounded-2xl",
      strong ? "neon-edge-strong" : "neon-edge",
      "hud-corners",
      className,
    )}
    {...props}
  >
    {trace ? <span className="neon-trace" aria-hidden="true" /> : null}
    {children}
  </div>
));
NeonPanel.displayName = "NeonPanel";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
