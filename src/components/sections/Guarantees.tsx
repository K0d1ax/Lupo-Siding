import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, FileCheck2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NeonPanel } from "@/components/ui/card";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { guarantees, stats } from "@/content/site";

const icons: Record<string, React.ReactNode> = {
  shield: <ShieldCheck className="size-6" />,
  receipt: <FileCheck2 className="size-6" />,
  badge: <BadgeCheck className="size-6" />,
};

const notCovered = [
  "Pre-existing rot or structural damage found after tear-off — photographed, priced and approved by you before we proceed.",
  "Acts of God outside normal design loads, like the F3 that hit in 1979.",
  "Cosmetic marks from objects striking the wall after installation.",
];

export function Guarantees() {
  return (
    <section id="guarantees" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="In writing"
          title={
            <>
              The paperwork matters more <span className="gradient-steel">than the pitch.</span>
            </>
          }
          lead="Anyone can say they stand behind their work. These are the three commitments that actually show up on your invoice — plus the three things we will tell you up front are not covered."
        />

        <Stagger className="mt-12 grid gap-5 lg:grid-cols-3">
          {guarantees.map((item) => (
            <StaggerItem key={item.title}>
              <NeonPanel className="flex h-full flex-col p-6 transition-transform duration-500 hover:-translate-y-1.5">
                <div className="flex items-center justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-xl border border-neon/35 bg-neon/[0.08] text-neon-soft">
                    {icons[item.icon]}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neon-dim">{item.term}</span>
                </div>
                <h3 className="mt-5 font-display text-[1.12rem] font-semibold leading-snug">{item.title}</h3>
                <p className="mt-3 text-[0.93rem] leading-relaxed text-muted-foreground">{item.body}</p>
              </NeonPanel>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
          <Reveal>
            <div className="neon-edge hud-corners h-full rounded-2xl bg-[hsl(220_28%_6%/0.7)] p-6 sm:p-7">
              <h3 className="font-display text-[1.05rem] font-semibold">What we tell you is not covered</h3>
              <ul className="mt-4 space-y-3">
                {notCovered.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[13.5px] leading-relaxed text-muted-foreground">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-flare-soft" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-white/[0.08] pt-5 text-[13px] leading-relaxed text-muted-foreground">
                A guarantee you cannot read in plain language is a marketing line. Ours is one page.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-neon/30 bg-gradient-to-br from-neon/[0.10] to-transparent p-6 sm:p-7">
              <div>
                <p className="eyebrow">Registered on completion</p>
                <p className="mt-4 font-display text-[2.6rem] font-semibold leading-none neon-text">
                  {stats.warrantyYears}-year
                </p>
                <p className="mt-2 text-[0.95rem] text-muted-foreground">
                  workmanship guarantee, plus the full manufacturer material warranty registered in your name and
                  transferable if you sell.
                </p>
              </div>
              <Button asChild className="mt-7 w-full">
                <Link to="/quote">
                  Get it in writing <ArrowRight />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
