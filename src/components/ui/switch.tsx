import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border border-white/12 bg-white/[0.06] transition-all duration-300",
      "data-[state=checked]:border-neon/70 data-[state=checked]:bg-neon/20 data-[state=checked]:shadow-[0_0_20px_-6px_hsl(var(--neon)/0.9)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/60 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb className="pointer-events-none block size-5 translate-x-0.5 rounded-full bg-white/70 shadow-lg transition-transform duration-300 data-[state=checked]:translate-x-[1.55rem] data-[state=checked]:bg-neon" />
  </SwitchPrimitive.Root>
));
Switch.displayName = "Switch";

export { Switch };
