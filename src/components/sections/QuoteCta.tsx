import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, Clock, CreditCard, Phone, Ruler, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuroraBackdrop, MountainRidge, SnowField } from "@/components/site/Backdrop";
import { Reveal } from "@/components/motion/Reveal";
import { business, stats } from "@/content/site";
import { telHref } from "@/lib/utils";

const assurances = [
  { icon: <Ruler className="size-4" />, label: "Measured elevations, not eyeballed" },
  { icon: <ShieldCheck className="size-4" />, label: `Written ${stats.warrantyYears}-year workmanship guarantee` },
  { icon: <CreditCard className="size-4" />, label: "Financing from 12–144 months, OAC" },
  { icon: <CalendarCheck className="size-4" />, label: "Quote back within 48 hours" },
];

export function QuoteCta() {
  return (
    <section id="quote" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="container">
        <Reveal>
          <div className="neon-edge-strong hud-corners relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0" aria-hidden="true">
              <div className="absolute inset-0 bg-[linear-gradient(150deg,hsl(205_60%_12%/0.9)_0%,hsl(220_32%_5%/0.96)_60%)]" />
              <AuroraBackdrop grid={false} />
              <SnowField count={18} className="opacity-50" />
              <MountainRidge className="h-40 opacity-60" />
            </div>

            <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:p-14">
              <div>
                <Badge variant="neon">
                  <Clock className="size-3" /> Booking 2–3 weeks out
                </Badge>

                <h2 className="mt-6 font-display text-[clamp(1.9rem,4.4vw,3.1rem)] font-bold leading-[1.03]">
                  Two minutes now saves you
                  <br />
                  <span className="gradient-flare neon-text-flare">a winter of guessing.</span>
                </h2>

                <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-muted-foreground">
                  Answer a handful of questions about your home and we will come out, measure every elevation, photograph
                  what is failing, and hand you a fixed written price. Free, no obligation, and you keep the proposal
                  whether or not you hire us.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg" className="group">
                    <Link to="/quote">
                      Start my free quote
                      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href={telHref(business.phone)}>
                      <Phone /> {business.phone}
                    </a>
                  </Button>
                </div>

                <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {assurances.map((item) => (
                    <li key={item.label} className="flex items-center gap-2.5 text-[13.5px] text-muted-foreground">
                      <span className="text-neon-soft">{item.icon}</span>
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* wizard preview card */}
              <div className="glass-soft neon-edge rounded-2xl p-6">
                <p className="eyebrow">The wizard</p>
                <ol className="mt-5 space-y-4">
                  {[
                    { n: "1", t: "What do you need?", d: "Siding, gutters, decks — or all three." },
                    { n: "2", t: "About the property", d: "Town, stories, age of the home." },
                    { n: "3", t: "Your timeline", d: "Storm emergency or planning ahead." },
                    { n: "4", t: "How to reach you", d: "Phone, text or email. Your call." },
                  ].map((step, i) => (
                    <li key={step.n} className="flex items-start gap-3.5">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full border border-neon/45 bg-neon/[0.08] font-mono text-[11px] font-semibold text-neon-soft">
                        {step.n}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-display text-[0.95rem] font-semibold">{step.t}</span>
                        <span className="mt-0.5 block text-[12.5px] text-muted-foreground">{step.d}</span>
                      </span>
                      {i === 3 ? null : <span className="sr-only">then</span>}
                    </li>
                  ))}
                </ol>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-neon/30 to-transparent" />

                <p className="mt-4 text-[12px] leading-relaxed text-muted-foreground">
                  We never sell or share your information, and we do not run a call centre. One follow-up, then we leave
                  you alone.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
