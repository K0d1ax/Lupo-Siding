import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  ChoiceGroup — single select rendered as large, tactile cards               */
/* -------------------------------------------------------------------------- */

const ChoiceGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & { columns?: 1 | 2 | 3 }
>(({ className, columns = 2, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn(
      "grid gap-3",
      columns === 1 && "grid-cols-1",
      columns === 2 && "grid-cols-1 sm:grid-cols-2",
      columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      className,
    )}
    {...props}
  />
));
ChoiceGroup.displayName = "ChoiceGroup";

type ChoiceProps = {
  value: string;
  title: string;
  description?: string;
  meta?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

const Choice = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, ChoiceProps>(
  ({ value, title, description, meta, icon, disabled, className }, ref) => (
    <RadioGroupPrimitive.Item
      ref={ref}
      value={value}
      disabled={disabled}
      className={cn(
        "group relative flex w-full items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-left transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-neon/40 hover:bg-white/[0.05] hover:shadow-[0_0_0_1px_hsl(var(--neon)/0.25),0_18px_50px_-30px_hsl(var(--glacier)/0.9)]",
        "data-[state=checked]:border-neon/70 data-[state=checked]:bg-[hsl(200_60%_12%/0.55)] data-[state=checked]:shadow-neon",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/60 focus-visible:ring-offset-0",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
    >
      {icon ? (
        <span className="mt-0.5 grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-neon-soft transition-colors duration-300 group-data-[state=checked]:border-neon/50 group-data-[state=checked]:bg-neon/12 group-data-[state=checked]:text-neon">
          {icon}
        </span>
      ) : null}

      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-display text-[1.02rem] font-semibold leading-tight">{title}</span>
          {meta ? (
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {meta}
            </span>
          ) : null}
        </span>
        {description ? (
          <span className="mt-1.5 block text-[13.5px] leading-relaxed text-muted-foreground">{description}</span>
        ) : null}
      </span>

      <span
        aria-hidden="true"
        className={cn(
          "mt-1 grid size-6 shrink-0 place-items-center rounded-full border border-white/20 transition-all duration-300",
          "group-data-[state=checked]:border-neon group-data-[state=checked]:bg-neon group-data-[state=checked]:shadow-[0_0_14px_2px_hsl(var(--neon)/0.55)]",
        )}
      >
        <Check
          className="size-3.5 scale-0 text-[hsl(220_30%_5%)] transition-transform duration-200 group-data-[state=checked]:scale-100"
          strokeWidth={3.5}
        />
      </span>
    </RadioGroupPrimitive.Item>
  ),
);
Choice.displayName = "Choice";

/* -------------------------------------------------------------------------- */
/*  MultiChoiceGroup — checkbox cards for "select all that apply"              */
/* -------------------------------------------------------------------------- */

export function MultiChoiceCard({
  checked,
  onCheckedChange,
  title,
  description,
  meta,
  icon,
  className,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  title: string;
  description?: string;
  meta?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  const id = React.useId();
  return (
    <label
      htmlFor={id}
      className={cn(
        "group relative flex w-full cursor-pointer items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-left transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-neon/40 hover:bg-white/[0.05]",
        checked && "border-neon/70 bg-[hsl(200_60%_12%/0.55)] shadow-neon",
        className,
      )}
    >
      <CheckboxPrimitive.Root
        id={id}
        checked={checked}
        onCheckedChange={(v) => onCheckedChange(v === true)}
        className={cn(
          "absolute right-4 top-4 grid size-6 place-items-center rounded-full border border-white/20 transition-all duration-300",
          "data-[state=checked]:border-neon data-[state=checked]:bg-neon data-[state=checked]:shadow-[0_0_14px_2px_hsl(var(--neon)/0.55)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/60",
        )}
      >
        <CheckboxPrimitive.Indicator>
          <Check className="size-3.5 text-[hsl(220_30%_5%)]" strokeWidth={3.5} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {icon ? (
        <span
          className={cn(
            "mt-0.5 grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-neon-soft transition-colors duration-300",
            checked && "border-neon/50 bg-neon/12 text-neon",
          )}
        >
          {icon}
        </span>
      ) : null}

      <span className="min-w-0 flex-1 pr-8">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-display text-[1.02rem] font-semibold leading-tight">{title}</span>
          {meta ? (
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {meta}
            </span>
          ) : null}
        </span>
        {description ? (
          <span className="mt-1.5 block text-[13.5px] leading-relaxed text-muted-foreground">{description}</span>
        ) : null}
      </span>
    </label>
  );
}

/** Compact add-on toggle used for optional extras in the wizard. */
export function PillToggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all duration-300",
        active
          ? "border-neon/70 bg-neon/12 text-neon shadow-[0_0_18px_-6px_hsl(var(--neon)/0.7)]"
          : "border-white/12 bg-white/[0.03] text-muted-foreground hover:border-white/25 hover:text-foreground",
      )}
    >
      <Plus className={cn("size-3.5 transition-transform duration-300", active && "rotate-45")} />
      {children}
    </button>
  );
}

export { ChoiceGroup, Choice };
