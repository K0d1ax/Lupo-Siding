import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-400",
      "hover:border-white/20 data-[state=open]:border-neon/45 data-[state=open]:bg-[hsl(200_45%_10%/0.42)] data-[state=open]:shadow-neon",
      className,
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between gap-5 px-5 py-5 text-left font-display text-[1.02rem] font-semibold leading-snug transition-colors sm:px-6",
        "hover:text-neon-soft [&[data-state=open]>span>svg]:rotate-45 [&[data-state=open]>span]:border-neon/60 [&[data-state=open]>span]:text-neon",
        className,
      )}
      {...props}
    >
      <span className="min-w-0 flex-1 text-balance">{children}</span>
      <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-muted-foreground transition-all duration-400">
        <Plus className="size-4 transition-transform duration-400" />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("px-5 pb-6 pt-0 text-[0.94rem] leading-relaxed text-muted-foreground sm:px-6", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
