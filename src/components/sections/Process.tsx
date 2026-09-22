import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, CalendarCheck, FileText, HardHat, Palette, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { processSteps } from "@/content/site";

const stepIcons = [
  <CalendarCheck key="a" className="size-5" />,
  <FileText key="b" className="size-5" />,
  <Palette key="c" className="size-5" />,
  <HardHat key="d" className="size-5" />,
  <ShieldCheck key="e" className="size-5" />,
];

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 78%", "end 55%"] });
  const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 120, damping: 26 });

  return (
    <section id="process" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="How a job runs"
          title={
            <>
              Five steps. <span className="gradient-steel">No sales theatre.</span>
            </>
          }
          lead="We do not send a commissioned closer to your kitchen table or hold a discount that expires tonight. Here is exactly what happens from the first phone call to the warranty paperwork."
        />

        <ol ref={ref} className="relative mt-14 space-y-4 pl-14 sm:pl-20">
          {/* rail */}
          <div
            className="absolute bottom-6 left-[1.4rem] top-6 w-px bg-white/[0.09] sm:left-[2.4rem]"
            aria-hidden="true"
          />
          <motion.div
            style={{ scaleY }}
            className="absolute bottom-6 left-[1.4rem] top-6 w-px origin-top bg-gradient-to-b from-neon via-glacier to-flare shadow-[0_0_14px_1px_hsl(var(--neon)/0.7)] sm:left-[2.4rem]"
            aria-hidden="true"
          />

          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.step} delay={i * 0.05} className="relative">
              <span
                className="absolute -left-14 top-6 grid size-11 place-items-center rounded-xl border border-neon/40 bg-[hsl(210_55%_10%/0.9)] text-neon-soft shadow-[0_0_22px_-6px_hsl(var(--neon)/0.75)] sm:-left-20"
                aria-hidden="true"
              >
                {stepIcons[i]}
              </span>

              <div className="group glass-soft relative overflow-hidden rounded-2xl border border-white/[0.09] p-5 transition-all duration-500 hover:border-neon/35 hover:shadow-neon sm:p-6">
                <span className="neon-trace" aria-hidden="true" />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="font-mono text-[11px] font-medium tracking-[0.24em] text-neon-dim">{step.step}</span>
                  <h3 className="font-display text-[1.15rem] font-semibold">{step.name}</h3>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {step.duration}
                  </span>
                </div>
                <p className="mt-3 max-w-3xl text-[0.94rem] leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1} className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-white/[0.09] bg-white/[0.02] p-6">
            <p className="max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">Ready when you are.</span> The walk-through is free, takes
              under an hour, and you get a written fixed price within 48 hours — whether or not you hire us.
            </p>
            <Button asChild size="lg" className="group shrink-0">
              <Link to="/quote">
                Book my walk-through
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
