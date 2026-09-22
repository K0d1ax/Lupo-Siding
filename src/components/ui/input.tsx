import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-xl border border-white/10 bg-[hsl(220_28%_5%/0.72)] px-4 text-[0.95rem] text-foreground placeholder:text-muted-foreground/60 transition-all duration-300 hover:border-white/20 focus:border-neon/60 focus:bg-[hsl(220_28%_6%/0.85)] focus:shadow-[0_0_0_3px_hsl(var(--neon)/0.12),0_0_28px_-8px_hsl(var(--glacier)/0.6)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => (
    <input ref={ref} type={type} className={cn(fieldBase, "h-12", className)} {...props} />
  ),
);
Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(fieldBase, "min-h-28 resize-y py-3 leading-relaxed", className)} {...props} />
  ),
);
Textarea.displayName = "Textarea";

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground",
      className,
    )}
    {...props}
  />
));
Label.displayName = "Label";

/** Groups a label, control and validation message with consistent spacing. */
export function Field({
  label,
  htmlFor,
  hint,
  error,
  className,
  children,
}: {
  label?: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label ? <Label htmlFor={htmlFor}>{label}</Label> : null}
      {children}
      {error ? (
        <p className="text-[13px] font-medium text-destructive-foreground/90" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-[12.5px] text-muted-foreground/80">{hint}</p>
      ) : null}
    </div>
  );
}

export { Input, Textarea, Label };
